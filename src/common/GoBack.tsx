import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/icon-arrow-left.svg';

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-[2.36rem]"
      onClick={() => navigate(-1)}
    >
      <ArrowLeft />
      <span className="h4 cursor-pointer dark:text-white "> Go Back</span>
    </div>
  );
};

export default GoBack;
