import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useParams } from '@remix-run/react';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import invariant from 'tiny-invariant';

import { useFetchSignal } from '~/lib/data-access/use-fetch-signal';
import { formatCurrency } from '~/lib/utils/formatCurrency';

export const loader: LoaderFunction = async ({ params }) => {
  const id = Number(params.signalId);

  invariant(id, 'params.signalId is missing');

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useFetchSignal.getKey({ id }),
    useFetchSignal.queryFn
  );

  return json({ dehydratedState: dehydrate(queryClient) });
};

export default function SignalDetails() {
  const params = useParams<{ signalId: string }>();

  const signal = useFetchSignal({ variables: { id: Number(params.signalId) } });

  return (
    <div className="mx-auto my-8 max-w-screen-2xl">
      <div className="space-y-5 rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex gap-5">
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-lg border-2 border-gray-300 p-2 text-2xl font-semibold text-gray-600">
            Rank
            <span>{signal.data?.rank}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold lg:text-4xl">
              {signal.data?.company_name}
            </h3>
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center">
              <p className="text-xs font-semibold text-gray-600">
                Founded in {signal.data?.founded_date}
              </p>
              <span className="hidden lg:inline-flex">&#x2022;</span>
              <a
                href={signal.data?.domain as string}
                rel="noreferrer"
                target="_blank"
                className="flex items-center space-x-1 text-xs font-semibold text-blue-600 underline-offset-4 hover:underline"
              >
                <span>{signal.data?.domain}</span>
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs font-semibold text-gray-600">
              Founded by: {signal.data?.founders}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600">{signal.data?.description}</p>
        <div
          className="flex flex-nowrap items-center gap-3 overflow-x-auto"
          data-swipeable
        >
          <div className="flex flex-nowrap items-center space-x-1 whitespace-nowrap rounded-full border border-blue-200 bg-blue-200/50 px-3 py-1 text-xs font-semibold text-blue-600">
            <BuildingOfficeIcon className="h-4 w-4" />
            <span>{signal.data?.industry}</span>
          </div>

          <div className="flex flex-nowrap items-center space-x-1 whitespace-nowrap rounded-full border border-green-200 bg-green-200/50 px-3 py-1 text-xs font-semibold text-green-600">
            <MapPinIcon className="h-4 w-4" />
            <span>{signal.data?.hq_location?.split(',')[0]}</span>
          </div>

          <div className="flex flex-nowrap items-center space-x-1 whitespace-nowrap rounded-full border border-green-200 bg-green-200/50 px-3 py-1 text-xs font-semibold text-green-600">
            <UsersIcon className="h-4 w-4" />
            <span>{signal.data?.company_size}</span>
          </div>

          <div className="flex flex-nowrap items-center space-x-1 rounded-full border border-yellow-200 bg-yellow-200/50 px-3 py-1 text-xs font-semibold text-yellow-600">
            <CurrencyDollarIcon className="h-4 w-4" />
            <span>
              {Intl.NumberFormat().format(
                Number(signal.data?.total_funding_amount_in_usd)
              )}
            </span>
          </div>
        </div>

        <div className="text-sm">
          <h4 className="font-semibold">Categories</h4>
          <p>{signal.data?.categories}</p>
        </div>

        <div className="space-y-2 text-sm">
          <h4 className="font-semibold">Tags</h4>
          <div
            className="flex flex-nowrap items-center gap-3 overflow-x-auto"
            data-swipeable
          >
            {signal.data?.tags?.split(', ').map((tag, index) => (
              <div
                key={index}
                className="whitespace-nowrap rounded-full border border-green-200 bg-green-200/50 px-3 py-1 text-xs font-semibold text-green-700"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-md text-sm">
          <h4 className="mb-2 font-semibold">Funding</h4>
          <ul className="space-y-2 font-semibold">
            <li className="flex items-center justify-between rounded-md bg-blue-100/50 px-2 py-1">
              <span>Total Funding Amount (in USD)</span>
              <span>
                {formatCurrency(signal.data?.total_funding_amount_in_usd)}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-blue-100/50 px-2 py-1">
              <span>Last Funding Amount (in USD)</span>
              <span>
                {formatCurrency(signal.data?.last_funding_amount_in_usd)}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-blue-100/50 px-2 py-1">
              <span>Last Funding Date</span>
              <span>{signal.data?.last_funding_date}</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-blue-100/50 px-2 py-1">
              <span>Last Funding Type</span>
              <span>{signal.data?.last_funding_type}</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-blue-100/50 px-2 py-1">
              <span>Number of Funding Rounds</span>
              <span>{signal.data?.number_of_funding_rounds}</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-blue-100/50 px-2 py-1">
              <span>Number of Investors</span>
              <span>{formatCurrency(signal.data?.number_of_investors)}</span>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold">Investors</h4>
          <p>{signal.data?.investors}</p>
        </div>
        <div className="space-y-2 text-sm font-semibold">
          <h4>Acquired by: {signal.data?.acquired_by ?? '---'}</h4>
          <h4>Acquisition date: {signal.data?.acquisition_date ?? '---'}</h4>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold">Web visits</h4>
          <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-5 text-lg font-semibold">
            TODO: Should render a chart
          </div>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold">Traffic sources</h4>
          <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-5 text-lg font-semibold">
            TODO: Should render a chart
          </div>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold">Pages per visit</h4>
          <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-5 text-lg font-semibold">
            TODO: Should render a chart
          </div>
        </div>
      </div>
    </div>
  );
}
