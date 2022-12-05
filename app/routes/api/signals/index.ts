import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getSupabaseInstance } from '~/lib/supabase/supabase.instance';
import type { Signal } from '~/types/signal';

const PAGE_SIZE = 20;

export type SignalsRequestParams = {
  pageIndex: number;
};

export type PageMeta = {
  pageIndex: number;
  nextPageIndex: number;
  size: number;
  totalPages: number;
};

type Signals = Signal[];

export type PageableSignalsResponse = {
  signals: Signals;
  meta: PageMeta;
};

const fetchSignals = async (params: SignalsRequestParams) => {
  const from = (params.pageIndex || 0) * PAGE_SIZE;

  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await getSupabaseInstance()
    .from('signals')
    .select(
      'id, rank, company_name, founded_date, domain, industry, company_size, hq_location, total_funding_amount_in_usd',
      { count: 'exact' }
    )
    .order('rank', { ascending: true })
    .range(from, to);

  const totalPages = Math.ceil(Number(count) / PAGE_SIZE - 1);

  if (error) {
    throw new Error(error.message);
  }

  const nextPageIndex =
    params.pageIndex < totalPages ? params.pageIndex + 1 : null;

  return {
    signals: data,
    meta: {
      pageIndex: params.pageIndex,
      nextPageIndex,
      size: PAGE_SIZE,
      totalPages,
    },
  };
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const pageIndex = Number(new URL(request.url).searchParams.get('pageIndex'));
  const data = await fetchSignals({ pageIndex });

  return json(data);
};
