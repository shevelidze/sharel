import React, { useEffect } from 'react';
import styles from './Drawer.module.css';
import { useSpring, animated } from '@react-spring/web';
import User from '../User';
import useUser from '../../lib/useUser';
import DrawerLink from './DrawerLink';
import DrawerButton from './DrawerButton';
import DrawerContext from './DrawerContext';
import useDarkness from '../../lib/useDarkness';

const Drawer: React.FC<{
  isOpened: boolean;
  close: () => void;
}> = ({ isOpened, close }) => {
  const drawerStyleProps = useSpring({
    left: isOpened ? '0%' : '-100%',
  });

  const [setDarknessIsVisible, addClickHandler, removeClickHandler] =
    useDarkness();

  useEffect(() => {
    setDarknessIsVisible(isOpened);
  }, [isOpened]);

  useEffect(() => {
    addClickHandler(close);
    return () => {
      removeClickHandler(close);
    };
  }, [addClickHandler]);

  const [user, signIn, signOut] = useUser();

  return (
    <>
      <animated.div style={drawerStyleProps} className={styles.drawer}>
        <User />
        <DrawerContext.Provider value={close}>
          <DrawerLink href="/home">Home</DrawerLink>
          <DrawerLink href="/my_posts">My posts</DrawerLink>
          <DrawerLink href="/sessions">Sessions</DrawerLink>
          <DrawerButton onClick={() => signOut()}>Sign out</DrawerButton>
        </DrawerContext.Provider>
      </animated.div>
    </>
  );
};

export default Drawer;
