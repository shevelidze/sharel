import { useState, useEffect } from 'react';

export default function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>();
  const updateIsMobile = () => setIsMobile(window.innerWidth <= 900);
  useEffect(updateIsMobile, [global.window?.innerWidth, updateIsMobile]);
  useEffect(
    () => window.addEventListener('resize', updateIsMobile),
    [global.window, updateIsMobile]
  );
  return isMobile;
}
