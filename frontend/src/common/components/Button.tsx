import React from "react";

interface ButtonPropsType {
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonPropsType> = ({ type = "submit", onClick, children }) => {
  return (
    <button type={type} onClick={onClick} className="px-3 py-1 rounded-md text-white bg-blue-600 hover:bg-blue-800">
      {children}
    </button>
  );
};

export default Button;
