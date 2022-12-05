import type { Database } from './supabase';

export type SignalRow = Partial<Database['public']['Tables']['signals']['Row']>;

export type SignalRows = SignalRow[];

export type Signal = Pick<
  SignalRow,
  | 'id'
  | 'rank'
  | 'company_name'
  | 'founded_date'
  | 'domain'
  | 'industry'
  | 'company_size'
  | 'hq_location'
  | 'total_funding_amount_in_usd'
>;
