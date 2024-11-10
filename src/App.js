import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseList from './components/CourseList';
import Content from './components/ModuleContent';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<CourseList />} />
                <Route path="/content/:moduleId" element={<Content />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;