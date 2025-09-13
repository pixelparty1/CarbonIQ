import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

interface SDGCardProps {
  number: number;
  title: string;
  description: string;
  impact: string;
  priority: "high" | "medium" | "critical";
  color: string;
}

export function SDGDialog() {
  const sdgs: SDGCardProps[] = [
    {
      number: 1,
      title: "No Poverty",
      description: "Carbon credit projects create sustainable income streams for rural communities",
      impact: "Direct income generation for local communities",
      priority: "high",
      color: "bg-red-900/20",
    },
    {
      number: 2,
      title: "Zero Hunger",
      description: "Sustainable agriculture projects improve food security and farming practices",
      impact: "Enhanced agricultural productivity",
      priority: "medium",
      color: "bg-yellow-900/20",
    },
    {
      number: 3,
      title: "Good Health and Well-being",
      description: "Cleaner air quality through emission reductions benefits public health",
      impact: "Reduced air pollution and health risks",
      priority: "high",
      color: "bg-green-900/20",
    },
    {
      number: 6,
      title: "Clean Water and Sanitation",
      description: "Water conservation and treatment projects preserve clean water resources",
      impact: "Protected water ecosystems",
      priority: "medium",
      color: "bg-blue-900/20",
    },
    {
      number: 7,
      title: "Affordable and Clean Energy",
      description: "Renewable energy projects provide sustainable power solutions",
      impact: "Increased renewable energy capacity",
      priority: "high",
      color: "bg-yellow-800/20",
    },
    {
      number: 8,
      title: "Decent Work and Economic Growth",
      description: "Green jobs creation in renewable energy and sustainability sectors",
      impact: "New employment opportunities",
      priority: "high",
      color: "bg-purple-900/20",
    },
    {
      number: 9,
      title: "Industry, Innovation and Infrastructure",
      description: "Clean technology advancement and sustainable infrastructure development",
      impact: "Innovation in clean technologies",
      priority: "medium",
      color: "bg-orange-900/20",
    },
    {
      number: 11,
      title: "Sustainable Cities and Communities",
      description: "Urban sustainability projects reduce city-level carbon footprints",
      impact: "Cleaner, more sustainable cities",
      priority: "high",
      color: "bg-green-800/20",
    },
    {
      number: 12,
      title: "Responsible Consumption and Production",
      description: "Circular economy initiatives and waste reduction programs",
      impact: "Reduced waste and resource efficiency",
      priority: "high",
      color: "bg-green-700/20",
    },
    {
      number: 13,
      title: "Climate Action",
      description: "Direct contribution to global climate goals through carbon offsetting",
      impact: "Measurable carbon emission reductions",
      priority: "critical",
      color: "bg-emerald-900/20",
    },
    {
      number: 14,
      title: "Life Below Water",
      description: "Ocean conservation and marine ecosystem protection projects",
      impact: "Protected marine biodiversity",
      priority: "medium",
      color: "bg-blue-800/20",
    },
    {
      number: 15,
      title: "Life on Land",
      description: "Forest conservation, reforestation, and biodiversity preservation",
      impact: "Enhanced terrestrial ecosystems",
      priority: "critical",
      color: "bg-green-950/20",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Target className="h-4 w-4" />
          <span>SDGs</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Sustainable Development Goals</DialogTitle>
          <p className="text-gray-500 mb-6">
            Discover how our carbon credit platform contributes to the UN's 17 Sustainable Development Goals, 
            creating positive impact beyond carbon reduction.
          </p>
          <div className="inline-flex px-4 py-1 rounded-full bg-gray-100 text-sm mb-8">
            Aligned with UN SDG Framework 2030
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sdgs.map((sdg) => (
            <div
              key={sdg.number}
              className={`p-6 rounded-lg ${sdg.color} backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{sdg.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">SDG {sdg.number}</span>
                  <span className={`
                    px-2 py-0.5 rounded text-xs
                    ${sdg.priority === 'high' ? 'bg-green-500/20 text-green-700' :
                      sdg.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-700' :
                      'bg-red-500/20 text-red-700'}
                  `}>
                    {sdg.priority}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{sdg.description}</p>
              <div className="mt-auto">
                <h4 className="text-sm font-medium text-gray-500">Our Impact:</h4>
                <p className="text-sm text-gray-600">{sdg.impact}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-lg bg-blue-950/20 backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4">Platform Impact Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-medium mb-2">Measurable Impact</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Carbon reduced</li>
                <li>Communities served</li>
                <li>Jobs created</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Verified Results</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Third-party verification</li>
                <li>Blockchain tracking</li>
                <li>Regular audits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Global Reach</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>50+ countries</li>
                <li>1000+ projects</li>
                <li>Local partnerships</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Holistic Solutions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Multiple SDGs</li>
                <li>Community co-benefits</li>
                <li>Long-term sustainability</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
