import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './FlashCardViewer.css'; // Import the CSS file

const FlashcardViewer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(res => setFlashcards(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    if (flashcards.length === 0) return <p>No flashcards available</p>;

    return (
        <div className="flashcard-viewer">
            <Flashcard flashcard={flashcards[currentIndex]} />
            <div className="navigation-buttons">
                <button onClick={handlePrev} disabled={flashcards.length === 1}>Previous</button>
                <button onClick={handleNext} disabled={flashcards.length === 1}>Next</button>
            </div>
        </div>
    );
};

export default FlashcardViewer;
