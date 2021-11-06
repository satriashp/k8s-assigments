import styled from '@emotion/styled';
import dayjs from 'dayjs';
import React from 'react';
import ContentLoader from 'react-content-loader';

export const TableContainer = styled.div`
  table {
    margin-bottom: 0;
  }
  tbody {
    font-weight: 400px;
  }
`;

export const PaginationContainer = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E0E2E6;
  border-bottom: 1px solid #E0E2E6;
  .pagination {
    margin-bottom: 0;
    .page-item {
      .page-link {
        border-radius: 2px;
      }
    }
  }
`;

export const Tr = styled.tr`
  th {
    border-bottom-width: 1px !important;
    vertical-align: middle !important;
    font-size: 12px;
    line-height: 16px;
    font-family: 'printerous-font-medium';
    padding: 12px;
  }
`;

export const TableRowSkeleton: React.FC = () => (
  <Tr>
    <td>
      <div className="d-inline-block">
        <ContentLoader
          width={160}
          height={16}
          speed={2.5}
          backgroundColor="var(--n-20)"
          foregroundColor="var(--n-10)"
        >
          <rect x="0" y="0" rx="4" ry="4" width="150" height="16" />
        </ContentLoader>
      </div>
    </td>
    <td>
      <div className="d-inline-block">
        <ContentLoader
          width={180}
          height={16}
          speed={2.5}
          backgroundColor="var(--n-20)"
          foregroundColor="var(--n-10)"
        >
          <rect x="0" y="0" rx="4" ry="4" width="180" height="16" />
        </ContentLoader>
      </div>
    </td>
    <td>
      <div className="d-inline-block">
        <ContentLoader
          width={180}
          height={16}
          speed={2.5}
          backgroundColor="var(--n-20)"
          foregroundColor="var(--n-10)"
        >
          <rect x="0" y="0" rx="4" ry="4" width="180" height="16" />
        </ContentLoader>
      </div>
    </td>
    <td>
      <div className="d-inline-block">
        <ContentLoader
          width={180}
          height={16}
          speed={2.5}
          backgroundColor="var(--n-20)"
          foregroundColor="var(--n-10)"
        >
          <rect x="0" y="0" rx="4" ry="4" width="180" height="16" />
        </ContentLoader>
      </div>
    </td>
    <td>
      <div className="d-inline-block">
        <ContentLoader
          width={115}
          height={16}
          speed={2.5}
          backgroundColor="var(--n-20)"
          foregroundColor="var(--n-10)"
        >
          <rect x="0" y="0" rx="4" ry="4" width="115" height="16" />
        </ContentLoader>
      </div>
    </td>
    <td>
      <div className="d-inline-block">
        <ContentLoader
          width={100}
          height={16}
          speed={2.5}
          backgroundColor="var(--n-20)"
          foregroundColor="var(--n-10)"
        >
          <rect x="0" y="0" rx="4" ry="4" width="100" height="16" />
        </ContentLoader>
      </div>
    </td>
    <td>
      <div className="d-inline-block">
        <ContentLoader
          width={67}
          height={30}
          speed={2.5}
          backgroundColor="var(--n-20)"
          foregroundColor="var(--n-10)"
        >
          <rect x="0" y="0" rx="0" ry="0" width="30" height="30" />
          <rect x="37" y="0" rx="0" ry="0" width="30" height="30" />
        </ContentLoader>
      </div>
    </td>
  </Tr>
);

export const remainingDays = (date: string | Date, t: Function): string | Object => {
  const dateNow = dayjs(new Date()).format('YYYY-MM-DD');
  const diff = dayjs(date).diff(dateNow, 'd');
  if (diff < 0) return dayjs(date).format('DD MMM YYYY');
  if (diff < 1) return t('today');
  return t('remaining_days', { count: diff.toFixed(0) });
};
