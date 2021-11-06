import styled from '@emotion/styled';
import useStore from 'pages/Quotations/store';
import React, {
  FC, memo, useEffect, useRef, useState,
} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useQueryParam, NumberParam } from 'use-query-params';

const FilterStyled = styled.div`
  margin: 12px 0;
`;

const Search = styled.div`
  position: relative;
  width: 294px;
  .form-control {
    padding-right: 36px;
  }
  svg {
    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

const Filter: FC = () => {
  const [search, setSearch] = useState('');
  const { status } = useParams<{ status: string }>();
  const timeoutID = useRef(0);
  const setTableQuery = useStore(s => s.setTableQuery);
  const [pageParam, setPageParam] = useQueryParam('page', NumberParam);

  const onSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
    clearTimeout(timeoutID.current);
    timeoutID.current = window.setTimeout(() => {
      if (pageParam && pageParam > 1) {
        setPageParam(1);
      }
      setTableQuery(target.value);
    }, 500);
  };

  useEffect(() => {
    setSearch('');
    setTableQuery('');
  }, [status, setTableQuery]);

  return (
    <FilterStyled>
      <Row className="justify-content-end">
        <Col sm="auto">
          <Search>
            <Form.Control placeholder="Cari nama item, no rfq" value={search} onChange={onSearch} />
            <FaSearch size={12} fill="var(--n-60)" />
          </Search>
        </Col>
      </Row>
    </FilterStyled>
  );
};

export default memo(Filter);
