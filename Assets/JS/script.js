var timerEl = document.querySelector("#timer");
var viewhighscoresEl = document.querySelector("#viewhighscores");
var introEl = document.querySelector("#intro");
var highscoresEl = document.querySelector("#highscores");
var completeEl = document.querySelector("#complete");
var submitEl = document.querySelector("#submit-highscore");
var inputEl = document.querySelector("#input-initials");
var scoreEl = document.querySelector("#score");
var startEl = document.querySelector("#start-button");
var restartEl = document.querySelector("#restart-button");
var questionsEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelectorAll(".answer-button");
var answer1El = document.querySelector("#answer1");
var answer2El = document.querySelector("#answer2");
var answer3El = document.querySelector("#answer3");
var answer4El = document.querySelector("#answer4");
var answerResultEl = document.querySelector("#answer-result");
var highscoreListEl = document.querySelector("#highscore-list");
var currentQuestion = 0
var score = 0

var questionData = [
	{questionText:""},
	{answerText: ""},
	{correctAnswer: ""},
	{placeholder1: ""},
	{placeholder2: ""},
	{placeholder3: ""},
	{placeholder4: ""},
	{placeholder5: ""},
	{placeholder6: ""},
	{placeholder7: ""}]
//storing question information
questionData[0].questionText = "Which of the following can be stored within arrays";
questionData[0].answerText = ["Boolean", "String", "Number", 'All of the above'];
questionData[0].correctAnswer = 4;
questionData[1].questionText = "question 2";
questionData[1].answerText = ["not this one", "not this one either", "this one", "definitely not this one"];
questionData[1].correctAnswer = 3;
questionData[2].questionText = "question 3";
questionData[2].answerText = ["this one", "not this one", "not this one either", "definitely not this one"];
questionData[2].correctAnswer = 1;
questionData[3].questionText = "question 4";
questionData[3].answerText = ["this one", "not this one", "not this one either", "definitely not this one"];
questionData[3].correctAnswer = 1;
questionData[4].questionText = "question 5";
questionData[4].answerText = ["no", "no", "yes", "no"];
questionData[4].correctAnswer = 3;
questionData[5].questionText = "question 6";
questionData[5].answerText = ["absolutely", "definitely not", "nope", "no!"];
questionData[5].correctAnswer = 1;
questionData[6].questionText = "question 7";
questionData[6].answerText = ["click here", "don't click", "don't click", "don't click"];
questionData[6].correctAnswer = 1;
questionData[7].questionText = "question 8";
questionData[7].answerText = ["yes", "yes", "yes", "all of the above"];
questionData[7].correctAnswer = 4;
questionData[8].questionText = "question 9";
questionData[8].answerText = ["nope", "nope", "yup", "nope^2"];
questionData[8].correctAnswer = 3;
questionData[9].questionText = "question 10";
questionData[9].answerText = ["if you", "click here", "you will", "be correct"];
questionData[9].correctAnswer = 2;  

//activates the timer with a specified time
function setTimer(time) {
	var time;
	timerEl.style.visibility = "visible";
	timerEl.textContent = time;
	var timerInterval = setInterval(function() {
		time--;
		timerEl.textContent = time;
		if(time === 0) {
			timerEl.style.visibility = "hidden";
			endQuiz();
		}	
		console.log("timer running")
}, 1000);
}

//Ends the quiz
function endQuiz() {
	currentQuestion = 0;
	timerEl.style.visibility = "Hidden";
	questionsEl.style.visibility = "Hidden";
	completeEl.style.visibility = "Visible";
	scoreEl.textContent = "You scored " + score + " points";
	clearInterval(timerInterval);
}

//sets the question text to that of the current question
function setQuestionText(questionNumber) {
	var questionNumber
	questionEl.textContent = questionData[questionNumber].questionText;
	answer1El.textContent = questionData[questionNumber].answerText[0];
	answer2El.textContent = questionData[questionNumber].answerText[1];
	answer3El.textContent = questionData[questionNumber].answerText[2];
	answer4El.textContent = questionData[questionNumber].answerText[3];
}

//displays if the answer was correct or incorrect
function showResult(isCorrect) {
	answerResultEl.style.visibility = "Visible";
	var isCorrect
	if (isCorrect === true) {
		answerResultEl.textContent = "Correct";
		answerResultEl.style.color = "green";
	}
	else{
		answerResultEl.textContent = "Incorrect";
		answerResultEl.style.color = "red";
	}
	var timerInterval = setInterval(function() {
		answerResultEl.style.visibility = "Hidden";
		clearInterval(timerInterval);
	}, 2000);
}

//starts the quiz
startEl.addEventListener("click", function() {
	highscoresEl.style.visibility = "hidden";
	introEl.style.visibility = "hidden";
	highscoresEl.style.visibility = "hidden";
	score = 0;
	setTimer(60);
	setQuestionText(currentQuestion)
	questionsEl.style.visibility = "visible";

})

//submits score
submitEl.addEventListener("click", function() {
	completeEl.style.visibility = "hidden";
	var highscores = []
	var highscore = {
		initials:inputEl.value ,
		score:score ,
	}
	localStorage.setItem("score" + String(localStorage.length), JSON.stringify(highscore));
	for (i=0; i<localStorage.length; i++) {
		highscore = JSON.parse(localStorage.getItem("score" + String(i)));
		highscores.push(highscore)
	}
	highscores.sort((a, b) => (a.score < b.score) ? 1 : -1);
	for (i=0; i<highscores.length; i++) {
		var listItem = document.createElement("li");
		listItem.textContent = highscores[i].score + "	" + highscores[i].initials;
		highscoreListEl.appendChild(listItem);
	}
	highscoresEl.style.visibility = "Visible";
})

//takes the user to the highscore page
viewhighscoresEl.addEventListener("click", function() {
	introEl.style.visibility = "hidden";
	highscoresEl.style.visibility = "Visible";
	viewhighscoresEl.style.visibility = "hidden";
})

//returns to the first page
restartEl.addEventListener("click", function() {
	highscoresEl.style.visibility = "Hidden";
	highscoresEl.style.visibility = "Visible";
	introEl.style.visibility = "Visible";
	score = 0
})

//check if the picked answer is correct, move to next question
answersEl.forEach(answerEl => {
	answerEl.addEventListener("click", function() {
		if(answerEl === document.getElementById("answer"+questionData[currentQuestion].correctAnswer)) {
			console.log("correct");
			showResult(true);
			score++;
			currentQuestion++;
		}
		else {
			console.log("incorrect");
			showResult(false);
			currentQuestion++;
			}	

		if (currentQuestion<questionData.length) {
			setQuestionText(currentQuestion)
		}	
		else {
			endQuiz();
		}
		})
})
