import React from 'react';
import '../Styles/Friends.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function Friends() {
  return (
    <div className='Friends'>
      <img className='gif-friends' src={process.env.PUBLIC_URL + '/img/friends.gif'} alt='friends' loading="eager"/>
      <h1 className='friends-title'>Friends</h1>
      <p className='friends-text'>Invite your friends and get 10% of their earned Block</p>
      <div className='invite-friends-container'>
        <button className='invite-friends' id='invite-friends'>Invite</button>
        <button className='invite-friends-copy' id='invite-friends-copy'>
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
      <div className='friends-content'>
        <ul className='friends-list'>
          <li className='friends-item'>
            <div className='friends-info'>
              <h4 className='name-friend'><span id='name-friend'>Tulopex</span></h4>
            </div>
            <h4 className='points-friend'>+<span id='points-friend'>245</span> Block</h4>
          </li>
          <li className='friends-item'>
            <div className='friends-info'>
              <h4 className='name-friend'><span id='name-friend'>Julian</span></h4>
            </div>
            <h4 className='points-friend'>+<span id='points-friend'>100</span> Block</h4>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Friends;
