const gameState = {
  playerHand: [],
  botHands: [[], [], []],
  wall: [],
  currentTurn: 'player',
  score: 0,
  flowers: 0,
  animals: 0,
  soundOn: true,
  difficulty: 'easy'
};

function startGame(difficulty) {
  gameState.difficulty = difficulty;
  document.getElementById('start-page').style.display = 'none';
  document.getElementById('game-board').style.display = 'grid';
  document.getElementById('controls').style.display = 'flex';
  document.getElementById('score-display').style.display = 'block';
  initializeGame();
}

function initializeGame() {
  gameState.wall = generateTiles();
  drawStartingHands();
  renderHands();
}

function generateTiles() {
  const tiles = [];
  for (let i = 0; i < 144; i++) {
    tiles.push(`tile-${i}`);
  }
  return tiles.sort(() => Math.random() - 0.5);
}

function drawStartingHands() {
  for (let i = 0; i < 13; i++) {
    gameState.playerHand.push(gameState.wall.pop());
    gameState.botHands.forEach(botHand => botHand.push(gameState.wall.pop()));
  }
}

function renderHands() {
  const playerDiv = document.getElementById('player');
  playerDiv.innerHTML = "";
  gameState.playerHand.forEach(tileId => {
    const tileImg = document.createElement('img');
    tileImg.src = `images/${tileId}.png`; // Tile images stored in 'images' folder
    tileImg.classList.add('tile', 'drawn');
    playerDiv.appendChild(tileImg);
  });
}

function playerAction(action) {
  if (action === 'pong') {
    // Execute pong action
  } else if (action === 'chi') {
    // Execute chi action
  } else if (action === 'hu') {
    calculateScore();
  }
}

function calculateScore() {
  let flowers = 0;
  let animals = 0;
  let baseScore = 0;

  gameState.playerHand.forEach(tile => {
    if (isFlower(tile)) flowers++;
    if (isAnimal(tile)) animals++;
    baseScore += getTileScore(tile);
  });

  gameState.score = baseScore + (flowers * 10) + (animals * 20);
  displayScore(gameState.score, flowers, animals);
}

function displayScore(score, flowers, animals) {
  document.getElementById('score').textContent = score;
  document.getElementById('flowers').textContent = flowers;
  document.getElementById('animals').textContent = animals;
}

function isFlower(tile) {
  return tile.includes('flower');
}

function isAnimal(tile) {
  return tile.includes('animal');
}

function getTileScore(tile) {
  return 1; // Placeholder for actual scoring logic
}

function toggleSound() {
  gameState.soundOn = !gameState.soundOn;
  document.getElementById('mute-btn').textContent = gameState.soundOn ? 'Mute' : 'Unmute';
}

function showHint() {
  alert("Hint: Try to form a Pong with tile X");
}
