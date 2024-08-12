// Flashcard.js

import React from 'react';
import './Flashcard.css'; // Import the CSS file

const Flashcard = ({ flashcard, flipped, onFlip }) => {
    return (
        <div className="flashcard-container">
            <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
                <div className="front">
                    <p>{flashcard.question}</p>
                    <button className="reveal-btn" onClick={onFlip}>Reveal Answer</button>
                </div>
                <div className="back">
                    <p>{flashcard.answer}</p>
                    <button className="reveal-btn" onClick={onFlip}>Back to Question</button>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;