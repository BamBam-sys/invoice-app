import React from 'react';

type props = {
  text: string;
  colors: string;
};

const Button = ({ text, colors }: props) => {
  return (
    <div
      className={`h4 px-[2.4rem] py-[1.7rem] rounded-[24px] cursor-pointer ${colors} `}
    >
      {text}
    </div>
  );
};

export default Button;
