import {
  Button, SortButton, Pagination, Badge,
} from 'components';
import dayjs from 'dayjs';
import api from 'pages/Quotations/api';
import { BiddingListQuotation } from 'pages/Quotations/interfaces';
import useStore from 'pages/Quotations/store';
import React, {
  FC, memo, useState,
} from 'react';
import {
  Dropdown, OverlayTrigger, Table, Tooltip,
} from 'react-bootstrap';
import { FaComment, FaEllipsisV, FaInfoCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { NumberParam, useQueryParam } from 'use-query-params';
import { identity, pickBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  TableContainer, Tr, PaginationContainer, TableRowSkeleton,
} from './atoms';
import calculate from '../assets/calculate.svg';

const TableWaiting: FC = () => {
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
    ['biddings/waitings', params],
    () => api.biddingListWaiting(params),
  );

  const data = response?.data || [] as BiddingListQuotation[];
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
            <th>
              <OverlayTrigger
                placement="top"
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
              <SortButton onClick={() => sort('end_time')} sortVal={sortKey === 'end_time' && sortVal}>
                <span className="med-12">
                  {t('deadline')}
                </span>
              </SortButton>
            </th>
            <th>{t('status')}</th>
            <th style={{ width: 148 }}>
              {' '}
            </th>
          </Tr>
        </thead>
        <tbody>
          {isLoading ? skelArr.map(item => (
            <TableRowSkeleton key={item} />
          )) : !!data.length && data.map(item => (
            <tr key={item.inquiry.id}>
              <td className="med-14 text-br-50">
                <Link to={`/quotations/detail/${item.id}`} className="mr-2">
                  {item.inquiry.number}
                </Link>
                {item.quotation?.tags?.includes('calculator') && (
                <OverlayTrigger
                  placement="bottom"
                  overlay={(
                    <Tooltip id={`check-${item.id}`} className="custom w-300">
                      <div className="text-left">
                        <span className="med-14">Penawaran Otomatis</span>
                        <p className="m-0 text-n-10">Harga didapatkan otomatis oleh sistem berdasarkan rate card</p>
                      </div>
                    </Tooltip>
                      )}
                >
                  <img src={calculate} width="16" alt="badge-automatic" className="mr-2" />
                </OverlayTrigger>
                )}
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
                {item.end_time ? dayjs(item.end_time).format('DD MMM YYYY, HH:mm') : '-'}
              </td>
              <td>
                <Badge variant="warning">
                  {' '}
                  {t('waiting_customer')}
                  {' '}
                </Badge>
              </td>
              <td className="text-right">
                <Button variant="outline-white" className="btn-icon mr-3">
                  <FaComment size={12} />
                </Button>
                <Dropdown className="d-inline-block">
                  <Dropdown.Toggle
                    variant="outline-white"
                    className="text-n-60 btn-icon no-arrow rounded-2 "
                  >
                    <FaEllipsisV size={12} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>{t('download_pdf')}</Dropdown.Item>
                    <Dropdown.Item>{t('extend')}</Dropdown.Item>
                    <Dropdown.Item>{t('see_log')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
          {!isLoading && !data.length && (
            <tr>
              <td className="text-center" colSpan={7}>
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

export default memo(TableWaiting);
