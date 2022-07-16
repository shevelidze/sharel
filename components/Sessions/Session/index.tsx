import React from 'react';
import Phone from './Phone.svg';
import TrashCan from '../../TrashCan';
import styles from './Session.module.css';

export interface SessionProps {
  ipAddress: string;
  userAgent: string;
  lastUsedDate?: Date;
  onRemoveButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Session: React.FC<SessionProps> = ({
  ipAddress,
  userAgent,
  lastUsedDate,
  onRemoveButtonClick,
}) => {
  return (
    <div className={styles.root}>
      <Phone />
      <div className={styles.contentWrapper}>
        <div>{ipAddress}</div>
        <div>{userAgent}</div>
        <div className={styles.lastUsedDate}>
          {lastUsedDate && `Last activity in ${lastUsedDate.toLocaleString()}`}
        </div>
      </div>
      <button onClick={onRemoveButtonClick} className={styles.removeButton}>
        <TrashCan />
      </button>
    </div>
  );
};

export default Session;
