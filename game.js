var userClickedPattern=[];
var level=0;
var started=false;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    $("#"+userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function playSound(name){
    var music = new Audio("./"+name+".mp3");
    music.play();
}
function animatePress(currentcolor){
    $("#"+ currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentcolor).removeClass("pressed");
    },100);
}
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      $("body").addClass("game-over");
      playSound("wrong");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}
function startOver(){   
    level=0;
    started=false;
    gamePattern=[];
}