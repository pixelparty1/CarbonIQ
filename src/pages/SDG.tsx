import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SDGPage() {
  const [hoveredSDG, setHoveredSDG] = useState<number | null>(null);

  const coreSDGs = [
    {
      number: 9,
      title: "Industry, Innovation and Infrastructure",
      description: "Clean technology advancement and sustainable infrastructure development",
      impact: "Innovation in clean technologies",
      priority: "medium",
      color: "bg-orange-900/20",
      detailedDescription: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation through clean technology solutions.",
      keyAreas: ["Clean Technology Development", "Sustainable Manufacturing", "Green Infrastructure", "Digital Innovation"],
      metrics: ["50+ clean tech partnerships", "30% reduction in industrial emissions", "15 sustainable infrastructure projects"],
    },
    {
      number: 11,
      title: "Sustainable Cities and Communities",
      description: "Urban sustainability projects reduce city-level carbon footprints",
      impact: "Cleaner, more sustainable cities",
      priority: "high",
      color: "bg-green-800/20",
      detailedDescription: "Make cities and human settlements inclusive, safe, resilient and sustainable by implementing urban carbon reduction strategies.",
      keyAreas: ["Urban Carbon Management", "Smart City Solutions", "Sustainable Transportation", "Green Building Standards"],
      metrics: ["25 cities participating", "40% urban emission reduction", "100k residents impacted"],
    },
    {
      number: 12,
      title: "Responsible Consumption and Production",
      description: "Circular economy initiatives and waste reduction programs",
      impact: "Reduced waste and resource efficiency",
      priority: "high",
      color: "bg-green-700/20",
      detailedDescription: "Ensure sustainable consumption and production patterns through circular economy principles and waste reduction initiatives.",
      keyAreas: ["Circular Economy", "Waste Reduction", "Resource Efficiency", "Sustainable Supply Chains"],
      metrics: ["60% waste reduction", "80% resource efficiency improvement", "200+ companies adopting circular practices"],
    },
    {
      number: 13,
      title: "Climate Action",
      description: "Direct contribution to global climate goals through carbon offsetting",
      impact: "Measurable carbon emission reductions",
      priority: "critical",
      color: "bg-emerald-900/20",
      detailedDescription: "Take urgent action to combat climate change and its impacts through verified carbon offset projects and emission reduction strategies.",
      keyAreas: ["Carbon Offsetting", "Emission Reduction", "Climate Resilience", "Renewable Energy Transition"],
      metrics: ["1M+ tons CO₂ offset", "500+ verified projects", "95% emission reduction accuracy"],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#0D0D0D' }}>
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#E0E0E0' }}>Sustainable Development Goals</h1>
          <p className="text-lg mb-6" style={{ color: '#B0B0B0' }}>
            Discover how our carbon credit platform contributes to the UN's 17 Sustainable Development Goals,
            creating positive impact beyond carbon reduction.
          </p>
          <div className="inline-flex px-4 py-1.5 rounded-full text-sm" 
               style={{ background: '#1C1C1C', color: '#8C8C8C', border: '1px solid #2A2A2A' }}>
            Aligned with UN SDG Framework 2030
          </div>
        </div>

        {/* Core SDGs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E0E0E0' }}>Core SDGs</h2>
          <p className="text-base mb-6" style={{ color: '#B0B0B0' }}>
            Our platform primarily focuses on these four essential Sustainable Development Goals that directly align with our carbon credit mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreSDGs.map((sdg) => (
            <motion.div
              key={sdg.number}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}
              onMouseEnter={() => setHoveredSDG(sdg.number)}
              onMouseLeave={() => setHoveredSDG(null)}
              initial={{ scale: 1 }}
              animate={{ 
                scale: hoveredSDG === sdg.number ? 1.05 : 1,
                zIndex: hoveredSDG === sdg.number ? 10 : 1
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Normal State */}
              <motion.div
                className="p-6"
                animate={{ 
                  opacity: hoveredSDG === sdg.number ? 0 : 1,
                  y: hoveredSDG === sdg.number ? -20 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold" style={{ color: '#E0E0E0' }}>{sdg.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: '#8C8C8C' }}>SDG {sdg.number}</span>
                    <span className={`
                      px-2 py-0.5 rounded text-xs
                      ${sdg.priority === 'high' ? 'bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]' :
                        sdg.priority === 'medium' ? 'bg-[#FFC107] bg-opacity-10 text-[#FFC107]' :
                        'bg-[#F44336] bg-opacity-10 text-[#F44336]'}
                    `}>
                      {sdg.priority}
                    </span>
                  </div>
                </div>
                <p className="mb-4 text-sm" style={{ color: '#B0B0B0' }}>{sdg.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium" style={{ color: '#8C8C8C' }}>Our Impact:</h4>
                  <p className="text-sm" style={{ color: '#B0B0B0' }}>{sdg.impact}</p>
                </div>
              </motion.div>

              {/* Expanded State */}
              <motion.div
                className="absolute inset-0 p-6"
                style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #2A2A2A 100%)' }}
                animate={{ 
                  opacity: hoveredSDG === sdg.number ? 1 : 0,
                  y: hoveredSDG === sdg.number ? 0 : 20
                }}
                transition={{ duration: 0.3, delay: hoveredSDG === sdg.number ? 0.1 : 0 }}
                initial={{ opacity: 0, y: 20 }}
              >
                <div className="h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600">
                        <span className="text-white font-bold text-sm">{sdg.number}</span>
                      </div>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${sdg.priority === 'high' ? 'bg-[#4CAF50] bg-opacity-20 text-[#4CAF50]' :
                          sdg.priority === 'medium' ? 'bg-[#FFC107] bg-opacity-20 text-[#FFC107]' :
                          'bg-[#F44336] bg-opacity-20 text-[#F44336]'}
                      `}>
                        {sdg.priority} priority
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#E0E0E0' }}>{sdg.title}</h3>
                  
                  <p className="text-sm mb-4" style={{ color: '#B0B0B0' }}>
                    {sdg.detailedDescription}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2" style={{ color: '#4CAF50' }}>Key Focus Areas:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {sdg.keyAreas.map((area, index) => (
                        <div key={index} className="text-xs px-2 py-1 rounded" style={{ background: '#2A2A2A', color: '#B0B0B0' }}>
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2" style={{ color: '#4CAF50' }}>Impact Metrics:</h4>
                    <ul className="space-y-1">
                      {sdg.metrics.map((metric, index) => (
                        <li key={index} className="text-xs flex items-center gap-2" style={{ color: '#B0B0B0' }}>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-lg" style={{ background: '#1C1C1C', border: '1px solid #2A2A2A' }}>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Platform Impact Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3" style={{ color: '#E0E0E0' }}>Measurable Impact</h3>
              <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                <li>Carbon reduced</li>
                <li>Communities served</li>
                <li>Jobs created</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3" style={{ color: '#E0E0E0' }}>Verified Results</h3>
              <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                <li>Third-party verification</li>
                <li>Blockchain tracking</li>
                <li>Regular audits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3" style={{ color: '#E0E0E0' }}>Global Reach</h3>
              <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                <li>50+ countries</li>
                <li>1000+ projects</li>
                <li>Local partnerships</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3" style={{ color: '#E0E0E0' }}>Holistic Solutions</h3>
              <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                <li>Multiple SDGs</li>
                <li>Community co-benefits</li>
                <li>Long-term sustainability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
