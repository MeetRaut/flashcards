import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Ensure the filename is correct

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/flashcards');
            console.log('Fetched flashcards:', res.data); // Debug logging
            setFlashcards(res.data);
        } catch (err) {
            console.error('Error fetching flashcards:', err);
            // Use dummy data when API request fails
            const dummyData = [
                { id: 1, question: 'What is React?', answer: 'React is a JS library.' },
                { id: 2, question: 'What is 2 + 2?', answer: 'The summation is 4.' },
                // Add more dummy flashcards as needed
            ];
            console.log('Using dummy data:', dummyData); // Debug logging
            setFlashcards(dummyData);
        }
    };

    const handleSubmit = async () => {
        try {
            if (editing) {
                await axios.put(`http://localhost:5000/api/flashcards/${currentId}`, { question, answer });
                console.log('Updated flashcard:', { question, answer }); // Debug logging
                setEditing(false);
                setCurrentId(null);
            } else {
                await axios.post('http://localhost:5000/api/flashcards', { question, answer });
                console.log('Added new flashcard:', { question, answer }); // Debug logging
            }
            setQuestion('');
            setAnswer('');
            fetchFlashcards();
        } catch (err) {
            console.error('Error submitting flashcard:', err);
        }
    };

    const handleEdit = (flashcard) => {
        setEditing(true);
        setCurrentId(flashcard.id);
        setQuestion(flashcard.question);
        setAnswer(flashcard.answer);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
            console.log('Deleted flashcard with id:', id); // Debug logging
            fetchFlashcards();
        } catch (err) {
            console.error('Error deleting flashcard:', err);
        }
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
                    <div key={flashcard.id} className="flashcard-item">
                        <div className="flashcard-content">
                            <p><strong>Q:</strong> {flashcard.question}</p>
                            <p><strong>A:</strong> {flashcard.answer}</p>
                        </div>
                        <div className="flashcard-actions">
                            <button onClick={() => handleEdit(flashcard)}>Edit</button>
                            <button onClick={() => handleDelete(flashcard.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;