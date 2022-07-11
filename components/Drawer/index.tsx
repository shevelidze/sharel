import React, { useContext } from 'react';
import styles from './Drawer.module.css';
import {
  useSpring,
  useTransition,
  useSpringRef,
  useChain,
  animated,
} from '@react-spring/web';
import User from '../User';
import useUser from '../../lib/useUser';
import DrawerLink from './DrawerLink';
import DrawerButton from './DrawerButton';
import DrawerContext from './DrawerContext';

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

  const [user, signIn, signOut] = useUser();

  return (
    <>
      <animated.div style={drawerStyleProps} className={styles.drawer}>
        <User />
        <DrawerContext.Provider value={toggle}>
          <DrawerLink href="/home">Home</DrawerLink>
          <DrawerLink href="/my_posts">My posts</DrawerLink>
          <DrawerLink href="/sessions">Sessions</DrawerLink>
          <DrawerButton onClick={() => signOut()}>Sign out</DrawerButton>
        </DrawerContext.Provider>
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
