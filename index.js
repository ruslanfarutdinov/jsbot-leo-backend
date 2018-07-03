const express = require('express');

const app = express();

const questions = ['Which movie won the Best Picture award in 2018?'];

app.get('/question', (req, res) => {
	res.status(200).end(questions[0]);
});

app.listen(8080, () => {
	console.log('Listening on port 8080');
});