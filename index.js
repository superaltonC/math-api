const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Generate a new question
app.get('/question', (req, res) => {

    const number1 = Math.floor(Math.random() * 20) + 1;
    const number2 = Math.floor(Math.random() * 20) + 1;

    const correctAnswer = number1 + number2;

    let options = [
        correctAnswer,
        correctAnswer + 2,
        correctAnswer - 2,
        correctAnswer + 5
    ];

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    res.json({
        question: `${number1} + ${number2} = ?`,
        correctAnswer: correctAnswer,
        options: options
    });

});

// Check if the player's answer is correct
app.post('/check', (req, res) => {

    const selectedAnswer = Number(req.body.selectedAnswer);
    const correctAnswer = Number(req.body.correctAnswer);

    res.json({
        correct: selectedAnswer === correctAnswer
    });

});

app.listen(PORT, () => {
    console.log(`Math API running at http://localhost:${PORT}`);
});