import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dasboard.css"

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = () => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(res => setFlashcards(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = () => {
        if (editing) {
            axios.put(`http://localhost:5000/api/flashcards/${currentId}`, { question, answer })
                .then(() => {
                    fetchFlashcards();
                    setQuestion('');
                    setAnswer('');
                    setEditing(false);
                    setCurrentId(null);
                })
                .catch(err => console.error(err));
        } else {
            axios.post('http://localhost:5000/api/flashcards', { question, answer })
                .then(() => {
                    fetchFlashcards();
                    setQuestion('');
                    setAnswer('');
                })
                .catch(err => console.error(err));
        }
    };

    const handleEdit = (flashcard) => {
        setEditing(true);
        setCurrentId(flashcard.id);
        setQuestion(flashcard.question);
        setAnswer(flashcard.answer);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/flashcards/${id}`)
            .then(() => fetchFlashcards())
            .catch(err => console.error(err));
    };

    return (
        <div className="dashboard">
            <input
                type="text"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <input
                type="text"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={handleSubmit}>
                {editing ? 'Save Changes' : 'Add Flashcard'}
            </button>

            <div className="flashcard-list">
                {flashcards.map((flashcard) => (
                    <div key={flashcard.id}>
                        <p>{flashcard.question} - {flashcard.answer}</p>
                        <button onClick={() => handleEdit(flashcard)}>Edit</button>
                        <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
