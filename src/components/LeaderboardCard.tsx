import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Award, MapPin, Users, Leaf } from "lucide-react";

interface LeaderboardCardProps {
  rank: number;
  company: {
    id: string;
    name: string;
    logo?: string;
    location: string;
    industry: string;
    employees: number;
    emissions: number;
    reduction: number;
    target: number;
    verified: boolean;
  };
  index: number;
}

export function LeaderboardCard({ rank, company, index }: LeaderboardCardProps) {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "from-yellow-500 to-yellow-600";
      case 2: return "from-gray-400 to-gray-500";
      case 3: return "from-amber-600 to-amber-700";
      default: return "from-primary to-primary-glow";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "👑";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "🏆";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`glass-card-hover p-6 rounded-xl relative overflow-hidden group ${
        rank <= 3 ? 'border-2 border-primary/30' : ''
      }`}
    >
      {/* Rank indicator gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getRankColor(rank)} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative z-10 flex items-center space-x-4">
        {/* Rank */}
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(rank)} flex items-center justify-center font-bold text-white shadow-lg`}>
            {rank <= 10 ? (
              <span className="text-lg">{getRankIcon(rank)}</span>
            ) : (
              <span className="text-sm">#{rank}</span>
            )}
          </div>
        </div>

        {/* Company info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold">{company.name}</h3>
            {company.verified && (
              <Badge variant="default" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{company.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{company.employees.toLocaleString()} employees</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {company.industry}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex-shrink-0 text-right space-y-2">
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="text-lg font-bold text-primary">
              {company.emissions.toLocaleString()} tons CO₂
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <TrendingDown className="h-3 w-3 text-secondary" />
            <span className="text-secondary font-medium">
              -{company.reduction}% vs target
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Target: {company.target.toLocaleString()} tons
          </div>
        </div>
      </div>

      {/* Hover effect particles */}
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-60"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {rank === 1 && (
        <motion.div
          className="absolute -top-1 -right-1 text-2xl"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⭐
        </motion.div>
      )}
    </motion.div>
  );
}