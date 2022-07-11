import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
} from './socialIcons';
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div>
          <div>© 2022 sharel</div>
          <div className={styles.socialIcons}>
            <FacebookIcon />
            <InstagramIcon />
            <YoutubeIcon />
            <TwitterIcon />
          </div>
        </div>
        <h1>sharel</h1>
      </div>
    </div>
  );
};

export default Footer;
