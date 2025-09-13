import ApexCharts from "react-apexcharts";

interface DashboardChartProps {
  type: "line" | "area" | "bar" | "pie" | "donut" | "scatter" | "bubble";
  height?: number;
  options?: any;
  series?: any[];
}

export function DashboardChart({ type, height = 350, options = {}, series = [] }: DashboardChartProps) {
  return (
    <ApexCharts
      type={type}
      height={height}
      options={options}
      series={series}
    />
  );
}
