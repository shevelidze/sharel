import React from 'react';
import styles from './SubscribeButton.module.css';

export interface SubscribeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  subscribers: number;
  isSubscribed: boolean;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  subscribers,
  isSubscribed,
  ...buttonProps
}) => {
  const rootClassList = [styles.root];
  if (isSubscribed) rootClassList.push(styles.subscribed);
  return (
    <button className={rootClassList.join(' ')} {...buttonProps}>
      {isSubscribed ? 'unsubscribe' : 'subscribe'} {subscribers}
    </button>
  );
};

export default SubscribeButton;
