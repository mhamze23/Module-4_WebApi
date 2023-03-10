// Questions prompts

var prompts = [
    
    {
        question: "Which of the following CSS style property is used to specify an italic text?",
        choices: ["style", "font", "font-style", "-font_style.css"],
        answer: "font-style"
    },
    {
        question: "<> Is this an opening tag or a closing tag?",
        choices: ["Opening", "Closing",],
        answer: "Opening"
    },
    {
        question: "What is the difference between an opening tag and a closing tag?",
        choices: ["Opening tag has a / in front", "Closing tag has a / in front", "There is no difference"],
        answer: "Closing tag has a / in front"
    },
    {
        question: "GetHungry() returns The Hungry as:",
        choices: ["String", "Float", "Char", "Int"],
        answer: "Int"
    },
    {
        question: "What is the HTML element used to display an image?",
        choices: ["image", "picture", "img", "pic"],
        answer: "img"
    },
]

// Parent Var
var score = 0;
var currentQuestion = -1;
var remainingTime = 0;
var clock;

// Countdown Functionality
function start() {
    remainingTime = 60;
    document.getElementById("remainingTime").innerHTML = remainingTime;

    clock = setInterval(function() {
        remainingTime--;
        document.getElementById("remainingTime").innerHTML = remainingTime;

        // If timer hits below 0, the game ends
        if (remainingTime <= 0) {
            clearInterval(clock);
            endGame();
        }
    
    }, 1000);
    
    next();
}

// End of game functionality
function endGame() {
    clearInterval(clock);

    var quizContainer = `
        <h2>Game over!</h2>
        <h3>${score} /100!</h3>
        <h3> You got ${score / 10} questions correct!</h3>
        <input type="text" id="name" placeholder=" Input initials">
        <button onclick="setScore()">Set score!</button>`;

        document.getElementById("mainBody").innerHTML = quizContainer;
}

// Saving the score to the local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContainer = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br>

    <button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Play again!</button>
    
    `;

    document.getElementById("mainBody").innerHTML = quizContainer;
}

//Clears the score name and value in the local storage if the user selects "clear score"
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

// Try the quiz again (Reset game)
function resetGame() {
    clearInterval(clock);
    score = 0;
    currentQuestion = -1;
    remainingTime = 0;
    clock = null;

    document.getElementById("remainingTime").innerHTML = remainingTime;

    var quizContainer = `
    <h1>
        Coding Quiz!
    </h1>
    <h3>
        Start to play!
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("mainBody").innerHTML = quizContainer;
}

// Timer deducted by 10 sec if incorrect.
function incorrect() {
    remainingTime -=10;
    next();
}

// Score increased by 15 if correct.
function correct() {
    score += 15;
    next()
}

// Question functionality.
function next() {
    currentQuestion++;

    if (currentQuestion > prompts.length - 1) {
        endGame();
        return;
    }

    var quizContainer = "<h2>" + prompts[currentQuestion].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < prompts[currentQuestion].choices.length; buttonLoop++) {        
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";         
        buttonCode = buttonCode.replace("[CHOICE]", prompts[currentQuestion].choices[buttonLoop]);        
        
        if (prompts[currentQuestion].choices[buttonLoop] == prompts[currentQuestion].answer) {           
             buttonCode = buttonCode.replace("[ANS]", "correct()");        
        }   else { 
               buttonCode = buttonCode.replace("[ANS]", "incorrect()");       
             }        
             quizContainer += buttonCode   
    }
    
    document.getElementById("mainBody").innerHTML = quizContainer;
}