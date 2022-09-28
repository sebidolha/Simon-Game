
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSquence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}

$(".btn").click(function()
{
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor)
{
  var activeButton = $("." + currentColor);
  activeButton.addClass("pressed");

  setTimeout(function()
  {
    activeButton.removeClass("pressed");
  }, 100);
}

$(document).keydown(function()
{
  if (!started)
  {
    $("#level-title").text("Level " + level);
    nextSquence();
    started = true;
  }
});

function checkAnswer(currentLevel)
{
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function()
      {
        nextSquence();
      },1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver()
{
  level = 0;
  started = false;
  gamePattern = [];
}
