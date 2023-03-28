// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score
var timer = document.querySelector(".timer")
timer = startTimer(300)

function startTimer(n) {
    for (timer < 300)

}



function showQuestions() {
    var currentQuestion = questions[index];
    questionasked.textContent = currentQuestion.question;
    questionandwerchoices.textContent = ""
    // generate buttons for each answer choice to each question
    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = currentQuestion.choices[i];
        //stores users answer based off btton clicked
        button.setAttribute("user-answer", currentQuestion.choices[i]);
        //checks users answer when a button is clicked
        button.addEventListener("click", function() {
            var userAnswer = this.getAttribute("user-answer");
            //sets condition for corrent answer and increases score if that is chosen. Reduces time by 10 seconds if incorrect.
            if (userAnswer === currentQuestion.answer) {
                score ++;
            } else {
                timerCount -= 10;
            }
        })

        index++;

        if (index >= questions.length) {
            endQuiz();
        }   else {
            showQuestions();
        }

    }
}