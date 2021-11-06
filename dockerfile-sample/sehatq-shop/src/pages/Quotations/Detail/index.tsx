import { Button } from 'components';
import React, { FC, memo } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import api from 'pages/Quotations/api';
import FloatingBar from './components/FloatingBar';
import Form from './components/Form';
import Info from './components/Info';
import SkeletonInfo from './components/SkeletonInfo';

const Detail: FC = () => {
  const history = useHistory();
  const { t } = useTranslation('quotation_detail');
  const { id } = useParams<{ id: string }>();

  const {
    data, isLoading, refetch, isRefetching,
  } = useQuery(`biddings/${id}`, () => api.biddingDetail(+id));

  const loading = isLoading || isRefetching;

  return (
    <Container fluid className="pt-3 mb-5 pb-5" style={{ padding: '0 40px' }}>
      <Button
        leftIcon={<FaArrowLeft color="var(--n-60)" />}
        onClick={history.goBack}
        variant="link"
        className="text-dark p-0"
      >
        {t('back')}
      </Button>
      {!loading && data ? <Info bidding={data?.data} /> : <SkeletonInfo />}
      {data?.data.bidding_invitation.status && <Form />}
      {(loading || !data?.data.bidding_invitation.status) && (
        <FloatingBar
          loading={loading}
          participantsCount={data?.data.inquiry.participants_count || 0}
          refresh={() => refetch()}
          biddingInvitationsId={data?.data.bidding_invitation.id || 0}
        />
      )}
    </Container>
  );
};

export default memo(Detail);
