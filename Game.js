var Word = require("./Word.js");

function Game (category) {
	this.seven = ["Rey", "Poe", "Finn", "Phasma"];
	this.eight = ["Snoke", "Luke", "Yoda", "Rose"];
	// random word from select category
	this.targetWord = this[category][Math.floor(Math.random() * this[category].length)];
	
	// generate blanks based on selected word
	this.word = new Word(this.targetWord);
	this.displayWord = this.word.displayWord();

	// information of game
	this.guesses = [];
	this.incorrectGuesses = [];
	this.displayIncorrectGuesses = "";
	this.livesRemaining = 10;
	this.gameOver = false;
}; 

Game.prototype.evalLetter = function(letterGuessed) {
	// letter validation
	var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	// if the guess is not a letter
	if(alphabet.indexOf(letterGuessed) === -1) {
		console.log("Please input a letter.".warn);
	} else{
		// if the letter has already been guessed
		if (this.guesses.indexOf(letterGuessed) > -1) {
			console.log("You've already guessed that letter.".warn);

		// if the letter is incorrect
		} else if(this.targetWord.toUpperCase().indexOf(letterGuessed) === -1) {
			this.incorrectGuesses.push(letterGuessed.red);
			this.displayIncorrectGuesses = this.incorrectGuesses.join(" ");
			this.livesRemaining--;
			console.log("Your guess was incorrect.".yellow);

		// if the letter is correct
		} else {
			    this.word.checkIfWordContains(letterGuessed);
			this.displayWord = this.word.displayWord();
			console.log("Your guess was correct!".green);
		};

		
		this.guesses.push(letterGuessed);
	};
}; 

Game.prototype.gameState = function () {
	if(this.displayWord.indexOf("_") === -1) {
		// win
		console.log("\n You win! The force is strong with this one.\n".green.bold);
		this.gameOver = true;
	} else if (this.livesRemaining < 1) {
		// lose
		console.log("\n You lose! The dark side is strong in this one.\n".red.bold);
		this.gameOver = true;
	};
}; 

module.exports = Game;