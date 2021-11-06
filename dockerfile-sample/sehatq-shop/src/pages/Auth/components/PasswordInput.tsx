/* eslint-disable react/jsx-props-no-spreading */
import styled from '@emotion/styled';
import { IconButton } from 'components';
import React, {
  FC, forwardRef, memo, useState,
} from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = styled.div`
  position: relative;

  .is-invalid {
    padding-right: 52px;
    background-position: right 42px center;
  }

  button {
    position: absolute;
    top: 0;
    right: 12px;
    height: 36px;
    color: var(--n-60);
  }
`;

const Strength = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;

  span {
    font-size: 14px;
    color: var(--n-70);
  }

  .strength {
    display: flex;

    div {
      width: 32px;
      height: 4px;

      &:not(:first-of-type) {
        margin-left: 2px;
      }

      &:first-of-type {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
`;

interface PasswordInputProps extends FormControlProps {
  errorMessage?: string;
  showStrength?: boolean;
  length?: number;
  placeholder?: string;
}

const PasswordInput: FC<PasswordInputProps> = forwardRef(({
  errorMessage, showStrength, length = 0, ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input>
      <Form.Control
        {...props}
        type={showPassword ? 'text' : 'password'}
        isInvalid={!!errorMessage}
        ref={ref}
      />
      <IconButton
        icon={showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        onClick={() => setShowPassword(!showPassword)}
      />
      {showStrength && !!length && (
        <Strength>
          <span>Password strength</span>
          <div className="strength">
            <div className="bg-r-20" />
            {length > 5 && <div className="bg-y-20" />}
            {length > 9 && <div className="bg-g-20" />}
          </div>
        </Strength>
      )}
      {errorMessage && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Input>
  );
});

export default memo(PasswordInput);
