import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  BarChart3, 
  FileCheck, 
  Coins, 
  Target, 
  Shield, 
  Zap, 
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Features() {
  const mainFeatures = [
    {
      icon: Bot,
      title: "Automated Data Extraction",
      description: "AI-powered OCR and data processing extracts carbon data from any document format automatically.",
      benefits: [
        "99.7% accuracy rate",
        "Supports 50+ file formats",
        "Processes in real-time",
        "No manual data entry required"
      ],
      badge: "AI-Powered",
      color: "primary"
    },
    {
      icon: BarChart3,
      title: "Carbon Footprint Dashboard",
      description: "Real-time visualization of your complete carbon footprint with interactive charts and insights.",
      benefits: [
        "Scope 1, 2, and 3 emissions",
        "Real-time updates",
        "Interactive visualizations",
        "Trend analysis"
      ],
      badge: "Real-time",
      color: "secondary"
    },
    {
      icon: FileCheck,
      title: "Compliance-Ready Reports",
      description: "Generate audit-ready reports that meet all major regulatory standards and frameworks.",
      benefits: [
        "GHG Protocol compliant",
        "ISO 14064 certified",
        "TCFD aligned",
        "One-click generation"
      ],
      badge: "Certified",
      color: "success"
    },
    {
      icon: Coins,
      title: "Carbon Credit Conversion",
      description: "Automatically identify and calculate potential carbon credits from your sustainability initiatives.",
      benefits: [
        "Verified credit calculations",
        "Market price integration",
        "ROI projections",
        "Registry connections"
      ],
      badge: "Revenue",
      color: "warning"
    },
    {
      icon: Target,
      title: "SDG Mapping",
      description: "Map your carbon actions to UN Sustainable Development Goals for comprehensive impact reporting.",
      benefits: [
        "17 SDG alignments",
        "Impact quantification",
        "Progress tracking",
        "Stakeholder reports"
      ],
      badge: "Impact",
      color: "primary"
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols protect your sensitive carbon data."
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "Connect with existing ERP, accounting, and energy management systems seamlessly."
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous monitoring and alerts for emission spikes and compliance deadlines."
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Support for international carbon accounting standards and regional regulations."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-sm font-medium text-primary-foreground mb-6">
              <Sparkles className="h-4 w-4" />
              Complete Carbon Management Suite
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Powerful Features
              </span>
              <br />
              Built for SMEs
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Everything you need to track, reduce, and monetize your carbon footprint. 
              Enterprise-grade features at SME-friendly prices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary" className="badge-shine">
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {feature.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="ghost" size="sm" className="group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 rounded-2xl"
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                      <feature.icon className="h-32 w-32 text-primary relative z-10" />
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute inset-0 bg-gradient-primary rounded-xl"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with the security, reliability, and scalability that modern businesses demand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card-hover p-6 h-full">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how we compare to traditional carbon management solutions.
            </p>
          </motion.div>

          <div className="glass-card p-8 rounded-2xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-semibold mb-4 text-destructive">Manual Tracking</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Weeks to months</li>
                  <li>Error-prone</li>
                  <li>High consulting costs</li>
                  <li>Limited accuracy</li>
                </ul>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-primary rounded-xl opacity-20"></div>
                <div className="relative">
                  <h3 className="font-semibold mb-4 text-primary">Smart Carbon Assistant</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Minutes to hours
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      99.7% accuracy
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Affordable pricing
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Real-time insights
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-muted-foreground">Enterprise Tools</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Complex setup</li>
                  <li>High upfront costs</li>
                  <li>Requires specialists</li>
                  <li>Overkill for SMEs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Experience All Features
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Try our complete platform with your real data. No commitments, no setup fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="eco" size="xl" className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="glass" size="xl">
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}