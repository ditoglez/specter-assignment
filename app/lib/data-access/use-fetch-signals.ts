import { createInfiniteQuery } from 'react-query-kit';

import type {
  SignalsRequestParams,
  SignalsResponse,
} from '~/routes/api/signals';

import { getFetchInstance } from './fetcher';

const fetchSignals = async (
  params: SignalsRequestParams
): Promise<SignalsResponse> => {
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
  SignalsResponse,
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
