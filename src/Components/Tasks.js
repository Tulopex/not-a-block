import React from 'react';
import '../Styles/Tasks.css';


function Tasks() {
  return (
    <div className='Tasks'>
      <h1>Tasks</h1>
      <div className='daily-task-container'>
        <ul className='daily-task-list'>
            <li>
                <div className='daily-task'>
                    <h3 className='name-task' id='name-task'>Сheck-in</h3>
                    <button className='execute-btn' id='execute-btn'>Start</button>
                </div>
            </li>
            <li></li>
            <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
