import { http, utils } from 'helpers';
import {
  Bidding,
  BiddingRejectParams,
  RejectReason,
  BiddingList,
  BiddingListQuotation,
  BiddingListParams,
  BiddingStatistics,
} from './interfaces';

const api = {
  biddingListNew(params?: BiddingListParams) {
    return utils.apiHandler<BiddingList[]>(http.get('biddings/inviteds', { params }));
  },
  biddingListOngoing(params?: BiddingListParams) {
    return utils.apiHandler<BiddingListQuotation[]>(http.get('biddings/ongoings', { params }));
  },
  biddingListWaiting(params?: BiddingListParams) {
    return utils.apiHandler<BiddingListQuotation[]>(http.get('biddings/waitings', { params }));
  },
  biddingListHistory(params?: BiddingListParams) {
    return utils.apiHandler<BiddingListQuotation[]>(http.get('biddings/histories', { params }));
  },
  rejectReasons() {
    return utils.apiHandler<RejectReason[]>(http.get('bidding-rejection-reasons'));
  },
  biddingReject(id: number, params: BiddingRejectParams[]) {
    const data = {
      bidding_rejections: params,
    };
    return utils.apiHandler<Bidding>(http.put(`bidding-invitations/${id}/reject`, data));
  },
  biddingApprove(id: number) {
    return utils.apiHandler<Bidding>(http.put(`bidding-invitations/${id}/approve`));
  },
  biddingDetail(id: number) {
    return utils.apiHandler<Bidding>(http.get(`biddings/${id}`));
  },
  biddingStatistics() {
    return utils.apiHandler<BiddingStatistics>(http.get('biddings/statistics'));
  },
};

export default api;
