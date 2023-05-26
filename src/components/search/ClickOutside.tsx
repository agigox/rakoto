import React, { useRef, useEffect, type ReactNode } from 'react';

interface ClickOutsideProps {
  onClickOutside: () => void;
  children?: ReactNode;
}

const ClickOutside: React.FC<ClickOutsideProps> = ({
  children,
  onClickOutside,
}) => {
  const refList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        refList.current != null &&
        !refList.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside]);

  return <div ref={refList}>{children}</div>;
};

export default ClickOutside;
