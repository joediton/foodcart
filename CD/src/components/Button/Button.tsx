import './Button.css';
import React from 'react';

export type TButtonProps = {
  onClick?: () => void;
  children: string | JSX.Element;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  key?: string | number;
}

const Button: React.FC<TButtonProps> = (props) => {
  return (
    <button
      className={`Button ${props.className || ''}`}
      onClick={props.onClick}
      type={props.type || 'button'}
    >
      {props.children}
    </button>
  );
};

export default Button;