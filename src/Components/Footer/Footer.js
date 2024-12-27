import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faClipboard, faUsers } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="content">
        <div className="icon">
          <FontAwesomeIcon icon={faUsers} />
          <FontAwesomeIcon icon={faGamepad} />
          <FontAwesomeIcon icon={faClipboard} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
