/* eslint-disable import/no-extraneous-dependencies */
import React, { memo, FC, CSSProperties } from 'react';
import { first, last } from 'lodash';
import { Pagination as PaginationBs } from 'react-bootstrap';
import { NumberParam, useQueryParam } from 'use-query-params';

interface PaginationProps {
  totalPages?: number;
  paginationKey?: string;
  style?: CSSProperties;
  setPage?: (page?: number) => void;
  page?: number;
  className?: string;
}

const Pagination : FC<PaginationProps> = ({
  totalPages = 1,
  paginationKey = 'page',
  style,
  setPage,
  page,
  className = '',
}) => {
  const [pageParam = 1, setPageParam] = useQueryParam(
    paginationKey,
    NumberParam,
  );
  const currentPage = page || pageParam!;

  const setCurrentPage = setPage
    ? (pageCurr?: number) => {
      setPage(pageCurr);
    }
    : (pageCurr?: number) => {
      setPageParam(pageCurr, 'pushIn');
      window.scrollTo(0, 0);
    };

  const delta = 2;
  const left = currentPage - delta;
  const right = currentPage + delta;
  const startPage = 1;
  const endPage = totalPages || 1;
  let pages = [];

  for (let i = left; i <= right; i += 1) {
    pages.push(i);
  }

  pages = pages.filter(item => item > 0 && item <= endPage);

  return (
    <PaginationBs style={style} className={className}>
      {currentPage !== startPage && (
        <PaginationBs.Prev onClick={() => setCurrentPage(currentPage - 1)} />
      )}

      {!pages.includes(startPage) && (
        <PaginationBs.Item onClick={() => setCurrentPage(1)}>
          {startPage}
        </PaginationBs.Item>
      )}
      {first(pages)! - delta >= startPage && <PaginationBs.Ellipsis />}

      {pages.map(item => (
        <PaginationBs.Item
          active={currentPage === item}
          onClick={() => setCurrentPage(item)}
          key={item}
        >
          {item}
        </PaginationBs.Item>
      ))}

      {last(pages)! + delta <= endPage && <PaginationBs.Ellipsis />}
      {!pages.includes(endPage) && (
        <PaginationBs.Item onClick={() => setCurrentPage(endPage)}>
          {endPage}
        </PaginationBs.Item>
      )}

      {currentPage !== endPage && (
        <PaginationBs.Next onClick={() => setCurrentPage(currentPage + 1)} />
      )}
    </PaginationBs>
  );
};

export default memo(Pagination);
