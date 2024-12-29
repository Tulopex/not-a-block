import React, { useState } from 'react';
import './Styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClipboard } from '@fortawesome/free-solid-svg-icons';

import Game from './Components/Game';
import Tasks from './Components/Tasks';

function App() {
  const [isGameVisible, setIsGameVisible] = useState(true);

  const toggleContent = (content) => {
    if (content === 'game') {
      setIsGameVisible(true);
    } else {
      setIsGameVisible(false);
    }
  };

  return (
    <div className='App'>
      {/* Отображаем либо игру, либо задачи */}
      {isGameVisible ? <Game /> : <Tasks />}

      <div className="footer">
        <div className="content">
          <div className="icon">
            {/* Иконка игры */}
            <FontAwesomeIcon
              icon={faGamepad}
              onClick={() => toggleContent('game')}
            />
            {/* Иконка задач */}
            <FontAwesomeIcon
              icon={faClipboard}
              onClick={() => toggleContent('tasks')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
