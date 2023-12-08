import "./Button.css";
import { FC, PropsWithChildren } from "react";

interface IButton extends PropsWithChildren {
  label?: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
}

const Button: FC<IButton> = ({
  children,
  label,
  className,
  onClick,
  type = "button"
}) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
    >
      {children || label}
    </button>
  );
};

export default Button;