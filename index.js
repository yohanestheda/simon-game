let blue = new Audio("./sounds/blue.mp3");
let green = new Audio("./sounds/green.mp3");
let red = new Audio("./sounds/red.mp3");
let yellow = new Audio("./sounds/yellow.mp3");
let wrong = new Audio("./sounds/wrong.mp3");

let colourOptions = ["blue", "green", "red", "yellow"]

let colourSequence = [];
let userColours = [];

let level = 1;

startGame();

function startGame() {
    $(document).on("keypress", function () {
        $(document).off();
        $("#level-title").text("Level " + level);
        nextColour();
        $(".btn").on("click", function (evt) {
            pressedButton = evt.currentTarget.id;
            playSound(pressedButton);
            buttonAnimation(pressedButton);
            userColours.push(pressedButton);
            checkAnswer(pressedButton, userColours.length);

        }
        );
    });
}

function checkAnswer(colour, length) {
    if (colour == colourSequence[length - 1]) {
        if (userColours.length == colourSequence.length) {
            level++;
            $("#level-title").text("Level " + level);
            userColours = [];
            setTimeout(function () {
                nextColour();
            }
                , 700);
        }
    } else {
        wrong.play();
        $(".btn").off();
        $("#level-title").text(`Game Over. Press any key to restart.`);
        level = 1;
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }
            , 200);
        startGame();
    }
}

function playSound(activeSound) {
    eval(activeSound).play();
}

function buttonAnimation(activeButton) {
    $("#" + activeButton).addClass("pressed");
    setTimeout(function () {
        $("#" + activeButton).removeClass("pressed");
    }
        , 100);
}

function nextColour() {
    let randomNumber = Math.floor(Math.random() * 4);
    newColour = colourOptions[randomNumber];
    colourSequence.push(newColour);
    buttonAnimation(newColour);
    playSound(newColour);
    return colourOptions[randomNumber];
}