import React from 'react';
import '../Styles/Leaderboard.css';

function Leaderboard() {
  return (
    <div className='Leaderboard'>
      <img className='gif-leaderboard' src={process.env.PUBLIC_URL + '/img/trophy.gif'} alt='leaderboard' loading="eager" rel='preload'/>
      <h1 className='leaderboard-title'>Leaderboard</h1>
      <div className='your-place-leaderboard'>
        <ul className='leaderboard-list'>
          <li className='leaderboard-item-you'>
            <div className='leaderboard-info'>
              <h4 className='place'><span id='place'>200</span>.</h4>
              <h4 className='name'><span id='name'>You</span></h4>
            </div>
            <h4 className='points'><span id='points'>10.000</span> Block</h4>
          </li>
        </ul>
      </div>
      <div className='leaderboard-content'>
        <ul className='leaderboard-list'>
          <li className='leaderboard-item'>
            <div className='leaderboard-info'>
              <h4 className='place'><span id='place'>1</span>.</h4>
              <h4 className='name'><span id='name'>Morpheus</span></h4>
            </div>
            <h4 className='points'><span id='points'>10.234.567</span> Block</h4>
          </li>
          <li className='leaderboard-item'>
            <div className='leaderboard-info'>
              <h4 className='place'><span id='place'>2</span>.</h4>
              <h4 className='name'><span id='name'>Neo</span></h4>
            </div>
            <h4 className='points'><span id='points'>800.000</span> Block</h4>
          </li>
          <li className='leaderboard-item'>
            <div className='leaderboard-info'>
              <h4 className='place'><span id='place'>3</span>.</h4>
              <h4 className='name'><span id='name'>Trinity</span></h4>
            </div>
            <h4 className='points'><span id='points'>100.000</span> Block</h4>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
