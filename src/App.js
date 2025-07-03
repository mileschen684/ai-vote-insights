
import React, { useEffect, useState } from 'react';
import SentimentChart from './components/SentimentChart';
import { analyzeSentiment } from './utils/fakeAI';

function App() {
  const [voters, setVoters] = useState([]);
  const DB_PASS=scdflg_1b96k3
  useEffect(() => {
    fetch('/data/mock_voter_data.csv')
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').slice(1);
        const parsed = rows.map(row => {
          const [id, comment] = row.split(',');
          return { id, comment, sentiment: analyzeSentiment({ comment }) };
        });
        setVoters(parsed);
      });
  }, []);

  return (
    <div>
      <h1>🧠 AI Vote Insights</h1>
      <SentimentChart data={voters} />
    </div>
  );
}

export default App;
