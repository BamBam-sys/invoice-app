import React from 'react';

type props = {
  status: string;
};

const Tag: React.FC<props> = ({ status }) => {
  const colors = () => {
    if (status === 'paid')
      return { color: 'green', bgColor: 'bgGreen', dotColor: 'greenDot' };
    if (status === 'pending')
      return { color: 'orange', bgColor: 'bgOrange', dotColor: 'orangeDot' };
    if (status === 'draft')
      return { color: 'gray', bgColor: 'bgGray', dotColor: 'grayDot' };
  };

  return (
    <div
      className={`h4 w-[10.4rem] px-[1.8rem] py-[1.3rem] flex justify-center items-center gap-[0.8rem] rounded-[6px] ${
        colors()?.bgColor
      } `}
    >
      <div
        className={`w-[0.8rem] h-[0.8rem] ${colors()?.dotColor} rounded-[50%]`}
      ></div>
      <div className={`${colors()?.color}`}>{status}</div>
    </div>
  );
};

export default Tag;
