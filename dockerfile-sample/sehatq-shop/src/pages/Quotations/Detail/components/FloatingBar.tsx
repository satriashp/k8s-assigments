import styled from '@emotion/styled';
import { Button, Checkbox, Toast } from 'components';
import React, {
  FC, memo, useMemo, useState,
} from 'react';
import {
  Form, InputGroup, Modal, Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaCheck, FaTimes } from 'react-icons/fa';
import ContentLoader from 'react-content-loader';
import { useMutation, useQuery } from 'react-query';
import api from 'pages/Quotations/api';
import { BiddingRejectParams, Lang, RejectReason } from 'pages/Quotations/interfaces';
import i18next from 'lang/i18n';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  height: 72px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 12px 40px;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;

  .btn {
    width: 200px;
  }
`;

const Skeleton: FC = () => (
  <Container>
    <ContentLoader
      width="270"
      height={40}
      speed={2.5}
      backgroundColor="var(--n-20)"
      foregroundColor="var(--n-10)"
    >
      <rect x="0" y="4" rx="2" ry="2" width="120" height="14" />
      <rect x="135" y="4" rx="2" ry="2" width="150" height="14" />
      <rect x="0" y="24" rx="2" ry="2" width="80" height="16" />
      <rect x="135" y="24" rx="2" ry="2" width="70" height="16" />
    </ContentLoader>
    <ContentLoader
      width="414"
      height={45}
      speed={2.5}
      backgroundColor="var(--n-20)"
      foregroundColor="var(--n-10)"
    >
      <rect x="0" y="0" rx="2" ry="2" width="200" height="45" />
      <rect x="214" y="0" rx="2" ry="2" width="200" height="45" />
    </ContentLoader>
  </Container>
);

interface BiddingRejection extends RejectReason {
  checked: boolean;
  notes: string;
}

interface FloatingBarProps {
  loading: boolean;
  participantsCount: number;
  refresh(): void;
  biddingInvitationsId: number;
}

const FloatingBar: FC<FloatingBarProps> = ({
  loading, participantsCount, refresh, biddingInvitationsId,
}) => {
  const [biddingRejections, setBiddingRejections] = useState<BiddingRejection[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation('quotation_detail');
  const { t: tValidation } = useTranslation('validation');
  const id = biddingInvitationsId;

  const lang = i18next.language as keyof Lang;

  const { isLoading } = useQuery('reject-reasons', api.rejectReasons, {
    enabled: showModal,
    onSuccess: ({ data }) => {
      const reasons = [...data].filter(reason => reason.name.id !== 'Lainnya');
      const others = data.find(reason => reason.name.id === 'Lainnya');
      setBiddingRejections(reasons.concat(others ? [others] : []).map(reason => ({
        ...reason, checked: false, notes: '',
      })));
    },
  });

  const setReasonValue = (index: number, checked: boolean, notes: string) => {
    const newBiddingRejections = [...biddingRejections];
    newBiddingRejections[index].checked = checked;
    newBiddingRejections[index].notes = notes;
    setBiddingRejections(newBiddingRejections);
  };

  const history = useHistory();

  const {
    mutate: reject,
    isLoading: submitting,
  } = useMutation((params: BiddingRejectParams[]) => api.biddingReject(id, params), {
    onSuccess: () => {
      Toast({
        title: t('success_bidding_reject_title'),
        message: t('success_bidding_reject_message'),
        type: 'success',
      });
      setShowModal(false);
      history.push('/quotations/new');
    },
    onError: () => {
      Toast({
        title: t('failed_bidding_reject_title'),
        message: t('failed_bidding_reject_message'),
        type: 'error',
      });
    },
  });

  const {
    mutate: approve,
    isLoading: approving,
  } = useMutation(() => api.biddingApprove(id), {
    onSuccess: () => {
      Toast({
        title: t('success_bidding_approve_title'),
        message: t('success_bidding_approve_message'),
        type: 'success',
      });
      refresh();
    },
    onError: () => {
      Toast({
        title: t('failed_bidding_approve_title'),
        message: t('failed_bidding_approve_message'),
        type: 'error',
      });
    },
  });

  const onHide = () => {
    if (submitting) return;
    setBiddingRejections(biddingRejections.map(reason => ({
      ...reason, checked: false, notes: '',
    })));
    setSubmitted(false);
    setShowModal(false);
  };

  const renderInput = (index: number) => {
    const rejection = biddingRejections[index];
    const { additional } = rejection;

    return (
      <div className="pt-1" style={{ paddingLeft: 22 }}>
        {(additional?.append_text || additional.prepend_text) ? (
          <InputGroup className={submitted && !rejection.notes ? 'is-invalid' : ''}>
            {additional.prepend_text && (
              <InputGroup.Prepend>
                <InputGroup.Text>{t(additional.prepend_text)}</InputGroup.Text>
              </InputGroup.Prepend>
            )}
            <Form.Control
              type={additional.type.replace('_field', '')}
              placeholder={additional.placeholder[lang]}
              value={rejection.notes}
              onChange={e => setReasonValue(index, true, e.target.value)}
              isInvalid={submitted && !rejection.notes}
            />
            {additional.append_text && (
              <InputGroup.Append>
                <InputGroup.Text>{t(additional.append_text)}</InputGroup.Text>
              </InputGroup.Append>
            )}
          </InputGroup>
        ) : (
          <>
            <Form.Control
              as={['text_field', 'number_field'].includes(additional.type) ? 'input' : 'textarea'}
              placeholder={additional.placeholder[lang]}
              value={rejection.notes}
              onChange={e => setReasonValue(index, true, e.target.value)}
              isInvalid={submitted && !rejection.notes}
            />
            {!!additional.helper_text && (
              <span className="reg-12 text-n-50">{additional.helper_text}</span>
            )}
          </>
        )}
        {submitted && !rejection.notes && (
          <Form.Control.Feedback type="invalid">
            {tValidation('required_input')}
          </Form.Control.Feedback>
        )}
      </div>
    );
  };

  const isValid = useMemo<boolean>(() => {
    const checkedReason = biddingRejections.filter(rejection => rejection.checked);
    const valid = checkedReason.every(reason => reason.notes);
    return !!checkedReason.length && valid;
  }, [biddingRejections]);

  const submit = () => {
    setSubmitted(true);
    if (isValid) {
      const params: BiddingRejectParams[] = biddingRejections
        .filter(rejection => rejection.checked)
        .map(rejection => ({
          reason_id: rejection.id,
          reason: rejection.name[lang],
          notes: rejection.notes,
        }));
      reject(params);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <Container>
        <div className="d-flex">
          <div className="mr-3">
            <p className="m-0 text-n-60">{t('participants_count')}</p>
            <p className="m-0 text-n-90 reg-16">{t('suppliers', { count: participantsCount })}</p>
          </div>
          <div>
            <p className="m-0 text-n-60">{t('offer_send_limit')}</p>
            <p className="m-0 text-n-90 reg-16">{t('remaining_offers', { count: 3 })}</p>
          </div>
        </div>
        <div>
          <Button variant="outline-secondary" leftIcon={<FaTimes />} onClick={() => setShowModal(true)}>
            {t('dont_participate')}
          </Button>
          <Button
            leftIcon={<FaCheck />}
            className="ml-3"
            isLoading={approving}
            onClick={() => approve()}
          >
            {t('join_offer')}
          </Button>
        </div>
      </Container>
      <Modal show={showModal} onHide={onHide}>
        <Modal.Header closeButton={!submitting}>
          <Modal.Title>{t('why_you_dont_join')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading && (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          )}
          <p className="text-n-60 mb-2">{t('reason')}</p>
          {biddingRejections.map((reason, i) => (
            <div key={reason.id} className="mb-3">
              <Checkbox
                label={reason.name[lang]}
                checked={reason.checked}
                className="mb-2"
                onChange={() => setReasonValue(i, !reason.checked, '')}
              />
              {reason.checked && renderInput(i)}
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            className="text-n-90"
            onClick={() => setShowModal(false)}
            style={{ width: 160 }}
          >
            {t('cancel')}
          </Button>
          <Button
            style={{ width: 160 }}
            disabled={isLoading}
            isLoading={submitting}
            onClick={submit}
          >
            {t('dont_participate')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(FloatingBar);
