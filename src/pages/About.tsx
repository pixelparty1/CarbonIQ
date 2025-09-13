import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Award, 
  Globe, 
  Users, 
  CheckCircle,
  Eye,
  Lock,
  Handshake,
  Target,
  Zap,
  BookOpen,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const standards = [
    {
      icon: Award,
      title: "GHG Protocol",
      description: "The world's most widely used greenhouse gas accounting standards",
      compliance: "Fully Compliant"
    },
    {
      icon: Globe,
      title: "ISO 14064",
      description: "International standard for greenhouse gas quantification and reporting",
      compliance: "Certified"
    },
    {
      icon: Target,
      title: "TCFD",
      description: "Task Force on Climate-related Financial Disclosures framework",
      compliance: "Aligned"
    },
    {
      icon: BookOpen,
      title: "CDP",
      description: "Carbon Disclosure Project reporting standards",
      compliance: "Compatible"
    }
  ];

  const principles = [
    {
      icon: Eye,
      title: "Transparency",
      description: "Open methodology, clear calculations, and full audit trails for every carbon metric.",
      details: [
        "Open-source calculation methods",
        "Detailed audit trails",
        "Real-time data verification",
        "Third-party audits"
      ]
    },
    {
      icon: Lock,
      title: "Security",
      description: "Bank-grade encryption and security protocols protect your sensitive business data.",
      details: [
        "AES-256 encryption",
        "SOC 2 Type II compliance",
        "Regular penetration testing",
        "GDPR compliant"
      ]
    },
    {
      icon: Handshake,
      title: "Partnerships",
      description: "Working with verified registries and trusted carbon market partners worldwide.",
      details: [
        "Verified Carbon Standard (VCS)",
        "Gold Standard partnerships",
        "Regional registry connections",
        "Accredited verification bodies"
      ]
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Climate Officer",
      expertise: "20+ years in carbon accounting",
      credentials: "PhD Environmental Science, Former IPCC contributor"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of AI",
      expertise: "Machine learning & automation",
      credentials: "Former Google AI, Stanford PhD"
    },
    {
      name: "Emma Thompson",
      role: "SME Success Director",
      expertise: "Small business operations",
      credentials: "MBA, 15+ years SME consulting"
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
              <Shield className="h-4 w-4" />
              Trusted • Transparent • Verified
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                About Smart Carbon Assistant
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're on a mission to democratize carbon management, making it accessible and affordable 
              for every business, regardless of size or technical expertise.
            </p>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Companies Trust Us</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">99.7%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">24/7</div>
                <div className="text-sm text-muted-foreground">Expert Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Standards Section */}
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
              Built on International Standards
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform adheres to the most rigorous carbon accounting standards and frameworks worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card-hover p-6 h-full text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <standard.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary" className="mb-3">
                    {standard.compliance}
                  </Badge>
                  <h3 className="font-semibold mb-2">{standard.title}</h3>
                  <p className="text-sm text-muted-foreground">{standard.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
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
              Our Core Principles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by these fundamental principles that ensure reliability and trust.
            </p>
          </motion.div>

          <div className="grid gap-16">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <principle.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-3xl font-bold">{principle.title}</h3>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">{principle.description}</p>
                  
                  <div className="space-y-3">
                    {principle.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 rounded-2xl"
                  >
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                      <principle.icon className="h-32 w-32 text-primary" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team */}
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
              Expert Team Behind the Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Led by world-class experts in climate science, AI, and small business operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card-hover p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">{member.expertise}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.credentials}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 rounded-2xl max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              "To democratize carbon management by making professional-grade tools accessible to every business, 
              regardless of size or technical expertise. We believe that effective climate action starts with 
              accurate measurement, and accurate measurement shouldn't be a privilege reserved for large corporations."
            </p>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-medium">Empowering sustainable business growth</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">
              Questions About Our Approach?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always happy to discuss our methodology, standards, and how we can help your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="eco" size="xl">
                Contact Our Experts
              </Button>
              <Button variant="glass" size="xl">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}