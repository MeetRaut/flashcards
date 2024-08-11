import React, { useState } from 'react';

const Flashcard = ({ flashcard }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
            <div className="front">
                {flashcard.question}
            </div>
            <div className="back">
                {flashcard.answer}
            </div>
        </div>
    );
};

export default Flashcard;