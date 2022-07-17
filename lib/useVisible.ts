import React, { useState, useMemo, useEffect } from 'react';

export default function useVisible(ref: React.RefObject<Element>) {
  const [isVisible, setIsVisible] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entity]) => {
        setIsVisible(entity.isIntersecting || isVisible);
      }),
    []
  );

  useEffect(() => {
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [observer, ref]);

  return isVisible;
}
