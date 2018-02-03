// letter constructor
function Letter(letter) {
	this.value = letter;

	if(letter === " " || letter === "-") {
		this.guessed = true;
	} else {
		this.guessed = false;
	};
}; 

Letter.prototype.showLetter = function() {
	if (this.guessed) {
		return this.value.green;
	} else {
		return "_".yellow;
	};
}; 

Letter.prototype.isThisLetter = function(letterGuessed) {
	if(this.value.toUpperCase() === letterGuessed)
		this.guessed = true;
}; 

// test code
// var a = new Letter('A');
// console.log(a);
module.exports = Letter;