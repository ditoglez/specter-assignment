import { createQuery } from 'react-query-kit';

import type { SignalRow } from '~/types/signal';

import { getFetchInstance } from './fetcher';

type FetchSignalsVariables = { id: number };

const fetchSignal = async ({
  id,
}: FetchSignalsVariables): Promise<SignalRow> => {
  const response = await getFetchInstance().fetch(`/signals/${id}`);
  const json = await response.json();

  return json;
};

export const useFetchSignal = createQuery<SignalRow, FetchSignalsVariables>({
  primaryKey: 'signal',
  queryFn: ({ queryKey: [, params] }) => fetchSignal(params),
});
