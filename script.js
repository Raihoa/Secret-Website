const cookieConsent = document.getElementById('cookieConsent');
const secondPrompt = document.getElementById('secondPrompt');
const rulesSection = document.getElementById('rulesSection');
const quizSection = document.getElementById('quizSection');
const questionTitle = document.getElementById('questionTitle');
const questionImage = document.getElementById('questionImage');
const quizForm = document.getElementById('quizForm');
const resultMessage = document.getElementById('resultMessage');
const reward = document.getElementById('reward');
const rewardImg = document.getElementById('rewardImg');
const laserCanvas = document.getElementById('laserCanvas');

// Questions: 5 about Giraffes and 5 about Pokémon
const questions = [
    { question: "Quelle est la hauteur maximale des girafes ?", answers: ["3,5 mètres", "5,5 mètres", "7,5 mètres"], correct: 2, img: "giraffe1.jpg" },
    { question: "Combien d'espèces de girafes existe-t-il ?", answers: ["1", "4", "9"], correct: 1, img: "giraffe2.jpg" },
    { question: "Combien d'heures par jour les girafes dorment-elles en moyenne ?", answers: ["2 heures", "5 heures", "8 heures"], correct: 0, img: "giraffe3.jpg" },
    { question: "Que mangent principalement les girafes ?", answers: ["De l'herbe", "Des feuilles", "Des insectes"], correct: 1, img: "giraffe4.jpg" },
    { question: "Combien d'os contient le cou d'une girafe ?", answers: ["7", "14", "21"], correct: 0, img: "giraffe5.jpg" },
    
    { question: "Quel est l'évolution finale de Bulbizarre ?", answers: ["Florizarre", "Reptincel", "Salamèche"], correct: 0, img: "bulbasaur.jpg" },
    { question: "Combien de Pokémon existe-t-il (en 2024) ?", answers: ["550", "1010", "850"], correct: 1, img: "pokemon.jpg" },
    { question: "Quel est le Pokémon emblème de la franchise ?", answers: ["Pikachu", "Ronflex", "Mew"], correct: 0, img: "pikachu.jpg" },
    { question: "De quel type est le Pokémon Dracaufeu ?", answers: ["Feu", "Eau", "Foudre"], correct: 0, img: "charizard.jpg" },
    { question: "Quel est le premier Pokémon dans le Pokédex ?", answers: ["Bulbizarre", "Pikachu", "Salamèche"], correct: 0, img: "pokeball.jpg" }
];

let currentQuestion = 0;
let score = 0;

// Start the quiz
document.getElementById('startQuiz').addEventListener('click', startQuiz);

// Cookie consent logic
document.getElementById('acceptCookies').addEventListener('click', () => {
    showCookieMessage();
});

document.getElementById('declineCookies').addEventListener('click', () => {
    cookieConsent.style.display = 'none';
    secondPrompt.style.display = 'flex';
});

document.getElementById('acceptAfterDecline').addEventListener('click', () => {
    showCookieMessage();
});

document.getElementById('finalDecline').addEventListener('click', () => {
    alert("Tu es la reine de la sagesse ! Les cookies sont le MAL.");
    displayRules();
});

function showCookieMessage() {
    alert("Les cookies arrivent bientôt !");
    displayRules();
}

function displayRules() {
    cookieConsent.style.display = 'none';
    secondPrompt.style.display = 'none';
    rulesSection.style.display = 'block';
}

// Start the quiz
function startQuiz() {
    rulesSection.style.display = 'none';
    quizSection.style.display = 'block';
    displayQuestion();
}

// Display each question with buttons for answers
function displayQuestion() {
    quizForm.innerHTML = '';
    const current = questions[currentQuestion];
    
    questionTitle.textContent = `${currentQuestion + 1}. ${current.question}`;
    questionImage.src = current.img;
    
    current.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => handleAnswer(index, button));
        quizForm.appendChild(button);
    });
}

function handleAnswer(selectedIndex, button) {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    button.style.backgroundColor = isCorrect ? 'green' : 'red';
    
    setTimeout(() => {
        if (isCorrect) score++;
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }, 1000);  // Delay for 1 second before moving to the next question
}

function showResult() {
    quizSection.style.display = 'none';
    const percentage = (score / questions.length) * 100;
    
    resultMessage.innerHTML = `Ton score : ${percentage.toFixed(2)}%`;
    
    if (percentage === 100) {
        show100PercentReward();
    } else if (percentage >= 70) {
        show70PercentReward();
        showTryAgainButton();  // Display retry button if score is between 70% and 100%
    } else {
        resultMessage.innerHTML += "<br>Mais tu es si intelligente mon amour, je suis sûr que tu pourrais faire mieux ! Essaie à nouveau pour tenter de gagner la récompense !";
        showTryAgainButton();
    }
}

function showTryAgainButton() {
    const tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = "Réessayer";
    tryAgainButton.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        quizSection.style.display = 'block';
        resultMessage.innerHTML = '';
        reward.style.display = 'none';  // Masquer la récompense lors du redémarrage
        displayQuestion();
    });
    resultMessage.appendChild(tryAgainButton);
}


function show70PercentReward() {
    resultMessage.innerHTML += "<br>Félicitations ! C'est pas mal du tout ! Si tu fais mieux tu pourras peut-être gagner la récompense !";
    reward.style.display = 'block';
    playConfetti();  // Play confetti animation
}

function show100PercentReward() {
    resultMessage.innerHTML += "<br>Incroyable ! Tu as tout juste ! Tu es un experte ! Voici ta récompense :";
    reward.style.display = 'block';
    rewardImg.src = "secret_place.jpg";  // Show special reward image
    playLaser();  // Play laser animation
}

// Confetti animation
function playConfetti() {
    const confettiDuration = 3000; // 3 seconds
    const confettiCount = 150; // Number of confetti pieces
    const confettiColors = ['#FFC700', '#FF0000', '#00CFFF', '#00FF00', '#FF69B4']; // Confetti colors
    const confettiElements = []; // To store the confetti DOM elements

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '1000';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.opacity = Math.random();
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random animation duration

        document.body.appendChild(confetti);
        confettiElements.push(confetti);
    }

    // Cleanup after the confettiDuration
    setTimeout(() => {
        confettiElements.forEach(confetti => confetti.remove());
    }, confettiDuration);
}

// Laser animation
function playLaser() {
    laserCanvas.style.display = 'block';
    const ctx = laserCanvas.getContext('2d');
    ctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);

    const laserDuration = 3000; // Duration of the laser animation
    const laserInterval = setInterval(() => {
        ctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);
        ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * laserCanvas.width, Math.random() * laserCanvas.height);
        ctx.lineTo(Math.random() * laserCanvas.width, Math.random() * laserCanvas.height);
        ctx.stroke();
    }, 100);

    setTimeout(() => {
        clearInterval(laserInterval);
        laserCanvas.style.display = 'none';
    }, laserDuration);
}
