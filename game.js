
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[]; 
var userClickedPattern=[];

// Tracking game statrted or not
var started=false;
var level=0;

// Detect keyboard key pressed
$(document).keypress(function(){
  if (!started) {

    // h1 title at game starts
    $("#level-title").text("Level" +level);
    nextSequence();
    started=true;
  }
});

// To check buttons clicked and trigger handler function
$(".btn").click(function() {
 
  // Store the Id of the buttons clicked
  var userChosenColour= $(this).attr("id");   
  userClickedPattern.push(userChosenColour);
  
  // console.log(userClickedPattern);
// Add sounds to button clicks
  playSound(userChosenColour);
  animatePress(userChosenColour);

// Calling user answer and passing in last answer in the user's sequence
  checkAnswer(userClickedPattern.length-1);
});
 

// Checks the most recent answer the same as game pattern
function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    // console.log("success");
    // Checks user's recent answer is right and finished sequence
    
    if (userClickedPattern.length== gamePattern.length) {
      // Call nextSequence after 1000  millisecond delay
      setTimeout(function () {
      nextSequence();
    }, 1000);
  }
} else {
  // console.log("wrong");
// Add class if user answers wrong then remove it after 200 milliseconds 

playSound("wrong");
$("body").addClass("game-over");

// Change title and press Any Key to Restart if user got answer wrong
$("#level-title").text("Game Over,Press Any Key to Restart");

setTimeout(function () {
  $("body").removeClass("game-over");
}, 200);

 
// call if user gets sequence wrong

startOver();

}

}

// Once nextSequence triggred,reset to an empty array ready for next level

function nextSequence() {
userClickedPattern=[];
level++;
$("#level-title").text("Level " + level);

var randomNumber=Math.floor(Math.random() *4);
 var randomChosenColour =buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 playSound(randomChosenColour);
}

//  Adding class to the button that inside function

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

//  Removing the pressed class after 100 miliseconds

  setTimeout(function () {
    $("#"+ currentColor).removeClass("pressed");
  }, 100);
  }

// Function with single input parameter

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  }


// New StatOver function to restart the game and reset the value of level
function startOver() {
level= 0;
gamePattern = [];
started =false;

}








