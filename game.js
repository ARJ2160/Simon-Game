var i, j, userChosenColour, randomChosenColour, randomNumber;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var levelToggle = false;

$(document).keypress(function(){
    if(!levelToggle){
        $("#level-title").text("Level " + level);
        nextSequence();
        levelToggle = true;
    }
});
function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").html("Level " + level);

    //Random Number Generator
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Animate
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
}

$(".btn").click(function (){
    userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    //Play sound and animations
    playSound(userChosenColour);
    animatePress(userChosenColour);
});

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("*").addClass("game-over");
        setTimeout(function(){
            $("*").removeClass("game-over");
        }, 100);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        playSound("wrong");
        startOver();
    }
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function() { 
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    levelToggle = false;
}