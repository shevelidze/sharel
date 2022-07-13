import React, { useEffect } from 'react';
import { Transition, animated } from '@react-spring/web';
import useMobile from '../../lib/useMobile';
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

  const isMobile = useMobile();

  return (
    <Transition
      items={children !== null}
      from={
        isMobile
          ? { '--bottom': '-100%' }
          : { opacity: 0, '--offsetY': '10rem' }
      }
      enter={
        isMobile ? { '--bottom': '0%' } : { opacity: 1, '--offsetY': '0rem' }
      }
      leave={isMobile ? { '--bottom': '-100%' } : { opacity: 0 }}
    >
      {(styleProps, item) =>
        item && (
          <animated.div className={styles.root} style={styleProps}>
            <div>{children}</div>
          </animated.div>
        )
      }
    </Transition>
  );
};

export default MenuLayout;
