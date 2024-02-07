import React, { useState, useEffect } from 'react';
import {
  Gi3DGlasses,
  Gi3DStairs,
  GiBeachBag,
  GiBarefoot,
  GiBatteredAxe,
  GiBilledCap,
  GiBottleCap,
  GiBrokenHeart,
} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const MemoryMatchingGame = () => {
  const symbols = [
    <Gi3DGlasses size={20} />,
    <Gi3DStairs size={20} />,
    <GiBeachBag size={20} />,
    <GiBarefoot size={20} />,
    <GiBatteredAxe size={20} />,
    <GiBilledCap size={20} />,
    <GiBottleCap size={20} />,
    <GiBrokenHeart size={20} />,
  ];
  const cardsPerRow = 4;
  const initialCards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState(initialCards);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [disableClick, setDisableClick] = useState(false);
  const [timer, setTimer] = useState({ seconds: 0, milliseconds: 0 }); // State to hold the time elapsed
  const [timerRunning, setTimerRunning] = useState(false); // State to control timer running

  useEffect(() => {
    // Start the timer when the first card is flipped
    if (flippedIndexes.length === 1 && !timerRunning) {
      setTimerRunning(true);
    }

    // Stop the timer when all cards are matched
    if (matchedPairs.length === symbols.length) {
      setTimerRunning(false);
    }
  }, [flippedIndexes, matchedPairs, symbols.length, timerRunning]);

  useEffect(() => {
    let intervalId;
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          let newMilliseconds = prevTimer.milliseconds + 10;
          let newSeconds = prevTimer.seconds;
          if (newMilliseconds >= 1000) {
            newMilliseconds -= 1000;
            newSeconds += 1;
          }
          return { seconds: newSeconds, milliseconds: newMilliseconds };
        }); // Increment timer every 10 milliseconds
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning]);

  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const [index1, index2] = flippedIndexes;
      if (cards[index1] === cards[index2]) {
        setMatchedPairs((prev) => [...prev, cards[index1]]);
      }
      setTimeout(() => {
        setFlippedIndexes([]);
        setDisableClick(false);
      }, 1000);
    }
  }, [flippedIndexes, cards]);

  const handleClick = (index) => {
    if (disableClick || flippedIndexes.length === 2 || matchedPairs.includes(cards[index])) {
      return;
    }

    if (flippedIndexes.length === 1 && flippedIndexes[0] === index) {
      // Clicked the same card twice, do nothing
      return;
    }

    setFlippedIndexes((prev) => [...prev, index]);

    if (flippedIndexes.length === 1 && flippedIndexes[0] !== index) {
      setDisableClick(true);
    }
  };

  const handleReset = () => {
    setCards(initialCards.sort(() => Math.random() - 0.5));
    setFlippedIndexes([]);
    setMatchedPairs([]);
    setDisableClick(false);
    setTimer({ seconds: 0, milliseconds: 0 }); // Reset timer
    setTimerRunning(false);
  };

  const renderCard = (index) => (
    <button
      className={`memory-card ${flippedIndexes.includes(index) ? 'flipped' : ''} ${
        matchedPairs.includes(cards[index]) ? 'matched' : ''
      }`}
      onClick={() => handleClick(index)}
      key={index}
    >
      {flippedIndexes.includes(index) || matchedPairs.includes(cards[index]) ? cards[index] : '?'}
    </button>
  );

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < cards.length; i += cardsPerRow) {
      rows.push(
        <div className="memory-row" key={i}>
          {cards.slice(i, i + cardsPerRow).map((_, index) => renderCard(i + index))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className='general-container'>
            <Link to="/"><IoMdArrowRoundBack size={40} className='back-button'/></Link>
       <div className="memory-game">
      {renderRows()}
      <div className="game-info">
        <div>{`Matched pairs: ${matchedPairs.length}/${symbols.length}`}</div>
        <div>{`Time elapsed: ${timer.seconds}.${timer.milliseconds} seconds`}</div> {/* Display time elapsed */}
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
    </div>
  );
};

export default MemoryMatchingGame;
