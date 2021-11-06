import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 16px;

  li {
    background-color: var(--n-10);
    padding: 10px 14px;
    position: relative;
    width: calc(100% - 8px);

    &:first-of-type::before {
      content: none;
    }

    &:not(:first-of-type) {
      padding-left: 20px;
    }

    &.active {
      background-color: var(--br-50);
      color: white;

      span {
        background-color: var(--b-20);
        color: var(--b-10);
      }

      &:after {
        border-left-color: var(--br-50);
      }
    }

    &.done {
      background-color: var(--br-10);
      color: white;

      span {
        background-color: var(--g-20);

        svg {
          color: var(--g-10);
        }
      }

      &:after {
        border-left-color: var(--br-10);
      }
    }

    span {
      background-color: var(--n-20);
      color: var(--n-60);
      width: 20px;
      height: 20px;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      line-height: 20px;
    }

    &::before, &::after {
      content: '';
      width: 0;
      height: 0;
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
      border-left: 8px solid var(--n-10);
      position: absolute;
      top: 0;

    }

    &::before {
      left: 0;
      border-left-color: white;
    }

    &::after {
      right: -8px;
    }
  }
`;

interface StepperProps {
  activeStep: number;
}

const steps = ['spec', 'bulk', 'proof', 'summary'];

const Stepper: FC<StepperProps> = ({ activeStep }) => {
  const { t } = useTranslation('quotation_detail');

  return (
    <Container>
      {steps.map((step, i) => (
        <li
          key={step}
          className={clsx(i + 1 === activeStep && 'active', i + 1 < activeStep && 'done')}
        >
          <span>{i + 1 < activeStep ? <FaCheck size={12} /> : i + 1}</span>
          {t(step)}
        </li>
      ))}
    </Container>
  );
};

export default memo(Stepper);
