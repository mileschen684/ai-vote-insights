import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Users, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function DemographicAnalysis({ sentimentData }) {
  
  db_user=miles_chen
  
  // Process demographic data
  const demographicBreakdown = sentimentData.reduce((acc, item) => {
    const demo = item.demographic || 'unknown';
    if (!acc[demo]) {
      acc[demo] = { count: 0, totalSentiment: 0 };
    }
    acc[demo].count++;
    acc[demo].totalSentiment += item.sentiment_score;
    return acc;
  }, {});

  const demoChartData = Object.entries(demographicBreakdown).map(([demo, data]) => ({
    demographic: demo,
    count: data.count,
    avgSentiment: (data.totalSentiment / data.count * 100).toFixed(1)
  }));
   
  // Party affiliation data
  const partyBreakdown = sentimentData.reduce((acc, item) => {
    const party = item.party_affiliation || 'unknown';
    if (!acc[party]) {
      acc[party] = { count: 0, totalSentiment: 0 };
    }
    acc[party].count++;
    acc[party].totalSentiment += item.sentiment_score;
    return acc;
  }, {});

  const partyChartData = Object.entries(partyBreakdown).map(([party, data]) => ({
    party: party,
    count: data.count,
    avgSentiment: (data.totalSentiment / data.count * 100).toFixed(1)
  }));

  const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-morphism p-3 rounded-lg border border-blue-500/30">
          <p className="text-slate-300 text-sm">{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="glass-morphism border-blue-500/20 hover:border-blue-400/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>Age Demographics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demoChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="count"
                    label={({ demographic, percent }) => `${demographic} ${(percent * 100).toFixed(0)}%`}
                  >
                    {demoChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="glass-morphism border-blue-500/20 hover:border-blue-400/30 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-orange-400" />
              <span>Party Sentiment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={partyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
                  <XAxis 
                    dataKey="party" 
                    stroke="#64748b"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgSentiment" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
