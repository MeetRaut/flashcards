import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar component
import Dashboard from './components/Dashboard';
import FlashcardViewer from './components/FlashcardViewer';

function App() {
    return (
        <Router>
            <Navbar />  {/* Include Navbar here */}
            <Routes>
                <Route path="/" element={<FlashcardViewer />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;