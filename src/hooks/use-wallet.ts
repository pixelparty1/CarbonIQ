import { useState, useCallback } from 'react';
import { BrowserProvider, parseEther } from 'ethers';

// Wallet addresses for transactions
const ROYALTY_WALLET_ADDRESS = '0x689Bd23a334AB15A58c01538BbfB0Ef04BCFA5fF';
const PURCHASE_WALLET_ADDRESS = '0xf0c65ab1a9a2fe5B7221ec131e2EEeF1Fe19253D';

interface TransactionParams {
  to: string;
  value: number | string;
  description?: string;
  gasLimit?: number; // Optional gas limit parameter
}

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        return accounts[0];
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }, []);

  // Generic send transaction function
  const sendTransaction = useCallback(async ({ to, value, description, gasLimit }: TransactionParams) => {
    if (!window.ethereum) {
      throw new Error("Ethereum provider not found");
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      
      // Connect wallet if not always connected
      if (!account) {
        await connectWallet();
      }
      
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      
      // Format the value properly to avoid floating point precision issues
      let formattedValue: string;
      if (typeof value === 'string') {
        // Ensure string is properly formatted
        // Remove any commas and ensure it has proper decimal precision
        formattedValue = value.replace(/,/g, '');
        
        // Ensure the string is a valid number
        if (!/^\d*\.?\d*$/.test(formattedValue)) {
          throw new Error(`Invalid ETH value format: ${value}`);
        }
      } else {
        // Ensure we have proper string formatting for small ETH values
        // Using 6 decimal places for better compatibility with MetaMask
        formattedValue = value.toFixed(6).toString();
      }
      
      // Check account balance before trying to send
      const balance = await provider.getBalance(signerAddress);
      const valueInWei = parseEther(formattedValue);
      
      console.log(`Account balance: ${balance.toString()} wei`);
      console.log(`Sending transaction to ${to} with value: ${formattedValue} ETH (${valueInWei.toString()} wei)`);
      
      // Build transaction parameters with explicit gas settings
      const transactionParams: any = {
        to,
        value: valueInWei,
        // Set a default gas limit that's high enough for most transactions
        gasLimit: gasLimit || 100000,
      };
      
      // Pre-check if we have enough funds including estimated gas
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice || BigInt(40000000000); // Default 40 gwei if null
      const estimatedGasCost = gasPrice * BigInt(transactionParams.gasLimit);
      const totalCost = valueInWei + estimatedGasCost;
      
      if (balance < totalCost) {
        const ethNeeded = Number(totalCost - balance) / 1e18;
        throw new Error(`Insufficient funds. You need approximately ${ethNeeded.toFixed(6)} more ETH to complete this transaction (including gas).`);
      }
      
      // Execute the transaction with explicit gas parameters
      const txResponse = await signer.sendTransaction(transactionParams);
      
      console.log(`Transaction sent: ${description || 'No description'}, Hash:`, txResponse.hash);
      return txResponse.hash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }, [account, connectWallet]);

  // Send royalty payment transaction
  const sendRoyaltyPayment = useCallback(async (amountInETH: number | string) => {
    // Format number to string with proper precision if needed
    const formattedAmount = typeof amountInETH === 'number' 
      ? amountInETH.toFixed(18) 
      : amountInETH;
    
    return sendTransaction({
      to: ROYALTY_WALLET_ADDRESS,
      value: formattedAmount,
      description: "Royalty payment"
    });
  }, [sendTransaction]);

  // Send purchase payment transaction
  const sendPurchasePayment = useCallback(async (amountInETH: number | string) => {
    // Format number to string with proper precision if needed
    const formattedAmount = typeof amountInETH === 'number' 
      ? amountInETH.toFixed(18) 
      : amountInETH;
    
    return sendTransaction({
      to: PURCHASE_WALLET_ADDRESS,
      value: formattedAmount,
      description: "Purchase payment"
    });
  }, [sendTransaction]);

  return {
    account,
    connectWallet,
    sendTransaction,
    sendRoyaltyPayment,
    sendPurchasePayment,
    royaltyWalletAddress: ROYALTY_WALLET_ADDRESS,
    purchaseWalletAddress: PURCHASE_WALLET_ADDRESS
  };
}
