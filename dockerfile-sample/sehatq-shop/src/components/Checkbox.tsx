import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode, FC, memo } from 'react';

import { Form, FormCheckProps } from 'react-bootstrap';

const Content = styled(Form.Check)<{ bordered?: boolean }>`
  padding-left: 0;
  width: 100%;
  display: flex;
  align-items: center;

  ${p => p.bordered && css`
    padding: 12px 14px;
    border-radius: 12px;

    &,
    .checkbox-control {
      border: 1px solid var(--n-20);
    }

    input:checked + & {
      border: 1px solid var(--br-40);
      padding: 12px 14px;
      border-radius: 12px;
    }
  `}
`;

const Label = styled(Form.Check.Label)`
  min-width: 170px;
  color: black !important;
  cursor: pointer;

  .checkbox-control {
    &:hover {
      border: 1px solid var(--br-50);
    }
  }
`;

const Control = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid var(--n-20);
  border-radius: 4px;
  margin-right: 6px;
  position: relative;

  input:checked + div & {
    background: var(--br-50);
    border-color: var(--br-50);
    border-width: 1px;

    &:before {
      content: '';
      width: 7px;
      height: 11px;
      background: transparent;
      border-bottom: 2px solid white;
      border-right: 2px solid white;
      border-radius: 1px;
      position: absolute;
      left: 3px;
      top: 0px;
      transform: rotate(45deg);
    }
  }
`;

export interface CheckboxProps extends FormCheckProps {
  label?: ReactNode;
  name?: string;
  value?: any;
  checked?: boolean;
  bordered?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ label, bordered, ...props }) => (
  <Label className={props.className}>
    <Form.Check.Input
      isValid
      style={{ display: 'none' }}
      {...props}
      type="checkbox"
    />

    <Content type="checkbox" bordered={bordered}>
      <Control className="checkbox-control" />
      <div className="checkbox-label">{label}</div>
    </Content>
  </Label>
);

export default memo(Checkbox);
