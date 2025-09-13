import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      if (!supabase || !supabase.auth) {
        setError("Authentication system unavailable. Please try again later.");
        return;
      }

      // Sign up with Supabase Auth
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Get the user's ID after signup
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found after signup");

      // Store additional user data in the users table
      const { error: insertError } = await supabase
        .from("users")
        .insert([{ 
          email,
          auth_id: user.id
        }]);

      if (insertError) throw insertError;

      // Show success toast
      toast({
        title: "Account created successfully!",
        description: "Please check your email for verification link.",
        duration: 5000,
      });

      // Redirect to sign in page
      navigate("/signin");
      
    } catch (err: any) {
      setError(err.message || "An error occurred during sign up");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Create your CarbonIQ Account
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
            >
              Create Account
            </Button>
            <div className="text-center mt-4">
              <Link 
                to="/signin" 
                className="text-green-500 hover:text-green-400 text-sm"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
