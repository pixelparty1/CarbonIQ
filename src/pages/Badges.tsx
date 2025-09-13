import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface BadgeLevel {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  threshold: number;
  color: string;
  unlocked: boolean;
}

export default function Badges() {
  const [transactionCount, setTransactionCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [randomProgress, setRandomProgress] = useState<number[]>([]);

  // Generate random progress bars for demonstration
  useEffect(() => {
    const generateRandomProgress = () => {
      return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100) + 1);
    };
    setRandomProgress(generateRandomProgress());
  }, []);

  const badgeLevels: BadgeLevel[] = [
    {
      id: "starter",
      name: "Carbon Starter",
      description: "Complete your first transaction",
      icon: Target,
      threshold: 1,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      unlocked: false,
    },
    {
      id: "bronze",
      name: "Bronze Offsetter",
      description: "Complete 5 transactions",
      icon: Award,
      threshold: 5,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      unlocked: false,
    },
    {
      id: "silver",
      name: "Silver Champion",
      description: "Complete 15 transactions",
      icon: Star,
      threshold: 15,
      color: "bg-gradient-to-br from-gray-300 to-gray-500",
      unlocked: false,
    },
    {
      id: "gold",
      name: "Gold Guardian",
      description: "Complete 30 transactions",
      icon: Award,
      threshold: 30,
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      unlocked: false,
    },
    {
      id: "platinum",
      name: "Platinum Pioneer",
      description: "Complete 50 transactions",
      icon: Star,
      threshold: 50,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      unlocked: false,
    },
    {
      id: "diamond",
      name: "Diamond Defender",
      description: "Complete 100 transactions",
      icon: TrendingUp,
      threshold: 100,
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
      unlocked: false,
    },
  ];

  useEffect(() => {
    fetchUserAndTransactions();
  }, []);

  const fetchUserAndTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Fetch user's transactions from database
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('buyer_id', user.id);

        if (!error && transactions) {
          setTransactionCount(transactions.length);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getBadgeSpecificColor = (badgeId: string) => {
    const badgeColors = {
      starter: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
      bronze: 'bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800',
      silver: 'bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700',
      gold: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
      platinum: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700',
      diamond: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
    };
    return badgeColors[badgeId as keyof typeof badgeColors] || 'bg-gradient-to-r from-green-500 to-emerald-600';
  };

  const getBadgesWithProgress = () => {
    return badgeLevels.map((badge, index) => ({
      ...badge,
      unlocked: transactionCount >= badge.threshold || randomProgress[index] > 80,
      progress: transactionCount >= badge.threshold ? 100 : (randomProgress[index] || Math.min((transactionCount / badge.threshold) * 100, 100)),
      randomLevel: randomProgress[index] || 0
    }));
  };

  const unlockedBadges = getBadgesWithProgress().filter(badge => badge.unlocked);
  const nextBadge = getBadgesWithProgress().find(badge => !badge.unlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-blue-900">
      <Navigation userCredits={120} />
      
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Achievement Badges</h1>
            <p className="text-gray-300 text-lg">
              Track your carbon offset journey and unlock achievements
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8 bg-black/40 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Progress
              </CardTitle>
              <CardDescription className="text-gray-300">
                Total Transactions: {transactionCount} | Badges Unlocked: {unlockedBadges.length}/{badgeLevels.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {nextBadge && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Next Badge: {nextBadge.name}</span>
                    <span className="text-gray-300">
                      {transactionCount}/{nextBadge.threshold} transactions
                    </span>
                  </div>
                  <Progress value={nextBadge.progress} className="h-3" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getBadgesWithProgress().map((badge, index) => {
              const IconComponent = badge.icon;
              
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card 
                    className={`relative overflow-hidden transition-all duration-500 transform-gpu ${
                      badge.unlocked 
                        ? 'bg-black/40 border-green-400/60 shadow-xl shadow-green-400/30 hover:shadow-2xl hover:shadow-green-400/40' 
                        : 'bg-black/20 border-gray-600/30 hover:border-gray-500/50'
                    }`}
                  >
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <motion.div 
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            badge.color
                          } shadow-lg transform-gpu`}
                          animate={badge.unlocked ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                            boxShadow: [
                              '0 4px 20px rgba(34, 197, 94, 0.3)',
                              '0 8px 30px rgba(34, 197, 94, 0.5)',
                              '0 4px 20px rgba(34, 197, 94, 0.3)'
                            ]
                          } : {}}
                          transition={badge.unlocked ? {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          } : {}}
                          whileHover={{ 
                            scale: 1.15,
                            rotate: 10,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <IconComponent 
                            className={`h-8 w-8 ${badge.unlocked ? 'text-white drop-shadow-lg' : 'text-white/70'} transition-all duration-300`} 
                          />
                        </motion.div>
                      </div>
                      
                      {/* Random Progress Level Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Power Level</span>
                          <span>{Math.round(badge.randomLevel)}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className={`h-full rounded-full ${
                              badge.unlocked 
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                                : 'bg-gradient-to-r from-gray-500 to-gray-600'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${badge.randomLevel}%` }}
                            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      
                      <CardTitle className={`text-xl ${badge.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {badge.name}
                      </CardTitle>
                      
                      <CardDescription className="text-white">
                        {badge.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="text-center">
                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <Badge 
                            variant={badge.unlocked ? "default" : "secondary"}
                            className={`transition-all duration-300 ${
                              badge.unlocked 
                                ? getBadgeSpecificColor(badge.id) + ' text-white shadow-lg' 
                                : getBadgeSpecificColor(badge.id) + ' text-white opacity-60 shadow-md'
                            }`}
                          >
                            {badge.unlocked ? '✨ UNLOCKED ✨' : `${badge.threshold} transactions required`}
                          </Badge>
                        </motion.div>
                        
                        {!badge.unlocked && (
                          <motion.div 
                            className="space-y-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                          >
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>{transactionCount}</span>
                              <span>{badge.threshold}</span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${badge.progress}%` }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.8, ease: "easeOut" }}
                              />
                            </div>
                          </motion.div>
                        )}
                        
                        {badge.unlocked && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.9, type: "spring", bounce: 0.5 }}
                            className="text-xs text-green-400 font-semibold"
                          >
                            🎉 Achievement Unlocked! 🎉
                          </motion.div>
                        )}
                      </div>
                    </CardContent>

                    {badge.unlocked && (
                      <>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent pointer-events-none"
                          animate={{ 
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                        <motion.div 
                          className="absolute top-2 right-2 text-green-400"
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          ⭐
                        </motion.div>
                      </>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Achievement Summary */}
          <Card className="mt-8 bg-black/40 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white">Achievement Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{transactionCount}</div>
                  <div className="text-sm text-gray-300">Total Transactions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{unlockedBadges.length}</div>
                  <div className="text-sm text-gray-300">Badges Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {Math.round((unlockedBadges.length / badgeLevels.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-300">Completion Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">
                    {nextBadge ? nextBadge.threshold - transactionCount : 0}
                  </div>
                  <div className="text-sm text-gray-300">Transactions to Next Badge</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}