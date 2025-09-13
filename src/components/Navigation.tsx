import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, ShoppingCart, Trophy, User, Upload, Wallet, BarChart3, FileText, Target, Award, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/hooks/use-wallet";
import { useState, useMemo } from "react";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export function Navigation({ userCredits: initialCredits = 120 }) {
  const [userCredits, setUserCredits] = useState(initialCredits);
  const [user, setUser] = useState(null);
  
  // Function to update credits in Supabase and local state
  const updateUserCredits = async (newCredits) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Update the user's credits in the database
        const { error } = await supabase
          .from('users')
          .update({ credits: newCredits })
          .eq('id', user.id);
          
        if (error) {
          console.error("Error updating credits in database:", error);
        } else {
          console.log("Credits successfully updated in database:", newCredits);
        }
      }
      
      // Update local state regardless of database update success
      setUserCredits(newCredits);
    } catch (error) {
      console.error("Error updating user credits:", error);
    }
  };
  const location = useLocation();
  const { account, connectWallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    fetchUser();
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } finally {
      setIsConnecting(false);
    }
  };

  const currentPath = location.pathname;
  const isDashboard = currentPath === '/dashboard';
  const isMarketplace = currentPath === '/marketplace';
  const isUploadBill = currentPath === '/upload-bill';
  const isProtectedRoute = isDashboard || isMarketplace || isUploadBill;

  // Transactions for notifications
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      projectName: 'Solar Power Project',
      credits: 100,
      date: '2025-09-10',
      type: 'buy' as const,
    },
    {
      id: '2',
      projectName: 'Wind Energy Credits',
      credits: 50,
      date: '2025-09-09',
      type: 'sell' as const,
    },
  ]);
  
  // Add a new transaction receipt to the notifications
  const addTransactionReceipt = (transaction) => {
    setTransactions(prev => [
      {
        id: `tr-${Date.now()}`,
        projectName: transaction.project_name || transaction.method || 'Carbon Offset',
        credits: transaction.credits_amount || 1,
        date: new Date().toISOString().split('T')[0],
        type: 'buy',
        ...transaction // Include all original transaction data
      },
      ...prev
    ]);
  };

  const navItems = useMemo(() => {
    if (isProtectedRoute) {
      return [
        { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
        { path: "/marketplace", label: "Marketplace", icon: ShoppingCart },
        { path: "/upload-bill", label: "Upload Bill", icon: Upload },
        { path: "/badges", label: "Badges", icon: Award },
      ];
    } else {
      return [
        { path: "/how-it-works", label: "How It Works", icon: BarChart3 },
        { path: "/features", label: "Features", icon: FileText },
        { path: "/for-companies", label: "For SMEs", icon: Trophy },
        { path: "/plans", label: "Plans", icon: CreditCard },
      ];
    }
  }, [isProtectedRoute]);  return (
    <nav className="glass-card px-6 py-4 mb-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col items-start">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white ml-2">
              CarbonIQ
            </span>
          </div>
          <span className="text-sm font-medium text-gray-400 ml-10">Measure. Manage. Minimize.</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Button
                key={path}
                variant={isActive ? "eco" : "ghost"}
                size="sm"
                asChild
                className={isActive ? "shadow-eco" : ""}
              >
                <Link to={path} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              </Button>
            );
          })}
          
          {/* Offset Button - Hidden on Landing Page */}
          {currentPath !== "/" && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={location.pathname === "/offset-page" ? "shadow-eco" : ""}
            >
              <Link to="/offset-page" className="flex items-center space-x-2">
                <Leaf className="h-4 w-4" />
                <span>Offset</span>
              </Link>
            </Button>
          )}

          {!isProtectedRoute && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={location.pathname === "/sdg" ? "shadow-eco" : ""}
            >
              <Link to="/sdg" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>SDGs</span>
              </Link>
            </Button>
          )}

          {isProtectedRoute && (
            <>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-secondary/20 px-3 py-1 rounded-full">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{userCredits} Credits</span>
              </div>
            
              <NotificationsDropdown transactions={transactions} />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex flex-col items-start gap-1">
                    <div className="font-medium">User Profile</div>
                    {user?.email && (
                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    )}
                    {account && (
                      <div className="text-xs text-gray-400">
                        {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                      </div>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center space-x-2"
                    onClick={handleConnectWallet}
                    disabled={isConnecting}
                  >
                    <Wallet className="h-4 w-4" />
                    <span>{account ? 'Wallet Connected' : (isConnecting ? 'Connecting...' : 'Connect Wallet')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}