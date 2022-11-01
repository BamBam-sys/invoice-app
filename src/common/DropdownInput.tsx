import React, { useState } from 'react';
import { ReactComponent as Arrow } from '../assets/icon-arrow-down.svg';

type props = {
  value: number;
  handleDropdownInput: (value: number) => void;
};

const paymentTerms = [1, 7, 14, 30];

const DropdownInput = ({ value, handleDropdownInput }: props) => {
  const [inputDropdown, setinputDropdown] = useState<boolean>(false);

  const pluralizeValue = (value: number) => {
    return value > 1 ? 's' : '';
  };

  return (
    <>
      <label htmlFor="">
        <div className="bodyOne text-variant-three mb-[1rem]">
          Payment Terms
        </div>
      </label>
      <div
        onClick={() => setinputDropdown((prev) => !prev)}
        className="relative"
      >
        <input
          className="w-full cursor-pointer outline-none border-solid border-[1px] border-primary-200 dark:border-transparent px-[2rem] py-[1.6rem] rounded-[4px] h4 dark:text-white dark:bg-secondary-100 focus:border-primary-100  hover:border-primary-100 "
          readOnly
          name="date"
          id="date"
          value={`Net ${value} Day${pluralizeValue(value)}`}
        />
        <div className="absolute top-[50%] transform translate-y-[-50%]  right-[1.6rem] cursor-pointer">
          {inputDropdown ? (
            <Arrow className="transform rotate-[180deg]" />
          ) : (
            <Arrow />
          )}
        </div>
        {inputDropdown && (
          <div className="absolute shadow-one bg-variant-three w-full top-[5.6rem] ">
            {paymentTerms.map((pt) => (
              <div
                key={pt}
                className="border-b-[1px] border-primary-200 dark:border-secondary-50 "
              >
                <div
                  onClick={() => handleDropdownInput(pt)}
                  className="py-[1.6rem] px-[2.4rem] dark:text-primary-200 hover:text-primary-50 dark:hover:text-primary-100 h4 cursor-pointer"
                >
                  {`Net ${pt} Day${pluralizeValue(pt)}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownInput;
