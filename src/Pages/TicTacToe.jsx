import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const initialSquares = Array(9).fill(null);

  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    if (!xIsNext) {
      const bestMove = findBestMove(squares, 'O'); // Computer is 'O'
      if (bestMove !== -1) {
        setTimeout(() => handleClick(bestMove), 500); // delay for a more natural feel
      }
    }
  }, [squares, xIsNext]);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(initialSquares);
    setXIsNext(true);
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {squares[i]}
    </button>
  );

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every((square) => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = 'It\'s a tie!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
      <button onClick={handleReset}>Reset</button>
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

const isMovesLeft = (squares) => {
  return squares.some((square) => square === null);
};

const evaluate = (squares) => {
  const winner = calculateWinner(squares);
  if (winner === 'X') return -1;
  if (winner === 'O') return 1;
  return 0;
};

const findBestMove = (squares, player) => {
  let bestVal = -Infinity;
  let bestMove = -1;

  // Check if the center square is available and prioritize it
  if (squares[4] === null) {
    return 4;
  }

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = player;
      const moveVal = minimax(squares, 0, -Infinity, Infinity, false, player === 'O');
      squares[i] = null;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
};

const minimax = (squares, depth, alpha, beta, isMaximizing, isComputer) => {
  const score = evaluate(squares);

  if (score !== 0) {
    return isComputer ? score - depth : depth - score;
  }

  if (!isMovesLeft(squares)) {
    return 0;
  }

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = isComputer ? 'O' : 'X';
        best = Math.max(best, minimax(squares, depth + 1, alpha, beta, !isMaximizing, isComputer));
        alpha = Math.max(alpha, best);
        squares[i] = null;
        if (beta <= alpha) break; // alpha-beta pruning
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = isComputer ? 'X' : 'O';
        best = Math.min(best, minimax(squares, depth + 1, alpha, beta, !isMaximizing, isComputer));
        beta = Math.min(beta, best);
        squares[i] = null;
        if (beta <= alpha) break; // alpha-beta pruning
      }
    }
    return best;
  }
};
export default TicTacToe;
