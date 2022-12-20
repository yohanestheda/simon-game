let colourOptions = ["blue", "green", "red", "yellow"]
let level = 1;
let colourSequence = [];
let userColours = [];

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
        playSound("wrong");
        $(".btn").off();
        $("#level-title").text(`Game Over. Press any key to restart.`);
        level = 1;
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }
            , 200);
        colourSequence = [];
        userColours = [];
        startGame();
    }
}

function playSound(activeSound) {
    let sound = new Audio("./sounds/" + activeSound + ".mp3");
    sound.play();
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