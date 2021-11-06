import styled from '@emotion/styled';
import React, { FC, memo } from 'react';
import { IconType } from 'react-icons';

const Button = styled.button`
  background-color: transparent;
  border: none;
`;

interface IconButtonProps {
  icon: React.ReactElement<IconType>;
  onClick(): void;
}

const IconButton: FC<IconButtonProps> = ({ icon, onClick }) => (
  <Button type="button" onClick={onClick}>{icon}</Button>
);

export default memo(IconButton);
