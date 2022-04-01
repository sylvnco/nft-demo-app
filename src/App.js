import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header';

function App() {
    const Home = lazy(() => import('./pages/Home'));
    const Collection = lazy(() => import('./pages/Collection'));

    return (
        <Router>
            <Header />
            <Suspense fallback={<div>Chargement ...</div>}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
