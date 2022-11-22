var timer = document.querySelector("#timer");
var start = document.querySelector("#start-button");
var answers = document.querySelector("#questions");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var question = [{
	answer: ["css", "java", "html", "bootstrap"]
}
  ,{
	answer: [4, 3, 5, 1]
}]

function setTimer(time) {
	var time;
	timer.style.visibility = "visible";
	timer.textContent = time;
	var timerInterval = setInterval(function() {
		time--;
		timer.textContent = time;
		if(time === 0) {
			timer.style.visibility = "hidden";
			clearInterval(timerInterval);
		}	
		
}, 1000);
}


start.addEventListener("click", function() {
	start.style.visibility = "hidden";
	setTimer(60);
	answers.style.visibility = "visible";

})

var test = question[0].answer[2]
console.log(test)
