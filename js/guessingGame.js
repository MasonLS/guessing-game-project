/* **** Global Variables **** */

var playersGuess, winningNumber, guesses, alreadyGuessedOnce;

/* **** Guessing Game Functions **** */

function initializeGame(){
	winningNumber = generateRandomNumber();
	guesses = [];
	alreadyGuessedOnce = false;
}

function generateRandomNumber(){
	return Math.floor(Math.random() * 100) + 1;
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = +$("#guess").val();
}

// Determine if "warmer" or "colder" than last guess

function closer(){
	var lastGuess = getLastGuess();

	if (getDifference(playersGuess, winningNumber) < getDifference(lastGuess, winningNumber)) {
		return true;
	}

	return false;
}

function getLastGuess() {
	return guesses[guesses.length-1];
}

function getDifference(a,b){
	if (a > b) {
		return a - b;
	}

	return b - a;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if (playersGuess === winningNumber) {
		guesses.push(playersGuess);
		
		$(".output").css("color", "rgb(248, 248, 248)");
		
		if (guesses.length < 8) {	
			$(".output").text("You guessed it! And it only took you " + guesses.length + " tries!");
		} else {
			$(".output").text("Wow. It took you " + guesses.length + " whole guesses. That is so pathetic.");
		}
	} else {
		$(".output").text(guessMessage());
		
		guesses.push(playersGuess);
	}
}

function guessMessage() {
	if (guesses.includes(playersGuess)) {
		$(".output").css("color", "rgb(248, 248, 248)");
		$("#output").hide();
		$("#error").show();
		return "You've already guessed that number...";
	}

	if (!alreadyGuessedOnce) {
		return initialMessage;
	} else {
		if (closer()) {
			$(".output").css("color", "rgb(253, 151, 32)");
			return "warmer";
		}
		$(".output").css("color", "rgb(102, 217, 231)");
		return "colder";
	}

}

function initialMessage() {
	var difference = getDifference(playersGuess, winningNumber);

	alreadyGuessedOnce = true;
	
	if (difference > 35) {
		$(".output").css("color", "#A8FDFF");
		return "freezing!";
	} else if (difference > 20) {
		$(".output").css("color", "rgb(102, 217, 231)");
		return "cold";
	} else if (difference > 12) {
		$(".output").css("color", "rgb(253, 151, 32)");
		return "warm";
	} else {
		$(".output").css("color", "rgb(233, 38, 114)");
		return "hot!";
	}	
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var otherRands = getOtherRandoms();
	$(".output").css("color", "rgb(248, 248, 248)");
	$(".output").text("It isn't " + otherRands[0] + ", " + otherRands[1] + ", or " + otherRands[2] + ".");
}

var getOtherRandoms = function() {
	var randArr = [];

	while (randArr.length < 3) {
		var rand = generateRandomNumber();
		if (rand !== winningNumber) {
			randArr.push(rand);
		}
	}

	return randArr;
}

// Allow the "Player" to Play Again

function playAgain(){
	initializeGame();
	$("#guess").css("color", "rgb(117, 113, 94)");
	$(".output").text("");
	$("#guess").val("//Your guess goes here");
}

// Initialize/reset global variables to start game

initializeGame();

/* **** Event Listeners/Handlers ****  */

$("button").on("click", function(){
	$("#error").hide();
	$("#output").show();
});

$(".submit").on("click", playersGuessSubmission);

$(".submit").on("click", checkGuess);

$("#guess").on("keyup", function(event) {
	if (event.which === 13) {
		$("#error").hide();
		$("#output").show();
		playersGuessSubmission();
		checkGuess();
	} else if (event.which === 8 || event.which === 37 || event.which === 39 || event.which === 16) {
		$(this).css("color", "rgb(117, 113, 94)");
	} else {
		$(this).css("color", "rgb(174, 129, 255)");
	}
})

$(".hint").on("click", provideHint);

$(".again").on("click", playAgain);
