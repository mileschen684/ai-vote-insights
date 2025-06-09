import React from 'react';
import { Bar } from 'react-chartjs-2';

const SentimentChart = ({ data }) => {
  const sentimentCounts = data.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(sentimentCounts),
    datasets: [
      {
        label: 'Voter Sentiment',
        data: Object.values(sentimentCounts),
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default SentimentChart;
