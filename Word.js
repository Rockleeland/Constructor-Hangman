var Letter = require("./Letter.js");

function Word(targetWord){
	// generate letter objects based on selected word
	for (var i = 0; i < targetWord.length; i++) {
		this[i] = new Letter(targetWord[i]);
	};
}; 

Word.prototype.displayWord = function() {
	
	var lettersArray = [];
	// populate array with letters or underscores
	for (letter in this) {
		if (this[letter].showLetter)
			lettersArray.push(this[letter].showLetter());
	};
	// return a string of letters or underscores
	return lettersArray.join(" ");
}; 


Word.prototype.checkIfWordContains = function(Letterguessed) {
    // for in 
	for(letter in this) {
		if (this[letter].isThisLetter)
			this[letter].isThisLetter(Letterguessed);
	};
}; 

// test code
// var cat = new Word('cat');
// console.log(cat)
// console.log(cat.displayWord('cat'));




module.exports = Word;