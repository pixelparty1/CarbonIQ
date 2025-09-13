import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar,
  Upload,
  Users,
  Building2,
  Clock,
  CheckCircle,
  ArrowRight,
  FileText,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    interest: "",
    message: ""
  });

  const contactMethods = [
    {
      icon: Calendar,
      title: "Book a Demo",
      description: "See the platform in action with your real data",
      action: "Schedule 30-min demo",
      color: "primary"
    },
    {
      icon: Upload,
      title: "Upload Sample Bill",
      description: "Get instant carbon footprint calculation",
      action: "Try now for free",
      color: "secondary"
    },
    {
      icon: MessageCircle,
      title: "Chat with Expert",
      description: "Speak directly with our carbon specialists",
      action: "Start conversation",
      color: "success"
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Free Trial",
      description: "Full access to all features for 14 days"
    },
    {
      icon: Clock,
      title: "Quick Setup",
      description: "Live in 24 hours or less"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated success manager included"
    },
    {
      icon: FileText,
      title: "No Contract",
      description: "Month-to-month with no commitments"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

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
              <Zap className="h-4 w-4" />
              Get Started Today
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Ready to Transform
              </span>
              <br />
              Your Carbon Strategy?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of SMEs already using Smart Carbon Assistant. 
              Choose how you'd like to get started below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Card className="glass-card-hover p-8 h-full text-center group">
                  <div className={`w-16 h-16 bg-gradient-${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                  <p className="text-muted-foreground mb-6">{method.description}</p>
                  <Button 
                    variant={method.color === 'primary' ? 'eco' : 'glass'} 
                    size="lg" 
                    className="w-full group-hover:shadow-lg transition-shadow"
                  >
                    {method.action}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-card p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours with a 
                    personalized demo and pricing for your business.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      placeholder="Your Company Ltd."
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employees">Company Size</Label>
                      <Select onValueChange={(value) => handleInputChange('employees', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interest">Primary Interest</Label>
                      <Select onValueChange={(value) => handleInputChange('interest', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tracking">Carbon tracking</SelectItem>
                          <SelectItem value="compliance">Compliance reporting</SelectItem>
                          <SelectItem value="credits">Carbon credits</SelectItem>
                          <SelectItem value="all">Complete solution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your carbon management needs..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                  </div>

                  <Button type="submit" variant="eco" size="xl" className="w-full">
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Info & Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">hello@smartcarbon.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Benefits */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-semibold mb-6">What You Get</h3>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-3">
                      <benefit.icon className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{benefit.title}</p>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Demo CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/dashboard">
                  <Card className="glass-card-hover p-8 cursor-pointer group">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold mb-2">Try It Right Now</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload a sample bill and see your carbon footprint in real-time
                      </p>
                      <Button variant="eco" size="sm" className="group-hover:shadow-lg transition-shadow">
                        Upload Sample Bill
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}