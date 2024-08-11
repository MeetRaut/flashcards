import React, { useState } from 'react';
import './Flashcard.css'; // Import the CSS file

const Flashcard = ({ flashcard }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="flashcard-container">
            <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
                <div className="front">
                    <p>{flashcard.question}</p>
                    <button className="reveal-btn" onClick={handleFlip}>Reveal Answer</button>
                </div>
                <div className="back">
                    <p>{flashcard.answer}</p>
                    <button className="reveal-btn" onClick={handleFlip}>Back to Question</button>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
