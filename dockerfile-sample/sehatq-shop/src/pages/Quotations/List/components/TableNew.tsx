import { Pagination, SortButton } from 'components';
import dayjs from 'dayjs';
import { pickBy, identity } from 'lodash';
import api from 'pages/Quotations/api';
import { BiddingList } from 'pages/Quotations/interfaces';
import useStore from 'pages/Quotations/store';
import React, { FC, memo, useState } from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useQueryParam, NumberParam } from 'use-query-params';
import {
  PaginationContainer, TableContainer, Tr, TableRowSkeleton, remainingDays,
} from './atoms';

const TableNew: FC = () => {
  const [sortKey, setSortKey] = useState('');
  const [sortVal, setSortVal] = useState<'asc' | 'desc' | ''>('');
  const [pageParam = 1] = useQueryParam('page', NumberParam);
  const tableQuery = useStore(s => s.tableQuery);
  const { t } = useTranslation('quotation_list');

  const params = pickBy({
    page: pageParam || 1,
    query: tableQuery,
    sort_by: sortKey,
    sort_direction: sortVal,
  }, identity);

  const { data: response, isLoading } = useQuery(
    ['/biddings/inviteds', params],
    () => api.biddingListNew(params),
  );

  const data = response?.data || [] as BiddingList[];
  const pagination = response?.pagination;
  const limit = pagination?.per_page || 0;
  let start = limit ? pageParam! * limit - limit + 1 : 0;
  let end = pageParam! * limit;

  if (typeof pagination?.total_entries === 'number') {
    start = start < pagination?.total_entries ? start : pagination?.total_entries;
    end = end > pagination?.total_entries ? pagination?.total_entries : end;
  }

  const range = `${start} - ${end}`;
  const skelArr = [1, 2];

  const sort = (key: string) => {
    setSortKey(key);
    if (sortKey !== key) {
      setSortVal('asc');
    } else {
      setSortVal(sortVal === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <Tr>
            <th style={{ width: 250 }}>No. RFQ</th>
            <th>{t('item_name')}</th>
            <th>{t('type')}</th>
            <th>{t('participant')}</th>
            <th className="position-relative">
              <OverlayTrigger
                placement="top"
                trigger="hover"
                overlay={(
                  <Tooltip id="deadline" className="custom w-300">
                    <div className="text-left">
                      <p className="m-0 text-n-10">Periode penawaran dapat dihentikan sewaktu-waktu oleh customer.</p>
                    </div>
                  </Tooltip>
                )}
              >
                <FaInfoCircle size={12} fill="var(--n-60)" className="mr-1" />
              </OverlayTrigger>
              <SortButton
                onClick={() => sort('end_time')}
                sortVal={sortKey === 'end_time' && sortVal}
              >
                <span className="med-12">
                  {t('deadline')}
                </span>
              </SortButton>
            </th>
            <th>
              <SortButton
                onClick={() => sort('due_date')}
                sortVal={sortKey === 'due_date' && sortVal}
              >
                <span className="med-12">
                  {t('end_time')}
                </span>
              </SortButton>
            </th>
          </Tr>
        </thead>
        <tbody>
          {isLoading ? skelArr.map(item => (
            <TableRowSkeleton key={item} />
          )) : !!data.length && data.map(item => (
            <tr key={item.id}>
              <td className="med-14 text-br-50">
                <Link to={`/quotations/detail/${item.id}`}>
                  {item.inquiry.number}
                </Link>
              </td>
              <td style={{ width: 200 }}>
                {item.inquiry.name}
              </td>
              <td>
                {item.inquiry.category}
              </td>
              <td>
                {t('suppliers', {
                  count: item.bidding_participant_count,
                })}
              </td>
              <td>
                {item.end_time ? (
                  <>
                    {remainingDays(item.end_time, t)}
                    {', '}
                    {dayjs(item.end_time).format('HH:mm')}
                  </>
                ) : '-'}
              </td>
              <td>
                {item.bidding_invitation.due_date ? (
                  <>
                    {remainingDays(item.bidding_invitation.due_date, t)}
                    {', '}
                    {dayjs(item.bidding_invitation.due_date).format('HH:mm')}
                  </>
                ) : '-'}
              </td>
            </tr>
          ))}
          { !isLoading && !data.length && (
            <tr>
              <td className="text-center" colSpan={6}>
                Empty Result
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <PaginationContainer>
        <Pagination totalPages={pagination?.total_pages || 0} />
        {`Menampilkan ${range} dari ${pagination?.total_entries}`}
      </PaginationContainer>
    </TableContainer>
  );
};

export default memo(TableNew);
