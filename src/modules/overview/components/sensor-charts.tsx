"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

// Simulated real-time data
const generateDataPoint = (baseValue: number, variance: number) => {
  return baseValue + (Math.random() - 0.5) * variance;
};

export function SensorCharts() {
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [pressureData, setPressureData] = useState<any[]>([]);
  const [vibrationData, setVibrationData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();

      // Temperature data (20-30°C range)
      setTemperatureData((prev) => {
        const newData = [
          ...prev.slice(-19),
          {
            time: timeString,
            sensor1: generateDataPoint(25, 4),
            sensor2: generateDataPoint(23, 3),
            sensor3: generateDataPoint(27, 5),
          },
        ];
        return newData;
      });

      // Pressure data (1000-1200 hPa range)
      setPressureData((prev) => {
        const newData = [
          ...prev.slice(-19),
          {
            time: timeString,
            pressure: generateDataPoint(1100, 100),
          },
        ];
        return newData;
      });

      // Vibration data (0-10 range)
      setVibrationData((prev) => {
        const newData = [
          ...prev.slice(-19),
          {
            time: timeString,
            vibration: Math.abs(generateDataPoint(2, 6)),
          },
        ];
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartConfig = {
    sensor1: {
      label: "Sensor 1",
      color: "hsl(var(--chart-1))",
    },
    sensor2: {
      label: "Sensor 2",
      color: "hsl(var(--chart-2))",
    },
    sensor3: {
      label: "Sensor 3",
      color: "hsl(var(--chart-3))",
    },
    pressure: {
      label: "Pressure",
      color: "hsl(var(--chart-4))",
    },
    vibration: {
      label: "Vibration",
      color: "hsl(var(--chart-5))",
    },
  };

  return (
    <Card className="bg-dark-800/80 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Real-Time Sensor Data
          <div className="flex gap-2">
            <Badge className="bg-lime/20 text-lime border-lime/30 animate-glow">
              <div className="w-2 h-2 bg-lime rounded-full mr-2 animate-pulse-lime"></div>
              Live
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="temperature" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-dark-700/50 border border-white/20">
            <TabsTrigger
              value="temperature"
              className="text-white/80 data-[state=active]:bg-white/5 data-[state=active]:text-lime"
            >
              Temperature
            </TabsTrigger>
            <TabsTrigger
              value="pressure"
              className="text-white/80 data-[state=active]:bg-white/5 data-[state=active]:text-lime"
            >
              Pressure
            </TabsTrigger>
            <TabsTrigger
              value="vibration"
              className="text-white/80 data-[state=active]:bg-white/10 data-[state=active]:text-lime"
            >
              Vibration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="temperature" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-dark-700/50 rounded-lg p-3 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Sensor 1</span>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-xl font-bold text-white">
                  {temperatureData.length > 0
                    ? `${temperatureData[
                        temperatureData.length - 1
                      ]?.sensor1?.toFixed(1)}°C`
                    : "--°C"}
                </div>
              </div>
              <div className="bg-dark-700/50 rounded-lg p-3 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Sensor 2</span>
                  <TrendingDown className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-xl font-bold text-white">
                  {temperatureData.length > 0
                    ? `${temperatureData[
                        temperatureData.length - 1
                      ]?.sensor2?.toFixed(1)}°C`
                    : "--°C"}
                </div>
              </div>
              <div className="bg-dark-700/50 rounded-lg p-3 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Sensor 3</span>
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-xl font-bold text-white">
                  {temperatureData.length > 0
                    ? `${temperatureData[
                        temperatureData.length - 1
                      ]?.sensor3?.toFixed(1)}°C`
                    : "--°C"}
                </div>
              </div>
            </div>

            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={temperatureData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="time"
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.6)"
                  label={{
                    value: "Temperature",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sensor1"
                  stroke="#38A0FF"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="sensor2"
                  stroke="#BFFE01"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="sensor3"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="pressure" className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Current Pressure</span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Normal
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white">
                {pressureData.length > 0
                  ? `${pressureData[pressureData.length - 1]?.pressure?.toFixed(
                      0
                    )} hPa`
                  : "-- hPa"}
              </div>
            </div>

            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={pressureData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="time"
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.6)"
                  label={{
                    value: "Pressure (hPa)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="pressure"
                  stroke="#BFFE01"
                  fill="rgba(191, 254, 1, 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="vibration" className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Vibration Level</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Safe
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white">
                {vibrationData.length > 0
                  ? `${vibrationData[
                      vibrationData.length - 1
                    ]?.vibration?.toFixed(2)} Hz`
                  : "-- Hz"}
              </div>
            </div>

            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={vibrationData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="time"
                  stroke="rgba(255,255,255,0.6)"
                  fontSize={12}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.6)"
                  label={{
                    value: "Vibration (Hz)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="vibration"
                  fill="rgba(191, 254, 1, 0.6)"
                  stroke="#BFFE01"
                  strokeWidth={1}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
