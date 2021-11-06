import styled from '@emotion/styled';
import React, { memo } from 'react';
import { Container } from 'react-bootstrap';
import logo from 'assets/images/icons/logo-printerous-partner.svg';

const Nav = styled.nav`
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.1);
  padding: 16px 40px;
  background-color: var(--b-30);
`;

const Navbar = () => (
  <Nav>
    <Container fluid>
      <img src={logo} alt="Logo" height="30" />
    </Container>
  </Nav>
);

export default memo(Navbar);
