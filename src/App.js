import React from 'react';
import './Styles/App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClipboard } from '@fortawesome/free-solid-svg-icons';

import Game from './Components/Game';

function App() {
  return (
    <div className='App'>
      <Game />
      <div className="footer">
            <div className="content">
              <div className="icon">
                <FontAwesomeIcon icon={faGamepad} />
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
          </div>
    </div>
  );
}

export default App;
