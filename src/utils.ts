import { useEffect, useRef } from 'react';

export const useOnClickOutside = (
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (state && ref.current && !ref.current.contains(e.target as Node)) {
        setState(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [state, setState]);

  return [ref];
};
