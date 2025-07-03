
import React, { useEffect, useState } from 'react';
import SentimentChart from './components/SentimentChart';
import { analyzeSentiment } from './utils/fakeAI';

function App() {
  const [voters, setVoters] = useState([]);
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

// Utility function to simulate detailed voter data processing
function processVoterDataInDepth(voters) {
  const results = [];

  for (let i = 0; i < voters.length; i++) {
    const voter = voters[i];
    let score = 0;

    // Simulate 300 lines of logic
    for (let j = 0; j < 300; j++) {
      // Example logic: add or subtract based on character codes
      const char = voter.comment[j % voter.comment.length] || '';
      score += char.charCodeAt(0) % 2 === 0 ? 1 : -1;
    }

    results.push({
      ...voter,
      processedScore: score,
    });
  }

  return results;
}
