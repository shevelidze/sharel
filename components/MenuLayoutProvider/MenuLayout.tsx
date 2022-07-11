import React, { useEffect } from 'react';
import { Transition, animated } from '@react-spring/web';
import useDarkness from '../../lib/useDarkness';
import styles from './MenuLayout.module.css';

interface MenuLayoutProps extends React.PropsWithChildren {
  close: () => void;
}

const MenuLayout: React.FC<MenuLayoutProps> = ({ children, close }) => {
  const [setDarknessIsVisible, addClickHandler, removeClickHandler] =
    useDarkness();

  useEffect(() => {
    setDarknessIsVisible(children !== null);
  }, [setDarknessIsVisible, children]);

  useEffect(() => {
    addClickHandler(close);
    return () => {
      removeClickHandler(close);
    };
  }, [addClickHandler]);

  return (
    <Transition
      items={children !== null}
      from={{ opacity: 0, '--offsetY': '10rem' }}
      enter={{ opacity: 1, '--offsetY': '0rem' }}
      leave={{ opacity: 0 }}
    >
      {(styleProps, item) =>
        item && (
          <animated.div className={styles.root} style={styleProps}>
            {children}
          </animated.div>
        )
      }
    </Transition>
  );
};

export default MenuLayout;
