import { useEffect } from 'react';

export const useScrollTrigger = (callback: () => void, offsetFromBottom = 700) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (fullHeight - (scrollTop + windowHeight) < offsetFromBottom) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, offsetFromBottom]);
};
