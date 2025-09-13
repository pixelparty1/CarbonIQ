import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Leaf, Sun, Wind, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useWallet } from "@/hooks/use-wallet";
import { useToast } from "@/hooks/use-toast";
import { ReceiptDownloadButton } from "@/components/ReceiptDownloadButton";
import { useNavigate } from "react-router-dom";

// Define offset options with their formulas (same as OffsetDialog)
const OFFSET_OPTIONS = [
  {
    id: "trees",
    name: "Plant Trees",
    description: "Offset your carbon footprint by planting trees",
    icon: Leaf,
    formula: "1 credit = 50 trees",
    ratio: 50, // 1 credit = 50 trees
    color: "#4CAF50",
  },
  {
    id: "solar",
    name: "Solar Panel Systems",
    description: "Invest in solar panel systems to generate clean energy",
    icon: Sun,
    formula: "1 credit = 1 solar panel system",
    ratio: 1, // 1 credit = 1 solar panel
    color: "#FFA000",
  },
  {
    id: "wind",
    name: "Wind Farm",
    description: "Support wind turbine installations for renewable energy",
    icon: Wind,
    formula: "1 credit = 1 wind turbine",
    ratio: 1, // 1 credit = 1 wind turbine
    color: "#2196F3",
  }
];

interface OffsetPageProps {
  userCredits?: number;
  onCreditsUpdate?: (newCredits: number) => void;
  onTransactionComplete?: (transactionData: any) => void;
}

export default function OffsetPage({ userCredits = 0, onCreditsUpdate, onTransactionComplete }: OffsetPageProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Calculate credits required based on selected option and quantity
  const getRequiredCredits = () => {
    if (!selectedOption) return 0;
    
    const option = OFFSET_OPTIONS.find(opt => opt.id === selectedOption);
    if (!option) return 0;
    
    // Apply the formulas:
    // For trees: 1 credit = 50 trees (minimum), so if quantity < 50, we still need 1 credit
    if (option.id === "trees") {
      // If quantity is less than 50, still charge 1 credit (minimum)
      return quantity < 50 ? 1 : Math.ceil(quantity / option.ratio);
    }
    // For solar and wind: 1 credit = 1 unit
    return quantity;
  };
  
  const requiredCredits = getRequiredCredits();
  // We'll keep this logic for UI consistency, though we're not using it for transaction verification now
  const canOffset = userCredits >= requiredCredits && requiredCredits > 0;
  
  // Calculate impact based on selected option and quantity
  const getImpactDescription = () => {
    if (!selectedOption) return "";
    
    const option = OFFSET_OPTIONS.find(opt => opt.id === selectedOption);
    if (!option) return "";
    
    switch (option.id) {
      case "trees":
        return `${quantity} trees will absorb approximately ${(quantity * 0.06).toFixed(2)} tons of CO2 over 10 years`;
      case "solar":
        return `${quantity} solar panel systems will prevent approximately ${(quantity * 3.5).toFixed(2)} tons of CO2 annually`;
      case "wind":
        return `${quantity} wind turbines will prevent approximately ${(quantity * 6.0).toFixed(2)} tons of CO2 annually`;
      default:
        return "";
    }
  };

  // Initialize the wallet hook
  const { sendTransaction, connectWallet } = useWallet();

  // New function to handle verification request
  const handleVerificationRequest = () => {
    // Only proceed if there's a selected option for consistency with previous UI behavior
    if (!selectedOption) {
      toast({
        title: "Selection Required",
        description: "Please select an offset method first.",
        variant: "destructive",
      });
      return;
    }
    
    // Get the method name for the notification
    const option = OFFSET_OPTIONS.find(opt => opt.id === selectedOption);
    const methodName = option ? option.name : "Unknown method";
    
    // Calculate the actual quantity based on the formulas (same logic as in handleOffsetSubmit)
    let actualQuantity = quantity;
    if (selectedOption === "trees") {
      // Ensure minimum of 50 trees per credit
      actualQuantity = quantity >= 50 ? quantity : 50;
    }
    
    // Create transaction data for receipt
    const transactionData = {
      id: `TR-${Date.now()}`,
      project_name: option?.name || "Carbon Offset",
      credits_amount: requiredCredits,
      quantity: actualQuantity || quantity,
      method: methodName,
      status: "Pending Verification",
      date: new Date().toISOString(),
      impact: selectedOption === "trees" 
        ? `${actualQuantity} trees will absorb approximately ${(actualQuantity * 0.06).toFixed(2)} tons of CO2 over 10 years`
        : selectedOption === "solar"
        ? `${actualQuantity} solar panel systems will prevent approximately ${(actualQuantity * 3.5).toFixed(2)} tons of CO2 annually`
        : `${actualQuantity} wind turbines will prevent approximately ${(actualQuantity * 6.0).toFixed(2)} tons of CO2 annually`
    };
    
    // Show website notification about verification using toast with download button
    toast({
      title: "Verification Request Submitted",
      description: (
        <div className="flex flex-col">
          <p>We will contact you shortly for the verification.</p>
          <ReceiptDownloadButton 
            transactionData={transactionData} 
            onDownload={(data) => {
              // Dynamic import to avoid issues during initial page load
              import('@/lib/pdf-generator').then(module => {
                module.downloadTransactionReceipt(data);
              }).catch(error => {
                console.error("Error loading PDF generator:", error);
              });
            }} 
          />
        </div>
      ),
      duration: 10000, // Longer duration to allow user to click download
    });
    
    // Notify parent component about the transaction
    if (onTransactionComplete) {
      onTransactionComplete(transactionData);
    }
    
    // Reset state
    setSelectedOption(null);
    setQuantity(1);
  };

  const handleOffsetSubmit = async () => {
    if (!canOffset || !selectedOption) return;
    
    setIsSubmitting(true);
    
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert("You must be signed in to offset carbon credits.");
        setIsSubmitting(false);
        return;
      }
      
      const option = OFFSET_OPTIONS.find(opt => opt.id === selectedOption);
      if (!option) throw new Error("Selected option not found");
      
      // Get the method name based on selection
      let methodName;
      switch (selectedOption) {
        case "trees":
          methodName = "Plant Trees";
          break;
        case "solar":
          methodName = "Solar Panel Systems";
          break;
        case "wind":
          methodName = "Wind Farm";
          break;
        default:
          methodName = "Unknown Method";
      }
      
      // Calculate the actual quantity based on the formulas
      let actualQuantity = quantity;
      if (selectedOption === "trees") {
        // Ensure minimum of 50 trees per credit
        actualQuantity = quantity >= 50 ? quantity : 50;
      }
      
      console.log(`Processing offset: ${methodName}, Quantity: ${actualQuantity}, Credits: ${requiredCredits}`);
      
      // Total amount in ETH (1 credit = 0.001 ETH for demonstration - reduced for testing)
      // Use precise calculations for ETH values and format them properly
      const creditToEthRate = 0.001; // Reduced rate to make transactions affordable for testing
      const totalAmountEth = requiredCredits * creditToEthRate;
      const royaltyFeeEth = totalAmountEth * 0.05; // 5% royalty fee
      const purchaseAmountEth = totalAmountEth - royaltyFeeEth;
      
      console.log(`Credit calculation: ${requiredCredits} credits at ${creditToEthRate} ETH per credit = ${totalAmountEth} ETH total`);
      
      // Wallet addresses
      const royaltyWalletAddress = "0x689Bd23a334AB15A58c01538BbfB0Ef04BCFA5fF";
      const sellerWalletAddress = "0xf0c65ab1a9a2fe5B7221ec131e2EEeF1Fe19253D";
      
      // Create the provider from window.ethereum
      if (!window.ethereum) {
        alert("MetaMask is required to process this transaction. Please install MetaMask.");
        throw new Error("MetaMask not installed");
      }
      
      // Ensure wallet is connected
      await connectWallet();
      
      // First transaction: Send royalty fee
      // Format the ETH value with proper precision to avoid floating point errors
      // Use 6 decimal places for better compatibility with MetaMask
      const formattedRoyaltyFee = royaltyFeeEth.toFixed(6);
      console.log(`Sending royalty fee: ${formattedRoyaltyFee} ETH to ${royaltyWalletAddress}`);
      
      try {
        // Add explicit gas limit to ensure transaction goes through
        await sendTransaction({
          to: royaltyWalletAddress,
          value: formattedRoyaltyFee,
          description: `Royalty fee for ${methodName} offset`,
          gasLimit: 50000 // Lower gas limit for simple transfer
        });
        console.log("Royalty payment successful");
      } catch (error) {
        console.error("Royalty payment failed:", error);
        
        // Check if it's an insufficient funds error and provide more details
        if (error instanceof Error && error.message.includes('Insufficient funds')) {
          alert(`${error.message} Please add more ETH to your wallet.`);
        } else {
          alert(`Royalty payment failed: ${error instanceof Error ? error.message : 'Unknown error'}. Transaction canceled.`);
        }
        throw error;
      }
      
      // Second transaction: Send purchase amount
      // Format the ETH value with proper precision to avoid floating point errors
      const formattedPurchaseAmount = purchaseAmountEth.toFixed(6);
      console.log(`Sending purchase amount: ${formattedPurchaseAmount} ETH to ${sellerWalletAddress}`);
      
      try {
        // Add explicit gas limit to ensure transaction goes through
        await sendTransaction({
          to: sellerWalletAddress,
          value: formattedPurchaseAmount,
          description: `Purchase payment for ${methodName} offset`,
          gasLimit: 50000 // Lower gas limit for simple transfer
        });
        console.log("Purchase payment successful");
      } catch (error) {
        console.error("Purchase payment failed:", error);
        
        // Check if it's an insufficient funds error and provide more details
        if (error instanceof Error && error.message.includes('Insufficient funds')) {
          alert(`${error.message} The royalty payment was successful, but you need more ETH for the purchase payment.`);
        } else {
          alert(`Purchase payment failed: ${error instanceof Error ? error.message : 'Unknown error'}. The royalty was paid but the purchase transaction failed.`);
        }
        throw error;
      }
      
      // Insert into offset_credits table
      const { data: offsetData, error: offsetError } = await supabase
        .from('offset_credits')
        .insert([
          {
            user_id: user.id,
            method: methodName,
            quantity: actualQuantity,
            credits: requiredCredits
          }
        ])
        .select();
        
      if (offsetError) {
        console.error("Error inserting offset credits:", offsetError);
        throw offsetError;
      }
      
      console.log("Offset credits inserted successfully:", offsetData);
      
      // Record in transactions table as well for consistency
      const { data: transactionData, error: transactionError } = await supabase
        .from('transactions')
        .insert([
          {
            buyer_id: user.id,
            project_id: selectedOption,
            credits_amount: requiredCredits,
            price_per_credit: 1,
            total_amount: requiredCredits,
            status: 'completed',
            project_name: option.name,
            royalty_amount: royaltyFeeEth,
            purchase_amount: purchaseAmountEth,
            royalty_address: royaltyWalletAddress,
            seller_address: sellerWalletAddress
          }
        ])
        .select();
      
      if (transactionError) {
        console.error("Error recording transaction:", transactionError);
        throw transactionError;
      }
      
      console.log("Transaction recorded successfully:", transactionData);
      
      // Update user's credits in the database
      const newCredits = userCredits - requiredCredits;
      
      // Call the update function passed from parent component
      if (onCreditsUpdate) {
        onCreditsUpdate(newCredits);
      }
      console.log("Credits updated:", newCredits);
      
      // Reset state
      setSelectedOption(null);
      setQuantity(1);
      
      // Show confirmation with appropriate message based on offset method
      let confirmationMessage;
      switch (selectedOption) {
        case "trees":
          confirmationMessage = `Successfully purchased offset for ${actualQuantity} trees using ${requiredCredits} credits!`;
          break;
        case "solar":
          confirmationMessage = `Successfully purchased offset for ${actualQuantity} solar panel system(s) using ${requiredCredits} credits!`;
          break;
        case "wind":
          confirmationMessage = `Successfully purchased offset for ${actualQuantity} wind turbine(s) using ${requiredCredits} credits!`;
          break;
        default:
          confirmationMessage = `Successfully offset using ${requiredCredits} credits!`;
      }
      
      alert(confirmationMessage);
    } catch (error: any) {
      console.error('Error offsetting credits:', error);
      
      // Provide more specific error messages based on the error type
      let errorMessage = 'Failed to process your offset. Please try again.';
      
      if (error.message) {
        if (error.message.includes('user rejected')) {
          errorMessage = 'Transaction was rejected in MetaMask. Please try again.';
        } else if (error.message.toLowerCase().includes('insufficient funds')) {
          errorMessage = `Insufficient funds in your wallet to complete this transaction. Please add more ETH to your wallet.
          
Note: Even small transactions require some ETH for gas fees. Consider adding at least 0.01 ETH to your wallet.`;
        } else if (error.message.includes('gas')) {
          errorMessage = `Gas estimation failed: ${error.message}. Try setting a custom gas limit in MetaMask or adding more ETH to your wallet.`;
        } else {
          // Include the actual error message for better debugging
          errorMessage = `Transaction error: ${error.message}`;
        }
      } else if (error.code === 'CALL_EXCEPTION') {
        errorMessage = 'Transaction failed. There might be an issue with the contract.';
      } else if (error.code === 'TRANSACTION_REPLACED') {
        errorMessage = 'Transaction was replaced by another transaction.';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </Button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Offset Your Carbon Footprint</h1>
              <p className="text-gray-400 mt-2">
                Choose a method to offset your carbon emissions using your available credits.
                You have {userCredits} credits available.
              </p>
            </div>
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Offset Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {OFFSET_OPTIONS.map((option) => (
            <Card 
              key={option.id}
              className={`p-6 cursor-pointer transition-all duration-200 ${
                selectedOption === option.id 
                  ? 'ring-2 transform scale-105' 
                  : 'hover:bg-gray-900'
              }`}
              style={{ 
                background: selectedOption === option.id ? `${option.color}22` : '#0D0D0D',
                borderColor: selectedOption === option.id ? option.color : '#2A2A2A',
                boxShadow: selectedOption === option.id ? `0 0 15px ${option.color}33` : 'none'
              }}
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div 
                  className="rounded-full p-4 mb-2"
                  style={{ backgroundColor: `${option.color}33` }}
                >
                  <option.icon style={{ color: option.color }} className="h-8 w-8" />
                </div>
                <h3 className="font-medium text-lg" style={{ color: '#E0E0E0' }}>{option.name}</h3>
                <p className="text-sm" style={{ color: '#B0B0B0' }}>{option.formula}</p>
                <p className="text-xs text-gray-500">{option.description}</p>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Quantity Selection */}
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-lg p-6 mb-8"
          >
            <div className="space-y-6">
              <div>
                <label className="text-lg font-medium block mb-4" style={{ color: '#E0E0E0' }}>
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const newValue = Math.max(1, parseInt(e.target.value) || 1);
                      // For trees, enforce minimum of 50 or multiples of 50
                      if (selectedOption === "trees") {
                        setQuantity(newValue < 50 ? 50 : newValue);
                      } else {
                        setQuantity(newValue);
                      }
                    }}
                    min={selectedOption === "trees" ? 50 : 1}
                    style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', color: '#E0E0E0' }}
                    className="w-32 text-lg"
                  />
                  <span style={{ color: '#B0B0B0' }}>
                    {selectedOption === "trees" ? "trees (minimum 50)" : OFFSET_OPTIONS.find(opt => opt.id === selectedOption)?.name}
                  </span>
                </div>
              </div>
              
              {/* Impact Summary */}
              <div className="rounded-lg p-6" style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}>
                <h4 className="text-lg font-medium mb-3" style={{ color: '#E0E0E0' }}>Impact Summary</h4>
                <div className="space-y-2">
                  <p className="text-md" style={{ color: '#E0E0E0' }}>Required Credits: <span className="font-bold text-green-400">{requiredCredits}</span></p>
                  <p className="text-sm" style={{ color: '#B0B0B0' }}>{getImpactDescription()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="px-8 py-3"
            style={{ borderColor: '#2A2A2A', color: '#E0E0E0' }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleVerificationRequest}
            disabled={!selectedOption || isSubmitting}
            className="px-8 py-3 transition-all duration-200 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            style={{ 
              backgroundColor: selectedOption ? '#4CAF50' : '#4CAF5066', 
              color: '#E0E0E0',
              cursor: selectedOption ? 'pointer' : 'not-allowed',
            }}
          >
            {isSubmitting ? 'Processing...' : 'Get Verified'}
          </Button>
        </div>
      </div>
    </div>
  );
}