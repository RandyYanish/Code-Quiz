// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
const questionCard = document.getElementById('question-card');
const startButton = document.getElementById('start-game');
const submitButton = document.getElementById('submit-quiz');
const startCard = document.getElementById('starter-card');
const countdownTimer = document.querySelector('.timer');
const finalScore = document.getElementById('score')
const submitScoreButton = document.getElementById('submit-score');
const endCard = document.getElementById('ending-card')
const highScoreCard = document.getElementById('high-scores-card')
const listScores = document.getElementById('list-scores')

let score = 0;
let currentQuestionIndex = 0;
let quizQuestions = [];
let highScores = []

// Define the quiz questions and their answer choices
const questions = [
  {
    question: "What is the primary purpose of Web APIs?",
    choices: ["To provide a way for web applications to interact with each other", "To create dynamic web pages", "To store and retrieve data in a database", "To display web content to users"],
    answer: "To provide a way for web applications to interact with each other"
  },
  {
    question: "1 + 1 = ",
    choices: ["2","3","4","undefined"],
    answer: "2"
  },
];

// Define timeLeft at the top level
let timeLeft = 120;

// Function to start the quiz and display the first question
function startQuiz() {
  quizQuestions = questions;
  startCard.className = "hide";
  questionCard.className = "show";
  renderQuestion();
}

// Function to render a question and its answer choices
function renderQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionElem = document.querySelector('.question');
  questionElem.textContent = currentQuestion.question;
  const choicesElem = document.querySelector('.choices');
  
  currentQuestion.choices.forEach(choice => {
    const choiceElem = document.querySelector('.choice');
    choiceElem.textContent = choice;
    choiceElem.addEventListener('click', handleAnswer);
    choicesElem.appendChild(choiceElem);
  });
};

// Function to handle a user's answer choice
function handleAnswer(event) {
    const selectedChoice = event.target.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    if (selectedChoice === currentQuestion.answer) {
        score++;
        finalScore.textContent = score;
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion();
        } else {
        displayScore();
        }
    } else {
        timeLeft -= 5;
        renderQuestion();
    }
};
     

// Function to submit the user's score
function submitScore() {
    // Get the user's initials from the input field
    const initialsInput = document.getElementById('initials');
    const initials = initialsInput.value;
  
    // Create an object to store the score and initials
    const scoreObject = { score: score, initials: initials };
  
    // Add the score object to the high scores array
    highScores.push(scoreObject);
  
    // Sort the high scores array in descending order by score
    highScores.sort((a, b) => b.score - a.score);
  
    // Store the high scores array in local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Render High Score Card
    renderScores();
}

// Add event listener to start the quiz when the start button is clicked
startButton.addEventListener('click', startQuiz);

// Function to start the countdown timer
function startCountdown() { 
    // Update the timer every second
    const countdownInterval = setInterval(() => {
        // Stop the timer if time is up
        if (timeLeft <= 0 || questionCard.classList != "show") {
            countdownTimer.textContent = 0;
            clearInterval(countdownInterval);
            displayScore();
        } else {
    // Display the remaining time in the HTML element
    countdownTimer.textContent = timeLeft;
    // Decrease the time left by one second
    timeLeft--;
}
}, 1000);
};

// Function to render the user's score
function displayScore() {
    startCard.className = "hide";
    questionCard.className = "hide";
    endCard.className = "show";
};

// Function to render the high score card
function renderScores() {
    startCard.className = "hide";
    questionCard.className = "hide";
    endCard.className = "hide";
    highScoreCard.className = "show";

    const scores = JSON.parse(localStorage.getItem("highScores"));

    // If there are no scores in localStorage, display a message
    if (!scores || scores.length === 0) {
        highScoreCard.innerHTML = "<p>No high scores to display.</p>";
        return;
    }

    // Create an HTML element for each score
    const scoreList = document.createElement("ol");
    scores.forEach(score => {
        const scoreItem = document.createElement("li");
        scoreItem.textContent = `${score.initials}: ${score.score}`;
        scoreList.appendChild(scoreItem);
    });
    listScores.appendChild(scoreList);
}


// Add an event listener to the "start-game" button to call the startCountdown function when clicked
startButton.addEventListener('click', startCountdown);

// Function to change to High score card when button is clicked
document.querySelector('.high-scores').addEventListener('click', renderScores);

// Add an event listener to the "Submit Score" button
submitScoreButton.addEventListener('click', submitScore);