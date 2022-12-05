import {
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';

import type { Signal } from '~/types/signal';

import clsxm from '../utils/clsxm';

type SignalCardProps = {
  signal: Signal;
};

const LinkButton = ({ to, className, children }: LinkProps) => (
  <Link
    to={to}
    className={clsxm(
      'rounded-xl border border-blue-600 bg-white px-4 py-1 text-center font-semibold text-blue-600 hover:border-blue-500 hover:text-blue-500',
      className
    )}
  >
    {children}
  </Link>
);

export const SignalCard = ({ signal }: SignalCardProps) => (
  <div className="rounded-lg border border-gray-200 bg-white p-5">
    <div className="flex items-center gap-5 lg:items-start">
      <div className="flex h-[100px] w-[100px] flex-shrink-0 flex-col place-content-center items-center rounded-lg border-2 border-gray-200 p-2 font-semibold text-gray-400">
        <span className="text-sm">Rank</span>
        <span className="text-2xl">{signal.rank}</span>
      </div>
      <div className="flex-1">
        <div className="mb-1 flex flex-1 items-center justify-between">
          <h3 className="flex items-center space-x-1 text-xl font-semibold text-gray-600">
            {signal.company_name}
          </h3>
          <LinkButton to={`/${signal.id}`} className="hidden lg:inline-flex">
            View details
          </LinkButton>
        </div>

        <div className="flex flex-col gap-1 lg:flex-row lg:items-center">
          <p className="text-xs font-semibold text-gray-600">
            Founded in {signal.founded_date}
          </p>
          <span className="hidden lg:inline-flex">&#x2022;</span>
          <a
            href={signal.domain as string}
            rel="noreferrer"
            target="_blank"
            className="flex items-center space-x-1 text-xs font-semibold text-blue-600"
          >
            <span>{signal.domain}</span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
    <div
      className="mt-4 flex flex-nowrap items-center gap-3 overflow-x-auto"
      data-swipeable
    >
      <div className="flex flex-nowrap items-center space-x-1 whitespace-nowrap rounded-full border border-blue-200 bg-blue-200/50 px-3 py-1 text-xs font-semibold text-blue-600">
        <BuildingOfficeIcon className="h-4 w-4" />
        <span>{signal.industry}</span>
      </div>

      <div className="flex flex-nowrap items-center space-x-1 whitespace-nowrap rounded-full border border-green-200 bg-green-200/50 px-3 py-1 text-xs font-semibold text-green-600">
        <MapPinIcon className="h-4 w-4" />
        <span>{signal.hq_location?.split(',')[0]}</span>
      </div>

      <div className="flex flex-nowrap items-center space-x-1 whitespace-nowrap rounded-full border border-green-200 bg-green-200/50 px-3 py-1 text-xs font-semibold text-green-600">
        <UsersIcon className="h-4 w-4" />
        <span>{signal.company_size}</span>
      </div>

      <div className="flex flex-nowrap items-center space-x-1 rounded-full border border-yellow-200 bg-yellow-200/50 px-3 py-1 text-xs font-semibold text-yellow-600">
        <CurrencyDollarIcon className="h-4 w-4" />
        <span>
          {Intl.NumberFormat().format(
            Number(signal.total_funding_amount_in_usd)
          )}
        </span>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-center lg:hidden">
      <LinkButton to={`/${signal.id}`} className="w-full py-2">
        View details
      </LinkButton>
    </div>
  </div>
);
