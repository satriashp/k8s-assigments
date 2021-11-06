import React from 'react';
import {
  FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle,
} from 'react-icons/fa';
import { toast, Slide } from 'react-toastify';
import { ToastOptions } from 'interfaces';

const Toast = ({ title, message, type }: ToastOptions) => {
  toast((
    <div className={`d-flex align-items-center Toast Toast--${type}`}>
      <div>
        {type === 'success' && <FaCheckCircle />}
        {type === 'info' && <FaInfoCircle />}
        {type === 'warning' && <FaExclamationTriangle />}
        {type === 'error' && <FaTimesCircle />}
      </div>
      <div>
        {title && <h4 className="med-14">{title}</h4>}
        <div className="Toast--text reg-14" role="alert">{message}</div>
      </div>
    </div>
  ), {
    transition: Slide,
    type,
    autoClose: 3000,
    icon: false,
    hideProgressBar: true,
  });
};

export default Toast;
