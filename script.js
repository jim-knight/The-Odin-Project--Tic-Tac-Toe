'use strict';

// Gameboard creation
const gameBoard = () => {
	// Generating the board array
	let board = [];
	for (let i = 0; i < 9; i++) {
		board.push('');
	}

	// Inserting board into DOM
	const squares = document.querySelector('.squares');
	board.forEach((square, i) => {
		square = document.createElement('div');
		square.className = 'square';
		squares.appendChild(square);
		square.addEventListener('click', playerClick);
	});
	return board;
};

// Checking for clicks on the board
const playerClick = (e) => {
	const squareOwner = e.target.dataset.owner;
	if (squareOwner) {
		return console.log(
			'This spot has already been chosen by the other player! Select another square'
		);
	} else {
		e.target.dataset.owner = game.activePlayer.name;
		e.target.innerHTML = `<i class="fa-regular fa-${game.activePlayer.marker}"></i>`;
	}
	console.log(gameBoard.board);
	game.checkWin();
	game.changePlayer();
};
// Event listener
// Array.from(squares.children).forEach((square, i) => {
// 	square.addEventListener('click', () => {
// 		// If square has already been clicked, return an error message and make user select again.
// 		if (square.dataset.owner) {
// 			return console.log(
// 				'This spot has already been chosen! Select another square'
// 			);
// 		}
// 		// Adds player to board array
// 		board[i] = game.activePlayer.name;

// 		// DOM adjustments
// 		square.dataset.owner = game.activePlayer.name;
// 		square.innerHTML = `<i class="fa-regular fa-${game.activePlayer.marker}"></i>`;

// 		// Check for a win
// 		game.checkWin();
// 		game.changePlayer();
// 	});
// });

const game = (() => {
	// Player creation
	const playerCreator = (name, marker) => {
		return { name, marker };
	};
	const player1 = playerCreator('Player 1', 'xmark');
	const player2 = playerCreator('Player 2', 'circle');

	// Initial state
	let activePlayer = player1;

	// Change players
	function changePlayer() {
		this.activePlayer === player1
			? (this.activePlayer = player2)
			: (this.activePlayer = player1);
	}

	// Check for a game win
	function checkWin() {}

	return {
		activePlayer,
		changePlayer,
		checkWin,
	};
})();

gameBoard();
