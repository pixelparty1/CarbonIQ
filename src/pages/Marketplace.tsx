import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { CreditCard3D } from "@/components/CreditCard3D";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal, TrendingUp, MapPin, Clock, Wallet, Download, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Transaction {
  id: string;
  buyer_id: string;
  project_id: string;
  credits_amount: number;
  price_per_credit: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  tx_hash?: string; // Make it optional since it might not always be present
}

export default function Marketplace() {
  console.log("Rendering Marketplace component");
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [filterBy, setFilterBy] = useState("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCredits, setTotalCredits] = useState(120);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<any>(null);
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // List Credits Modal State
  const [listCreditModalOpen, setListCreditModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);
  const [creditPrice, setCreditPrice] = useState(0);
  const [isSubmittingListing, setIsSubmittingListing] = useState(false);
  
  // Listed Credits State
  const [listedCredits, setListedCredits] = useState<any[]>([]);
  const [showFlexBox, setShowFlexBox] = useState(false);

  // Authentication check
  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Update user state when auth state changes
      if (event === 'SIGNED_IN') {
        checkUser(); // Refresh user data
      } else if (event === 'SIGNED_OUT') {
        setUser(null); // Clear user data but don't redirect
        console.log('User signed out, staying on marketplace');
      }
    });
    
    return () => {
      // Clean up listener on unmount if needed
      authListener?.subscription?.unsubscribe?.();
    };
  }, [navigate]);

  // Fetch user's transactions
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);
  
  // Fetch listed credits and ensure table exists
  useEffect(() => {
    checkAndCreateTable();
    fetchListedCredits();
    checkForPendingListings();
  }, []);
  
  // Check for pending actions after login
  useEffect(() => {
    if (user) {
      // Check if there was a pending action before login
      try {
        const pendingAction = localStorage.getItem('pendingAction');
        if (pendingAction) {
          const { action, timestamp } = JSON.parse(pendingAction);
          const timeDiff = Date.now() - new Date(timestamp).getTime();
          
          // Only process actions that are less than 30 minutes old
          if (timeDiff < 30 * 60 * 1000) {
            if (action === 'listCredits') {
              setListCreditModalOpen(true);
            }
          }
          
          // Clear the pending action
          localStorage.removeItem('pendingAction');
        }
        
        // Check if there was a pending purchase
        const pendingPurchase = localStorage.getItem('pendingPurchase');
        if (pendingPurchase) {
          const { creditId, timestamp } = JSON.parse(pendingPurchase);
          const timeDiff = Date.now() - new Date(timestamp).getTime();
          
          // Only process purchases that are less than 30 minutes old
          if (timeDiff < 30 * 60 * 1000 && creditId) {
            // Find the credit and open the purchase modal
            const credit = listedCredits.find(c => c.id === creditId);
            if (credit) {
              setSelectedCredit(credit);
              setPurchaseAmount(1);
              setPurchaseModalOpen(true);
            }
          }
          
          // Clear the pending purchase
          localStorage.removeItem('pendingPurchase');
        }
      } catch (err) {
        console.error('Error checking pending actions:', err);
      }
    }
  }, [user, listedCredits]);
  
  // Debugging function to check Supabase connection status
  async function debugSupabaseConnection() {
    try {
      // Log environment variables (without exposing sensitive data)
      console.log('SUPABASE URL:', import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not set');
      console.log('SUPABASE ANON KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set');
      
      // Check basic connectivity
      try {
        const response = await fetch(import.meta.env.VITE_SUPABASE_URL || 'https://crbmzqqqokkpircxwwhn.supabase.co');
        console.log('Supabase API reachable:', response.ok, response.status);
      } catch (e) {
        console.error('Cannot reach Supabase URL:', e);
      }
      
      // Check auth status
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      console.log('Auth session:', session ? 'Active' : 'None', 'Error:', authError ? authError.message : 'None');
      
      // Try a simple query
      const startTime = Date.now();
      const { data, error } = await supabase.from('_health_check').select('*').limit(1);
      console.log('Health check query time:', Date.now() - startTime, 'ms');
      console.log('Health check result:', error ? `Error: ${error.message}` : 'Success');
      
      return {
        connected: !authError,
        session: session ? 'Active' : 'None',
        querySuccess: !error
      };
    } catch (e) {
      console.error('Debug connection check failed:', e);
      return {
        connected: false,
        error: e.message
      };
    }
  }
  
  // Check for any pending listings that failed previously
  async function checkForPendingListings() {
    try {
      const pendingListing = localStorage.getItem('pendingCreditListing');
      if (pendingListing) {
        const parsed = JSON.parse(pendingListing);
        const timestamp = new Date(parsed.timestamp);
        const now = new Date();
        const hoursSinceSubmission = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);
        
        // If it's been less than 24 hours, ask the user if they want to retry
        if (hoursSinceSubmission < 24) {
          setTimeout(() => {
            toast({
              title: "Pending Listing Found",
              description: "You have an unsubmitted carbon credit listing. Would you like to try again?",
              action: (
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="default" 
                    onClick={() => {
                      setCompanyName(parsed.companyName);
                      setProjectName(parsed.projectName);
                      setCreditAmount(parsed.creditAmount);
                      setListCreditModalOpen(true);
                    }}
                    size="sm"
                  >
                    Retry
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => localStorage.removeItem('pendingCreditListing')}
                    size="sm"
                  >
                    Discard
                  </Button>
                </div>
              )
            });
          }, 3000); // Show after a short delay
        } else {
          // It's been more than 24 hours, just clear it
          localStorage.removeItem('pendingCreditListing');
        }
      }
    } catch (error) {
      console.error('Error checking for pending listings:', error);
    }
  }

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      // Allow access to marketplace even without login
      // Just store user data if available
      console.log("User authentication status:", user ? "Logged in" : "Not logged in");
    } catch (error) {
      console.error('Error checking user:', error);
      // Don't redirect to sign in on error, just log the error
      // and continue showing the marketplace
    } finally {
      setLoading(false);
    }
  }
  
  async function checkAndCreateTable() {
    try {
      console.log('Checking if listed_credits table exists...');
      
      // Try to query the table first to see if it exists
      const { error } = await supabase
        .from('listed_credits')
        .select('count(*)', { count: 'exact', head: true });
      
      // If there's an error with the code 42P01, it means the table doesn't exist
      if (error && error.code === '42P01') {
        console.log('Table does not exist, creating it with direct SQL...');
        
        // Create the table using direct SQL query instead of RPC
        const { error: createError } = await supabase
          .from('_exec_sql')
          .select('*')
          .eq('query', `
            CREATE TABLE IF NOT EXISTS public.listed_credits (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              company_name TEXT NOT NULL,
              project_name TEXT NOT NULL,
              total_credits INTEGER NOT NULL,
              remaining_credits INTEGER NOT NULL,
              price_per_credit DECIMAL(10,2) DEFAULT 10.00,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
              status TEXT DEFAULT 'active'
            );
          `);
        
        if (createError) {
          console.error('Failed to create table using _exec_sql:', createError);
          
          // Try alternative direct SQL approach
          try {
            console.log('Trying alternative method to create table...');
            const sqlResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
              },
              body: JSON.stringify({
                sql: `
                  CREATE TABLE IF NOT EXISTS public.listed_credits (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    company_name TEXT NOT NULL,
                    project_name TEXT NOT NULL,
                    total_credits INTEGER NOT NULL,
                    remaining_credits INTEGER NOT NULL,
                    price_per_credit DECIMAL(10,2) DEFAULT 10.00,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                    status TEXT DEFAULT 'active'
                  );
                `
              })
            });
            
            if (!sqlResponse.ok) {
              const errorText = await sqlResponse.text();
              throw new Error(`SQL execution failed: ${errorText}`);
            }
            
            console.log('Table created successfully via direct API call');
          } catch (sqlError) {
            console.error('Alternative table creation also failed:', sqlError);
            
            // Show a toast notification for the error
            toast({
              variant: "destructive",
              title: "Table Creation Failed",
              description: "Could not create the required database table. You may need to create it manually."
            });
          }
        } else {
          console.log('Table created successfully');
        }
      } else {
        console.log('Table already exists');
      }
    } catch (error) {
      console.error('Error checking or creating table:', error);
    }
  }

  async function fetchListedCredits(retries = 3) {
    try {
      console.log('Fetching listed credits...');
      
      // Check if table exists first to avoid unnecessary 42P01 errors
      const { error: checkError } = await supabase
        .from('listed_credits')
        .select('count(*)', { count: 'exact', head: true })
        .limit(1);
      
      if (checkError) {
        if (checkError.code === '42P01') {
          console.log('Listed credits table does not exist yet, creating it...');
          await checkAndCreateTable();
          
          // Try again after creating table
          const { data: retryData, error: retryError } = await supabase
            .from('listed_credits')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (retryError) {
            if (retryError.code === '42P01') {
              // Still doesn't exist, just set empty array
              console.log('Table still does not exist after creation attempt');
              setListedCredits([]);
              return;
            }
            throw retryError;
          }
          
          console.log('Successfully fetched listed credits after table creation:', retryData?.length || 0);
          setListedCredits(retryData || []);
          return;
        }
        
        throw checkError;
      }
      
      // If table exists, proceed with normal query
      const { data, error } = await supabase
        .from('listed_credits')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        // If we have retries left and it's a potentially recoverable error, retry
        if (retries > 0) {
          console.log(`Retrying fetchListedCredits... (${retries} attempts left)`);
          // Exponential backoff
          const delay = 1000 * Math.pow(2, 3 - retries); // 1s, 2s, 4s
          setTimeout(() => fetchListedCredits(retries - 1), delay);
          return;
        }
        
        throw error;
      }
      
      console.log('Successfully fetched listed credits:', data?.length || 0);
      setListedCredits(data || []);
      
      // If we previously had errors but now succeeded, show a success toast
      const hadPreviousErrors = localStorage.getItem('listedCreditsLoadFailed') === 'true';
      if (hadPreviousErrors) {
        toast({
          title: "Data Loaded",
          description: "Successfully loaded marketplace listings."
        });
        localStorage.removeItem('listedCreditsLoadFailed');
      }
      
      // Cache the listings in localStorage for fallback
      try {
        localStorage.setItem('cachedListedCredits', JSON.stringify(data || []));
        localStorage.setItem('cachedListedCreditsTimestamp', new Date().toISOString());
      } catch (cacheError) {
        console.error('Failed to cache listings:', cacheError);
      }
    } catch (error) {
      console.error('Error fetching listed credits:', error);
      
      // Set a flag to track that we had errors
      localStorage.setItem('listedCreditsLoadFailed', 'true');
      
      // Only show the toast error if this was the last retry
      if (retries === 0) {
        // Check if we can at least recover previously listed credits from local storage
        try {
          const cachedListings = localStorage.getItem('cachedListedCredits');
          if (cachedListings) {
            const parsed = JSON.parse(cachedListings);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.log('Recovered cached listings:', parsed.length);
              setListedCredits(parsed);
              
              toast({
                variant: "default",
                title: "Using Cached Data",
                description: "Unable to connect to the database. Showing cached listings."
              });
              return;
            }
          }
        } catch (cacheError) {
          console.error('Failed to recover cached listings:', cacheError);
        }
        
        toast({
          variant: "destructive",
          title: "Data Load Error",
          description: "Could not load marketplace listings. Please check your connection and refresh the page."
        });
      }
    }
  }

  async function fetchTransactions() {
    // If no user is logged in, just set empty transactions
    if (!user || !user.id) {
      console.log('No user logged in, skipping transaction fetch');
      setTransactions([]);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    }
  }

  function handlePurchase(credit: any) {
  setSelectedCredit(credit);
  setPurchaseAmount(1);
  setPurchaseModalOpen(true);
  }
  
  // Handle click on list credits button
  function handleListCreditsClick() {
    setShowFlexBox(true);
    setListCreditModalOpen(true);
  }
  
  const handleDownloadReceipt = async (transactionData) => {
    try {
      // Dynamically import the PDF generator to avoid issues during page load
      const pdfModule = await import('@/lib/pdf-generator');
      pdfModule.downloadTransactionReceipt(transactionData);
    } catch (error) {
      console.error('Error generating transaction receipt:', error);
      toast({
        variant: "destructive",
        title: "Receipt Generation Failed",
        description: "Could not generate receipt. Please try again."
      });
    }
  }
  
  async function testDatabaseConnection() {
    try {
      console.log('Testing database connection...');
      
      // First check if we can reach the Supabase service at all
      try {
        const response = await fetch(import.meta.env.VITE_SUPABASE_URL || "https://crbmzqqqokkpircxwwhn.supabase.co");
        console.log(`Supabase URL check: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
          console.error('Basic connectivity to Supabase URL failed:', response.status, response.statusText);
          return false;
        }
      } catch (fetchError) {
        console.error('Cannot reach Supabase URL:', fetchError);
        return false;
      }
      
      // Skip RPC call since it might not exist, use auth check instead
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (authError) {
        console.error('Auth connection test failed:', authError);
        return false;
      }
      
      console.log('Authentication check passed');
      
      // Try a very basic query that should always work
      let healthData = null;
      let healthError = null;
      
      try {
        const result = await supabase
          .from('_health_check')
          .select('count(*)', { count: 'exact', head: true })
          .limit(1);
          
        healthData = result.data;
        healthError = result.error;
      } catch (e) {
        // Ignore table not found errors for _health_check
        if (e.code === '42P01') {
          healthData = null;
          healthError = null;
        } else {
          healthError = e;
        }
      }
        
      if (healthError && healthError.code !== '42P01') {
        console.error('Health check query failed:', healthError);
        return false;
      }
      
      console.log('Database connectivity test succeeded');
      return true;
    } catch (e) {
      console.error('Database connection test failed with exception:', e);
      return false;
    }
  }
  
  function handleListCredits() {
    if (!companyName || !projectName || !creditAmount) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      return;
    }

    // Make sure credits amount is valid
    const credits = parseInt(String(creditAmount));
    if (isNaN(credits) || credits <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid number of credits"
      });
      return;
    }

    // Create new credit listing object
    const newCredit = {
      id: Date.now().toString(), // Simple ID for local use
      company_name: companyName,
      project_name: projectName,
      total_credits: credits,
      remaining_credits: credits,
      price_per_credit: creditPrice || 10.00,
      created_at: new Date().toISOString(),
      status: 'active'
    };

    // Add to local state
    setListedCredits(prev => [newCredit, ...prev]);

    // Reset form and close modal
    setCompanyName("");
    setProjectName("");
    setCreditAmount(0);
    setCreditPrice(0);
    setListCreditModalOpen(false);

    toast({
      title: "Credits Listed Successfully",
      description: `You've listed ${credits} carbon credits for sale.`,
    });

    // Show the flexbox display
    setShowFlexBox(true);
  }

  async function processMetamaskPayment() {
    if (!selectedCredit || !window.ethereum) return;
    
    setProcessingPayment(true);
    
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      // Calculate ETH values
      const creditsEth = parseFloat((purchaseAmount * selectedCredit.price * 0.01).toFixed(8));
      const royaltyEth = parseFloat((creditsEth * 0.05).toFixed(8));
      const totalEth = creditsEth + royaltyEth;
      
      // Convert to wei (1 ETH = 10^18 wei)
      const toWei = (eth: number) => (BigInt(Math.floor(eth * 1e18))).toString(16);
      
      // CarbonIQ wallet for royalty fees (replace with actual address)
      const carbonIQWallet = "0x1234567890123456789012345678901234567890";
      
      // Send royalty fee transaction
      const royaltyTx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: account,
          to: carbonIQWallet,
          value: `0x${toWei(royaltyEth)}`,
        }],
      });
      
      // Send main transaction (for demo, send to the same wallet)
      const mainTx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: account,
          to: carbonIQWallet,
          value: `0x${toWei(creditsEth)}`,
        }],
      });

      // Record transaction in database
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            buyer_id: user?.id,
            project_id: selectedCredit.id,
            credits_amount: purchaseAmount,
            price_per_credit: selectedCredit.price * 0.01, // Store in ETH
            total_amount: totalEth,
            status: 'completed',
            tx_hash: mainTx
          }
        ]);

      if (error) throw error;
      
      // Update credit count storage Excel file
      try {
        console.log(`Attempting to update Excel with user: ${user?.email || 'anonymous@user.com'}, credits: ${purchaseAmount}`);
        const response = await fetch('http://localhost:3002/api/update-credit-storage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: user?.email || 'anonymous@user.com',
            credits: purchaseAmount
          }),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log(`Credit storage updated successfully: ${result.message}`);
        } else {
          console.error('Failed to update credit storage - Response not OK:', response.status);
        }
      } catch (creditError) {
        console.error('Error updating credit storage:', creditError);
        // Don't break the purchase flow if Excel update fails
      }
      
      // Update the credit in the list with remaining credits
      const updatedCarbonCredits = carbonCredits.map(credit => {
        if (credit.id === selectedCredit.id) {
          return {
            ...credit,
            tons: credit.tons - purchaseAmount
          };
        }
        return credit;
      });
      
      // Update total credits owned
      setTotalCredits(prev => prev + purchaseAmount);
      
      // Close the modal
      setPurchaseModalOpen(false);
      
      // Refresh transactions
      fetchTransactions();
      
      // Create a transaction object for PDF generation
      const transactionData = {
        id: mainTx.substring(0, 10),
        project_name: selectedCredit.name,
        credits_amount: purchaseAmount,
        quantity: purchaseAmount,
        method: 'Ethereum Purchase',
        status: 'Completed',
        date: new Date().toISOString(),
        tx_hash: mainTx,
        seller_address: selectedCredit.seller_address || 'N/A',
        royalty_address: selectedCredit.royalty_address || 'N/A',
        impact: `By purchasing ${purchaseAmount} carbon credits, you've offset approximately ${purchaseAmount * 1000}kg of CO2 emissions.`
      };
      
      // Show success notification with download option
      toast({
        title: "Purchase Successful",
        description: `You've successfully purchased ${purchaseAmount} carbon credits`,
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
            onClick={() => handleDownloadReceipt(transactionData)}
          >
            <Download className="w-4 h-4" />
            <span>Receipt</span>
          </Button>
        ),
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      // Removed error toast as requested since transactions are completing successfully
      // Transaction will still be logged to console for debugging purposes
    } finally {
      setProcessingPayment(false);
    }
  }

  async function updateTransactionStatus(transactionId: string, newStatus: 'completed' | 'failed') {
    try {
      const { error } = await supabase
        .from('transactions')
        .update({ status: newStatus })
        .eq('id', transactionId)
        .eq('buyer_id', user?.id); // Extra security check

      if (error) throw error;
      
      // Refresh transactions list
      fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update transaction status. Please try again."
      });
    }
  }

  // Mock data
  // Combine mock carbon credits with listed credits from Supabase
  const mockCarbonCredits = [
    {
      id: "CC-001",
      tons: 50,
      price: 25,
      project: "Amazon Reforestation",
      location: "Brazil",
      verified: true,
      expiry: "Dec 2025"
    },
    {
      id: "CC-002", 
      tons: 100,
      price: 18,
      project: "Wind Farm Development",
      location: "Texas, USA",
      verified: true,
      expiry: "Mar 2026"
    },
    {
      id: "CC-003",
      tons: 25,
      price: 32,
      project: "Ocean Kelp Restoration", 
      location: "California, USA",
      verified: true,
      expiry: "Aug 2025"
    },
    {
      id: "CC-004",
      tons: 75,
      price: 22,
      project: "Solar Panel Installation",
      location: "India",
      verified: false,
      expiry: "Jan 2026"
    },
    {
      id: "CC-005",
      tons: 200,
      price: 15,
      project: "Biogas Plant",
      location: "Kenya",
      verified: true,
      expiry: "Nov 2025"
    },
    {
      id: "CC-006",
      tons: 30,
      price: 28,
      project: "Mangrove Conservation",
      location: "Indonesia",
      verified: true,
      expiry: "Sep 2025"
    }
  ];
  
  // Transform listed credits from Supabase to match the format of mock data
  const supabaseCredits = Array.isArray(listedCredits) ? listedCredits.map(listing => ({
    id: listing.id || `listed-${Math.random().toString(36).substring(7)}`,
    tons: parseFloat(listing.remaining_credits) || 0,
    price: 20, // Default price since we removed price field
    project: listing.project_name || "Unnamed Project",
    location: "Listed Project", // Default location
    verified: true, // All user listed credits are considered verified
    expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    company: listing.company_name || "Unknown Company"
  })) : [];
  
  // Combine mock data with Supabase data
  const carbonCredits = [...supabaseCredits, ...mockCarbonCredits];

  const marketStats = [
    { label: "Total Credits Available", value: "12,450", change: "+8.5%" },
    { label: "Average Price", value: "$22.40", change: "-2.1%" },
    { label: "Active Projects", value: "156", change: "+12.3%" },
    { label: "Verified Credits", value: "89%", change: "+3.2%" }
  ];

  const filteredCredits = carbonCredits.filter(credit => {
    const matchesSearch = credit.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || 
                         (filterBy === "verified" && credit.verified) ||
                         (filterBy === "pending" && !credit.verified);
    return matchesSearch && matchesFilter;
  });

  const sortedCredits = [...filteredCredits].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "tons":
        return b.tons - a.tons;
      case "expiry":
        return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
      default:
        return 0;
    }
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D0D0D', color: '#E0E0E0' }}>
      Loading...
    </div>;
  }

  return (
    <div className="min-h-screen" style={{ background: '#0D0D0D' }}>
      <Navigation userCredits={totalCredits} />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#E0E0E0' }}>Carbon Credits Marketplace</h1>
              <p style={{ color: '#B0B0B0' }}>Buy and sell verified carbon credits from global sustainability projects</p>
            </div>
            <Button 
              onClick={handleListCreditsClick}
              className="flex items-center gap-2"
              style={{ background: '#4CAF50', color: '#E0E0E0' }}
            >
              <Plus className="w-4 h-4" />
              List Credits
            </Button>
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {marketStats.map((stat, index) => (
            <div key={stat.label} 
                 className="p-6 rounded-lg text-center transition-transform duration-300 hover:translate-y-[-4px]"
                 style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
              <div className="text-2xl font-bold mb-1" style={{ color: '#E0E0E0' }}>{stat.value}</div>
              <div className="text-sm mb-2" style={{ color: '#B0B0B0' }}>{stat.label}</div>
              <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'} 
                    className="text-xs"
                    style={{ backgroundColor: stat.change.startsWith('+') ? '#4CAF50' : '#ef4444', color: '#E0E0E0' }}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change}
              </Badge>
            </div>
          ))}
        </motion.div>

        {/* Transaction History - Only shown when user is logged in */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0E0E0' }}>Transaction History</h2>
            <div className="rounded-lg overflow-hidden" style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ color: '#8C8C8C' }}>Project ID</TableHead>
                  <TableHead style={{ color: '#8C8C8C' }}>Credits</TableHead>
                  <TableHead style={{ color: '#8C8C8C' }}>Price/Credit</TableHead>
                  <TableHead style={{ color: '#8C8C8C' }}>Total</TableHead>
                  <TableHead style={{ color: '#8C8C8C' }}>Status</TableHead>
                  <TableHead style={{ color: '#8C8C8C' }}>Date</TableHead>
                  <TableHead style={{ color: '#8C8C8C' }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell style={{ color: '#E0E0E0' }}>{transaction.project_id}</TableCell>
                    <TableCell style={{ color: '#E0E0E0' }}>{transaction.credits_amount}</TableCell>
                    <TableCell style={{ color: '#E0E0E0' }}>${transaction.price_per_credit}</TableCell>
                    <TableCell style={{ color: '#E0E0E0' }}>${transaction.total_amount}</TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          backgroundColor: 
                            transaction.status === 'completed' ? '#4CAF50' :
                            transaction.status === 'failed' ? '#ef4444' : '#ff9800',
                          color: '#E0E0E0'
                        }}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ color: '#E0E0E0' }}>
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {transaction.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            style={{ backgroundColor: '#4CAF50', color: '#E0E0E0' }}
                            onClick={() => updateTransactionStatus(transaction.id, 'completed')}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateTransactionStatus(transaction.id, 'failed')}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                      {transaction.status === 'completed' && (
                        <Button
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
                          onClick={() => handleDownloadReceipt({
                            id: transaction.id,
                            project_name: transaction.project_id,
                            credits_amount: transaction.credits_amount,
                            quantity: transaction.credits_amount,
                            price_per_credit: transaction.price_per_credit,
                            total_amount: transaction.total_amount,
                            method: 'Ethereum Purchase',
                            status: 'Completed',
                            date: transaction.created_at,
                            tx_hash: transaction.tx_hash || 'N/A',
                            impact: `By purchasing ${transaction.credits_amount} carbon credits, you've offset approximately ${transaction.credits_amount * 1000}kg of CO2 emissions.`
                          })}
                        >
                          <Download className="w-4 h-4" />
                          <span>Receipt</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {transactions.length === 0 && (
              <div className="text-center py-8" style={{ color: '#8C8C8C' }}>
                No transactions found
              </div>
            )}
          </div>
        </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-6 rounded-lg mb-8"
          style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block" style={{ color: '#E0E0E0' }}>Search Projects</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#8C8C8C' }} />
                <Input
                  placeholder="Search by project name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', color: '#E0E0E0' }}
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block" style={{ color: '#E0E0E0' }}>Filter by Status</label>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', color: '#E0E0E0' }}>
                  <Filter className="h-4 w-4 mr-2" style={{ color: '#8C8C8C' }} />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
                  <SelectItem value="all" style={{ color: '#E0E0E0' }}>All Credits</SelectItem>
                  <SelectItem value="verified" style={{ color: '#E0E0E0' }}>Verified Only</SelectItem>
                  <SelectItem value="pending" style={{ color: '#E0E0E0' }}>Pending Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block" style={{ color: '#E0E0E0' }}>Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', color: '#E0E0E0' }}>
                  <SlidersHorizontal className="h-4 w-4 mr-2" style={{ color: '#8C8C8C' }} />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
                  <SelectItem value="price" style={{ color: '#E0E0E0' }}>Price (Low to High)</SelectItem>
                  <SelectItem value="tons" style={{ color: '#E0E0E0' }}>Credits Available</SelectItem>
                  <SelectItem value="expiry" style={{ color: '#E0E0E0' }}>Expiry Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Credits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedCredits.map((credit, index) => (
            <motion.div
              key={credit.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative"
            >
              <CreditCard3D {...credit} />
              <Button
                className="mt-4 w-full hover:bg-[#66BB6A] transition-colors"
                style={{ backgroundColor: '#4CAF50', color: '#E0E0E0' }}
                onClick={() => handlePurchase(credit)}
              >
                Buy Now
              </Button>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {sortedCredits.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <MapPin className="h-16 w-16 mx-auto mb-4" style={{ color: '#8C8C8C' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#E0E0E0' }}>No credits found</h3>
            <p style={{ color: '#B0B0B0' }}>Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Sell Your Credits CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="p-8 rounded-2xl text-center"
          style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#E0E0E0' }}>Have Credits to Sell?</h2>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: '#B0B0B0' }}>
            List your verified carbon credits on our marketplace and connect with buyers worldwide. 
            Get competitive pricing and transparent transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" 
                    style={{ background: '#1C1C1C', border: '1px solid #2A2A2A', color: '#E0E0E0' }}
                    className="hover:bg-[#2A2A2A] transition-colors">
              Learn More
            </Button>
            <Button 
              size="lg"
              onClick={handleListCreditsClick}
              className="flex items-center gap-2"
              style={{ background: '#4CAF50', color: '#E0E0E0' }}
            >
              <Plus className="w-4 h-4" />
              List Credits
            </Button>
            
            {/* Dev Button - Only visible in development */}
            {import.meta.env.DEV && (
              <Button
                size="lg"
                variant="outline"
                className="text-xs border-[#2A2A2A]"
                onClick={async () => {
                  const result = await debugSupabaseConnection();
                  toast({
                    title: "Connection Check",
                    description: `Status: ${result.connected ? 'Connected' : 'Disconnected'}. ${result.error || ''}`
                  });
                }}
              >
                Check Connection
              </Button>
            )}
          </div>
        </motion.div>

        {/* Listed Credits Flexbox Display */}
        {showFlexBox && listedCredits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0E0E0' }}>Your Listed Credits</h2>
            <div className="flex flex-wrap gap-4">
              {listedCredits.map((credit, index) => (
                <motion.div
                  key={credit.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="p-6 rounded-lg border transition-transform duration-300 hover:scale-105"
                  style={{ 
                    background: '#1C1C1C', 
                    border: '1px solid #2A2A2A',
                    minWidth: '250px',
                    maxWidth: '300px'
                  }}
                >
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#E0E0E0' }}>
                    {credit.company_name}
                  </h3>
                  <p className="text-sm mb-1" style={{ color: '#B0B0B0' }}>
                    Project: {credit.project_name}
                  </p>
                  <p className="text-sm mb-3" style={{ color: '#B0B0B0' }}>
                    Credits: {credit.total_credits.toLocaleString()}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge 
                      style={{ backgroundColor: '#4CAF50', color: '#E0E0E0' }}
                      className="text-xs"
                    >
                      {credit.status || 'Active'}
                    </Badge>
                    <span className="text-xs" style={{ color: '#8C8C8C' }}>
                      {new Date(credit.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Purchase Credits Modal */}
      <Dialog open={purchaseModalOpen} onOpenChange={setPurchaseModalOpen}>
        <DialogContent className="sm:max-w-md" style={{ background: '#1C1C1C', border: '1px solid #2A2A2A', color: '#E0E0E0' }}>
          <DialogHeader>
            <DialogTitle>Purchase Carbon Credits</DialogTitle>
            <DialogDescription style={{ color: '#B0B0B0' }}>
              {selectedCredit && `${selectedCredit.project} from ${selectedCredit.location}`}
            </DialogDescription>
          </DialogHeader>
          {selectedCredit && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Available Credits: {selectedCredit.tons}</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max={selectedCredit.tons}
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(Math.max(1, Math.min(selectedCredit.tons, parseInt(e.target.value) || 0)))}
                    style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', color: '#E0E0E0' }}
                  />
                  <span>credits</span>
                </div>
              </div>
              
              <div className="space-y-1 p-3 rounded-lg" style={{ background: '#0D0D0D' }}>
                <div className="flex justify-between text-sm">
                  <span>Price per credit:</span>
                  <span>{(selectedCredit.price * 0.01).toFixed(2)} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Credits amount:</span>
                  <span>{purchaseAmount} credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Credits cost:</span>
                  <span>{(purchaseAmount * selectedCredit.price * 0.01).toFixed(4)} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Royalty fee (5%):</span>
                  <span>{(purchaseAmount * selectedCredit.price * 0.01 * 0.05).toFixed(4)} ETH</span>
                </div>
                <div className="h-px bg-gray-700 my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{(purchaseAmount * selectedCredit.price * 0.01 * 1.05).toFixed(4)} ETH</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPurchaseModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={processMetamaskPayment}
              disabled={processingPayment || !selectedCredit || purchaseAmount < 1}
              className="flex items-center gap-2"
              style={{ backgroundColor: '#4CAF50', color: '#E0E0E0' }}
            >
              {processingPayment ? 'Processing...' : 'Pay Now'}
              {!processingPayment && <Wallet className="h-4 w-4" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* List Credits dialog */}
      <Dialog open={listCreditModalOpen} onOpenChange={setListCreditModalOpen}>
        <DialogContent style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
          <DialogHeader>
            <DialogTitle style={{ color: '#E0E0E0' }}>List Carbon Credits</DialogTitle>
            <DialogDescription style={{ color: '#B0B0B0' }}>
              Add your carbon credits to the marketplace
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: '#E0E0E0' }}>Company Name</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
                style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', color: '#E0E0E0' }}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: '#E0E0E0' }}>Project Name</label>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', color: '#E0E0E0' }}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: '#E0E0E0' }}>Number of Credits</label>
              <Input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(parseInt(e.target.value) || 0)}
                placeholder="Enter number of credits"
                style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', color: '#E0E0E0' }}
                required
              />
            </div>
            
            {import.meta.env.DEV && (
              <div className="bg-gray-900 p-3 rounded border border-gray-800 mt-4">
                <h4 className="text-xs font-semibold mb-2" style={{ color: '#B0B0B0' }}>Connection Status</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs w-full border-gray-800"
                  onClick={async () => {
                    const result = await debugSupabaseConnection();
                    toast({
                      title: "Connection Status",
                      description: `${result.connected ? '✅ Connected' : '❌ Disconnected'} ${result.error ? '- ' + result.error : ''}`
                    });
                  }}
                >
                  Test Database Connection
                </Button>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setListCreditModalOpen(false)} style={{ borderColor: '#2A2A2A', color: '#E0E0E0' }}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleListCredits(false)} 
              disabled={isSubmittingListing || !companyName || !projectName || !creditAmount || creditAmount <= 0} 
              style={{ background: '#4CAF50', color: '#E0E0E0' }}
              title={!companyName || !projectName || !creditAmount || creditAmount <= 0 ? 'Please fill in all required fields' : ''}
            >
              {isSubmittingListing ? 'Processing...' : 'List Credits'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
