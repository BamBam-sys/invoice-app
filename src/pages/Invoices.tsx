import React, { useState } from 'react';
import { ReactComponent as Arrow } from '../assets/icon-arrow-down.svg';
import { ReactComponent as Empty } from '../assets/illustration-empty.svg';
import { Dropdown } from '../common';
import { CreateInvoice, Invoice, Sidebar } from '../components';
import { useAppSelector } from '../store/hooks';
import { selectInvoices } from '../store/invoicesReducer';
import { useOnClickOutside } from '../utils';
import BtnNew from './../common/BtnNew';

const Invoices: React.FC = () => {
  const state = useAppSelector((state) => state);
  const invoices = selectInvoices(state);

  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const [checked, setChecked] = useState<string>('');
  const [panel, setPanel] = useState<boolean>(false);

  // close component when there is a click outside the component
  const [ref] = useOnClickOutside(filterDropdown, setFilterDropdown);

  const handleClick = () => {
    setPanel((prev) => !prev);
  };

  const filteredInvoices =
    checked !== ''
      ? invoices.filter((invoice) => invoice.status === checked.toLowerCase())
      : invoices;

  return (
    <div className={`flex flex-col sm:flex-row transition-all relative`}>
      <Sidebar />
      <CreateInvoice
        panel={panel}
        setPanel={setPanel}
        handleClick={handleClick}
      />
      {panel && (
        <div className="h-[100vh] w-[51%]  absolute right-0 z-[1] "></div>
      )}
      <div className="w-full h-[100vh] ">
        <div className="custom-container">
          {/* header */}
          <div className="flex justify-between">
            <div className="">
              <h1 className="h1 dark:text-white">Invoices</h1>
              <span className="bodyOne text-variant-one">
                {filteredInvoices.length} invoice
                {filteredInvoices.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-[1.8rem] ss:gap-[9.6rem] transform translate-x-[-1rem] ss:translate-x-[1rem]">
              <div className=" relative" ref={ref}>
                <div
                  className="flex items-center gap-[1.2rem] cursor-pointer "
                  onClick={() => setFilterDropdown((prev) => !prev)}
                >
                  <div className="h3 dark:text-white">
                    Filter{' '}
                    <span className="hidden sm:inline dark:text-white">
                      by status
                    </span>
                  </div>
                  <span>
                    {filterDropdown ? (
                      <Arrow className="transform rotate-[180deg]" />
                    ) : (
                      <Arrow />
                    )}
                  </span>
                </div>
                <div>
                  {filterDropdown && (
                    <Dropdown setChecked={setChecked} checked={checked} />
                  )}
                </div>
              </div>
              <div className="bodyOne">
                <BtnNew handleClick={handleClick} panel={panel} />
              </div>
            </div>
          </div>
          {filteredInvoices.length > 0 ? (
            <div className="mt-[3.2rem] sm:mt-[5.6rem] md:mt-[6.5rem] space-y-[1.6rem] sm:h-[75vh] sm:pr-10  sm:overflow-x-auto scrollbar">
              {filteredInvoices.map((invoice) => (
                <Invoice invoice={invoice} key={invoice.id} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[75vh] ">
              <Empty />
              <h2 className="h2 mt-[5.4rem] ">There is nothing here</h2>
              <p className="text-variant-one bodyOne w-[22rem] text-center mt-[1.4rem] ">
                Create an invoice by clicking the{' '}
                <span className="h4">New Invoice</span> button and get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
