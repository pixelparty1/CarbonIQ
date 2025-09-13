import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  DollarSign, 
  Clock, 
  Shield, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Zap,
  Target,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ForCompanies() {
  const smeAdvantages = [
    {
      icon: DollarSign,
      title: "Affordable & Transparent Pricing",
      description: "No massive upfront costs or hidden fees. Pay for what you use with clear, predictable pricing.",
      comparison: "vs. $50k+ enterprise solutions",
      benefit: "90% cost savings"
    },
    {
      icon: Clock,
      title: "Quick Setup & Implementation",
      description: "Get started in minutes, not months. No IT department or specialized consultants required.",
      comparison: "vs. 6-12 month implementations",
      benefit: "Live in 24 hours"
    },
    {
      icon: Users,
      title: "No Technical Expertise Required",
      description: "Designed for business owners and managers. Intuitive interface that anyone can use effectively.",
      comparison: "vs. complex enterprise tools",
      benefit: "Zero training needed"
    },
    {
      icon: Shield,
      title: "Compliance Without Complexity",
      description: "Meet all regulatory requirements automatically. Reports are audit-ready from day one.",
      comparison: "vs. manual compliance efforts",
      benefit: "100% compliance rate"
    }
  ];

  const trustFactors = [
    {
      icon: Award,
      title: "Verified Standards",
      description: "GHG Protocol and ISO 14064 compliant calculations ensure your data meets international standards."
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Bank-grade encryption and security protocols protect your sensitive business information."
    },
    {
      icon: CheckCircle,
      title: "Verified Registries",
      description: "Connected to major carbon credit registries for seamless credit trading and verification."
    },
    {
      icon: TrendingUp,
      title: "Proven ROI",
      description: "Average 300% ROI through carbon credit opportunities and operational efficiency gains."
    }
  ];

  const painPoints = [
    {
      problem: "High consultant fees",
      solution: "AI-powered automation",
      icon: DollarSign
    },
    {
      problem: "Complex software",
      solution: "Intuitive design",
      icon: Lightbulb
    },
    {
      problem: "Manual data entry",
      solution: "Automatic extraction",
      icon: Zap
    },
    {
      problem: "Compliance uncertainty",
      solution: "Built-in standards",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-sm font-medium text-primary-foreground">
                  <Building2 className="h-4 w-4" />
                  Built for SMEs
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Carbon Management
                  </span>
                  <br />
                  That Actually Works for SMEs
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Skip the expensive consultants and complex enterprise software. 
                  Get professional-grade carbon management designed specifically for growing businesses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button variant="eco" size="xl" className="group">
                    Try With Your Data
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="glass" size="xl">
                  See Pricing
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$99</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">24hrs</div>
                  <div className="text-sm text-muted-foreground">to go live</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">300%</div>
                  <div className="text-sm text-muted-foreground">average ROI</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="glass-card p-8 rounded-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-semibold">Your SME Dashboard</div>
                      <div className="text-sm text-muted-foreground">Real-time carbon insights</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-xl">
                      <div className="text-sm text-muted-foreground">Monthly Emissions</div>
                      <div className="text-2xl font-bold text-primary">12.5 tons</div>
                      <div className="text-xs text-success">↓ 15% from last month</div>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                      <div className="text-sm text-muted-foreground">Credits Earned</div>
                      <div className="text-2xl font-bold text-secondary">$2,340</div>
                      <div className="text-xs text-success">↑ $450 this month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="text-sm">Compliance report ready</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SME Advantages */}
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
              Why SMEs Choose Us Over Enterprise Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for the unique needs and constraints of growing businesses.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {smeAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className="glass-card-hover p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <advantage.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {advantage.benefit}
                        </Badge>
                        <h3 className="text-xl font-semibold">{advantage.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{advantage.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="text-muted-foreground">{advantage.comparison}</span>
                    </div>
                  </Card>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{advantage.benefit}</div>
                    <div className="text-muted-foreground">{advantage.comparison}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points vs Solutions */}
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
              Common SME Carbon Management Challenges
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've solved the biggest pain points that prevent SMEs from effective carbon management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.problem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card-hover p-6 h-full text-center">
                  <div className="w-12 h-12 bg-destructive/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <point.icon className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold mb-2 text-destructive">{point.problem}</h3>
                  <div className="w-8 h-px bg-gradient-to-r from-destructive to-success mx-auto my-4"></div>
                  <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <p className="text-sm text-success font-medium">{point.solution}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
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
              Trust & Data Integrity
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade security and compliance standards you can rely on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFactors.map((factor, index) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card-hover p-6 h-full text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <factor.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{factor.title}</h3>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </Card>
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
              <Star className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium">Join 500+ SMEs already tracking their carbon footprint</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Carbon Strategy?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start with a free trial. No setup fees, no long-term contracts, no technical headaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="eco" size="xl" className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="glass" size="xl">
                Talk to an Expert
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Free trial includes full access to all features • No credit card required
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}