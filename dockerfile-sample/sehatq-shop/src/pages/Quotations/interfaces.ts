export interface Lang {
  id: string;
  en: string;
}

export interface AdditionalRejectReason {
  type: 'text_field' | 'number_field' | 'text_area';
  placeholder: Lang;
  prepend_text?: string;
  append_text?: string;
  helper_text?: string;
}

export interface RejectReason {
  id: number;
  code: string;
  name: Lang;
  additional: AdditionalRejectReason;
}

export interface BiddingRejectParams {
  reason_id: number;
  reason: string;
  notes: string;
}

export interface Bidding {
  id: number;
  number: string;
  round: number;
  start_time: Date;
  end_time: Date;
  inquiry: Inquiry;
  bidding_invitation: BiddingInvitation;
  company: Company;
}

export interface BiddingInvitation {
  id: number;
  partner_id: number;
  bidding_id: number;
  invited_at: Date;
  invited_by: number;
  status: null | 'accepted';
  due_date: Date;
  bidding_rejections: BiddingRejection[];
}

export interface BiddingRejection {
  id: number;
  reason_id: number;
  reason: string;
  notes: string;
}

export interface Company {
  name: string;
  industry: string;
  employees_count: number;
  city: City;
  inquiry_stats: InquiryStats;
}

export interface City {
  id: number;
  name: string;
}

export interface InquiryStats {
  calculatings_count: number;
  waiting_quotations_count: number;
  ready_to_reviews_count: number;
  waiting_approvals_count: number;
  ready_to_orders_count: number;
  cancelleds_count: number;
  completeds_count: number;
}

export interface Inquiry {
  id: number;
  number: string;
  ref_number: string;
  name: string;
  category: string;
  specs: { [key: string]: number };
  spec_set: { [key: string]: number };
  custom_size?: CustomSize;
  shipping_option: string;
  status: string;
  notes?: string;
  design_url: string;
  est_received_date?: string;
  participants_count: number;
  quotations_count: number;
  quantities_label: string;
  shipping_address_city_label: string;
  proof_type: string;
  payment_term: number;
}

export interface CustomSize {
  width: number;
  height: number;
}

export interface BiddingList {
  id: number;
  number: string;
  round: number;
  start_time: Date;
  end_time: Date;
  bidding_participant_count: number;
  bidding_invitation: BiddingInvitation;
  inquiry: Inquiry;
  status: string;
  tooltip_label: string;
  rate: '-' | 'icon' | number;
}

interface Quotation {
  id: number;
  number: string;
  inquiry_id: number;
  partner_rating: null | number;
  expired_at: Date;
  lead_time_min: number;
  lead_time_max: number;
  total_min: number;
  total_max: number;
  production_cost_min: string;
  production_cost_max: string;
  shipping_cost_min: string;
  shipping_cost_max: string;
  quotation_owners_count: number;
  suggested_specs_count: number;
  smart_sourcing: boolean;
  tags: string[];
  status: string;
  bidding_submissions_count: number;
  bidding_submissions_limit: number;
  created_at: Date;
  updated_at: Date;
}

interface Product {
  id: number;
  code: string;
  recommended: boolean;
  moq: number;
  weight: number;
  weight_per_unit: number;
  dimension: {
    width: number;
    height: number;
    length: number;
  },
  product_size: {
    width: number;
    length: number;
  },
  volume: number;
  packing_volume: number;
  spec_set: {
    [key: string]: string;
  },
  specs: {
    [key: string]: string;
  },
  guideline: string;
  variant: {
    id: number;
    code: string;
    name: string;
    unit: string;
  },
  product_type: {
    id: number;
    code: string;
    name: string;
  }
}

export interface BiddingListQuotation extends BiddingList {
  quotation: Quotation;
  product: Product;
}

export interface BiddingListParams {
  query?: string;
  sort_by?: string;
  sort_direction?: string;
  page?: number;
}

export interface BiddingStatistics {
  inviteds_count: number;
  ongoings_count: number;
  waitings_count: number;
  histories_count: number;
}
