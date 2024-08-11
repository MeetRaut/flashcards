import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(res => setFlashcards(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="flashcard-list">
            {flashcards.map(flashcard => (
                <Flashcard key={flashcard.id} flashcard={flashcard} />
            ))}
        </div>
    );
};

export default FlashcardList;