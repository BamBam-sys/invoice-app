import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoBack, Tag } from '../common';
import { EditInvoice, ItemSummary, Sidebar } from '../components';
import Modal from '../components/Modal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  invoiceDeleted,
  invoiceMarkedAsPaid,
  selectInvoice,
} from '../store/invoicesReducer';
import Button from './../common/Button';

const ViewInvoice: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const invoice = selectInvoice(state, id!);

  const [panel, setPanel] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const handleClick = () => {
    setPanel((prev) => !prev);
  };

  const deleteInvoice = () => {
    dispatch(invoiceDeleted(id!));
    navigate('/');
  };

  const markInvoiceAsPaid = () => {
    dispatch(invoiceMarkedAsPaid(id!));
  };

  return (
    <div className={`flex flex-col sm:flex-row`}>
      {/* <div className="h-[100vh]"> */}
      {modal && (
        <Modal setModal={setModal} deleteInvoice={deleteInvoice} id={id!} />
      )}
      <Sidebar />
      <EditInvoice
        panel={panel}
        setPanel={setPanel}
        handleClick={handleClick}
      />
      {panel && (
        <div className="h-[100vh] w-[51%]  absolute right-0 z-[1] "></div>
      )}
      {/* </div> */}
      {invoice && (
        <div className="w-full ">
          <div className="custom-container">
            <GoBack />
            {/* section one */}
            <div className="mt-[3.2rem] bg-variant p-[2.4rem] rounded-[8px] ss:flex ss:justify-between ">
              <div className="flex justify-between items-center ss:justify-start ss:gap-[1.6rem]">
                <span className="text-primary-500 bodyOne">Status</span>
                <Tag status={invoice.status} />
              </div>
              <div className="hidden ss:flex ss:items-center ss:gap-[0.8rem] ">
                <Button
                  text={'Edit'}
                  colors={'editBtn'}
                  handleClick={handleClick}
                />
                <Button
                  text={'Delete'}
                  colors={'deleteBtn'}
                  handleClick={() => setModal(true)}
                />
                {invoice.status === 'paid' ? null : (
                  <Button
                    text={'Mark as Paid'}
                    colors={'markBtn'}
                    handleClick={markInvoiceAsPaid}
                  />
                )}
              </div>
            </div>
            {/* section two */}
            <div className="p-[3.2rem] bg-variant rounded-[8px] mt-[2.4rem]">
              {/* first row */}
              <div className="flex flex-col gap-[3rem] mb-[3.1rem] ss:flex-row ss:justify-between ss:mb-[2.1rem] ">
                <div>
                  <div className="bodyThree dark:text-white  mb-[0.4rem]">
                    <span className="text-primary-400 h3">#</span>
                    {invoice.id}
                  </div>
                  <div className="text-variant-three bodyOne">
                    {invoice.description}
                  </div>
                </div>
                <div className="bodyOne space-y-[0.4rem]">
                  <div className="text-variant-three">
                    {invoice.senderAddress.street}
                  </div>
                  <div className="text-variant-three">
                    {invoice.senderAddress.city}
                  </div>
                  <div className="text-variant-three">
                    {invoice.senderAddress.postCode}
                  </div>
                  <div className="text-variant-three">
                    {invoice.senderAddress.country}
                  </div>
                </div>
              </div>
              {/* second row */}
              <div className="bodyThree grid grid-cols-2 ss:grid-cols-3">
                <div>
                  <div className="text-variant-three bodyOne mb-[1.2rem]">
                    Invoice Date
                  </div>
                  <div className="dark:text-white">{invoice.createdAt}</div>
                </div>
                <div className=" bodyOne row-span-2">
                  <div className="text-variant-three mb-[1.2rem]">Bill To</div>
                  <div className="bodyThree text-secondary-200 dark:text-white  mb-[0.8rem]">
                    {invoice.clientName}
                  </div>
                  <div className="space-y-[0.4rem]">
                    <div className="text-variant-three">
                      {invoice.clientAddress.street}
                    </div>
                    <div className="text-variant-three">
                      {invoice.clientAddress.city}
                    </div>
                    <div className="text-variant-three">
                      {invoice.clientAddress.postCode}
                    </div>
                    <div className="text-variant-three">
                      {invoice.clientAddress.country}
                    </div>
                  </div>
                </div>
                <div className="row-start-3 ss:col-start-3 ss:row-start-1">
                  <div className="text-variant-three bodyOne mb-[1.2rem]">
                    Sent To
                  </div>
                  <div className="dark:text-white">{invoice.clientEmail}</div>
                </div>
                <div className="col-start-1 row-start-2">
                  <div className="text-variant-three bodyOne  mb-[1.2rem] ">
                    Payment Due
                  </div>
                  <div className="dark:text-white">{invoice.paymentDue}</div>
                </div>
              </div>
              {/* third row */}
              <div className="p-[2.4rem] ss:p-[3.2rem] bg-variant-one rounded-tr-[8px] rounded-tl-[8px] mt-[4rem] space-y-[2.4rem]">
                <div className="hidden ss:grid grid-cols-4">
                  <div className="text-variant-three bodyTwo">Item Name</div>
                  <div className="text-variant-three bodyTwo justify-self-end">
                    QTY.
                  </div>
                  <div className="text-variant-three bodyTwo justify-self-end">
                    Price
                  </div>
                  <div className="text-variant-three bodyTwo justify-self-end">
                    Total
                  </div>
                </div>
                {invoice.items.map((item, index) => (
                  <ItemSummary item={item} key={index} />
                ))}
              </div>
              <div className="flex justify-between items-center rounded-br-[8px] rounded-bl-[8px] p-[2.4rem] ss:p-[3.2rem] bg-variant-two text-white">
                <div className="bodyTwo">Amount Due</div>
                <div className="h5">£ {invoice.total}</div>
              </div>
            </div>
            {/* section three (mobile) */}
          </div>
          <div className="flex ss:hidden items-center justify-between bg-variant py-[2.2rem] px-[2.4rem] mt-[5.6rem] ">
            <Button text={'Edit'} colors={'editBtn'} handleClick={() => {}} />
            <Button
              text={'Delete'}
              colors={'deleteBtn'}
              handleClick={() => {}}
            />
            <Button
              text={'Mark as Paid'}
              colors={'markBtn'}
              handleClick={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInvoice;
