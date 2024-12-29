import React from 'react';
import '../Styles/Leaderboard.css';

function Leaderboard() {
  return (
    <div className='Leaderboard'>
      <img className='gif-leaderboard' src={process.env.PUBLIC_URL + '/img/trophy.gif'} alt='leaderboard' />
      <h1 className='leaderboard-title'>Leaderboard</h1>
      <div className='leaderboard-content'>
        <ul className='leaderboard-list'>
          <li className='leaderboard-item'>
            <div className='leaderboard-info'>
              <h4 className='place'>1.</h4>
              <h4 className='name'>Morpheus</h4>
            </div>
            <h4 className='points'>10.234.567 Block</h4>
          </li>
          <li className='leaderboard-item'>
            <div className='leaderboard-info'>
              <h4 className='place'>2.</h4>
              <h4 className='name'>Andrew</h4>
            </div>
            <h4 className='points'>800 Block</h4>
          </li>
          <li className='leaderboard-item'>
            <div className='leaderboard-info'>
              <h4 className='place'>3.</h4>
              <h4 className='name'>Tulopex</h4>
            </div>
            <h4 className='points'>500 Block</h4>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
