import React from 'react';
import './App.css';

import Header from './Components/Header/Header';
import Game from './Components/Game';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
