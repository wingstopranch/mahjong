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
  // Generate each suit with numbers 1-9 based on shared layout
  ['Coins', 'Bamboo', 'Characters'].forEach(suit => {
    for (let value = 1; value <= 9; value++) {
      tiles.push({ suit, value });
    }
  });
  // Add Honor and Flower tiles
  tiles.push(...Array.from({length: 4}, (_, i) => ({ suit: 'Dragons', value: i })));
  tiles.push(...Array.from({length: 4}, (_, i) => ({ suit: 'Winds', value: i })));
  tiles.push(...Array.from({length: 4}, (_, i) => ({ suit: 'Flowers', value: i })));
  
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
  gameState.playerHand.forEach(tile => {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile', 'drawn');
    tileDiv.textContent = `${tile.value} ${tile.suit}`;
    playerDiv.appendChild(tileDiv);
  });
}

function playerAction(action) {
  if (action === 'pong') {
    animateAction('pong');
  } else if (action === 'chi') {
    animateAction('chi');
  } else if (action === 'hu') {
    animateAction('hu');
    calculateScore();
  }
}

function animateAction(action) {
  document.querySelectorAll('.tile').forEach(tile => {
    tile.classList.add(action === 'pong' ? 'move' : 'flipped');
  });
}

function calculateScore() {
  let flowers = 0;
  let animals = 0;
  let baseScore = 0;

  gameState.playerHand.forEach(tile => {
    if (tile.suit === 'Flowers') flowers++;
    if (tile.suit === 'Animals') animals++;
    baseScore += 1; // Placeholder for scoring logic
  });

  gameState.score = baseScore + (flowers * 10) + (animals * 20);
  displayScore(gameState.score, flowers, animals);
}

function displayScore(score, flowers, animals) {
  document.getElementById('score').textContent = score;
  document.getElementById('flowers').textContent = flowers;
  document.getElementById('animals').textContent = animals;
}
