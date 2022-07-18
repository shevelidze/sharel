import React from 'react';
import Like, { type LikeProps } from './Like';
import styles from './LikeIndicator.module.css';

export interface LikeIndicatorProps extends LikeProps {
  likes: number;
}

const LikeIndicator: React.FC<LikeIndicatorProps> = ({
  likes,
  ...likeProps
}) => (
  <div className={styles.root}>
    <Like {...likeProps} />
    <div className={styles.likes}>{likes}</div>
  </div>
);

export default LikeIndicator;
