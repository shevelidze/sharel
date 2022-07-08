import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
import styles from './Switcher.module.css';

const Switcher: React.FC<{
  children: React.ReactNode;
  animationIsDisabled?: boolean;
}> = ({ children, animationIsDisabled = false }) => {
  const transitions = useTransition([children], {
    initial: { width: '100%' },
    from: { width: '0%' },
    enter: { width: '100%' },
    leave: { display: 'none' },
    reset: animationIsDisabled,
  });

  return (
    <div className={styles.root}>
      {transitions((styles, child) => (
        <animated.div
          style={{
            ...styles,
            minWidth: 0,
            overflowX: 'hidden',
          }}
        >
          {child}
        </animated.div>
      ))}
    </div>
  );
};

export default Switcher;
