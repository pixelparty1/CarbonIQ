import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, Check, AlertTriangle, X, Shield, ShieldCheck, Bot } from "lucide-react";
import { motion } from "framer-motion";
import * as XLSX from 'xlsx';

const billTypeOptions = [
  { value: "electricity", label: "Electricity", factor: 0.00085 },
  { value: "travelling", label: "Travelling Bill", factor: 0.00012 },
  { value: "petroleum", label: "Petroleum", factor: 0.00231 },
  { value: "waste", label: "Waste Dispose Bill", factor: 0.0018 },
];

export default function UploadBill() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "verified" | "unverified" | "bill-selection">("idle");
  const [verificationMessage, setVerificationMessage] = useState<string>("");
  const [quantityValue, setQuantityValue] = useState<number | null>(null);
  const [showBillTypeSelection, setShowBillTypeSelection] = useState(false);
  const [selectedBillType, setSelectedBillType] = useState<string>("");
  const [calculatedEmissions, setCalculatedEmissions] = useState<number | null>(null);
  const [calculatedCredits, setCalculatedCredits] = useState<number | null>(null);
  const [showAIBot, setShowAIBot] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Generate AI-based suggestions based on quantity
  const generateAISuggestions = (quantity: number, billType?: string) => {
    const suggestions: string[] = [];
    
    if (quantity > 1000) {
      suggestions.push("💡 High consumption detected! Consider switching to renewable energy sources.");
      suggestions.push("🌱 Implement energy-efficient appliances to reduce your carbon footprint.");
      suggestions.push("📊 Set up monthly monitoring to track consumption patterns.");
    } else if (quantity > 500) {
      suggestions.push("⚡ Moderate usage detected. Consider LED lighting upgrades.");
      suggestions.push("🏠 Optimize heating/cooling systems for better efficiency.");
      suggestions.push("📱 Use smart meters to monitor real-time consumption.");
    } else {
      suggestions.push("✨ Great! Your consumption is eco-friendly.");
      suggestions.push("🎯 Maintain current usage patterns for sustainability.");
      suggestions.push("🔄 Consider sharing best practices with others.");
    }

    if (billType === "electricity") {
      suggestions.push("🔋 Consider solar panel installation for long-term savings.");
    } else if (billType === "travelling") {
      suggestions.push("🚗 Explore electric or hybrid vehicle options.");
    } else if (billType === "petroleum") {
      suggestions.push("⛽ Plan efficient routes to minimize fuel consumption.");
    }

    return suggestions;
  };

  const handleAIBotClick = () => {
    if (quantityValue) {
      const suggestions = generateAISuggestions(quantityValue, selectedBillType);
      setAiSuggestions(suggestions);
      setShowAIBot(true);
    } else {
      setAiSuggestions(["📤 Please upload an Excel file first to get personalized AI suggestions!"]);
      setShowAIBot(true);
    }
  };

  // Verify Excel file by checking if first cell contains "CarbonIQ" and read quantity
  const verifyExcelFile = async (file: File): Promise<{isVerified: boolean, quantity: number | null}> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first worksheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Get the first cell (A1)
          const firstCell = worksheet['A1'];
          const firstCellValue = firstCell ? firstCell.v : '';
          
          // Check if first cell contains "CarbonIQ"
          const isVerified = firstCellValue && firstCellValue.toString().includes('CarbonIQ');
          
          let quantity = null;
          if (isVerified) {
            // Look for "Quantity" in the sheet and get the value in the cell below it
            const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:Z100');
            
            for (let row = range.s.r; row <= range.e.r; row++) {
              for (let col = range.s.c; col <= range.e.c; col++) {
                const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
                const cell = worksheet[cellAddress];
                
                if (cell && cell.v && cell.v.toString().toLowerCase().includes('quantity')) {
                  // Get the cell below this one
                  const belowCellAddress = XLSX.utils.encode_cell({ r: row + 1, c: col });
                  const belowCell = worksheet[belowCellAddress];
                  
                  if (belowCell && typeof belowCell.v === 'number') {
                    quantity = belowCell.v;
                    break;
                  }
                }
              }
              if (quantity !== null) break;
            }
          }
          
          resolve({ isVerified, quantity });
        } catch (error) {
          console.error('Error reading Excel file:', error);
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  // Save file to carbon_deposits folder
  const saveFileToDeposits = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    console.log('Uploading file:', file.name, 'to carbon_deposits folder...');

    try {
      const response = await fetch('http://localhost:3001/api/upload-deposits', {
        method: 'POST',
        body: formData,
      });

      console.log('Server response status:', response.status);

      if (!response.ok) {
        const result = await response.json().catch(() => ({ error: 'Unknown server error' }));
        console.error('Server error:', result);
        throw new Error(result.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      return result;
    } catch (error) {
      console.error('Upload error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please ensure the server is running on port 3001.');
      }
      throw error;
    }
  };

  // Calculate emissions based on bill type and quantity (in tons CO2)
  const calculateEmissions = (billType: string, quantity: number): { emissionsTons: number, credits: number } => {
    const billOption = billTypeOptions.find(option => option.value === billType);
    if (!billOption || !quantity) return { emissionsTons: 0, credits: 0 };
    
    // Calculate emissions in kg CO2 first, then convert to tons
    const emissionsKg = quantity * billOption.factor;
    const emissionsTons = emissionsKg / 1000; // Convert kg to tons
    
    // Calculate credits: 1 ton = 1 credit
    const credits = Math.ceil(emissionsTons); // Round up to nearest whole credit
    
    return { emissionsTons, credits };
  };



  // Generate and download emissions Excel file
  const downloadEmissionsExcel = (billType: string, quantity: number, emissionsTons: number, credits: number) => {
    const billLabel = billTypeOptions.find(option => option.value === billType)?.label || billType;
    
    // Create workbook with simple data
    const wb = XLSX.utils.book_new();
    const wsData = [
      ['Emissions Details Report'],
      [''],
      ['Bill Type:', billLabel],
      ['Quantity:', quantity],
      ['Emission Factor:', billTypeOptions.find(option => option.value === billType)?.factor || 0],
      ['Total Emissions (tons CO2):', emissionsTons.toFixed(6)],
      ['Credits Required:', credits],
      [''],
      ['Generated on:', new Date().toLocaleDateString()],
      ['Generated by:', 'CarbonIQ Bot']
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Set column widths
    ws['!cols'] = [
      { width: 25 },
      { width: 20 }
    ];
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Emissions Details');
    
    // Download file
    XLSX.writeFile(wb, 'emissions_details.xlsx');
  };

  // Handle bill type selection
  const handleBillTypeSelection = (billType: string) => {
    setSelectedBillType(billType);
    
    if (quantityValue !== null) {
      const { emissionsTons, credits } = calculateEmissions(billType, quantityValue);
      setCalculatedEmissions(emissionsTons);
      setCalculatedCredits(credits);
      
      // Update verification message to show calculation result
      setVerificationMessage(`✅ Emissions calculated! ${emissionsTons.toFixed(6)} tons CO2 (${credits} credits required) based on ${quantityValue} units of ${billTypeOptions.find(opt => opt.value === billType)?.label}.`);
      
      // Generate and download Excel file
      downloadEmissionsExcel(billType, quantityValue, emissionsTons, credits);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if it's an Excel file
      const isExcel = selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls');
      
      if (!isExcel) {
        alert("Please select only Excel files (.xlsx or .xls)");
        return;
      }
      
      setFile(selectedFile);
      setVerificationStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an Excel file");
      return;
    }

    setIsUploading(true);
    
    try {
      // 1. Save file to carbon_deposits folder
      await saveFileToDeposits(file);
      
      // 2. Open verification dialog
      setShowVerificationDialog(true);
      setVerificationStatus("verifying");
      setVerificationMessage("Python bot is analyzing your Excel file...");
      
      // 3. Simulate Python bot verification (with delay for realism)
      setTimeout(async () => {
        try {
          const { isVerified, quantity } = await verifyExcelFile(file);
          
          if (isVerified) {
            setQuantityValue(quantity);
            
            if (quantity !== null) {
              setVerificationStatus("bill-selection");
              setVerificationMessage(`✅ Verified! Found CarbonIQ and quantity: ${quantity}. Please select your bill type:`);
            } else {
              setVerificationStatus("verified");
              setVerificationMessage("✅ Verified! The first cell contains 'CarbonIQ', but no quantity found below 'Quantity' cell.");
            }
          } else {
            setVerificationStatus("unverified");
            setVerificationMessage("❌ Unverified bill uploaded. The first cell does not contain 'CarbonIQ'.");
          }
        } catch (error) {
          setVerificationStatus("unverified");
          setVerificationMessage("❌ Error reading Excel file. Please ensure it's a valid Excel file.");
        }
      }, 2000); // 2 second delay to simulate bot processing
      
    } catch (error) {
      console.error("Error uploading file:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Failed to upload file: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  const closeVerificationDialog = () => {
    setShowVerificationDialog(false);
    setVerificationStatus("idle");
    setFile(null);
    setQuantityValue(null);
    setSelectedBillType("");
    setCalculatedEmissions(null);
    setCalculatedCredits(null);
    // Reset file input
    const fileInput = document.getElementById('excel-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Upload Your Excel Bill</h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-zinc-400">
            Upload your Excel bill to store in carbon_deposits folder and verify CarbonIQ authenticity
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-zinc-200">Upload Excel File</h2>
                  <Separator className="my-4 bg-zinc-800" />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="excel-file">Upload Excel File (.xlsx, .xls)</Label>
                  <div 
                    className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
                    onClick={() => document.getElementById('excel-file')?.click()}
                  >
                    <Input
                      id="excel-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".xlsx,.xls"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-zinc-500" />
                      {file ? (
                        <div className="flex items-center gap-2 text-zinc-200">
                          <FileText className="h-5 w-5 text-primary" />
                          <span>{file.name}</span>
                        </div>
                      ) : (
                        <div className="text-zinc-400">
                          <p className="font-medium">Click to upload or drag and drop</p>
                          <p className="text-sm">Excel files only (.xlsx, .xls)</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Upload Button */}
                <div className="pt-4">
                  <Button 
                    onClick={handleUpload} 
                    disabled={!file || isUploading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    variant="default"
                  >
                    {isUploading ? "Uploading..." : "Upload Excel File"}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Verification Dialog */}
        <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
          <DialogContent className="sm:max-w-[500px]" style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
            <DialogHeader>
              <DialogTitle style={{ color: '#E0E0E0' }} className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-400" />
                Python Bot Verification
              </DialogTitle>
              <DialogDescription style={{ color: '#B0B0B0' }}>
                Analyzing your Excel file for CarbonIQ verification...
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              {verificationStatus === "verifying" && (
                <div className="flex items-center gap-3 text-zinc-200">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                  <span>{verificationMessage}</span>
                </div>
              )}
              
              {verificationStatus === "verified" && (
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-green-400 mt-1" />
                  <div>
                    <p className="text-green-400 font-medium mb-1">File Verified!</p>
                    <p className="text-zinc-300 text-sm">{verificationMessage}</p>
                  </div>
                </div>
              )}
              
              {verificationStatus === "unverified" && (
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-400 mt-1" />
                  <div>
                    <p className="text-red-400 font-medium mb-1">Verification Failed</p>
                    <p className="text-zinc-300 text-sm">{verificationMessage}</p>
                  </div>
                </div>
              )}
              
              {verificationStatus === "bill-selection" && (
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <ShieldCheck className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <p className="text-green-400 font-medium mb-1">File Verified!</p>
                      <p className="text-zinc-300 text-sm">{verificationMessage}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {billTypeOptions.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => handleBillTypeSelection(option.value)}
                        className="w-full justify-start text-left bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600"
                        variant="outline"
                      >
                        <span className="font-medium">{String.fromCharCode(97 + billTypeOptions.indexOf(option))}) {option.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {verificationStatus !== "verifying" && verificationStatus !== "bill-selection" && (
              <div className="flex justify-end">
                <Button
                  onClick={closeVerificationDialog}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Close
                </Button>
              </div>
            )}
            
            {selectedBillType && calculatedEmissions !== null && calculatedCredits !== null && (
              <div className="flex justify-end mt-4">
                <Button
                  onClick={closeVerificationDialog}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Download Complete - Close
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* AI Bot Button - Fixed Position Bottom Right */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring", bounce: 0.3 }}
        >
          <Button
            onClick={handleAIBotClick}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
            size="lg"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </motion.div>

        {/* AI Suggestions Dialog */}
        <Dialog open={showAIBot} onOpenChange={setShowAIBot}>
          <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-blue-400">
                <Bot className="h-5 w-5" />
                AI Carbon Assistant
              </DialogTitle>
              <DialogDescription className="text-zinc-300">
                Smart recommendations based on your energy usage
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quantityValue && (
                <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700">
                  <p className="text-sm text-zinc-400 mb-1">Analyzed Quantity</p>
                  <p className="text-lg font-semibold text-white">{quantityValue} units</p>
                  {selectedBillType && (
                    <p className="text-sm text-blue-400 capitalize">
                      {billTypeOptions.find(opt => opt.value === selectedBillType)?.label}
                    </p>
                  )}
                </div>
              )}
              
              <div className="space-y-3">
                <h4 className="font-medium text-white mb-2">💡 AI Recommendations:</h4>
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-zinc-800/50 p-3 rounded-lg border-l-4 border-blue-500"
                  >
                    <p className="text-sm text-zinc-200">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
              
              {calculatedEmissions && calculatedCredits && (
                <div className="bg-green-900/20 p-3 rounded-lg border border-green-700">
                  <p className="text-sm text-green-400 mb-1">Carbon Impact</p>
                  <p className="text-white font-medium">{calculatedEmissions.toFixed(6)} tons CO2</p>
                  <p className="text-sm text-green-300">{calculatedCredits} credits required for offset</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setShowAIBot(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Got it, thanks!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
