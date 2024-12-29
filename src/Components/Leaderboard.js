import React from 'react';
import '../Styles/Leaderboard.css';


function Leaderboard() {
  return (
    <div className='Leaderboard'>
      <img className='gif-leaderboard' src={process.env.PUBLIC_URL + '/img/trophy.gif'} alt='leaderboard'></img>
      <h1 className='leaderboard-title'>Leaderboard</h1>
      <div className='leaderboard-content'>
        <ul className='leaderboard-list'>
          <li id='leader-leaderboard-item'>
            <div className='leaderboard-item'>
              <h4><span id='place'>1</span>.</h4>
              <h4><span id='name'>Morpheus</span></h4>
              <h4><span id='points'>10.234.567 Block</span></h4>
            </div>
          </li>
          <li id='leader-leaderboard-item'>
            <div className='leaderboard-item'>
              <h4><span id='place'>2</span>.</h4>
              <h4><span id='name'>Andrew</span></h4>
              <h4><span id='points'>800 Block</span></h4>
            </div>
          </li>
          <li id='leader-leaderboard-item'>
            <div className='leaderboard-item'>
              <h4><span id='place'>3</span>.</h4>
              <h4><span id='name'>Tulopex</span></h4>
              <h4><span id='points'>500 Block</span></h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
