import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Download, BarChart3, PieChart, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Plans() {
  const plans = [
    {
      name: "CIQ BLACK",
      description: "For individuals and small teams",
      price: "Free",
      features: [
        "Simple carbon calculator",
        "View current emissions in app",
        "Basic carbon tracking",
        "Standard dashboard"
      ],
      color: "border-gray-600",
      bgGradient: "from-gray-900 to-gray-800",
      icon: BarChart3
    },
    {
      name: "CIQ GOLD",
      description: "For SMEs and mid-sized projects",
      price: "₹599/month",
      features: [
        "Everything in CIQ BLACK",
        "Downloadable PDF reports",
        "Historic data analysis",
        "Suitable for internal reporting"
      ],
      color: "border-yellow-500",
      bgGradient: "from-yellow-900 to-yellow-800",
      icon: Download,
      recommended: true
    },
    {
      name: "CIQ PLATINUM",
      description: "For corporates with net-zero commitment",
      price: "₹1,499/month",
      features: [
        "Everything in CIQ GOLD",
        "AI-driven peer benchmarking",
        "Custom dashboards",
        "Advanced analytics",
        "Priority support"
      ],
      color: "border-gray-300",
      bgGradient: "from-gray-700 to-gray-600",
      icon: PieChart
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#0D0D0D' }}>
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Select the right CarbonIQ plan for your needs and start your journey towards carbon neutrality today.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
              className="flex"
            >
              <Card className={`flex flex-col h-full border-2 ${plan.color} bg-gradient-to-b ${plan.bgGradient} relative overflow-hidden`}>
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                    RECOMMENDED
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <CardDescription className="text-sm mt-2">{plan.description}</CardDescription>
                    </div>
                    <div className={`p-3 rounded-full ${plan.color === 'border-yellow-500' ? 'bg-yellow-700' : 'bg-gray-700'}`}>
                      <plan.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <p className="text-4xl font-bold">{plan.price}</p>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={plan.name === "CIQ BLACK" ? "outline" : "eco"} 
                    className="w-full" 
                    size="lg"
                  >
                    {plan.name === "CIQ BLACK" ? "Get Started" : "Subscribe Now"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Compare Plan Features</h2>
            <p className="text-gray-400 mt-2">See which plan is right for your organization</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-gray-800">Feature</th>
                  <th className="text-center p-4 border-b border-gray-800">CIQ BLACK</th>
                  <th className="text-center p-4 border-b border-gray-800">CIQ GOLD</th>
                  <th className="text-center p-4 border-b border-gray-800">CIQ PLATINUM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-gray-800">Carbon Calculator</td>
                  <td className="text-center p-4 border-b border-gray-800">Basic</td>
                  <td className="text-center p-4 border-b border-gray-800">Advanced</td>
                  <td className="text-center p-4 border-b border-gray-800">Enterprise</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-800">Data Visualization</td>
                  <td className="text-center p-4 border-b border-gray-800">
                    <Check className="h-4 w-4 inline text-primary" />
                  </td>
                  <td className="text-center p-4 border-b border-gray-800">
                    <Check className="h-4 w-4 inline text-primary" />
                  </td>
                  <td className="text-center p-4 border-b border-gray-800">
                    <Check className="h-4 w-4 inline text-primary" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-800">PDF Reports</td>
                  <td className="text-center p-4 border-b border-gray-800">—</td>
                  <td className="text-center p-4 border-b border-gray-800">
                    <Check className="h-4 w-4 inline text-primary" />
                  </td>
                  <td className="text-center p-4 border-b border-gray-800">
                    <Check className="h-4 w-4 inline text-primary" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-800">Historical Data</td>
                  <td className="text-center p-4 border-b border-gray-800">30 days</td>
                  <td className="text-center p-4 border-b border-gray-800">1 year</td>
                  <td className="text-center p-4 border-b border-gray-800">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-800">AI Benchmarking</td>
                  <td className="text-center p-4 border-b border-gray-800">—</td>
                  <td className="text-center p-4 border-b border-gray-800">—</td>
                  <td className="text-center p-4 border-b border-gray-800">
                    <Check className="h-4 w-4 inline text-primary" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-800">Custom Dashboards</td>
                  <td className="text-center p-4 border-b border-gray-800">—</td>
                  <td className="text-center p-4 border-b border-gray-800">—</td>
                  <td className="text-center p-4 border-b border-gray-800">
                    <Check className="h-4 w-4 inline text-primary" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade my plan later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Yes, you can easily upgrade to a higher tier plan at any time. Your billing will be prorated for the remainder of the billing cycle.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">How is billing handled?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">All plans are billed monthly. You can cancel at any time before your next billing cycle.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer team accounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Yes, our GOLD and PLATINUM plans include team functionality with different levels of user management.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">The CIQ BLACK plan is free forever. For premium plans, contact us for a 14-day free trial.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-primary/30 to-primary-glow/30 border-primary/50">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                Join thousands of organizations already using CarbonIQ to measure, manage, and minimize their carbon footprint.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="eco" size="lg">
                  Get Started Now
                </Button>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}