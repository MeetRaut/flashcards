import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import FlashcardList from './components/FlashcardList';
import Dashboard from './components/Dashboard';
import FlashcardViewer from './components/FlashcardViewer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FlashcardViewer />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;