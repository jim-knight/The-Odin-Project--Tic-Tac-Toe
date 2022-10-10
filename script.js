'use strict';

// Gameboard
const gameBoard = () => {
	let board = [];

	// Player creation
	const playerFactory = (name, marker, turn) => {
		return name, marker, turn;
	};

	const player1 = playerFactory('Player 1', 'X', true);
	const player2 = playerFactory('Player 2', 'O', false);
};
