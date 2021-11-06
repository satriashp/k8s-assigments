import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { FC, memo } from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

interface SortButtonProps {
  children: string | React.ReactNode;
  sortVal?: 'asc' | 'desc' | '' | false;
  className?: string;
  onClick(): void;
}

const Button = styled.button`
  outline: none;
  background-color: transparent;
  padding: 0;
  border: none;
  display: inline-flex;
  align-items: center;
  .sorting {
    display: inline-flex;
    flex-direction: column;
    margin-left: 8px;

    svg {
      color: var(--n-60);

      &:first-of-type {
        margin-bottom: -6px;
      }
    }

    &.asc {
      svg:last-of-type {
        color: var(--n-20);
      }
    }

    &.desc {
      svg:first-of-type {
        color: var(--n-20);
      }
    }
  }
`;

const SortButton: FC<SortButtonProps> = ({
  children, onClick, sortVal = '', className = '',
}) => (
  <Button type="button" onClick={onClick} className={className}>
    {children}
    <div className={clsx('sorting', sortVal)}>
      <FaCaretUp size={12} />
      <FaCaretDown size={12} />
    </div>
  </Button>
);

export default memo(SortButton);
