import React, { FC, memo } from 'react';
import { Button as BsButton, ButtonProps as BsButtonProps, Spinner } from 'react-bootstrap';
import clsx from 'clsx';
import { IconType } from 'react-icons/lib';

interface ButtonProps extends BsButtonProps {
  isLoading?: boolean;
  rightIcon?: React.ReactElement<IconType>;
  leftIcon?: React.ReactElement<IconType>;
}

const Button: FC<ButtonProps> = ({
  isLoading, children, leftIcon, rightIcon, className, disabled, ...props
}) => (
  <BsButton {...props} className={clsx(isLoading && 'btn--loading', className)} disabled={isLoading || disabled}>
    {isLoading && (
      <div className="spinner">
        <Spinner animation="border" size="sm" />
      </div>
    )}
    <span className="text med-14">
      {leftIcon}
      <span className={clsx(leftIcon && 'ml-3', rightIcon && 'mr-3')}>{children}</span>
      {rightIcon}
    </span>
  </BsButton>
);

export default memo(Button);
