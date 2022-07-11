import React, { useState, useRef } from 'react';
import styles from './Darkness.module.css';
import { Transition, animated } from '@react-spring/web';
import DarknessContext, {
  type HandlersModifier,
  type ClickHandler,
} from '../../lib/useDarkness/DarknessContext';

const DarknessProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handlersRef = useRef<ClickHandler[]>([]);
  const addHandler: HandlersModifier = (e) => {
    handlersRef.current.push(e);
  };
  const removeHandler: HandlersModifier = (e) => {
    handlersRef.current.splice(handlersRef.current.indexOf(e), 1);
  };
  return (
    <DarknessContext.Provider value={[setIsVisible, addHandler, removeHandler]}>
      {children}
      <Transition
        items={isVisible}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {(styleProps, item) =>
          item && (
            <animated.div
              className={styles.darkness}
              style={styleProps}
              onClick={(e) => {
                for (const handler of handlersRef.current) handler(e);
              }}
            />
          )
        }
      </Transition>
    </DarknessContext.Provider>
  );
};

export default DarknessProvider;
