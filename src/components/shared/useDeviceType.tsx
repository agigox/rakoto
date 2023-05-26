import { useState, useEffect } from 'react';

interface useDeviceProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
export const useDeviceType = (): useDeviceProps => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobile(window.innerWidth < 576); // Adjust the breakpoint as needed
      setIsTablet(window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Check initial width on component mount

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};
