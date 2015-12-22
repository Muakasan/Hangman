var consonants = "BCDFGHJKLMNPQRSTVWXYZ";

//hides the guessing input field until you choose a category
$("#guess-input-div").hide();

function setupWord(word){
		//splits string into a list of strings of length 1 and maps over them
		var displayword = word.split("").map(function(x){
			//if its a consonant replace it with a _ 
			if(consonants.indexOf(x.toUpperCase()) > -1)
			{
				return "_";
			}
			else
			{
				return x;
			}
		//add in spaces between letters
		}).join(" ");
		//sets the h1 to the word to display
		$("#word").text(displayword);
		//hides the dropdown when playing
		$("#choose-category-dropdown-div").hide();
		//shows the input field so you can start guessing
		$("#guess-input-div").show();
}

function updateStickFigure(numParts){
	var parts = [$("#stick-figure-head"), $("#stick-figure-body"), $("#stick-figure-left-arm"), $("#stick-figure-right-arm"), $("#stick-figure-right-leg"), $("#stick-figure-left-leg")];
	for(var x = 0; x < numParts; x++)
	{
		parts[x].attr("visibility", "visible");
	}
}

function resetGame(){
	location.reload();
}

function play(word){
	var wordToGuess = word.toUpperCase();
	setupWord(word);
	var incorrectGuesses = new Set();
	//Checks for when enter is pressed in the input field
	$("#guess-input").keydown(function(e){
		if(e.keyCode === 13){
 		var wordDisplayed = $("#word").text();
			var guess = $("#guess-input").val().toUpperCase();
			//if its just a single letter
			if(guess.length === 1)
			{
				//checks if its a valid guess
				if(consonants.indexOf(guess) > -1)
				{
					//checks if the guess is correct or incorrect
					if(wordToGuess.indexOf(guess) > -1)
					{
						var wordToDisplay = wordDisplayed.slice(0);
						for(var x = 0; x < word.length; x++)
						{
							if(wordToGuess.slice(x, x+1) === guess)
							{
								wordToDisplay = wordToDisplay.slice(0, x*2) + word.charAt(x) + wordToDisplay.slice(x*2+1);
							}
						}
			 		$("#word").text(wordToDisplay);
 					
 					//if there are no blanks then they have won
		 			if(wordToDisplay.indexOf("_") === -1)
		 			{
		 				alert("You Win!");
		 				resetGame();
		 			}
					}
					else
					{
						incorrectGuesses.add(guess);
	 				//number of wrong guesses is the number of parts that should be shown
						updateStickFigure(incorrectGuesses.size);
					}
				}
				else
				{
					alert("That is not a valid guess. You can only guess consonants");
				}
			}
			else if(guess.length !== 0)
			{
				//checks if the guess was correct
				if(guess.split(" ").join("") === wordToGuess.split(" ").join(""))
				{
					//do I want to make this better?
					alert("That is the correct answer. You win!");
					resetGame();
				}	
				else
				{
					incorrectGuesses.add(guess);
 				//number of wrong guesses is the number of parts that should be shown
					updateStickFigure(incorrectGuesses.size);
				}
			}
			$("#guess-input").val("");

			//checks if they have run out of guesses
			if(incorrectGuesses.size === 6)
			{
				alert("Sorry you lost! The word was " + word);
				resetGame();
			}
		}
	});
	//$("#stick-figure-head").css("visibility", "visible");
}
	
	//when the user selects the data structures option
$("#option-data-structures").click(function(){
	var potentialWords = ["array list", "hash map", "binary tree", "priority queue", "Linked List"];
	var randomWord = potentialWords[Math.floor(Math.random()*5)];
	play(randomWord);
});

	//when the user selects the programming languages option
$("#option-programming-languages").click(function(){
	var potentialWords = ["Javascript", "Objective C", "Scala", "Python", "C plus plus"];
	var randomWord = potentialWords[Math.floor(Math.random()*5)];
	play(randomWord);
});

	//when the user selects the sorts option
$("#option-sorts").click(function(){
	var potentialWords = ["bubble", "insertion", "selection", "quick", "merge"];
	var randomWord = potentialWords[Math.floor(Math.random()*5)];
	play(randomWord);
});			