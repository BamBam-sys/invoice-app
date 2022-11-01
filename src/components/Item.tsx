import React from 'react';
import { ReactComponent as DeleteIcon } from '../assets/icon-delete.svg';
import { ItemInterface } from '../interfaces';

type props = {
  item: ItemInterface;
  removeItem: (index: number) => void;
  index: number;
  handleItemChange: (
    event: React.FormEvent<HTMLInputElement>,
    index: number
  ) => void;
};

const Item = ({ item, removeItem, index, handleItemChange }: props) => {
  const { name, quantity, price, total } = item;

  return (
    <div className="flex flex-col gap-x-[1.6rem] lg:flex-row  ">
      <div className="mb-[2.4rem] lg:mb-0 lg:basis-[100%] ">
        <label htmlFor="" className="lg:hidden">
          <div className="bodyOne text-variant-three mb-[1rem]">Item Name</div>
        </label>
        <input
          className="w-full outline-none border-solid border-[1px] border-primary-200 dark:border-transparent px-[2rem] py-[1.6rem] rounded-[4px] h4 dark:text-white  dark:bg-secondary-100 focus:border-primary-100  hover:border-primary-100 "
          name="name"
          id="name"
          type="text"
          onChange={(event) => handleItemChange(event, index)}
          value={name}
        />
        {/* {error && <div className="p-one">{error}</div>} */}
      </div>

      <div className="flex items-end gap-x-[1.2rem] lg:justify-end ss:basis-[100%]">
        <div className="basis-[10.4rem] grow  lg:basis-[8rem] ">
          <label htmlFor="" className="ss:hidden">
            <div className="bodyOne text-variant-three mb-[1rem]">Qty.</div>
          </label>
          <input
            className="w-full outline-none border-solid border-[1px] border-primary-200 dark:border-transparent px-[1.6rem] py-[1.6rem] rounded-[4px] h4 dark:text-white dark:bg-secondary-100 focus:border-primary-100  hover:border-primary-100 "
            name="quantity"
            id="name"
            type="number"
            onChange={(event) => handleItemChange(event, index)}
            value={quantity}
            placeholder="0"
          />
          {/* {error && <div className="p-one">{error}</div>} */}
        </div>
        <div className="basis-[14rem] grow  lg:basis-[10rem] ">
          <label htmlFor="" className="ss:hidden">
            <div className="bodyOne text-variant-three mb-[1rem]">Price</div>
          </label>
          <input
            className="w-full outline-none border-solid border-[1px] border-primary-200 dark:border-transparent px-[1.6rem] py-[1.6rem] rounded-[4px] h4 dark:text-white dark:bg-secondary-100 focus:border-primary-100  hover:border-primary-100 "
            name="price"
            id="name"
            type="number"
            onChange={(event) => handleItemChange(event, index)}
            value={price}
            placeholder="0.00"
          />
          {/* {error && <div className="p-one">{error}</div>} */}
        </div>
        <div className="basis-[14rem] grow  lg:basis-[5.6rem]">
          <label htmlFor="" className="ss:hidden">
            <div className="bodyOne text-variant-three mb-[1rem]">Total</div>
          </label>
          <input
            readOnly
            className="w-full outline-none border-solid border-[1px] border-transparent py-[1.6rem] rounded-[4px] h4 dark:text-primary-200 bg-transparent  "
            id="total"
            type="number"
            value={total}
            placeholder="0.00"
          />
          {/* {error && <div className="p-one">{error}</div>} */}
        </div>
        <div className="relative bottom-[1.6rem] grow ">
          <DeleteIcon onClick={() => removeItem(index)} />
        </div>
      </div>
    </div>
  );
};

export default Item;
