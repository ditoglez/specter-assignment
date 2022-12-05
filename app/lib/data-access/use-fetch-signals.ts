import { createInfiniteQuery } from 'react-query-kit';

import type {
  SignalsRequestParams,
  PageableSignalsResponse,
} from '~/routes/api/signals';

import { getFetchInstance } from './fetcher';

const fetchSignals = async (
  params: SignalsRequestParams
): Promise<PageableSignalsResponse> => {
  console.log(params);

  const response = await getFetchInstance().fetch(
    `/signals?pageIndex=${params.pageIndex}`
  );
  const json = await response.json();

  return json;
};

type FetchSignalsVariables =
  | {
      sort?: string;
    }
  | undefined;

export const useFetchSignals = createInfiniteQuery<
  PageableSignalsResponse,
  FetchSignalsVariables
>({
  primaryKey: 'signals',
  queryFn: ({ queryKey: [, params], pageParam }) => {
    return fetchSignals({ ...params, pageIndex: pageParam ?? 0 });
  },

  getNextPageParam(lastPage) {
    return lastPage.meta.nextPageIndex ?? undefined;
  },
});
