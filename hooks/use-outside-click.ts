import React, { useEffect } from 'react';

type ControlRef = React.RefObject<HTMLDivElement>;
type Handler = () => void;
type TargetRef = React.RefObject<HTMLDivElement>;

export default function useOutsideClick(
  targetRef: TargetRef,
  controlRef: ControlRef,
  handler: Handler,
): void {
  useEffect(
    () => {
      function handleClickOutside(event): void {
        if (targetRef.current && !targetRef.current.contains(event.target)
          && controlRef.current && !controlRef.current.contains(event.target)) {
          handler();
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    [
      controlRef,
      handler,
      targetRef,
    ],
  );
}
