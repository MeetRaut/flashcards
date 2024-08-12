import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './FlashCardViewer.css'; // Import the CSS file

const FlashcardViewer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false); // Manage flip state here

    useEffect(() => {
        // Function to fetch flashcards
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flashcards');
                console.log('Fetched from server:', response.data); // Debug logging
                setFlashcards(response.data);
            } catch (error) {
                console.error('Failed to fetch from server, falling back to static data.', error);
                // Fallback static data
                const fallbackData = [
                    { id: 1, question: 'What is React?', answer: 'React is a JS library' },
                    { id: 2, question: 'What is 2 + 2?', answer: 'The summation is 4' },
                ];
                
                console.log('Using fallback data:', fallbackData); // Debug logging
                setFlashcards(fallbackData);
            }
        };

        fetchFlashcards();
    }, []);

    const handleNext = () => {
        setFlipped(false); // Reset flip state when navigating
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setFlipped(false); // Reset flip state when navigating
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    if (flashcards.length === 0) return <p>No flashcards available</p>;

    return (
        <div className="flashcard-viewer">
            <Flashcard flashcard={flashcards[currentIndex]} flipped={flipped} onFlip={handleFlip} />
            <div className="navigation-buttons">
                <button onClick={handlePrev} disabled={flashcards.length === 1}>Previous</button>
                <button onClick={handleNext} disabled={flashcards.length === 1}>Next</button>
            </div>
        </div>
    );
};

export default FlashcardViewer;