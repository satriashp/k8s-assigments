import React, { FC, memo } from 'react';
import { Container } from 'react-bootstrap';
import List from './List';
import Filter from './List/components/Filter';
import NavStatus from './List/components/NavStatus';

const Quotations: FC = () => (
  <>
    <NavStatus />
    <Container fluid style={{ padding: '0 40px' }}>
      <Filter />
      <List />
    </Container>
  </>
);

export default memo(Quotations);
