import type { ReactNode } from 'react';

interface Props {
  onClick?: () => void;
  className: string;
  children: ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined;
}

const Button: React.FC<Props> = ({ onClick, className, children, type }) => {
  return (
    <button type={type} onClick={onClick} className={`cursor-pointer rounded-sm px-4 py-3 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
