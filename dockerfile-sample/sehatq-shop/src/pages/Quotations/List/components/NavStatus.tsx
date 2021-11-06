import React, { FC, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import api from 'pages/Quotations/api';

const RfqTab = styled.ul`
  background-color: var(--b-30);
  list-style: none;
  margin: 0;
  padding:5px 40px 0;
  display: flex;
  align-items:center;

  li {
    display: inline-block;
    margin: 0 4px;
    border-radius: 2px 2px 0 0;
    background-color: rgba(230, 235, 250, 0.2);

    a{
      padding:4px 12px;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      text-decoration:none;    
      display: block;
    }

    &.active {
      background: #fff;
      a{
        color: #24282D;
      }
    }

  }
`;

const NavStatus: FC = () => {
  const { t } = useTranslation('quotation_list');
  const { status } = useParams<{ status: string }>();
  const { data: response } = useQuery(
    ['bidding-statistic', status],
    () => api.biddingStatistics(),
  );

  const data = response?.data;

  const isActive = (statusParams: string, currentStatus: string) => {
    let active = '';
    if (statusParams === currentStatus) {
      active = 'active';
    }
    return active;
  };

  const statusList = [
    {
      id: 1,
      label: t('new'),
      name: 'new',
      count: data?.inviteds_count,
    },
    {
      id: 2,
      label: t('ongoing'),
      name: 'ongoing',
      count: data?.ongoings_count,
    },
    {
      id: 3,
      label: t('waiting_for_customer'),
      name: 'waiting',
      count: data?.waitings_count,
    },
    {
      id: 4,
      label: t('history'),
      name: 'history',
    },
  ];

  return (
    <div>
      <RfqTab>
        {statusList.map(item => (
          <li key={item.id} className={isActive(item.name, status)}>
            <Link to={`/quotations/${item.name}`}>
              {item.label}
              {' '}
              {typeof item.count === 'number' && `(${item.count})`}
            </Link>
          </li>
        ))}
      </RfqTab>
    </div>
  );
};

export default memo(NavStatus);
