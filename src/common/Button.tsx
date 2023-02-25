import React from 'react';

type props = {
  text: string;
  colors: string;
  handleClick: () => void;
};

const Button: React.FC<props> = ({ text, colors, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className={`h4 px-[2.4rem] py-[1.7rem] rounded-[24px] cursor-pointer ${colors} `}
    >
      {text}
    </div>
  );
};

export default Button;
