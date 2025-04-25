const animals = [
    { name: 'Lion', image: 'lion.jpg', sound: 'lion.mp3' },
    { name: 'Elephant', image: 'elephant.jpg', sound: 'elephant.mp3' },
    { name: 'Giraffe', image: 'giraffe.jpg', sound: 'giraffe.mp3' },
    { name: 'Zebra', image: 'zebra.jpg', sound: 'zebra.mp3' },
    { name: 'Lion', image: 'lion.jpg', sound: 'lion.mp3' },
    { name: 'Elephant', image: 'elephant.jpg', sound: 'elephant.mp3' },
    { name: 'Giraffe', image: 'giraffe.jpg', sound: 'giraffe.mp3' },
    { name: 'Zebra', image: 'zebra.jpg', sound: 'zebra.mp3' },
    { name: 'Tiger', image: 'tiger.jpg', sound: 'tiger.mp3' },
    { name: 'Deer', image: 'deer.jpg', sound: 'deer.mp3' },
    { name: 'Bear', image: 'bear.jpg', sound: 'bear.mp3' },
    { name: 'Tiger', image: 'tiger.jpg', sound: 'tiger.mp3' },
    { name: 'Deer', image: 'deer.jpg', sound: 'deer.mp3' },
    { name: 'Bear', image: 'bear.jpg', sound: 'bear.mp3' },
    { name: 'Panthar', image: 'panthar.jpg', sound: 'panthar.mp3' },
    { name: 'Panthar', image: 'panthar.jpg', sound: 'panthar.mp3' },
];

let flippedCards = [];
let matchedCards = [];
let timer;
let timeLeft = 60;

function startGame() {
    const shuffledAnimals = shuffle(animals);
    const board = document.querySelector('.board');
    board.innerHTML = '';  // Clear board before starting a new game

    shuffledAnimals.forEach((animal, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);

        // Create front image of the card (hidden)
        const img = document.createElement('img');
        img.src = `images/${animal.image}`;
        img.alt = animal.name;
        img.classList.add('hidden');
        card.appendChild(img);

        // Add event listener to flip the card
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    flippedCards = [];
    matchedCards = [];
    timeLeft = 60;  // Reset the timer
    document.getElementById('time-left').textContent = `Time left: ${timeLeft}`;
    startTimer();
    document.querySelector('button').disabled = true;
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);  // Shuffle the animals array
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    const img = this.querySelector('img');
    img.classList.remove('hidden');  // Reveal image when flipped
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);  // Delay for a second before checking match
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.querySelector('img').src === card2.querySelector('img').src) {
        matchedCards.push(card1, card2);
        flippedCards = [];  // Reset flipped cards

        if (matchedCards.length === animals.length) {
            alert('You Won! Great Job!');
            stopGame();
        }
    } else {
        // Hide the images again if no match
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.querySelector('img').classList.add('hidden');
        card2.querySelector('img').classList.add('hidden');
        flippedCards = [];
    }
}

function startTimer() {
    const timeDisplay = document.getElementById('time-left');
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.textContent = `Time left: ${timeLeft}`;
        } else {
            alert('Time’s up! Game Over!');
            stopGame();
        }
    }, 1000);  // Update every second
}

function stopGame() {
    clearInterval(timer);  // Stop the timer
    document.querySelector('button').disabled = false;  // Enable the button to start a new game
    document.querySelectorAll('.card').forEach(card => {
        card.removeEventListener('click', flipCard);  // Disable card clicking after the game ends
    });
}
