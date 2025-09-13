import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Globe3D } from "@/components/Globe3D";
import { Podium3D } from "@/components/Podium3D";
import { ArrowRight, Leaf, BarChart3, DollarSign, Award, Trophy, TrendingDown, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-carbon.jpg";

export default function Landing() {
  const features = [
    {
      icon: BarChart3,
      title: "Track Emissions",
      description: "Monitor your carbon footprint with AI-powered analytics and real-time data visualization."
    },
    {
      icon: DollarSign,
      title: "Trade Credits",
      description: "Buy and sell carbon credits in our transparent marketplace with verified projects."
    },
    {
      icon: Award,
      title: "Earn Badges",
      description: "Get CSR certifications and compliance reports for your sustainability achievements."
    },
    {
      icon: Leaf,
      title: "Reduce Impact",
      description: "Receive AI-powered suggestions to reduce your environmental footprint effectively."
    }
  ];

  // Champions of Sustainability section removed as requested

  return (
    <div className="min-h-screen" style={{ background: '#0D0D0D' }}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#1C1C1C', opacity: 0.9 }} />
        <div className="absolute inset-0 backdrop-blur-sm" />
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block"
                >
                  <span className="px-4 py-2 rounded-full text-sm font-medium" 
                      style={{ background: '#1C1C1C', color: '#E0E0E0', border: '1px solid #2A2A2A' }}>
                    🌍 The Future of Carbon Management
                  </span>
                </motion.div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span style={{ color: '#4CAF50' }}>
                    Track. Reduce. Offset.
                  </span>
                  <br />
                  <span style={{ color: '#E0E0E0' }}>Earn Carbon Credits.</span>
                </h1>
                
                <p className="text-xl leading-relaxed" style={{ color: '#B0B0B0' }}>
                  Empower your organization with AI-driven carbon tracking, smart offsetting solutions, 
                  and a transparent marketplace for verified carbon credits.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button className="group shadow-lg hover:shadow-xl transition-all duration-300"
                           style={{ 
                             backgroundColor: '#4CAF50',
                             color: '#E0E0E0',
                             // Removed inline ':hover' style. Use CSS or Tailwind for hover effects.
                           }}>
                      <span className="relative z-10 font-semibold">Start Tracking Now</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="p-4 rounded-xl text-center" 
                     style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
                  <div className="text-3xl font-bold" style={{ color: '#4CAF50' }}>500+</div>
                  <div className="text-sm mt-1" style={{ color: '#8C8C8C' }}>Companies</div>
                </div>
                <div className="p-4 rounded-xl text-center"
                     style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
                  <div className="text-3xl font-bold" style={{ color: '#4CAF50' }}>1M+</div>
                  <div className="text-sm mt-1" style={{ color: '#8C8C8C' }}>Tons CO₂ Tracked</div>
                </div>
                <div className="p-4 rounded-xl text-center"
                     style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
                  <div className="text-3xl font-bold" style={{ color: '#4CAF50' }}>95%</div>
                  <div className="text-sm mt-1" style={{ color: '#8C8C8C' }}>Compliance Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative h-full"
            >
              <div className="p-4 lg:p-8 rounded-2xl overflow-hidden"
                   style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
                <div className="relative">
                  <Globe3D />
                  {/* Gradient overlay at the bottom for better blending */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1C1C1C] to-transparent pointer-events-none" />
                </div>
              </div>
              
              {/* Floating CO2 Data */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-4 rounded-xl shadow-lg"
                style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}
              >
                <div className="text-xs font-medium mb-1" style={{ color: '#8C8C8C' }}>Live CO₂ Data</div>
                <div className="text-xl font-bold" style={{ color: '#4CAF50' }}>412 PPM</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#E0E0E0' }}>
              Complete Carbon Management Platform
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#B0B0B0' }}>
              From tracking emissions to earning credits, manage your entire carbon footprint in one intelligent platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl text-center group transition-transform duration-300 hover:translate-y-[-4px]"
                style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)' }}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#E0E0E0' }}>{feature.title}</h3>
                <p className="text-sm" style={{ color: '#B0B0B0' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#1C1C1C', opacity: 0.9 }} />
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* About Us */}
            <div className="p-8 rounded-xl" style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#E0E0E0' }}>About Us</h3>
              <p className="mb-4" style={{ color: '#B0B0B0' }}>
                We're pioneering the future of carbon management through innovative AI-driven solutions. Our platform helps businesses track, reduce, and offset their carbon footprint effectively.
              </p>
              <Button variant="ghost" size="sm" 
                      className="hover:text-[#E0E0E0] transition-colors"
                      style={{ color: '#8C8C8C' }}>
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Companies We Helped */}
            <div className="p-8 rounded-xl" style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#E0E0E0' }}>Success Stories</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">TechCorp Global</p>
                    <p className="text-gray-400">45% Carbon Reduction</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">EcoSolutions Ltd</p>
                    <p className="text-gray-400">60% Energy Savings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Get in Touch */}
            <div className="glass-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-400 mb-6">
                Ready to transform your carbon strategy? Our experts are here to help you achieve your sustainability goals.
              </p>
              <div className="space-y-4">
                <Button variant="eco" size="lg" className="w-full">
                  Schedule a Demo
                </Button>
                <Button variant="ghost" size="lg" className="w-full">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Carbon Strategy?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of organizations already using Smart Carbon Assistant to achieve their sustainability goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="eco" size="xl">
                Get Started Free
              </Button>
              <Button variant="glass" size="xl">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}