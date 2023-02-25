import ReactDOM from 'react-dom';
import { Button } from '../common';

type props = {
  deleteInvoice: () => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const Modal: React.FC<props> = ({ deleteInvoice, setModal, id }) => {
  return ReactDOM.createPortal(
    <div className="h-[24.9rem] w-[48rem] bg-lightBg dark:bg-secondary-50 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-[8px] shadow-four flex justify-center items-center p-[4.8rem] ">
      <div>
        <h2 className="mb-[1.3rem] text-[2.4rem] leading-[32px] font-bold text-secondary-200 dark:text-white ">
          Confirm deletion
        </h2>
        <p className="text-[1.4rem] leading-[22px] font-medium text-primary-300 dark:text-primary-200">
          Are you sure you want to delete invoice <span>#{id}</span> This action
          cannot be undone.
        </p>
        <div className="flex justify-end mt-[1.6rem] gap-[8px] ">
          <Button
            text={'Cancel'}
            colors={'editBtn'}
            handleClick={() => setModal(false)}
          />
          <Button
            text={'Delete'}
            colors={'deleteBtn'}
            handleClick={deleteInvoice}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
