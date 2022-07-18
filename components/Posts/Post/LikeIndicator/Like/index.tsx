import React from 'react';
import LikeIcon from './LikeIcon.svg';
import styles from './Like.module.css';

export interface LikeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActivated: boolean;
}

const Like: React.FC<LikeProps> = ({ isActivated, ...buttonProps }) => {
  const iconClassList = [styles.main];
  if (isActivated) iconClassList.push(styles.activated);
  return (
    <button className={styles.button} {...buttonProps}>
      <LikeIcon className={iconClassList.join(' ')} />
    </button>
  );
};

export default Like;
