var buttonColor = ["red", "blue", "green", "yellow"];
// stores the randomChosenColor
var gamePattern = [];
// stores id of button clicked by user
var userClickedPattern = [];

var started = false;
var level = 0;
// checks if user has pressed any key to start game
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level  " + level);
    nextSequence();
    started = true;
  }
});
// gives id of button pressed
$(".btn").on("click", function() {
  var buttonClicked = this.classList[1];

  userClickedPattern.push(buttonClicked);
  // console.log(userClickedPattern);
  playSound(buttonClicked);
  animatePress(buttonClicked);
  checkAnswer(userClickedPattern.length - 1);
  // console.log(checkAnswer);
});
// generates next sequence in game
function nextSequence() {
  userClickedPattern = []; // when called back it resets userClickedPattern array.
  level++;
  $("#level-title").text("Level  " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

// checks if the user clicked the right button
function checkAnswer(currentLevel) {
  // currentLevel = userClickedPattern.length-1 ;
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence(); // calls back nextSequence
      }, 1000);
    }
  }
  else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart!");
    }, 2000);
    // called to reset the game
    startOver();
  }
}
// restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
// function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// function to animate the pressed boxes
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
