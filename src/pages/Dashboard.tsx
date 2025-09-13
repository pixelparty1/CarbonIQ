import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { DashboardChart } from "@/components/DashboardChart";
import { Badge } from "@/components/ui/badge";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { Leaf, TrendingDown, BarChart3, Globe2, Award, Upload, TrendingUp, Car, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  // Define state variables
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const currentEmissions = 387; // tons CO2
  const allowedLimit = 500;
  const creditsLeft = 113;
  const progressPercentage = (currentEmissions / allowedLimit) * 100;

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const carbonData = {
    series: [
      {
        name: "Carbon Emissions",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150],
      },
    ],
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  };

  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100],
        colorStops: [
          {
            offset: 0,
            color: "#ef4444",
            opacity: 1
          },
          {
            offset: 100,
            color: "#ef4444",
            opacity: 0
          }
        ]
      }
    },
    grid: {
      borderColor: "#333",
      strokeDashArray: 3,
    },
    colors: ["#ef4444"],
    xaxis: {
      categories: carbonData.categories,
      labels: {
        style: {
          colors: "#888",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#888",
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const category = w.globals.categoryLabels[dataPointIndex];
        return `
          <div style="
            background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
            border: 1px solid #ef4444;
            border-radius: 12px;
            padding: 16px 20px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            backdrop-filter: blur(10px);
            min-width: 200px;
          ">
            <div style="
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 8px;
            ">
              <div style="
                width: 12px;
                height: 12px;
                background: linear-gradient(45deg, #ef4444, #dc2626);
                border-radius: 50%;
                box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
              "></div>
              <span style="
                color: #ef4444;
                font-weight: 600;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">Carbon Emissions</span>
            </div>
            <div style="
              color: #f9fafb;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 4px;
              display: flex;
              align-items: baseline;
              gap: 4px;
            ">
              <span>${value}</span>
              <span style="
                color: #9ca3af;
                font-size: 12px;
                font-weight: 500;
              ">tons CO₂</span>
            </div>
            <div style="
              color: #6b7280;
              font-size: 12px;
              font-weight: 500;
              padding-top: 8px;
              border-top: 1px solid #374151;
            ">
              📅 ${category} 2025
            </div>
          </div>
        `;
      },
      fillSeriesColor: false,
      marker: {
        show: true,
      },
      x: {
        show: false,
      },
      y: {
        show: false,
      }
    },
  };

  const stats = [
    {
      title: "Total CO₂ Offset",
      value: "1,234",
      unit: "tons",
      change: "-12%",
      icon: Leaf,
    },
    {
      title: "Monthly Reduction",
      value: "23.5",
      unit: "tons",
      change: "-8%",
      icon: TrendingDown,
    },
    {
      title: "Carbon Credits",
      value: "145",
      unit: "credits",
      change: "+5",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <Badge variant="outline" className="bg-zinc-900">
            <Globe2 className="w-4 h-4 mr-1" />
            Live CO₂ Data
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-200">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                  <span className="text-sm font-normal text-zinc-400 ml-1">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  <span className={stat.change.startsWith("-") ? "text-green-500" : "text-blue-500"}>
                    {stat.change}
                  </span>
                  {" "}vs last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Chart */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-white">Carbon Emissions Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardChart
              type="area"
              height={350}
              options={options}
              series={carbonData.series}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}