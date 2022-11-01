import React from 'react';
import { Tag } from '../common';
import { InvoiceType } from '../interfaces';
import { ReactComponent as ArrowRight } from '../assets/icon-arrow-right.svg';
import { Link } from 'react-router-dom';

type props = {
  invoice: InvoiceType;
};

const Invoice: React.FC<props> = ({ invoice }) => {
  return (
    <Link
      to={`/view/${invoice.id}`}
      className=" grid grid-cols-2 ss:grid-cols-5 ss:items-center  p-[2.4rem] bg-variant rounded-[8px] shadow-two hover:border border-primary-50 cursor-pointer"
    >
      <div className="h3 mb-[2.4rem] ss:mb-0 dark:text-white">
        <span className="text-primary-400">#</span> {invoice.id}
      </div>
      <div className="bodyOne row-start-2 ss:row-auto self-end ss:self-auto text-variant-one  ">
        {invoice.createdAt}
      </div>
      <div className="bodyOne text-variant-two justify-self-end ss:justify-self-auto">
        {invoice.clientName}
      </div>
      <div className="h3 row-start-3 ss:row-auto dark:text-white">
        £ {invoice.total}
      </div>
      <div className="col-start-2 ss:col-auto row-start-2 ss:row-auto row-span-2  self-center justify-self-end ss:justify-self-auto	">
        <Tag status={invoice.status} />
      </div>
      <span className="hidden ss:block col-auto col-start-6">
        <ArrowRight />
      </span>
    </Link>
  );
};

export default Invoice;
