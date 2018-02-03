var inquirer = require("inquirer");
var colors = require("colors");
var Game = require("./Game.js");

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

function newGame () {
	// prompt user to pick a category
	readyPrompt = {
		type: "list",
		message: "Pick your episode:".warn,
		choices: ["seven", "eight"],
		name: "category"
	};

	inquirer.prompt(readyPrompt).then(response => {
		// create new game object using the user's response
		var game = new Game(response.category.toLowerCase());
		// display empty word
		clearScreen();
		console.log(`\n  ${game.displayWord}\n`);
		// initiate the user input loop
		guessLoop(game);

	}); 
}; 

// guess
function guessLoop(game) {
	function guessALetter() {
		var guessALetterPrompt = {
			type: "input",
			message: "Guess a letter!".warn,
			name: "guessedLetter"
		};

		return inquirer.prompt(guessALetterPrompt)
	}; 

	// create promise
	var guessAllLetters = Promise.resolve();

	// if game is not over, this will run input loop
	if (game.gameOver === false) {

		guessAllLetters = guessAllLetters
		.then(guessALetter)
		.then(response => {
			clearScreen();
			game.evalLetter(response.guessedLetter.trim().toUpperCase())
		})
		.then(() => console.log(`\nIncorrect Guesses: ${game.displayIncorrectGuesses}`))
		.then(() => console.log(`Lives Remaining: ${game.livesRemaining}`))
		.then(() => console.log(`\n  ${game.displayWord}\n`))
		.then(() => game.gameState())
		.then(() => guessLoop(game))

	} else {
		// if game is over, prompt to play again
		var playAgainPrompt = {
			type: "list",
			message: "Would you like to play again?",
			choices: ["Yes!", "No"],
			name: "playAgain"
		};

		inquirer.prompt(playAgainPrompt).then(response => {
			if(response.playAgain === "Yes!") {
				clearScreen();
				newGame();
			} else {
				return clearScreen();
			};
		});
	}; 
}; 

// This function clears the node screen
function clearScreen () {
	process.stdout.write('\x1B[2J\x1B[0f');
}; 

// initializes the game
clearScreen();
console.log("Welcome to Star Wars Hangman!".bgYellow.black);
newGame();