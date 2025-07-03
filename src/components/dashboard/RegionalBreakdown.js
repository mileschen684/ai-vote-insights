import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

export default function RegionalBreakdown({ sentimentData }) {
  // Group data by region and calculate averages
  const regionalData = sentimentData.reduce((acc, item) => {
    if (!acc[item.region]) {
      acc[item.region] = {
        region: item.region,
        sentiments: [],
        sampleSizes: [],
        trends: []
      };
    }
    acc[item.region].sentiments.push(item.sentiment_score);
    acc[item.region].sampleSizes.push(item.sample_size || 0);
    acc[item.region].trends.push(item.trending_direction);
    return acc;
  }, {});

  const processedData = Object.values(regionalData).map(data => ({
    region: data.region,
    avgSentiment: data.sentiments.reduce((sum, s) => sum + s, 0) / data.sentiments.length,
    totalSample: data.sampleSizes.reduce((sum, s) => sum + s, 0),
    dominantTrend: data.trends.sort((a,b) =>
      data.trends.filter(v => v === a).length - data.trends.filter(v => v === b).length
    ).pop()
  })).sort((a, b) => b.avgSentiment - a.avgSentiment);

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="glass-morphism border-blue-500/20 hover:border-blue-400/30 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span>Regional Sentiment Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processedData.slice(0, 8).map((region, index) => {
              const TrendIcon = getTrendIcon(region.dominantTrend);
              const sentimentPercentage = ((region.avgSentiment + 1) / 2) * 100; // Convert -1,1 to 0,100
              
              return (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 rounded-lg bg-slate-800/40 border border-blue-500/10 hover:border-blue-400/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-white">{region.region}</h4>
                      <Badge 
                        variant="outline" 
                        className={`${getTrendColor(region.dominantTrend)} border-current`}
                      >
                        <TrendIcon className="w-3 h-3 mr-1" />
                        {region.dominantTrend}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {(region.avgSentiment * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-slate-400">
                        {(region.totalSample / 1000).toFixed(1)}K samples
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={sentimentPercentage} 
                    className="h-2 bg-slate-700"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Negative</span>
                    <span>Positive</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
