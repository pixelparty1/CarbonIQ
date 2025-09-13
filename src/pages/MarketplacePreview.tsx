import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Globe, 
  Shield,
  ArrowRight,
  Star,
  Users,
  Calendar,
  MapPin,
  Leaf,
  BarChart3,
  CheckCircle,
  Clock,
  Zap,
  Building2
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MarketplacePreview() {
  const features = [
    {
      icon: DollarSign,
      title: "Fair Market Pricing",
      description: "Real-time pricing based on verified carbon credit markets and transparent algorithms.",
      status: "Live"
    },
    {
      icon: Shield,
      title: "Verified Projects Only",
      description: "All credits backed by certified projects meeting international standards.",
      status: "Live"
    },
    {
      icon: Globe,
      title: "Global Registry Network",
      description: "Connected to major carbon registries worldwide for seamless trading.",
      status: "Coming Soon"
    },
    {
      icon: Users,
      title: "Peer-to-Peer Trading",
      description: "Direct trading between SMEs without intermediary fees or complex processes.",
      status: "Q2 2024"
    }
  ];

  const projectTypes = [
    {
      title: "Renewable Energy",
      description: "Solar, wind, and hydroelectric projects generating clean energy credits",
      credits: "2.5M tons",
      price: "$12-18",
      trend: "+15%",
      icon: Zap
    },
    {
      title: "Forest Conservation",
      description: "Protected forests and reforestation projects preserving carbon sinks",
      credits: "1.8M tons",
      price: "$8-14",
      trend: "+22%",
      icon: Leaf
    },
    {
      title: "Technology Removal",
      description: "Direct air capture and other technological carbon removal solutions",
      credits: "450k tons",
      price: "$85-120",
      trend: "+8%",
      icon: BarChart3
    }
  ];

  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Credit Discovery",
      description: "Browse and discover verified carbon credits",
      status: "Live",
      date: "Q4 2023"
    },
    {
      phase: "Phase 2",
      title: "Direct Purchase",
      description: "Buy credits directly through the platform",
      status: "Live",
      date: "Q1 2024"
    },
    {
      phase: "Phase 3",
      title: "SME Trading",
      description: "List and trade your own generated credits",
      status: "Coming Soon",
      date: "Q2 2024"
    },
    {
      phase: "Phase 4",
      title: "Global Exchange",
      description: "Full marketplace with real-time trading",
      status: "Planned",
      date: "Q3 2024"
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
              <TrendingUp className="h-4 w-4" />
              Marketplace Preview
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Carbon Credit Marketplace
              </span>
              <br />
              Coming Soon
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The first marketplace designed specifically for SMEs to discover, purchase, 
              and trade verified carbon credits with complete transparency.
            </p>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$24B</div>
                <div className="text-sm text-muted-foreground">Global Carbon Market</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">Verified Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">2024</div>
                <div className="text-sm text-muted-foreground">Launch Target</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Features */}
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
              Marketplace Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building the most transparent and accessible carbon credit marketplace for SMEs.
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
              >
                <Card className="glass-card-hover p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <Badge 
                      variant={feature.status === 'Live' ? 'default' : 'secondary'}
                      className={feature.status === 'Live' ? 'bg-success' : ''}
                    >
                      {feature.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
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
              Available Project Types
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover various types of verified carbon credit projects available on our marketplace.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projectTypes.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
              >
                <Card className="glass-card-hover p-8 h-full">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                    <project.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Available Credits</span>
                      <span className="font-medium">{project.credits}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price Range</span>
                      <span className="font-medium">{project.price}/ton</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">30-day Trend</span>
                      <span className="font-medium text-success">{project.trend}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
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
              Development Roadmap
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track our progress as we build the most comprehensive carbon marketplace for SMEs.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-primary hidden lg:block"></div>
            
            <div className="space-y-8">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-primary rounded-full border-4 border-background hidden lg:block"></div>
                  
                  <Card className="glass-card-hover p-6 lg:ml-16">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{item.phase}</Badge>
                          <Badge 
                            variant={item.status === 'Live' ? 'default' : 'secondary'}
                            className={item.status === 'Live' ? 'bg-success' : ''}
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {item.date}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Will Work */}
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
              How The Marketplace Will Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and designed specifically for SME needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary-foreground">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Browse Verified Projects</h3>
                    <p className="text-muted-foreground">
                      Discover carbon credit projects that match your values and budget. 
                      All projects are verified and transparently documented.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary-foreground">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Purchase or List Credits</h3>
                    <p className="text-muted-foreground">
                      Buy credits instantly or list your own generated credits for sale. 
                      Fair pricing with no hidden fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary-foreground">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Automatic Compliance</h3>
                    <p className="text-muted-foreground">
                      All transactions are automatically documented for compliance reporting. 
                      Certificates and receipts generated instantly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-semibold">Marketplace Preview</div>
                      <div className="text-sm text-muted-foreground">Your future carbon trading hub</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Leaf className="h-5 w-5 text-success" />
                        <div>
                          <div className="text-sm font-medium">Forest Protection Project</div>
                          <div className="text-xs text-muted-foreground">Brazil, 1000 tons available</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">$12/ton</div>
                        <div className="text-xs text-success">↑ 5%</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Solar Energy Project</div>
                          <div className="text-xs text-muted-foreground">India, 500 tons available</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">$15/ton</div>
                        <div className="text-xs text-success">↑ 8%</div>
                      </div>
                    </div>
                  </div>

                  <Button variant="eco" size="sm" className="w-full" disabled>
                    <Clock className="h-4 w-4 mr-2" />
                    Coming Q2 2024
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-2xl max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get Early Access
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be among the first SMEs to access our marketplace when it launches. 
              Early adopters get exclusive benefits and pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="eco" size="xl" className="group">
                  Join Waitlist
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="glass" size="xl">
                Learn More
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Early access includes beta testing • Priority onboarding • Special launch pricing
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}