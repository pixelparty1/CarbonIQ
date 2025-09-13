import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Wallet, Leaf, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Offset() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const credits = parseInt(searchParams.get('credits') || '0');
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [offsetComplete, setOffsetComplete] = useState(false);

  const offsetMethods = [
    {
      id: "forest",
      name: "Forest Conservation",
      price: 12,
      description: "Support forest conservation projects that prevent deforestation",
      impact: "Protects existing forests and biodiversity",
      icon: "🌳"
    },
    {
      id: "renewable",
      name: "Renewable Energy",
      price: 15,
      description: "Fund solar and wind energy projects in developing countries",
      impact: "Replaces fossil fuel energy with clean alternatives",
      icon: "⚡"
    },
    {
      id: "reforestation",
      name: "Tree Planting",
      price: 10,
      description: "Plant new trees in deforested areas",
      impact: "Actively removes CO2 from the atmosphere",
      icon: "🌱"
    },
    {
      id: "methane",
      name: "Methane Capture",
      price: 18,
      description: "Capture methane emissions from landfills and farms",
      impact: "Prevents potent greenhouse gas emissions",
      icon: "♻️"
    }
  ];

  const handleOffsetNow = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setOffsetComplete(true);
    }, 3000);
  };

  const selectedProject = offsetMethods.find(method => method.id === selectedMethod);
  const totalCost = credits * (selectedProject?.price || 0);

  if (offsetComplete) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Offset Complete!</h1>
              <p className="text-zinc-400 text-lg">
                Congratulations! You've successfully offset {credits} tons of CO2 emissions.
              </p>
            </div>

            <Card className="p-8 bg-zinc-900 border-zinc-800 mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Project:</span>
                  <span className="text-white">{selectedProject?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Credits Offset:</span>
                  <span className="text-white">{credits} tons CO2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Cost:</span>
                  <span className="text-white">${totalCost}</span>
                </div>
                <Separator className="bg-zinc-800" />
                <div className="flex justify-between items-center font-bold">
                  <span className="text-green-400">Environmental Impact:</span>
                  <span className="text-green-400">-{credits} tons CO2</span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/marketplace')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Browse More Credits
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                View Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Offset Your Carbon Footprint</h1>
            <p className="text-zinc-400">Choose how to offset {credits} tons of CO2 emissions</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Offset Methods */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h2 className="text-xl font-semibold text-white mb-4">Choose Offset Method</h2>
              <div className="grid gap-4">
                {offsetMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-green-500 bg-green-950/20'
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-white">{method.name}</h3>
                          <span className="text-green-400 font-bold">${method.price}/ton</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-2">{method.description}</p>
                        <p className="text-green-300 text-xs">{method.impact}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Summary & Payment */}
          <div className="space-y-6">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Offset Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-zinc-400">CO2 to Offset:</span>
                  <span className="text-white">{credits} tons</span>
                </div>
                {selectedProject && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Method:</span>
                      <span className="text-white">{selectedProject.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Price per ton:</span>
                      <span className="text-white">${selectedProject.price}</span>
                    </div>
                    <Separator className="bg-zinc-700" />
                    <div className="flex justify-between font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-green-400">${totalCost}</span>
                    </div>
                  </>
                )}
              </div>

              {selectedMethod && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Button
                    onClick={handleOffsetNow}
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Wallet className="h-4 w-4 mr-2" />
                        Offset Now - ${totalCost}
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-xs text-zinc-500">
                      Secure payment powered by blockchain technology
                    </p>
                  </div>
                </motion.div>
              )}

              {!selectedMethod && (
                <div className="text-center py-4">
                  <Leaf className="h-12 w-12 text-zinc-600 mx-auto mb-2" />
                  <p className="text-zinc-500 text-sm">Select an offset method to continue</p>
                </div>
              )}
            </Card>

            {/* Impact Card */}
            <Card className="p-6 bg-gradient-to-br from-green-950/50 to-green-900/20 border-green-800/50">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className="font-semibold text-green-300 mb-2">Your Impact</h4>
                <p className="text-green-100 text-sm">
                  By offsetting {credits} tons of CO2, you're equivalent to removing a car from the road for {Math.round(credits * 2500)} miles.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}