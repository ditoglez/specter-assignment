import { Fragment } from 'react';

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { Button } from '~/lib/components/Button';
import { useFetchSignals } from '~/lib/data-access/use-fetch-signals';
import { SignalCard } from '~/lib/components/SignalCard';

export const loader: LoaderFunction = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    useFetchSignals.getKey(),
    useFetchSignals.queryFn
  );

  return json({ dehydratedState: dehydrate(queryClient) });
};

export default function Index() {
  const query = useFetchSignals();

  return (
    <div className="mx-auto my-8 max-w-screen-md space-y-5">
      {query.data?.pages.map((page) => (
        <Fragment key={page.meta.pageIndex}>
          {page.signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </Fragment>
      ))}
      <div className="my-5 flex items-center justify-center">
        <Button
          className="w-full lg:w-auto"
          isLoading={query.isFetching}
          onClick={() => query.fetchNextPage()}
          disabled={!query.hasNextPage}
        >
          Load more
        </Button>
      </div>
    </div>
  );
}
