import React from 'react';
import { ItemInterface } from '../interfaces';

type props = {
  item: ItemInterface;
};

const ItemSummary: React.FC<props> = ({ item }) => {
  return (
    <>
      <div className="flex justify-between items-center ss:hidden ">
        <div>
          <div className="h4 dark:text-white mb-[0.8rem]">{item.name}</div>
          <span className="h4 text-variant-three">
            {item.quantity} x £{item.price}{' '}
          </span>
        </div>
        <div className="h4 dark:text-white">£{item.total}</div>
      </div>
      <div className="hidden ss:grid grid-cols-4">
        <div className="h4 dark:text-white mb-[0.8rem]">{item.name}</div>
        <div className="h4 text-variant-three justify-self-end ">
          {item.quantity}
        </div>
        <div className="h4 text-variant-three justify-self-end ">
          {item.price}
        </div>
        <div className="h4 dark:text-white justify-self-end ">
          £{item.total}
        </div>
      </div>
    </>
  );
};

export default ItemSummary;
