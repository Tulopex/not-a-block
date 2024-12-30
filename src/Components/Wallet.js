import React from 'react';
import '../Styles/Wallet.css';


function Wallet() {
  return (
    <div className='Wallet'>
      <div className='content-points'>
        <h2 className='points-score'><span id='points-score'>0</span> Block</h2>
      </div>
    </div>
  );
}

export default Wallet;
