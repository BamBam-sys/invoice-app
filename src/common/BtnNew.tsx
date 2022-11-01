import React from 'react';
import { ReactComponent as PlusIcon } from '../assets/icon-plus.svg';

type props = {
  handleClick: () => void;
  panel: boolean;
};

const BtnNew: React.FC<props> = ({ handleClick, panel }) => {
  return (
    <div
      className="bg-primary-50 hover:bg-tertiary-100 rounded-[24px] flex  items-center p-[0.6rem] pr-[1.4rem] gap-[0.8rem] cursor-pointer"
      onClick={handleClick}
    >
      <span className="bg-white w-[3.2rem] h-[3.2rem] rounded-[50%] flex justify-center items-center">
        <PlusIcon />
      </span>
      <h3 className="h3 text-white ">
        New <span className="ss:inline hidden">Invoice</span>
      </h3>
    </div>
  );
};

export default BtnNew;
