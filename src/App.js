import React from 'react';
import Converter from './components/Converter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
      </header>
      <main>
        <Converter />
      </main>
    </div>
  );
}

export default App;
