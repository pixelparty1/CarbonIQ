import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Upload, BarChart3, FileText, ArrowRight, CheckCircle, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Bills & Connect Systems",
      description: "Simply upload your energy bills, receipts, or connect your existing accounting systems. Our AI handles the rest.",
      details: [
        "Upload PDFs, images, or Excel files",
        "Connect ERP systems automatically",
        "Secure data encryption",
        "Real-time data sync"
      ],
      time: "2 minutes"
    },
    {
      icon: BarChart3,
      title: "AI Calculates Emissions",
      description: "Our AI engine processes your data using GHG Protocol and ISO 14064 standards for accurate carbon calculations.",
      details: [
        "GHG Protocol compliant calculations",
        "ISO 14064 verified methodology",
        "Scope 1, 2, and 3 emissions",
        "Real-time processing"
      ],
      time: "Instant"
    },
    {
      icon: FileText,
      title: "Get Reports & Credits",
      description: "Receive compliance-ready reports and discover potential carbon credits you can earn from your sustainability efforts.",
      details: [
        "Compliance-ready reports",
        "Carbon credit opportunities",
        "SDG mapping and badges",
        "Automated documentation"
      ],
      time: "Immediate"
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
            <div className="inline-block px-4 py-2 bg-gradient-primary rounded-full text-sm font-medium text-primary-foreground mb-6">
              ⚡ Simple. Fast. Compliant.
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                How It Works
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your carbon management in three simple steps. From data upload to compliance reports in minutes, not months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-primary font-medium">Step {index + 1}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {step.time}
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">{step.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 rounded-2xl"
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                      <step.icon className="h-24 w-24 text-primary" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
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
              The Complete Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how your data flows through our system to deliver accurate, compliant carbon reports.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center max-w-xs"
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4 relative">
                  <step.icon className="h-10 w-10 text-primary-foreground" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold text-secondary-foreground">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-primary mt-6 hidden lg:block absolute -right-16" />
                )}
              </motion.div>
            ))}
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
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium">Ready to get started?</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Try It With Your Data
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Upload a sample bill and see how our AI calculates your carbon footprint in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="eco" size="xl" className="group">
                  Upload Sample Bill
                  <Upload className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Button variant="glass" size="xl">
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}