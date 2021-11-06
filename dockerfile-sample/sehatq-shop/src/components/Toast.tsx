import React from 'react';
import {
  FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle,
} from 'react-icons/fa';
import { toast, Slide } from 'react-toastify';
import { ToastOptions } from 'interfaces';

const Toast = ({ title, message, type }: ToastOptions) => {
  toast((
    <div className={`d-flex Toast Toast--${type}`}>
      {type === 'success' && <FaCheckCircle />}
      {type === 'info' && <FaInfoCircle />}
      {type === 'warning' && <FaExclamationTriangle />}
      {type === 'error' && <FaTimesCircle />}
      <div>
        {title && <h4 className="med-14">{title}</h4>}
        <div className="Toast--text" role="alert">{message}</div>
      </div>
    </div>
  ), {
    transition: Slide,
    type,
    autoClose: 3000,
  });
};

export default Toast;
