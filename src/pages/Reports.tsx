import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Award, 
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Trophy
} from "lucide-react";
import { motion } from "framer-motion";

export default function Reports() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [reportType, setReportType] = useState("annual");

  const complianceScore = 94;
  const certificationLevel = "Gold";
  
  const reports = [
    {
      id: "RPT-2024-001",
      title: "Annual Carbon Report 2024",
      type: "Compliance",
      status: "Ready",
      date: "2024-01-15",
      size: "2.4 MB"
    },
    {
      id: "RPT-2024-002", 
      title: "Q4 Sustainability Metrics",
      type: "Quarterly",
      status: "Ready",
      date: "2024-01-01",
      size: "1.8 MB"
    },
    {
      id: "RPT-2024-003",
      title: "Carbon Credit Portfolio Report",
      type: "Portfolio",
      status: "Processing",
      date: "2024-01-20",
      size: "3.1 MB"
    },
    {
      id: "RPT-2023-004",
      title: "ESG Performance Report 2023",
      type: "ESG",
      status: "Ready", 
      date: "2023-12-31",
      size: "4.2 MB"
    }
  ];

  const badges = [
    {
      id: "CERT-001",
      title: "Carbon Neutral Certified",
      level: "Gold",
      earned: "2024-01-15",
      validUntil: "2025-01-15",
      description: "Achieved net-zero carbon emissions",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: "CERT-002",
      title: "Renewable Energy Leader",
      level: "Silver", 
      earned: "2023-11-20",
      validUntil: "2024-11-20",
      description: "80%+ renewable energy usage",
      color: "from-gray-400 to-gray-500"
    },
    {
      id: "CERT-003",
      title: "Emission Reduction Pioneer",
      level: "Platinum",
      earned: "2023-08-10",
      validUntil: "2025-08-10", 
      description: "50%+ emission reduction vs baseline",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const metrics = [
    { label: "Compliance Score", value: complianceScore, max: 100, color: "primary" },
    { label: "Reduction Target", value: 78, max: 100, color: "secondary" },
    { label: "Reporting Coverage", value: 96, max: 100, color: "success" },
    { label: "Data Accuracy", value: 99, max: 100, color: "primary" }
  ];

  const handleDownloadReport = (reportId: string) => {
    // Simulate PDF download
    console.log(`Downloading report: ${reportId}`);
  };

  const generateNewReport = () => {
    console.log(`Generating new ${reportType} report for ${selectedYear}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Reports & Certifications</h1>
          <p className="text-muted-foreground">Generate compliance reports and showcase your sustainability achievements</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Metrics & CSR Badge */}
          <div className="lg:col-span-1 space-y-6">
            {/* Compliance Metrics */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="glass-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Compliance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {metrics.map((metric, index) => (
                    <div key={metric.label}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{metric.label}</span>
                        <span className="text-sm font-bold">{metric.value}%</span>
                      </div>
                      <Progress 
                        value={metric.value} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* CSR Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="glass-card-hover overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>CSR Certification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <motion.div
                    className="relative mx-auto w-32 h-32 mb-4 badge-shine rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20" />
                    <Trophy className="h-16 w-16 text-primary z-10" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2">{certificationLevel} Level</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Outstanding commitment to sustainability and carbon reduction
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Compliance Score: {complianceScore}%</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Calendar className="h-4 w-4 text-secondary" />
                      <span>Valid until Dec 2024</span>
                    </div>
                  </div>
                  
                  <Button variant="eco" size="sm" className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Generate Report */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="glass-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Generate Report</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Report Type</label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual Report</SelectItem>
                        <SelectItem value="quarterly">Quarterly Report</SelectItem>
                        <SelectItem value="monthly">Monthly Report</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="sky" 
                    className="w-full" 
                    onClick={generateNewReport}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Reports & Badges */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Reports */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Card className="glass-card-hover">
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="glass-card p-4 rounded-lg flex items-center justify-between group hover:shadow-eco transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{report.title}</h3>
                            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                              <span>{report.type}</span>
                              <span>•</span>
                              <span>{report.date}</span>
                              <span>•</span>
                              <span>{report.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant={report.status === "Ready" ? "default" : "secondary"}
                            className="flex items-center space-x-1"
                          >
                            {report.status === "Ready" ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            <span>{report.status}</span>
                          </Badge>
                          
                          {report.status === "Ready" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadReport(report.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="glass-card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Achievement Badges</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="glass-card-hover p-4 rounded-lg group cursor-pointer relative overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="badge-shine">
                              {badge.level}
                            </Badge>
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Award className="h-5 w-5 text-primary" />
                            </motion.div>
                          </div>
                          
                          <h3 className="font-semibold mb-2">{badge.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                          
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>Earned: {badge.earned}</div>
                            <div>Valid until: {badge.validUntil}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}