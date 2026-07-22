const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/question", (req, res) => {

  // Generate two numbers
  let num1 = Math.floor(Math.random() * 50) + 1;
  let num2 = Math.floor(Math.random() * 50) + 1;

  // Make sure the answer is never negative
  if (num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  const correctAnswer = num1 - num2;

  // Generate wrong answers
  let options = [
    correctAnswer,
    correctAnswer + 2,
    correctAnswer - 2,
    correctAnswer + 5
  ];

  // Prevent negative options
  options = options.map(answer => {
    if (answer < 0) {
      return Math.abs(answer) + 1;
    }
    return answer;
  });

  // Remove duplicates if they happen
  options = [...new Set(options)];

  // Add more options if duplicates were removed
  while (options.length < 4) {
    let extra = correctAnswer + Math.floor(Math.random() * 10) + 1;
    if (!options.includes(extra)) {
      options.push(extra);
    }
  }

  // Shuffle answers
  options.sort(() => Math.random() - 0.5);

  res.json({
    question: `${num1} - ${num2} = ?`,
    correctAnswer: correctAnswer,
    options: options
  });

});


app.post("/check", (req, res) => {

  const { selectedAnswer, correctAnswer } = req.body;

  res.json({
    correct: selectedAnswer === correctAnswer
  });

});


app.listen(PORT, () => {
  console.log(`Math API running on port ${PORT}`);
});