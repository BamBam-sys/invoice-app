import React, { useRef, useEffect } from 'react';
import { CgCheck } from 'react-icons/cg';

type props = {
  checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
};

const filters = [
  { name: 'Draft', id: 'draft' },
  { name: 'Pending', id: 'pending' },
  { name: 'Paid', id: 'paid' },
];

const Dropdown: React.FC<props> = ({ setChecked, checked }) => {
  const filterRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    filterRef.current.forEach((el: HTMLDivElement) => {
      if (el?.innerText === checked) el?.children[0].classList.add('check');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !filterRef.current.includes(el)) filterRef.current.push(el);
  };

  const handleClick = (filter: string) => {
    filterRef.current.forEach((el: HTMLDivElement) => {
      const element = el?.children[0];

      if (el?.innerText === filter) {
        el.innerText === checked ? setChecked('') : setChecked(filter);
        element?.classList.contains('check')
          ? element?.classList.remove('check')
          : element?.classList.add('check');
      } else {
        element?.classList.remove('check');
      }
    });
  };

  return (
    <div className="absolute left-[-4.3rem] top-[4.3rem] rounded-[8px] w-[22.2rem] bg-white dark:bg-secondary-100 shadow-one dark:shadow-three p-[2.4rem] space-y-[1.6rem] ">
      {filters.map((filter) => (
        <div
          onClick={() => handleClick(filter.name)}
          key={filter.id}
          ref={addToRefs}
          className="group flex items-center gap-[1.3rem]  hover:transform hover:translate-x-[0.45rem] cursor-pointer "
        >
          <div className="relative rounded-[2px] w-[1.6rem] h-[1.6rem] border border-transparent group-hover:border-primary-50 bg-primary-200 ">
            <CgCheck className="text-white h-[1.9rem] w-[1.9rem] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden check:inline" />
          </div>
          <h3 className="h3 dark:text-white">{filter.name}</h3>
        </div>
      ))}
    </div>
  );
};
export default Dropdown;
