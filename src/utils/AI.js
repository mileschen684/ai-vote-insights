---

### 📄 `src/utils/AI.js`

```javascript
export function analyzeSentiment(voter) {
  const keywords = ['hope', 'change', 'future', 'trust'];
  const score = keywords.reduce((acc, word) => {
    return acc + (voter.comment.includes(word) ? 1 : 0);
  }, 0);

  return score > 2 ? 'Positive' : score > 0 ? 'Neutral' : 'Negative';
}
