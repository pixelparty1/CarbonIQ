import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Podium3D } from "@/components/Podium3D";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Trophy, TrendingDown, Globe, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("emissions");

  // Mock leaderboard data
  const companies = [
    {
      id: "1",
      name: "EcoTech Solutions",
      location: "Copenhagen, Denmark",
      industry: "Technology",
      employees: 850,
      emissions: 120,
      reduction: 78,
      target: 545,
      verified: true
    },
    {
      id: "2", 
      name: "GreenFlow Industries",
      location: "Portland, USA",
      industry: "Manufacturing",
      employees: 1200,
      emissions: 235,
      reduction: 65,
      target: 670,
      verified: true
    },
    {
      id: "3",
      name: "SolarWind Corp",
      location: "Berlin, Germany", 
      industry: "Energy",
      employees: 650,
      emissions: 289,
      reduction: 72,
      target: 1040,
      verified: true
    },
    {
      id: "4",
      name: "BioCircular Systems",
      location: "Vancouver, Canada",
      industry: "Biotechnology", 
      employees: 420,
      emissions: 340,
      reduction: 58,
      target: 810,
      verified: true
    },
    {
      id: "5",
      name: "CleanTrans Logistics",
      location: "Amsterdam, Netherlands",
      industry: "Transportation",
      employees: 980,
      emissions: 445,
      reduction: 45,
      target: 810,
      verified: false
    },
    {
      id: "6",
      name: "Sustainable Fabrics Inc",
      location: "Gothenburg, Sweden",
      industry: "Textiles",
      employees: 750,
      emissions: 512,
      reduction: 52,
      target: 1070,
      verified: true
    },
    {
      id: "7",
      name: "EcoFood Networks",
      location: "Lyon, France",
      industry: "Food & Beverage",
      employees: 1150,
      emissions: 578,
      reduction: 41,
      target: 980,
      verified: true
    },
    {
      id: "8",
      name: "GreenBuild Construction",
      location: "Oslo, Norway",
      industry: "Construction", 
      employees: 890,
      emissions: 634,
      reduction: 38,
      target: 1020,
      verified: false
    }
  ];

  const globalStats = [
    { label: "Total Participating Companies", value: "2,340", change: "+156 this month" },
    { label: "Average Emissions Reduction", value: "54.2%", change: "+3.8% vs last year" },
    { label: "Best Performing Industry", value: "Technology", change: "67% avg reduction" },
    { label: "Global CO₂ Saved", value: "1.2M tons", change: "+234k this quarter" }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" ||
                         (filterBy === "verified" && company.verified) ||
                         (filterBy === "industry" && company.industry === "Technology");
    return matchesSearch && matchesFilter;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "emissions":
        return a.emissions - b.emissions;
      case "reduction":
        return b.reduction - a.reduction;
      case "employees":
        return b.employees - a.employees;
      default:
        return a.emissions - b.emissions;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      <Navigation userCredits={120} />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Global Carbon Leaders
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating companies leading the way in carbon reduction and sustainable practices worldwide
          </p>
        </motion.div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          {globalStats.map((stat, index) => (
            <Card key={stat.label} className="glass-card-hover text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm font-medium mb-2">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* 3D Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-12"
        >
          <Card className="glass-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
                <span>Top 3 Carbon Champions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Podium3D topCompanies={companies.slice(0, 3)} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card p-6 rounded-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search Companies</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by company, location, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Filter by</label>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                  <SelectItem value="industry">Tech Industry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <TrendingDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emissions">Lowest Emissions</SelectItem>
                  <SelectItem value="reduction">Highest Reduction</SelectItem>
                  <SelectItem value="employees">Company Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Full Rankings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="glass-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Complete Rankings</span>
                <Badge variant="outline" className="ml-2">
                  {sortedCompanies.length} companies
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedCompanies.map((company, index) => (
                  <LeaderboardCard
                    key={company.id}
                    rank={index + 1}
                    company={company}
                    index={index}
                  />
                ))}
              </div>
              
              {sortedCompanies.length === 0 && (
                <div className="text-center py-12">
                  <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No companies found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 glass-card p-8 rounded-2xl text-center bg-gradient-to-r from-primary/10 to-secondary/10"
        >
          <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Join the Carbon Leaders</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ready to showcase your company's sustainability achievements? Join our global leaderboard 
            and inspire others with your carbon reduction success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="eco" size="lg">
              Submit Your Data
            </Button>
            <Button variant="glass" size="lg">
              Learn How to Participate
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}