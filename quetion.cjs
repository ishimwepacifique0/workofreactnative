const readline = require('readline');

let questions = [];
const sampleQuestions = [
    {
        text: 'What is the capital of France?',
        options: ['London', 'Paris', 'Berlin', 'Rome'],
        answerIndex: 1 
    },
    {
        text: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
        answerIndex: 0
    },
    {
        text: 'Who wrote the famous play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'F. Scott Fitzgerald'],
        answerIndex: 0
    }
];

function loadQuestions() {
    questions = sampleQuestions;
}

function displayQuestion(question) {
    console.log(question.text);
    question.options.forEach((option, index) => console.log(`${index + 1}. ${option}`));
}

function checkAnswer(questionIndex, selectedOptionIndex) {
    const question = questions[questionIndex];
    const correctAnswerIndex = question.answerIndex;
    if (selectedOptionIndex === correctAnswerIndex) {
        console.log('Correct!');
    } else {
        console.log('Incorrect!');
    }
}

function startQuiz() {
    loadQuestions();
    let currentQuestionIndex = 0;

    function askQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            console.log(`Question ${currentQuestionIndex + 1}:`);
            displayQuestion(question);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Your answer: ', (answer) => {
                const selectedOptionIndex = parseInt(answer) - 1;
                checkAnswer(currentQuestionIndex, selectedOptionIndex);
                rl.close();
                currentQuestionIndex++;
                askQuestion(); // Ask the next question
            });
        } else {
            console.log('Quiz completed!');
        }
    }

    askQuestion(); // Start asking questions
}

startQuiz();
