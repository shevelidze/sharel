import React from 'react';
import styles from './Drawer.module.css';
import {
  useSpring,
  useTransition,
  useSpringRef,
  useChain,
  animated,
} from '@react-spring/web';

const Drawer: React.FC<{ isOpened: boolean; toggle: () => void }> = ({
  isOpened,
  toggle,
}) => {
  const drawerSpringRef = useSpringRef();
  const darknessSpringRef = useSpringRef();
  const drawerStyleProps = useSpring({
    left: isOpened ? '0%' : '-100%',
    ref: drawerSpringRef,
  });
  const darknessTransition = useTransition(isOpened, {
    from: { opacity: 0 },
    enter: { opacity: 0.8 },
    leave: { opacity: 0 },
    ref: darknessSpringRef,
  });
  useChain([drawerSpringRef, darknessSpringRef], [0, 0]);
  return (
    <>
      <animated.div style={drawerStyleProps} className={styles.drawer}>
        <div>Drawer</div>
      </animated.div>
      {darknessTransition(
        (styleProps, item) =>
          item && (
            <animated.div
              className={styles.darkness}
              style={styleProps}
              onClick={toggle}
            />
          )
      )}
    </>
  );
};

export default Drawer;
