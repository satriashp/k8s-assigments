import React, { FC, forwardRef, memo } from 'react';
import styled from '@emotion/styled';
import logo from 'assets/images/icons/printerous-partner.svg';
import { Link, NavLink } from 'react-router-dom';
import {
  FaAngleDown, FaBell, FaCommentAlt, FaStar,
} from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { utils } from 'helpers';

const Nav = styled.nav`
  background-color: var(--b-30);
  padding: 12px 40px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.1);
`;

const Menu = styled.ul`
  list-style: none;
  margin-bottom: 0;
  margin-right: auto;

  li {
    display: inline-block;
    padding: 0 24px;

    a {
      color: var(--n-10);
      font-size: 16px;

      &.active {
        color: #EFF1FB;
        font-weight: 500;
        font-family: 'printerous-font-medium';
      }
    }
  }
`;

const RightMenu = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;
  align-items:center;

  li {
    display: inline-block;
    padding: 0 12px;
  }

  button {
    background-color: transparent;
    padding: 0;
    height: 36px;

    &:focus {
      outline: none;
      box-shadow: none !important;
      border: none;
    }
  }

  .image {
    display: inline-flex;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 36px;
    font-weight: 500;
    font-family: 'printerous-font-medium';
    margin-right: 8px;
    color: black;
    text-transform: uppercase;
  }
`;

const LinkWithCounter = styled(Link)`
  position: relative;
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: -5px;
  left: 5px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 50%;
  background: #DF1627;
  color: #fff;
  font-size: 10px;
`;

const User = forwardRef((props: any, ref: any) => (
  <button
    className="btn"
    type="button"
    ref={ref}
    onClick={props.onClick}
  >
    {props.children}
    <FaAngleDown color="white" size={16} />
  </button>
));

const Dot = styled.div`
  position: absolute;
  right: 15px;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: var(--r-30);
`;

interface IMenu {
  path: string;
  title: string;
}

const menus: IMenu[] = [
  {
    path: '/quotations/new',
    title: 'Quotations',
  },
  {
    path: '/purchase-order',
    title: 'Purchase Order',
  },
  {
    path: '/package',
    title: 'Paket',
  },
];
interface TopBarProps {
  userName: string;
}

const messages = 0;
const chats = 0;

const TopBar: FC<TopBarProps> = ({ userName }) => (
  <Nav>
    <img src={logo} alt="Printerous Partner" />
    <Menu>
      {menus.map(menu => (
        <li key={menu.path} className="position-relative">
          <NavLink to={menu.path}>{menu.title}</NavLink>
          <Dot />
        </li>
      ))}
    </Menu>
    <RightMenu>
      <li>
        <div className="rounded-pill bg-b-20 px-3 py-2">
          <span className="text-white med-14">2.8</span>
          <FaStar color="var(--y-20)" size={16} className="ml-2" />
        </div>
      </li>
      <li>
        <LinkWithCounter to="/messages">
          {!!messages && <Counter>{messages}</Counter>}
          <FaCommentAlt color="white" size={16} />
        </LinkWithCounter>
      </li>
      <li>
        <LinkWithCounter to="/notification">
          {!!chats && <Counter>{chats}</Counter>}
          <FaBell color="white" size={16} />
        </LinkWithCounter>
      </li>
      <li className="pr-0">
        <Dropdown>
          <Dropdown.Toggle as={User}>
            <div className="image">{userName[0] || 'P'}</div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item onClick={utils.logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </RightMenu>
  </Nav>
);

export default memo(TopBar);
