import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, MapPin, Calendar, Award } from "lucide-react";

interface CreditCardProps {
  id: string;
  tons: number;
  price: number;
  project: string;
  location: string;
  verified: boolean;
  expiry: string;
  image?: string;
  company?: string;
}

export function CreditCard3D({ 
  id, 
  tons, 
  price, 
  project, 
  location, 
  verified, 
  expiry,
  company
}: CreditCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="glass-card-hover p-6 rounded-xl relative overflow-hidden group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-earth opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: isHovered 
            ? "0 0 30px rgba(46, 204, 113, 0.4), 0 0 60px rgba(46, 204, 113, 0.2)"
            : "0 0 0px rgba(46, 204, 113, 0)"
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <Badge variant={verified ? "default" : "secondary"} className="badge-shine">
              {verified ? "Verified" : "Pending"}
              {verified && <Award className="h-3 w-3 ml-1" />}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">#{id}</span>
        </div>

        {/* Main content */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">{project}</h3>
          {company && (
            <div className="flex items-center text-sm text-green-500 mb-2">
              <Award className="h-4 w-4 mr-1" />
              {company}
            </div>
          )}
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Expires: {expiry}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{tons}</div>
            <div className="text-xs text-muted-foreground">credits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{(price * 0.01).toFixed(2)} ETH</div>
            <div className="text-xs text-muted-foreground">per credit</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 gap-2">
          <Button variant="glass" size="sm" className="w-full">
            Details
          </Button>
        </div>
      </div>

      {/* Floating particles effect */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-60"
        animate={{
          y: isHovered ? [-5, 5, -5] : [0],
          opacity: isHovered ? [0.6, 1, 0.6] : 0.6,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-1 h-1 bg-secondary rounded-full opacity-40"
        animate={{
          y: isHovered ? [5, -5, 5] : [0],
          opacity: isHovered ? [0.4, 0.8, 0.4] : 0.4,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.div>
  );
}