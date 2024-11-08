const gameState = {
  playerHand: [],
  botHands: [[], [], []],
  wall: [],
  discardedTiles: [],
  selectedTile: null,
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
  ['Coins', 'Bamboo', 'Characters'].forEach(suit => {
    for (let value = 1; value <= 9; value++) {
      tiles.push({ suit, value });
    }
  });
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
  const playerTilesDiv = document.getElementById('player-tiles');
  playerTilesDiv.innerHTML = "";
  gameState.playerHand.forEach((tile, index) => {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile');
    tileDiv.textContent = `${tile.value} ${tile.suit}`;
    tileDiv.onclick = () => selectTile(index);
    if (index === gameState.selectedTile) tileDiv.classList.add('selected');
    playerTilesDiv.appendChild(tileDiv);
  });
}

function selectTile(index) {
  if (gameState.selectedTile === index) {
    gameState.selectedTile = null;
    document.getElementById('discard-btn').disabled = true;
  } else {
    gameState.selectedTile = index;
    document.getElementById('discard-btn').disabled = false;
  }
  renderHands();
}

function drawTile() {
  if (gameState.wall.length > 0) {
    const newTile = gameState.wall.pop();
    gameState.playerHand.push(newTile);
    renderHands();
  }
}

function discardTile() {
  if (gameState.selectedTile !== null) {
    const discarded = gameState.playerHand.splice(gameState.selectedTile, 1)[0];
    gameState.discardedTiles.push(discarded);
    gameState.selectedTile = null;
    document.getElementById('discard-btn').disabled = true;
    renderHands();
    updateDiscardedTiles();
  }
}

function updateDiscardedTiles() {
  const discardedDiv = document.getElementById('discarded-tiles');
  discardedDiv.innerHTML = '';
  gameState.discardedTiles.forEach(tile => {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile');
    tileDiv.textContent = `${tile.value} ${tile.suit}`;
    discardedDiv.appendChild(tileDiv);
  });
}

function playerAction(action) {
  console.log(`${action} performed`);
}

function showHint() {
  console.log("Hint shown");
}

function toggleSound() {
  gameState.soundOn = !gameState.soundOn;
  console.log(`Sound ${gameState.soundOn ? 'On' : 'Off'}`);
}
