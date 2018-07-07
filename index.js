const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const questionsBank = [
	{
		question: 'Which movie won the Best Picture award in 2018?',
		answer: ['A', 'The Shape of Water'],
		possibleAnswers: ['A: The Shape of Water', 'B: Darkest Hour', 'C: Get Out', 'D: The Post'],
	},
];
let currentQuestion;
let isCorrectAnswer;
const nextQCorrectPrefixes = ['Good job! Next question is', 'Nice! Here is the next question', 'Well done mate! Alright next question'];
const nextQWrongPrefixes = ['It\'s all good, you will get it next time. Here is the next question', 'C\'mon, do better, let\'s go! Next question is'];

app.get('/', (req, res) => {
	res.status(200).send('Getting here!');
});

app.post('/question', (req, res) => {
	res.status(201);
	res.json({
		'fulfillmentText': 'test test test'
	});
});

// app.post('/question', (req, res) => {	

// 	if (req.body.intent.displayName === 'First Question') {
// 		currentQuestion = questionsBank[Math.floor(Math.random() * questionsBank.length)];

// 		res.status(200);
// 		res.json({
// 			'fulfillmentText': `Cool, whenever you're done playing, just let me know. Here is the first question: ${currentQuestion.question}. Is it ${possibleAnswers[0]}, ${possibleAnswers[1]}, ${possibleAnswers[2]}, or ${possibleAnswers[3]}?`,
// 			'source': 'First question response',
// 		});
// 	}

// 	if (req.body.intent.displayName === 'Answer') {
// 		const userAnswer = req.body.queryResult.queryText;
// 		const splitAnswer = userAnswer.split(' ');

// 		function analyzeAnswer(answer) {
// 			if (answer.toUpperCase() === currentQuestion.answer[0]) {
// 				isCorrectAnswer = true;
// 				return `That's correct, the answer is ${currentQuestion.answer[1]}.`;
// 			} else {
// 				isCorrectAnswer = false;
// 				return `That would be wrong, the answer is ${currentQuestion.answer[1]}.`;
// 			}
// 		}

// 		splitAnswer.forEach((value, i) => {
// 			if (value === 'a' || value = 'A' || value === 'b' || value = 'B' || value === 'c' || value = 'C' || value === 'd' || value = 'D') {
// 				const firstPartOfResp = analyzeAnswer(value);
// 				currentQuestion = questionsBank[Math.floor(Math.random() * questionsBank.length)];
				
// 				if (isCorrectAnswer) {
// 					const prefix = nextQCorrectPrefixes[Math.floor(Math.random() * nextQCorrectPrefixes.length)];
// 					const secondPartOfResp = `${prefix}. ${currentQuestion.question}`;
// 					res.status(200);
// 					res.json({
// 						'fulfillmentText': firstPartOfResp + secondPartOfResp,
// 						'source': 'Answer response',
// 					});
// 					return;
// 				} else {
// 					const prefix = nextQWrongPrefixes[Math.floor(Math.random() * nextQWrongPrefixes.length)];
// 					const secondPartOfResp = `${prefix}. ${currentQuestion.question}`;
// 					res.status(200);
// 					res.json({
// 						'fulfillmentText': firstPartOfResp + secondPartOfResp,
// 						'source': 'Answer response',
// 					});
// 					return;
// 				}
// 			} 
// 		});

// 	}

// });

app.listen(process.env.PORT || 8080, () => {
	console.log('Listening on port 8080');
});
