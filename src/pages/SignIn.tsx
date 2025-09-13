import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase, checkSupabaseAuth } from "@/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authStatus, setAuthStatus] = useState<"checking" | "ready" | "error">("checking");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check Supabase auth setup when component mounts
  useEffect(() => {
    async function checkAuth() {
      try {
        const result = await checkSupabaseAuth();
        if (result.success) {
          console.log('Supabase authentication is properly configured');
          setAuthStatus("ready");
        } else {
          console.error('Supabase authentication configuration issue:', result.error);
          setAuthStatus("error");
          setError(`Authentication system issue: ${result.error}. Please try again later.`);
        }
      } catch (err) {
        console.error('Error checking authentication setup:', err);
        setAuthStatus("error");
      }
    }
    
    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      console.log('Starting sign-in process');
      
      if (!supabase || !supabase.auth) {
        console.error('Supabase auth client not available');
        setError("Authentication system unavailable. Please try again later.");
        return;
      }
      
      // Debug check for Supabase API key
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyYm16cXFxb2trcGlyY3h3d2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODM4MDMsImV4cCI6MjA3MzA1OTgwM30.C3KjyEx9novczGUYRy3fEkLlIj61L1EB072LR9JRTMs";
      console.log('API Key available:', !!supabaseKey);

      console.log('Attempting to sign in with:', email);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign-in error:', signInError);
        
        if (signInError.message.includes('API key')) {
          setError("Authentication error: API key issue. Please contact support.");
          console.error('API key error detected:', signInError.message);
        } else {
          throw signInError;
        }
        return;
      }

      if (data && data.user) {
        console.log('Sign-in successful, user ID:', data.user.id);
        
        // Check if user exists in users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("auth_id", data.user.id)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
          throw userError;
        }
        
        console.log('User data retrieved successfully');

        toast({
          title: "Signed in successfully!",
          description: "Welcome back to CarbonIQ",
          duration: 3000,
        });

        // Redirect to dashboard after successful sign in
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error("Failed to sign in");
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      
      // Specific handling for common auth errors
      if (err.message?.includes('API key')) {
        setError("Authentication configuration error. Please contact support. (API Key issue)");
      } else if (err.message?.includes('Invalid login')) {
        setError("Invalid email or password. Please try again.");
      } else if (err.message?.includes('Failed to fetch')) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.message || "An error occurred during sign in");
      }
      
      // Log additional debugging information
      if (err.status) {
        console.error(`Error status: ${err.status}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Sign In to CarbonIQ
          </CardTitle>
          <p className="text-sm text-zinc-400">
            Enter your email below to create your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              disabled={authStatus !== "ready"}
            >
              {authStatus === "checking" ? "Checking Auth..." : 
               authStatus === "error" ? "Auth Error" : 
               "Sign In"}
            </Button>
            
            {import.meta.env.DEV && authStatus === "error" && (
              <Button
                type="button"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                onClick={async () => {
                  const result = await checkSupabaseAuth();
                  toast({
                    title: result.success ? "Auth Check Passed" : "Auth Check Failed",
                    description: result.success 
                      ? "Authentication system is properly configured" 
                      : `Error: ${result.error}`,
                    variant: result.success ? "default" : "destructive"
                  });
                }}
              >
                Diagnose Auth Issues
              </Button>
            )}
            <div className="text-center mt-4">
              <Link 
                to="/signup" 
                className="text-green-500 hover:text-green-400 text-sm"
              >
                Don't have an account? Create one
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
