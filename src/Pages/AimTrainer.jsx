import React, { useState, useEffect } from 'react';
import { FaCrosshairs } from "react-icons/fa";

const AimTrainerPlayField = () => {
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
    const [timer, setTimer] = useState({ seconds: 30, milliseconds: 0 });
    const [timerRunning, setTimerRunning] = useState(false);
    const [count, setCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Function to generate random coordinates within the div
        const generateRandomCoordinates = () => {
            const div = document.querySelector(".aim-trainer-play-field");
            const maxWidth = div.offsetWidth;
            const maxHeight = div.offsetHeight;
            const newX = Math.floor(Math.random() * maxWidth);
            const newY = Math.floor(Math.random() * maxHeight);
            return { x: newX, y: newY };
        };

        // Set initial button position
        setButtonPosition(generateRandomCoordinates());

        // Function to handle button click
        const handleClick = () => {
            setButtonPosition(generateRandomCoordinates()); // Generate new random position
            setCount(prevCount => prevCount + 1);
            setTimerRunning(true);
        };

        // Event listener for button click
        const button = document.querySelector(".spawn-button");
        button.addEventListener('click', handleClick);

        // Cleanup
        return () => {
            button.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        let intervalId;
        if (timerRunning) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    let newMilliseconds = prevTimer.milliseconds - 10;
                    let newSeconds = prevTimer.seconds;
                    if (newMilliseconds < 0) {
                        newMilliseconds += 1000;
                        newSeconds -= 1;
                    }
                    // Check if timer has reached 0
                    if (newSeconds === 0 && newMilliseconds === 0) {
                        clearInterval(intervalId);
                        setTimerRunning(false);
                        setShowModal(true);
                        setScore(count);
                    }
                    return { seconds: newSeconds, milliseconds: newMilliseconds };
                }); // Decrement timer every 10 milliseconds
            }, 10);
        }

        // Cleanup function
        return () => clearInterval(intervalId);
    }, [timerRunning, count]);

    const handleRetry = () => {
        setTimer({ seconds: 30, milliseconds: 0 });
        setCount(0);
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='aim-trainer-container'>
            <div className="aim-trainer-play-field" style={{ position: 'relative' }}>
                {/* Render button at the specified position */}
                <button className="spawn-button" style={{ position: 'absolute', left: buttonPosition.x, top: buttonPosition.y }}>
                    <FaCrosshairs size={30} />
                </button>
            </div>
            <div className='aim-info'>
                <span>{`Time Left: ${timer.seconds}:${timer.milliseconds}`}</span>
                <span>{`Score: ${count}`}</span>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Time's up!</h2>
                        <p>Your score: {score}</p>
                        <button onClick={handleRetry}>Retry</button>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AimTrainerPlayField;
