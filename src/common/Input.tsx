import React from 'react';

type props = {
  label: string;
  name: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string | number;
  type: string;
  placeholder: string;
};

const Input = ({ label, name, onChange, value, type, placeholder }: props) => {
  return (
    <div>
      <label htmlFor={name}>
        <div className="bodyOne text-variant-three mb-[1rem]">{label}</div>
      </label>
      <input
        className="w-full outline-none border-solid border-[1px] border-primary-200 dark:border-transparent px-[2rem] py-[1.6rem] rounded-[4px] h4 dark:text-white dark:bg-secondary-100 focus:border-primary-100  hover:border-primary-100 "
        name={name}
        id={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      {/* {error && <div className="p-one">{error}</div>} */}
    </div>
  );
};

export default Input;
