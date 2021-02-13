import React, { useEffect } from 'react';

type Handler = () => void;
type Ref = React.RefObject<HTMLDivElement>;

export default function useOutsideClick(ref: Ref, handler: Handler): void {
  useEffect(
    () => {
      function handleClickOutside(event): void {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [ref],
  );
}
