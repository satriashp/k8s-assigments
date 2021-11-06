import styled from '@emotion/styled';
import { Button } from 'components';
import dayjs from 'dayjs';
import { Bidding } from 'pages/Quotations/interfaces';
import React, {
  FC, memo, useEffect, useRef, useState,
} from 'react';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { useTranslation } from 'react-i18next';
import {
  FaChevronDown, FaChevronUp, FaCrown, FaFileDownload, FaInfoCircle,
} from 'react-icons/fa';
import statistic from '../../assets/images/quotation-statistic.png';

Chart.register(ChartDataLabels);
Chart.defaults.font.family = 'printerous-font-regular';

const Grid = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  margin-bottom: 16px;
`;

const Ellipsis = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px ;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: 20px;

    li {
      position: relative;

      &.green::before {
        background-color: var(--g-20);
      }

      &.yellow::before {
        background-color: var(--y-20);
      }

      &.red::before {
        background-color: var(--r-20);
      }

      &::before {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 2px;
        position: absolute;
        left: -20px;
        top:4px;
      }
    }
  }
`;

const Statistic = styled.div`
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%,
    rgba(187, 192, 201, 0.5) 124.14%);
  position: relative;
  min-height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;

  img {
    position: absolute;
    width: 100%;
    z-index: -1;
    filter: blur(5px);
  }

  p {
    text-align: center;
    color: var(--n-90);
  }
`;

interface BoxProps {
  title: string;
  badgeTitle?: string;
  children: React.ReactNode;
}

const Box: FC<BoxProps> = memo(({ title, badgeTitle, children }) => (
  <div className="border-n-20 rounded overflow-hidden">
    <div className="p-3 border-bottom-n-20">
      <h5 className="text-n-70 med-16 m-0 d-flex align-items-center">
        {title}
        <Badge variant="info" className="ml-2">{badgeTitle}</Badge>
      </h5>
    </div>
    {children}
  </div>
));

interface LabelValueProps {
  label: string;
  children: React.ReactNode;
  tooltipMessage?: string;
  tooltipChildren?: string
}

const LabelValue: FC<LabelValueProps> = memo(({
  label, children, tooltipMessage, tooltipChildren,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLSpanElement>(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [childWidth, setChildWidth] = useState(0);

  useEffect(() => {
    setParentWidth(parentRef.current?.getBoundingClientRect().width || 0);
    setChildWidth(childRef.current?.getBoundingClientRect().width || 0);
  }, []);

  return (
    <div className="row mb-2 position-relative">
      <div className="col-6">
        <span className="text-n-60">
          {label}
          {!!tooltipMessage && (
            <OverlayTrigger
              placement="bottom"
              overlay={(
                <Tooltip id={`tooltip-${label.toLowerCase().replaceAll(' ', '')}`}>
                  {tooltipMessage}
                </Tooltip>
              )}
            >
              <FaInfoCircle size={12} color="var(--n-60)" className="ml-2" />
            </OverlayTrigger>
          )}
        </span>
      </div>
      <OverlayTrigger
        placement="bottom"
        show={childWidth > parentWidth ? undefined : false}
        overlay={(
          <Tooltip id={`tooltip-value-${label.toLowerCase().replaceAll(' ', '')}`}>
            {tooltipChildren || children}
          </Tooltip>
        )}
      >
        <Ellipsis className="col-6" ref={parentRef}>
          <span className="text-n-90" ref={childRef}>{children}</span>
        </Ellipsis>
      </OverlayTrigger>
    </div>
  );
});

interface InfoProps {
  bidding: Bidding;
}

const Info: FC<InfoProps> = ({ bidding }) => {
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation('quotation_detail');
  const isPro = true;

  const remainingDays = (date: string | Date): string => {
    const diff = dayjs(date).diff(new Date(), 'd', true);
    if (diff < 0) return t('remaining_days_minus', { count: +Math.abs(diff).toFixed(0) });
    if (diff < 1) return t('today');
    return `${diff.toFixed(0)} ${t('remaining_days')}`;
  };

  const {
    bidding_invitation: biddingInvitation,
    inquiry,
    company,
  } = bidding;
  const specs = Object.entries(inquiry.specs);
  const designUrl = decodeURIComponent(decodeURIComponent(inquiry.design_url)).split('/').pop();
  const biddingStatus = () => {
    const status = {
      accepted: 'ongoing',
    };
    return biddingInvitation.status ? status[biddingInvitation.status] : 'new';
  };

  const rfqTotal = company.inquiry_stats.cancelleds_count
    + company.inquiry_stats.completeds_count
    + company.inquiry_stats.ready_to_reviews_count
    + company.inquiry_stats.waiting_approvals_count;

  const chartData = {
    labels: [t('rfq_cancel'), t('rfq_po'), t('rfq_no_response')],
    datasets: [
      {
        data: rfqTotal ? [
          company.inquiry_stats.cancelleds_count,
          company.inquiry_stats.ready_to_reviews_count
          + company.inquiry_stats.waiting_approvals_count,
          company.inquiry_stats.completeds_count,
        ] : [1],
        backgroundColor: rfqTotal ? [
          '#F89D25',
          '#F75E6B',
          '#17C4B6',
        ] : ['#17C4B6'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="mt-2">
      <h4 className="med-24 text-n-90">{inquiry.name}</h4>
      <div className="d-flex align-items-center mb-2">
        <span className="text-n-60 mr-1">{inquiry.number}</span>
        <Badge variant="info">{t(biddingStatus())}</Badge>
      </div>
      <Grid>
        <Box title={t('request_info')}>
          <div className="p-3">
            <LabelValue label={t('registration_deadline')}>
              {`${remainingDays(biddingInvitation.due_date)}, `}
              {dayjs(biddingInvitation.due_date).format('HH:mm')}
            </LabelValue>
            {inquiry.est_received_date && (
              <LabelValue label={t('product_expectation_received')}>
                {dayjs(inquiry.est_received_date).format('DD MMM YYYY')}
                {` (${remainingDays(inquiry.est_received_date)})`}
              </LabelValue>
            )}
            <LabelValue label={t('request_quantity')}>
              {inquiry.quantities_label}
            </LabelValue>
            <LabelValue label={t('shipping_destination')}>
              {inquiry.shipping_address_city_label}
            </LabelValue>
            <LabelValue label={t('payment_terms')}>
              {`${inquiry.payment_term} ${t('day')}`}
            </LabelValue>
            <LabelValue label="Proof" tooltipMessage={t('proof_info')}>
              {t(inquiry.proof_type)}
            </LabelValue>
            <LabelValue label={t('file_reference')} tooltipChildren={designUrl}>
              <a
                href={inquiry.design_url}
                target="_blank"
                rel="noopener noreferrer"
                className="med-14"
              >
                <FaFileDownload size={12} className="mr-2" />
                {designUrl}
              </a>
            </LabelValue>
          </div>
        </Box>
        <Box title={t('specifications')}>
          <div className="p-3">
            {specs.slice(0, showMore ? specs.length : 7).map(([key, value]) => (
              <LabelValue key={key} label={key}>
                {value}
              </LabelValue>
            ))}
            {specs.length > 7 && (
              <Button
                variant="link"
                className="p-0 mb-2"
                rightIcon={showMore ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                onClick={() => setShowMore(!showMore)}
              >
                {t(showMore ? 'hide' : 'show_more')}
              </Button>
            )}
            {inquiry.notes && <p className="text-n-60">{`Note: ${inquiry.notes}`}</p>}
          </div>
        </Box>
        <Box title={t('customer_info')}>
          <div className="p-3">
            <LabelValue label={t('company_name')}>
              {company.name}
            </LabelValue>
            <LabelValue label={t('company_industry')}>
              {company.industry}
            </LabelValue>
            <LabelValue label={t('employees_count')}>
              {t('employee', { value: company.employees_count })}
            </LabelValue>
            <LabelValue label={t('company_location')}>
              {company?.city?.name}
            </LabelValue>
          </div>
          {isPro ? (
            <ChartWrapper>
              <div style={{ height: 160, width: 160 }}>
                <Pie
                  data={chartData}
                  options={{
                    plugins: {
                      legend: { display: false },
                      datalabels: {
                        formatter: value => {
                          if (!rfqTotal) return '0%';
                          return `${((value * 100) / rfqTotal).toFixed(1).replace('.0', '')}%`;
                        },
                        color: 'white',
                      },
                      tooltip: { enabled: false },
                    },
                  }}
                />
              </div>
              <div className="ml-4">
                <h6 className="med-14">{`Total RFQ: ${rfqTotal}`}</h6>
                <ul>
                  <li className="text-n-70 reg-12 green">{t('rfq_po')}</li>
                  <li className="text-n-70 reg-12 yellow">{t('rfq_cancel')}</li>
                  <li className="text-n-70 reg-12 red">{t('rfq_no_response')}</li>
                </ul>
              </div>
            </ChartWrapper>
          ) : (
            <Statistic>
              <img src={statistic} alt="" />
              <p>{t('more_stats_info')}</p>
              <Button variant="light" leftIcon={<FaCrown size={12} color="var(--y-20)" />} className="px-4">
                {t('upgrade_to_pro')}
              </Button>
            </Statistic>
          )}
        </Box>
      </Grid>
      {!biddingInvitation.status && (
        <Box title={t('tnc')}>
          <ul className="mt-3">
            <li>{t('tnc_1')}</li>
            <li>{t('tnc_2')}</li>
          </ul>
        </Box>
      )}
    </div>
  );
};

export default memo(Info);
