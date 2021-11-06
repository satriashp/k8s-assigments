import styled from '@emotion/styled';
import React, { FC, memo } from 'react';

interface BadgeProps {
  children: string | React.ReactNode;
  variant: 'info' | 'warning' | 'danger' | 'secondary' | 'success';
  className?: string;
  size?: number;
}

const BadgeDiv = styled.div<BadgeProps>`
  border-radius: 50px;
  padding: 4px 8px;
  font-family: 'printerous-font-medium';
  font-size: ${p => `${p.size}px`};
  width: max-content;
  ${p => {
    switch (p.variant) {
      case 'info':
        return `
          background: var(--b-10);
          color: var(--br-50);
        `;
      case 'warning':
        return `
          background: var(--y-10);
          color: var(--y-30);
        `;
      case 'success':
        return `
          background: var(--g-10);
          color: var(--g-30);
        `;
      case 'secondary':
        return `
          background: var(--n-10);
          color: var(--n-60);
        `;
      case 'danger':
        return `
          background: var(--r-10);
          color: var(--r-30);
        `;
      default:
        return `
          background: var(--n-10);
          color: var(--n-60);
        `;
    }
  }}
`;

const Badge: FC<BadgeProps> = ({
  children,
  className = '',
  size = 10,
  variant,
  ...props
}) => (
  <BadgeDiv className={className} variant={variant} size={size} {...props}>
    {children}
  </BadgeDiv>
);

export default memo(Badge);
