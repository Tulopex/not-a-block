import React, { useState } from 'react';
import './Styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClipboard, faTrophy, faUserGroup, faWallet } from '@fortawesome/free-solid-svg-icons';

import Tasks from './Components/Tasks';
import Game from './Components/Game';
import Leaderboard from './Components/Leaderboard';
import Friends from './Components/Friends';
import Wallet from './Components/Wallet';

function App() {
  // Состояния для отображения контента
  const [currentContent, setCurrentContent] = useState('game');

  const toggleContent = (content) => {
    setCurrentContent(content);
  };

  return (
    <div className='App'>
      {/* Отображаем контент в зависимости от состояния */}
      {currentContent === 'game' && <Game />}
      {currentContent === 'tasks' && <Tasks />}
      {currentContent === 'leaderboard' && <Leaderboard />}
      {currentContent === 'friends' && <Friends />}
      {currentContent === 'wallet' && <Wallet />}

      <div className="footer">
        <div className="content">
          <div className="icons">
            {/* Иконка задач */}
            <FontAwesomeIcon
              icon={faClipboard}
              onClick={() => toggleContent('tasks')}
            />
            {/* Иконка трофея */}
            <FontAwesomeIcon
              icon={faTrophy}
              onClick={() => toggleContent('leaderboard')}
            />
            {/* Иконка геймпада по центру */}
            <FontAwesomeIcon
              icon={faGamepad}
              onClick={() => toggleContent('game')}
            />
            {/* Иконка группы пользователей справа от геймпада */}
            <FontAwesomeIcon
              icon={faUserGroup}
              onClick={() => toggleContent('friends')}
            />
            {/* Иконка кошелька справа от группы пользователей */}
            <FontAwesomeIcon
              icon={faWallet}
              onClick={() => toggleContent('wallet')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
