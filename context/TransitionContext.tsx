'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type TransitionStage = 'idle' | 'exiting' | 'entering';

interface TransitionContextType {
  startExitTransition: () => Promise<void>;
  stage: TransitionStage;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function useTransitionContext() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionContext must be used within a TransitionProvider');
  }
  return context;
}

export function TransitionProvider({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  const [stage, setStage] = useState<TransitionStage>('idle');
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setStage('entering');
      const timer = setTimeout(() => {
        setStage('idle');
        setPrevPath(pathname);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPath]);

  const startExitTransition = () => {
    return new Promise<void>((resolve) => {
      setStage('exiting');
      setTimeout(() => {
        resolve();
      }, 200);
    });
  };

  let transitionClass = '';
  if (stage === 'exiting') {
    // Fade out Effect - not matching timeout so that animation is not finished
    transitionClass = 'transition-opacity duration-300 opacity-0';
  } else if (stage === 'entering') {
    transitionClass = 'transition-opacity duration-500 opacity-100';
  } else {
    transitionClass = 'opacity-100';
  }

  return (
    <TransitionContext.Provider value={{ startExitTransition, stage }}>
      {content}
      <div className={transitionClass}>{children}</div>
    </TransitionContext.Provider>
  );
}
