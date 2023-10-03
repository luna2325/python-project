const images = [
    "/static/images/dice1.png",
    "/static/images/dice2.png",
    "/static/images/dice3.png",
    "/static/images/dice4.png",
    "/static/images/dice5.png",
    "/static/images/dice6.png", 
];

const userDice1 = document.getElementById('first');
const userDice2 =  document.getElementById('second');
const computerDice1 = document.getElementById('third');
const ComputerDice2 = document.getElementById('fourth');
const stopButton = document.getElementById('stopButton');
const startButton = document.getElementById('startButton');

let currentIndex1 = 0;
let currentIndex2 = 0;
let userCount = 0;
let compCount = 0;
let isUserTurn = false;
let intervalId;
let userIndex1 = 0;
let userIndex2 = 0;
let compIndex1 = 0;
let compIndex2 = 0;
let rounds = 1;

function showImageUser(index1, index2) {
    userDice1.src = images[index1];
    userDice2.src = images[index2];
}

function showImageComp(index1, index2) {
    ComputerDice2.src = images[index1];
    computerDice1.src = images[index2];
}

function startUserTurn() {
    userIndex1 = Math.floor(Math.random() * 6);
    userIndex2 = Math.floor(Math.random() * 6);
    showImageUser(userIndex1, userIndex2);
}

function startCompTurn() {
    compIndex1 = Math.floor(Math.random() * 6);
    compIndex2 = Math.floor(Math.random() * 6);
    showImageComp(compIndex1, compIndex2);
}

function stopImageSlider() {
    clearInterval(intervalId);
}

function startImageSlider() {
    if (isUserTurn) {
        isUserTurn = false;
        intervalId = setInterval(() => {
        startUserTurn();
    }, 100); 
    }
    else {
        isUserTurn = true;
        compId = setInterval(() => {
            startCompTurn();
        }, 100); 
        // stopping the function after 3 seconds
        setTimeout(()=>{
            console.log(compCount)
            clearInterval(compId);
            document.getElementById('stopButton').style.display = "inline";
            document.getElementById('startButton').style.display = "inline";
        }, 3000);
    }
}


startButton.addEventListener('click', () => {
    startImageSlider();
})

stopButton.addEventListener('click', () => {
    stopImageSlider();
    if (rounds <= 3){
        document.getElementById('stopButton').style.display = "none";
        document.getElementById('startButton').style.display = "none";
        compCount += compIndex1 + compIndex2
        userCount += userIndex1 + userIndex2;
        document.getElementById("user").innerHTML = `Player: ${userCount}`;
        document.getElementById("computer").innerHTML = `Computer: ${compCount}`;
        rounds++;
        document.querySelector('h1').innerHTML = `Round ${rounds}`;
        startImageSlider();
    }
    else {
        compCount += compIndex1 + compIndex2
        userCount += userIndex1 + userIndex2;
        const currentValues = {
            user: userCount,
            computer: compCount,
    
        };
        fetch('/check-winner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'current_values': currentValues}),
        })
        .then(response =>  {if (response.redirected) {
            window.location.href = response.url; // Redirect to the HTML page
        } else {
            return response.json();
        }})
        .then(data => {
            console.log(data.message); 
        });
    
    }
});

startImageSlider();

