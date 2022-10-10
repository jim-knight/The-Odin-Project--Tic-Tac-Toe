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
		if (i % 2 == 0) {
			square.textContent = 'X';
		} else {
			square.textContent = '0';
		}
		squares.appendChild(square);
	});
};

gameBoard();

// Player creation
const playerFactory = (name, marker, turn) => {
	return name, marker, turn;
};
const player1 = playerFactory('Player 1', 'X', true);
const player2 = playerFactory('Player 2', 'O', false);
