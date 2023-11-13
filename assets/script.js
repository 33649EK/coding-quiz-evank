var correctAnswers = 0;
var falseAnswers = 0;
var questionHeader = document.querySelector('#question')
const startButton = document.createElement('button');
var quizAnswersBox = document.querySelector('#quizAnswers')
var j = 0

// Removes existing text and start button
//Starts the quiz function
function startQuiz(event) {
    event.preventDefault();
    questionHeader.textContent = ''
    quizAnswersBox.removeChild(startButton)
    console.log(correctAnswers);
    questionGenerator()
}

// Code inspiration taken from Jay's office hour explanation
var hello = [
    {
        title: 'Question 1: What is a Pineapple?',
        choices: ['A vegetable', 'A fruit', 'A fungus', 'An animal'],
        answer: 'A fruit'
    },
    {
        title: 'Question 2: What is a Boolean?',
        choices: ['A type of bean', 'A true/false variable', 'A skinny ghost'],
        answer: 'A true/false variable'
    },
    {
        title: 'Question 3: What is an object in JavaScript?',
        choices: ['A type of bean', 'A true/false variable', 'A skinny ghost'],
        answer: 'A true/false variable'
    },
    {
        title: 'Question 4: What is a Boolean?',
        choices: ['A type of bean', 'A true/false variable', 'A skinny ghost'],
        answer: 'A true/false variable'
    }
]



var currentHello = 0

function questionGenerator() {

    var helloData = hello[currentHello]
    questionHeader.textContent = helloData.title

    for (i = 0; i < helloData.choices.length; i++) {
        var questionButtons = document.createElement('button')
        quizAnswersBox.appendChild(questionButtons);
        questionButtons.textContent += helloData.choices[i];
        console.log(questionButtons)
    }


    currentHello++

    const questionChoiceButtons = document.querySelectorAll('button')


    //Base for the following code taken from https://www.freecodecamp.org/news/event-delegation-javascript/
    //When an answer is selected, increase correctAnswers or falseAnswers variable
    questionChoiceButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            var answerChoice = event.target.innerText
            console.log(answerChoice)
            if (answerChoice === helloData.answer) {
                correctAnswers++
                console.log(correctAnswers)
            } else {
                falseAnswers++
                console.log(falseAnswers)
            }

            //Remove question from header and answerChoiceButtons
            questionHeader.textContent = ''
            quizAnswersBox.innerHTML = ''

            //Restart function to present next question and answers
            questionGenerator()
        })
    })
    console.log(currentHello)
}

// Creates the welcome message and start button
questionHeader.textContent = 'Welcome to the coding quiz!';
startButton.textContent = 'Start'
quizAnswers.appendChild(startButton)

startButton.addEventListener('click', startQuiz);

