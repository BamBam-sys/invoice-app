import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Invoices, ViewInvoice } from './pages';
import data from './data.json';
import { useAppDispatch } from './store/hooks';
import { invoicesReceived } from './store/invoicesReducer';
import './App.css';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // load invoices to the redux store
  useEffect(() => {
    dispatch(invoicesReceived(data));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Invoices />} />
      <Route path="/view/:id" element={<ViewInvoice />} />
    </Routes>
  );
};

export default App;
