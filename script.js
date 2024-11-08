const gameState = {
  playerHand: [],
  botHands: [[], [], []],
  wall: [],
  currentTurn: 'player',
  score: 0,
  flowers: 0,
  animals: 0,
  soundOn: true,
  difficulty: 'easy' // Easy, Medium, Hard
};

function initializeGame() {
  gameState.wall = generateTiles();
  drawStartingHands();
  renderHands();
}

function generateTiles() {
  // Generates tiles array following Singaporean mahjong rules, including Flowers and Animals
  return [...Array(144).keys()].sort(() => Math.random() - 0.5);
}

function drawStartingHands() {
  for (let i = 0; i < 13; i++) {
    gameState.playerHand.push(gameState.wall.pop());
    gameState.botHands.forEach(botHand => botHand.push(gameState.wall.pop()));
  }
}

function renderHands() {
  // Render player and bot hands on the table
}

function playerAction(action) {
  if (action === 'pong') {
    // Handle pong action
  } else if (action === 'chi') {
    // Handle chi action
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

  gameState.score = baseScore + (flowers * 10) + (animals * 20); // Sample scoring calculation
  displayScore(gameState.score, flowers, animals);
}

function displayScore(score, flowers, animals) {
  document.getElementById('score').textContent = score;
  document.getElementById('flowers').textContent = flowers;
  document.getElementById('animals').textContent = animals;
}

function isFlower(tile) {
  // Check if tile is a Flower
  return tile.type === 'Flower';
}

function isAnimal(tile) {
  // Check if tile is an Animal
  return tile.type === 'Animal';
}

function getTileScore(tile) {
  // Return tile score based on Singaporean rules
  return tile.value || 1;
}

function toggleSound() {
  gameState.soundOn = !gameState.soundOn;
  if (!gameState.soundOn) {
    document.getElementById('mute-btn').textContent = 'Unmute';
  } else {
    document.getElementById('mute-btn').textContent = 'Mute';
  }
}

function showHint() {
  // Show possible moves based on player's hand and tiles on the table
  alert("Hint: Try to form a Pong with tile X");
}

// Bot Actions for Different Difficulty Levels
function botAction(bot, difficulty) {
  if (difficulty === 'easy') {
    randomBotMove(bot);
  } else if (difficulty === 'medium') {
    strategicBotMove(bot);
  } else if (difficulty === 'hard') {
    advancedBotMove(bot);
  }
}

function randomBotMove(bot) {
  // Simple random action for Easy level bots
}

function strategicBotMove(bot) {
  // Slightly advanced moves for Medium level
}

function advancedBotMove(bot) {
  // More intelligent decision-making for Hard level
}

// Animation functions for tile drawing
function animateDrawTile() {
  // Add animation when a tile is drawn
}

initializeGame();
