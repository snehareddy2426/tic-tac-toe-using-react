import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[timeInHistory.length - 1];
    const squares = [...current];

    if (calculateWinner(squares) || squares[index]) return;

    squares[index] = xIsNext ? 'X' : 'O';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board squares={current} onClick={handleClick} />
      <div className="status">
        <h3>{winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}</h3>
      </div>
      {winner && (
        <button className="restart-button" onClick={restartGame}>
          Restart Game
        </button>
      )}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
