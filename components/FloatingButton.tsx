import React from "react";

interface IFloatingButton {
  children: React.ReactNode;
  [key: string]: any;
}

const FloatingButton: React.FC<IFloatingButton> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="fixed bottom-24 right-7 bg-orange-400 hover:bg-orange-500 active:bg-orange-300 transition-colors p-2 rounded-full text-white"
    >
      {children}
    </button>
  );
};

export default FloatingButton;
