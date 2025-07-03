import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Brain, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function MetricsGrid({ sentimentData }) {
  const calculateOverallSentiment = () => {
    if (!sentimentData.length) return 0;
    const avg = sentimentData.reduce((sum, item) => sum + item.sentiment_score, 0) / sentimentData.length;
    return avg;
  };

  const calculateTrendingUp = () => {
    return sentimentData.filter(item => item.trending_direction === 'up').length;
  };

  const calculateAvgConfidence = () => {
    if (!sentimentData.length) return 0;
    const avg = sentimentData.reduce((sum, item) => sum + item.confidence_level, 0) / sentimentData.length;
    return avg * 100;
  };

  const totalSampleSize = sentimentData.reduce((sum, item) => sum + (item.sample_size || 0), 0);

  const metrics = [
    {
      title: "Overall Sentiment",
      value: `${(calculateOverallSentiment() * 100).toFixed(1)}%`,
      change: calculateOverallSentiment() > 0 ? "+12.3%" : "-8.7%",
      trend: calculateOverallSentiment() > 0 ? "up" : "down",
      icon: calculateOverallSentiment() > 0 ? TrendingUp : TrendingDown,
      color: calculateOverallSentiment() > 0 ? "text-green-400" : "text-red-400",
      bgColor: calculateOverallSentiment() > 0 ? "bg-green-500/20" : "bg-red-500/20"
    },
    {
      title: "AI Confidence",
      value: `${calculateAvgConfidence().toFixed(1)}%`,
      change: "+5.2%",
      trend: "up",
      icon: Brain,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    },
    {
      title: "Active Regions",
      value: new Set(sentimentData.map(item => item.region)).size.toString(),
      change: "+2",
      trend: "up",
      icon: Target,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20"
    },
    {
      title: "Total Sample Size",
      value: (totalSampleSize / 1000).toFixed(1) + "K",
      change: "+15.8%",
      trend: "up",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="glass-morphism border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {metric.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className={`text-xs flex items-center space-x-1 ${metric.color}`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{metric.change} from last week</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
