import React, { useState } from 'react';
import { Button, DatePickerInput, DropdownInput, Input } from '../common';
import { InvoiceType } from '../interfaces';
import Item from './Item';
import { ReactComponent as PlusIcon } from '../assets/icon-plus.svg';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { invoiceUpdated, selectInvoice } from '../store/invoicesReducer';
import { calculatePaymentDue, formatDate, useOnClickOutside } from '../utils';
import { useParams } from 'react-router-dom';

type props = {
  handleClick: () => void;
  panel: boolean;
  setPanel: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditInvoice = ({ panel, handleClick, setPanel }: props) => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const state = useAppSelector((state) => state);
  const invoice = selectInvoice(state, id!);

  // form state
  const [input, setInput] = useState<InvoiceType>(invoice);

  // add item to item list
  const handleAddItem = () => {
    setInput((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: '',
          quantity: '',
          price: '',
          total: '',
        },
      ],
    }));
  };

  // remove item from item list
  const removeItem = (index: number) => {
    const tempItems = [...input.items];

    tempItems.splice(index, 1);

    setInput((prev) => ({ ...prev, items: tempItems }));
  };

  // handle onchange for item inputs
  const handleItemChange = (
    event: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    const tempItems = [...input.items];
    const tempItem = { ...tempItems[index], [name]: value };
    tempItem.total = (+tempItem.price * +tempItem.quantity).toFixed(2);
    tempItems[index] = tempItem;
    setInput((prev) => ({ ...prev, items: tempItems }));
  };

  // handle form input fields
  const handleInput = (
    event: React.FormEvent<HTMLInputElement>,
    addressType?: string
  ) => {
    const { name, value } = event.target as HTMLInputElement;

    // updating sender address state
    if (addressType === 'sender')
      setInput((prev) => ({
        ...prev,
        senderAddress: { ...prev.senderAddress, [name]: value },
      }));

    // updating client address state
    if (addressType === 'client')
      setInput((prev) => ({
        ...prev,
        clientAddress: { ...prev.clientAddress, [name]: value },
      }));

    // updating every other input field
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle date-picker
  const handleCalendar = (value: Date) => {
    setInput((prev) => ({ ...prev, createdAt: formatDate(value) }));
  };

  // handle dropdown input (payment terms)
  const handleDropdownInput = (value: number) => {
    setInput((prev) => ({ ...prev, paymentTerms: value }));
  };

  const resetForm = () => {
    setInput(invoice);
    setPanel(false);
  };

  // on save
  const handleSave = () => {
    setInput((prev) => ({
      ...prev,
      paymentDue: calculatePaymentDue(
        input.paymentTerms,
        new Date(input.createdAt)
      ),
      total: input.items
        .reduce(
          (accumulator, currentValue) =>
            accumulator + parseFloat(currentValue.total),
          0
        )
        .toString(),
    }));

    dispatch(
      invoiceUpdated({
        ...input,
        paymentDue: calculatePaymentDue(
          input.paymentTerms,
          new Date(input.createdAt)
        ),
        total: input.items
          .reduce(
            (accumulator, currentValue) =>
              accumulator + parseFloat(currentValue.total),
            0
          )
          .toString(),
      })
    );

    resetForm();
  };

  const [ref] = useOnClickOutside(panel, setPanel);

  // returns util class to open and close panel based on panel state
  const panelStyles = panel
    ? 'translate-x-[0] shadow-four '
    : 'translate-x-[-100%]';

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-secondary-300 transform ${panelStyles} absolute xs:w-[70%] sm:w-[60%] md:w-[50%] h-[100vh]  sm:h-[100vh] sm:mt-[0] mt-[7.2rem] xs:rounded-tr-[20px] xs:rounded-br-[20px] z-[2]`}
    >
      <div className="h-[86%] p-[2.4rem]  sm:pl-[11rem]">
        <div className="flex justify-between items-center mb-[2.4rem]">
          <div className="h5 dark:text-white">
            Edit <span className="text-primary-400 ">#</span>
            {input.id}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[3rem] dark:text-white cursor-pointer"
            onClick={handleClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="w-full h-[93%] overflow-auto scrollbar  pr-[1.6rem] ">
          <form>
            <div className="bodyOne font-bold text-primary-50 mb-[2.4rem] ">
              Bill From
            </div>
            <div className="grid grid-cols-2 ss:grid-cols-3 gap-y-[2.4rem] gap-x-[2.3rem]">
              <div className="col-span-2 ss:col-span-3">
                <Input
                  name={'street'}
                  label={'Street Address'}
                  value={input.senderAddress.street}
                  onChange={(event) => handleInput(event, 'sender')}
                  type={'string'}
                  placeholder={''}
                />
              </div>
              <div>
                <Input
                  name={'city'}
                  label={'City'}
                  value={input.senderAddress.city}
                  onChange={(event) => handleInput(event, 'sender')}
                  type={'string'}
                  placeholder={''}
                />
              </div>
              <div>
                <Input
                  name={'postCode'}
                  label={'Post Code'}
                  value={input.senderAddress.postCode}
                  onChange={(event) => handleInput(event, 'sender')}
                  type={'string'}
                  placeholder={''}
                />
              </div>
              <div className="col-span-2 ss:col-auto">
                <Input
                  name={'country'}
                  label={'Country'}
                  value={input.senderAddress.country}
                  onChange={(event) => handleInput(event, 'sender')}
                  type={'string'}
                  placeholder={''}
                />
              </div>
            </div>

            {/*  */}
            <div className="bodyOne font-bold text-primary-50 mb-[2.4rem] mt-[4.8rem] ">
              Bill To
            </div>
            <div className="grid grid-cols-2 ss:grid-cols-3 gap-y-[2.4rem] gap-x-[2.3rem]">
              <div className="col-span-2 ss:col-span-3">
                <Input
                  name={'clientName'}
                  label={"CLient's Name"}
                  value={input.clientName}
                  onChange={(event) => handleInput(event)}
                  type={'string'}
                  placeholder={''}
                />
              </div>
              <div className="col-span-2 ss:col-span-3">
                <Input
                  name={'clientEmail'}
                  label={"CLient's Email"}
                  value={input.clientEmail}
                  onChange={(event) => handleInput(event)}
                  type={'string'}
                  placeholder={'e.g. email@example.com'}
                />
              </div>
              <div className="col-span-2 ss:col-span-3">
                <Input
                  name={'street'}
                  label={'Street Address'}
                  value={input.clientAddress.street}
                  onChange={(event) => handleInput(event, 'client')}
                  type={'string'}
                  placeholder={''}
                />
              </div>
              <div>
                <Input
                  name={'city'}
                  label={'City'}
                  value={input.clientAddress.city}
                  onChange={(event) => handleInput(event, 'client')}
                  type={'string'}
                  placeholder={''}
                />
              </div>
              <div>
                <Input
                  name={'postCode'}
                  label={'Post Code'}
                  value={input.clientAddress.postCode}
                  onChange={(event) => handleInput(event, 'client')}
                  type={'string'}
                  placeholder={''}
                />
              </div>
              <div className="col-span-2 ss:col-auto">
                <Input
                  name={'country'}
                  label={'Country'}
                  value={input.clientAddress.country}
                  onChange={(event) => handleInput(event, 'client')}
                  type={'string'}
                  placeholder={''}
                />
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-1 ss:grid-cols-2 mt-[4.8rem] gap-y-[2.4rem] gap-x-[2.3rem]">
              <div className="z-[1]">
                <DatePickerInput
                  dateValue={new Date(input.createdAt)}
                  handleCalendar={handleCalendar}
                />
              </div>
              <div className="">
                <DropdownInput
                  value={input.paymentTerms}
                  handleDropdownInput={handleDropdownInput}
                />
              </div>
              <div className="ss:col-span-2">
                <Input
                  type={'text'}
                  name={'description'}
                  label={'Project Description'}
                  value={input.description}
                  onChange={(event) => handleInput(event)}
                  placeholder={'e.g Graphic Design Service'}
                />
              </div>
            </div>

            {/*  */}
            <div className="mt-[2.4rem]">
              <div className="text-[2.1rem] font-bold text-[#777F98] ">
                Item List
              </div>

              {/* item list header 1200px above */}
              <div
                className="hidden lg:flex gap-x-[1.6rem] bodyOne text-variant-three
            mt-[1.6rem] "
              >
                <div className="text-variant-three lg:basis-[100%]">
                  Item Name
                </div>
                <div className="lg:basis-[100%] flex gap-x-[1.2rem] ">
                  <div className="text-variant-three grow lg:basis-[8rem]">
                    Qty.
                  </div>
                  <div className="text-variant-three grow lg:basis-[10rem]">
                    Price
                  </div>
                  <div className="text-variant-three grow lg:basis-[5.6rem]">
                    Total
                  </div>
                  <div className="grow"></div>
                </div>
              </div>

              {/* item list */}
              <div className="mt-[2.4rem] space-y-[4.8rem]">
                {input.items.map((item, index) => (
                  <Item
                    key={index}
                    item={item}
                    handleItemChange={handleItemChange}
                    removeItem={removeItem}
                    index={index}
                  />
                ))}
              </div>

              {/*  */}
              <div
                className="bg-btn-50 dark:bg-secondary-100 h4 py-[1.7rem] flex justify-center items-center gap-x-[0.5rem] mt-[3.5rem] rounded-[24px] text-primary-400 dark:text-primary-200 cursor-pointer "
                onClick={handleAddItem}
              >
                {' '}
                <PlusIcon className="fill-primary-400  dark:fill-primary-200 " />
                Add New Item
              </div>
            </div>
          </form>
        </div>
        <div className="w-[100%] h-[20rem] absolute bottom-[5.1rem] left-[0] pointer-events-none overlay z-[1]"></div>
      </div>
      <div className="relative flex justify-end w-full bg-white dark:bg-secondary-300  pr-[5.6rem]  py-[3.1rem] rounded-br-[20px] rounded-tr-[20px] z-[5]">
        <div className="flex gap-x-[0.8rem] ">
          <Button
            text={'Cancel'}
            colors={'discardBtn'}
            handleClick={resetForm}
          />
          <Button
            text={'Save Changes'}
            colors={'saveAndSendBtn'}
            handleClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
