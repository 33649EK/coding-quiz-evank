var correctAnswers = 0;
var falseAnswers = 0;
var questionHeader = document.querySelector('#question');
const startButton = document.createElement('button');
var quizAnswersBox = document.querySelector('#quizAnswers');
var leaderboardStorage = []



// Creates the welcome message and start button
questionHeader.textContent = 'Press Start to Begin';
startButton.textContent = 'Start';
quizAnswersBox.appendChild(startButton);
startButton.addEventListener('click', startQuiz);
var time = 30
// Removes existing text and start button
//Starts the quiz function
function startQuiz(event) {
    event.preventDefault();
    questionHeader.textContent = '';
    quizAnswersBox.removeChild(startButton);
    questionGenerator();
};








// Code inspiration taken from Jay's office hour explanation
var questions = [
    {
        title: 'What is JavaScript used for?',
        choices: ['Formatting', 'Interactibility', 'Basic content',],
        answer: 'Interactibility'
    },
    {
        title: 'Question 2: What is a Boolean?',
        choices: ['A type of bean', 'A true/false variable', 'A skinny ghost'],
        answer: 'A true/false variable'
    },
    {
        title: 'Question 3: What is CSS?',
        choices: ['A language used for styling webpages', 'A programming language', 'A pain in the butt', 'All of the above'],
        answer: 'A language used for styling webpages',
        answer2: 'A pain in the butt'
    },
    {
        title: 'Question 4: Is HTML a programming language?',
        choices: ['Yes', 'No',],
        answer: 'No'
    }
];

console.log(questions.length);

var currentQuestion = 0;

function questionGenerator() {



    var questionData = questions[currentQuestion];

    if (currentQuestion < questions.length) {

        questionHeader.textContent = questionData.title;

        for (i = 0; i < questionData.choices.length; i++) {
            var questionButtons = document.createElement('button');
            quizAnswersBox.appendChild(questionButtons);
            questionButtons.textContent += questionData.choices[i];
        };
        //Increase value to move to next question the next time this function runs
        currentQuestion++;

        const questionChoiceButtons = document.querySelectorAll('button');


        //Base for the following code taken from https://www.freecodecamp.org/news/event-delegation-javascript/
        //When an answer is selected, increase correctAnswers or falseAnswers variable
        questionChoiceButtons.forEach(button => {
            button.addEventListener("click", (event) => {

                var answerChoice = event.target.innerText;

                console.log(answerChoice);

                if (answerChoice === questionData.answer || answerChoice === questionData.answer2) {
                    correctAnswers++;
                    console.log('Correct: ' + correctAnswers);
                } else {
                    falseAnswers++;
                    console.log('Incorrect: ' + falseAnswers);
                    //Credit given to James Batcheller for the following line
                    time - 3
                };

                //Remove question from header and answerChoiceButtons
                questionHeader.textContent = '';
                quizAnswersBox.innerHTML = '';

                //Restart function to present next question and answers
                questionGenerator();
            })
        })
        console.log('Question value: ' + currentQuestion);

    } else {

        document.querySelector('#timer').textContent = 'The quiz is over!'
        questionHeader.textContent = '';
        quizAnswersBox.innerHTML = '';


        function quizFinale() {
            questionHeader.textContent = 'You got ' + correctAnswers + ' out of ' + questions.length + ' answers correct!';

            //Create a form
            const form = document.createElement('form');

            //Create initals box
            const initialsBox = document.createElement('input');
            initialsBox.setAttribute('type', 'text');
            initialsBox.setAttribute('class', 'input');
            initialsBox.setAttribute('placeholder', 'Put your initials here');

            //Create submit button
            const submitButton = document.createElement('input');
            submitButton.setAttribute('type', 'submit');
            submitButton.setAttribute('class', 'submitButton');

            form.appendChild(initialsBox);
            form.appendChild(submitButton);
            quizAnswersBox.appendChild(form);

            form.addEventListener('submit', leaderboardCreator);

            //Create Leaderboard
            function leaderboardCreator(event) {
                event.preventDefault();
                quizAnswersBox.innerHTML = '';
                questionHeader.textContent = 'High Scores';

                var leaderboardInfo = {
                    initials: initialsBox.value.trim(),
                    score: correctAnswers / questions.length * 100
                };

                localStorage.setItem('score', JSON.stringify(leaderboardInfo));
                var storedInfo = JSON.parse(localStorage.getItem('score'));
                //leaderboardStorage.push(`{initials: ${storedInfo.initials}, score: ${storedInfo.score}}`)
                leaderboardStorage.push(storedInfo)

                var currentLeaderboardStorage = 0

                for (i = 0; i < leaderboardStorage.length; i++) {
                    const leaderboard = document.createElement('li');
                    leaderboard.setAttribute('class', 'leaderboard');
                    var leaderboardStorageData = leaderboardStorage[currentLeaderboardStorage]
                    leaderboard.textContent += 'User: ' + leaderboardStorageData.initials + ` Score: ${leaderboardStorageData.score}%`;
                    quizAnswersBox.appendChild(leaderboard);
                    currentLeaderboardStorage++
                }

                const restartButton = document.createElement('button');
                restartButton.setAttribute('class', 'end');
                restartButton.textContent = 'Restart';
                quizAnswersBox.appendChild(restartButton);

                restartButton.addEventListener('click', function (event) {
                    event.preventDefault()
                    time = 30
                    correctAnswers = 0
                    falseAnswers = 0
                    currentQuestion = 0
                    quizAnswersBox.innerHTML = ''
                    questionGenerator()
                })

                const clearHighScore = document.createElement('button');
                clearHighScore.setAttribute('class', 'end');
                clearHighScore.textContent = 'Clear High Scores';
                quizAnswersBox.appendChild(clearHighScore);

                clearHighScore.addEventListener('click', function (event) {
                    event.preventDefault()
                    leaderboardStorage = []
                    quizAnswersBox.innerHTML = ''
                    quizAnswersBox.appendChild(restartButton)
                })
            }
        }
        quizFinale();
    }

    function startTimer() {
        // Following taken from class repo then modified
        var timerInterval = setInterval(function () {
            let timerDisplay = document.querySelector('#timer')
            timerDisplay.textContent = `${time} seconds left`
            time--;
            if (time <= 0) {

                clearInterval(timerInterval);

                endQuiz()
                //Timer still firing after clear interval???
            }

        }, 1000);
    }

    function endQuiz() {
        currentQuestion = questions.length
        questionGenerator()
    }


    if (time > 0) {
        startTimer()
    }

}
