import * as React from 'react';

type ReturnType = {
  isOnScreen: (el: HTMLDivElement) => boolean;
};

export default function useOnScreen(
  ref: React.RefObject<HTMLDivElement>,
): ReturnType {
  const isOnScreen = React.useCallback((el: HTMLDivElement) => {
    const rect = el.getBoundingClientRect();
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight,
    );
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }, []);

  return { isOnScreen };
}
