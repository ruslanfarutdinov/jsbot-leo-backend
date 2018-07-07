const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const questionsBank = [
	{
		question: 'Which movie won the Best Picture award in 2017?',
		answer: ['A', 'The Shape of Water'],
		possibleAnswers: ['A: The Shape of Water', 'B: Darkest Hour', 'C: Get Out', 'D: The Post'],
	},
	{
		question: 'Who won Best Actor in 2017?',
		answer: ['C', 'Gary Oldman'],
		possibleAnswers: ['A: Brad Pitt', 'B: Denzel Washington', 'C: Gary Oldman', 'D: Samuel L. Jackson'],
	},
	{
		question: 'Which actress got the Best Actress award in 2016?',
		answer: ['A', 'Emma Stone'],
		possibleAnswers: ['A: Emma Stone', 'B: Brie Larson', 'C: Julianne Moore', 'D: Cate Blanchett'],
	},
	{
		question: 'Who got the Best Director award in 2017?',
		answer: ['D', 'Guillermo del Toro'],
		possibleAnswers: ['A: Christopher Nolan', 'B: Mel Gibson', 'C: Danny Boyle', 'D: Guillermo del Toro'],
	}
];
let currentQuestion;
let isCorrectAnswer;
const correctAnswerPrefixes = ['That\'s correct.', 'Yep. Correct!', 'Correct!', 'You are correct!'];
const wrongAnswerPrefixes = ['Nope. Wrong.', 'That would be wrong.', 'Almost, but not quite. '];
const nextQCorrectPrefixes = ['Good job! Next question is', 'Nice! Here is the next question', 'Well done mate! Alright next question'];
const nextQWrongPrefixes = ['It\'s all good, you will get it next time. Here is the next question', 'C\'mon, do better, let\'s go! Next question is'];

app.get('/', (req, res) => {
	res.status(200).send('We don\'t collect any data from the users of Oscars Trivia Chatbot.');
});

app.post('/question', (req, res) => {	
	console.log(req.body);

	if (req.body.queryResult.intent.displayName === 'First Question') {
		currentQuestion = questionsBank[Math.floor(Math.random() * questionsBank.length)];

		res.status(200);
		res.json({
			'fulfillmentText': `Cool, whenever you're done playing, just let me know. Here is the first question: ${currentQuestion.question} Is it ${currentQuestion.possibleAnswers[0]}, ${currentQuestion.possibleAnswers[1]}, ${currentQuestion.possibleAnswers[2]}, or ${currentQuestion.possibleAnswers[3]}?`,
			'source': 'First question response',
		});
	}

	if (req.body.queryResult.intent.displayName === 'Answer') {
		const userAnswer = req.body.queryResult.queryText;
		const splitAnswer = userAnswer.split(' ');

		function analyzeAnswer(answer) {
			if (answer.toUpperCase() === currentQuestion.answer[0]) {
				isCorrectAnswer = true;
				return `${correctAnswerPrefixes[Math.floor(Math.random() * correctAnswerPrefixes.length)]} The answer is ${currentQuestion.answer[1]}.`;
			} else {
				isCorrectAnswer = false;
				return `${wrongAnswerPrefixes[Math.floor(Math.random() * wrongAnswerPrefixes.length)]} The answer is ${currentQuestion.answer[1]}.`;
			}
		}

		splitAnswer.forEach((value) => {
			if (value === 'a' || value === 'A' || value === 'b' || value === 'B' || value === 'c' || value === 'C' || value === 'd' || value === 'D') {
				const firstPartOfResp = analyzeAnswer(value);
				currentQuestion = questionsBank[Math.floor(Math.random() * questionsBank.length)];
				
				if (isCorrectAnswer) {
					const prefix = nextQCorrectPrefixes[Math.floor(Math.random() * nextQCorrectPrefixes.length)];
					const secondPartOfResp = ` ${prefix}. ${currentQuestion.question} Is it ${currentQuestion.possibleAnswers[0]}, ${currentQuestion.possibleAnswers[1]}, ${currentQuestion.possibleAnswers[2]}, or ${currentQuestion.possibleAnswers[3]}?`;
					res.status(200);
					res.json({
						'fulfillmentText': firstPartOfResp + secondPartOfResp,
						'source': 'Answer response',
					});
					return;
				} else {
					const prefix = nextQWrongPrefixes[Math.floor(Math.random() * nextQWrongPrefixes.length)];
					const secondPartOfResp = ` ${prefix}. ${currentQuestion.question} Is it ${currentQuestion.possibleAnswers[0]}, ${currentQuestion.possibleAnswers[1]}, ${currentQuestion.possibleAnswers[2]}, or ${currentQuestion.possibleAnswers[3]}?`;
					res.status(200);
					res.json({
						'fulfillmentText': firstPartOfResp + secondPartOfResp,
						'source': 'Answer response',
					});
					return;
				}
			} 
		});
	}

});

app.listen(process.env.PORT || 8080, () => {
	console.log('Listening on port 8080');
});
