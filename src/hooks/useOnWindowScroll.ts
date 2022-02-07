import * as React from 'react';

export default function useOnWindowScroll(handleScroll: () => void): void {
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
}
