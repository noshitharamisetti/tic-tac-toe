import React, { useState, useEffect } from 'react';
import Board from './Board';
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


const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [highScoreX, setHighScoreX] = useState(
    JSON.parse(localStorage.getItem('highScoreX')) || 0
  );
  const [highScoreO, setHighScoreO] = useState(
    JSON.parse(localStorage.getItem('highScoreO')) || 0
  );
  const winner = calculateWinner(history[stepNumber].squares);

  useEffect(() => {
    localStorage.setItem('highScoreX', JSON.stringify(highScoreX));
  }, [highScoreX]);

  useEffect(() => {
    localStorage.setItem('highScoreO', JSON.stringify(highScoreO));
  }, [highScoreO]);

  useEffect(() => {
    if (winner === 'X') {
      setHighScoreX(highScoreX + 1);
    } else if (winner === 'O') {
      setHighScoreO(highScoreO + 1);
    }
  }, [winner]);

  const handleClick = (i) => {
    const historyUpToCurrentStep = history.slice(0, stepNumber + 1);
    const current = historyUpToCurrentStep[historyUpToCurrentStep.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(historyUpToCurrentStep.concat([{ squares }]));
    setStepNumber(historyUpToCurrentStep.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl mb-4">Tic-Tac-Toe</h1>
      <div className="mb-4">
        <Board squares={history[stepNumber].squares} onClick={handleClick} />
      </div>
      <div className="text-center">
        <div className="mb-2">{status}</div>
        <div className="mb-2">High Score X: {highScoreX}</div>
        <div className="mb-2">High Score O: {highScoreO}</div>
        <button onClick={resetGame} className="px-4 py-2 bg-blue-500 text-white rounded">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Game;
