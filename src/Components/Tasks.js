import React, { useState } from 'react';
import '../Styles/Tasks.css';

function Tasks() {
  const [activeTab, setActiveTab] = useState('Daily');

  const renderTasks = () => {
    switch (activeTab) {
      case 'Daily':
        return (
          <ul className='task-list'>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Check-in</h3>
                  <p className='reward'>+100 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Donate 10 Stars</h3>
                  <p className='reward'>+100 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Promote blockchain</h3>
                  <p className='reward'>+100 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Subcribe Telegram</h3>
                  <p className='reward'>+100 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Join the chat</h3>
                  <p className='reward'>+100 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Subcribe X (Twitter)</h3>
                  <p className='reward'>+100 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Boost Telegram</h3>
                  <p className='reward'>+100 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
          </ul>
        );
      case 'Game':
        return (
          <ul className='task-list'>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Play Mini App 10 days</h3>
                  <p className='reward'>+200 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Invite 10 Friends</h3>
                  <p className='reward'>+150 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Invite 50 Friends</h3>
                  <p className='reward'>+150 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
            <li className='divider'></li>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Invite 100 Friends</h3>
                  <p className='reward'>+150 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
          </ul>
        );
      case 'Partners':
        return (
          <ul className='task-list'>
            <li>
              <div className='task'>
                <div className='task-details'>
                  <h3 className='name-task'>Subcribe Qurovot</h3>
                  <p className='reward'>+300 Block</p>
                </div>
                <button className='execute-btn'>Start</button>
              </div>
            </li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className='Tasks'>
      <h1 className='tasks-title'>Tasks</h1>
      <div className='switch'>
        <button
          className={activeTab === 'Daily' ? 'active' : ''}
          onClick={() => setActiveTab('Daily')}
        >
          Daily
        </button>
        <button
          className={activeTab === 'Game' ? 'active' : ''}
          onClick={() => setActiveTab('Game')}
        >
          Game
        </button>
        <button
          className={activeTab === 'Partners' ? 'active' : ''}
          onClick={() => setActiveTab('Partners')}
        >
          Partners
        </button>
      </div>
      <div className='task-container'>{renderTasks()}</div>
    </div>
  );
}

export default Tasks;
