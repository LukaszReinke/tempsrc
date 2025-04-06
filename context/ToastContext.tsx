'use client';

import React, { ReactNode } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer
        newestOnTop
        autoClose={4000}
        transition={Flip}
        position="top-center"
        hideProgressBar={true}
        closeButton={true}
        theme="dark"
        limit={2}
        className="z-20 custom-toast-container"
      />
    </>
  );
};
