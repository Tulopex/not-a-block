import React from 'react';
import '../Styles/Tasks.css';

function Tasks() {
  return (
    <div className='Tasks'>
      <h1 className='tasks-title'>Tasks</h1>
      <div className='daily-task-container'>
        <ul className='daily-task-list'>
          <li>
            <div className='daily-task'>
              <div className='task-details'>
                <h3 className='name-task'>Check-in</h3>
                <p className='reward'>+100 Block</p>
              </div>
              <button className='execute-btn'>Start</button>
            </div>
          </li>
          <li className='divider'></li>
          <li>
            <div className='daily-task'>
              <div className='task-details'>
                <h3 className='name-task'>Donate 10 Stars</h3>
                <p className='reward'>+100 Block</p>
              </div>
              <button className='execute-btn'>Start</button>
            </div>
          </li>
          <li className='divider'></li>
          <li>
            <div className='daily-task'>
              <div className='task-details'>
                <h3 className='name-task'>Promote Blockchain</h3>
                <p className='reward'>+100 Block</p>
              </div>
              <button className='execute-btn'>Start</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
