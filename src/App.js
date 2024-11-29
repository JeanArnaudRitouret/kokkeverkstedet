import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlatformNew from './components/PlatformNew';
import PlatformOld from './components/PlatformOld';
import PlatformChoice from './components/PlatformChoice';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<PlatformChoice />} />
                <Route path="/platform-new" element={<PlatformNew />} />
                <Route path="/platform-old/*" element={<PlatformOld />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;