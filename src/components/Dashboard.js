import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = () => {
        axios.post('http://localhost:5000/api/flashcards', { question, answer })
            .then(res => {
                console.log('Flashcard added:', res.data);
                setQuestion('');
                setAnswer('');
            })
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
            <button onClick={handleSubmit}>Add Flashcard</button>
        </div>
    );
};

export default Dashboard;