import React, { FC } from 'react';
import { Alert as BsAlert } from 'react-bootstrap';
import {
  FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle,
} from 'react-icons/fa';
import clsx from 'clsx';

interface AlertProps {
  variant: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  message: string | React.ReactNode;
  inline?: boolean;
  small?: boolean;
  className?: string;
}

const Alert: FC<AlertProps> = ({
  variant, message, inline, small, className,
}) => (
  <BsAlert variant={variant} className={clsx(inline && 'alert--inline', small && 'alert--sm', className)}>
    {variant === 'success' && <FaCheckCircle />}
    {variant === 'info' && <FaInfoCircle />}
    {variant === 'warning' && <FaExclamationCircle />}
    {variant === 'danger' && <FaTimesCircle />}
    {/* eslint-disable-next-line react/no-danger */}
    { typeof message === 'string' ? <div dangerouslySetInnerHTML={{ __html: message }} /> : message}
  </BsAlert>
);

export default Alert;
