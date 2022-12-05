import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import { useState } from 'react';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useDehydratedState } from 'use-dehydrated-state';
import invariant from 'tiny-invariant';

import tailwind from '~/tailwind.css';
import styles from '~/styles.css';

import Navbar from '~/lib/components/layout/Navbar';
import { Footer } from './lib/components/layout/Footer';

declare global {
  interface Window {
    env: {
      API_BASE_URL: string;
      PROJECT_URL: string;
      PROJECT_API_KEY: string;
    };
  }
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Signals feed | Specter',
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: styles },
    {
      rel: 'icon',
      href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>',
    },
  ];
}

type EnvData = {
  env: {
    API_BASE_URL: string;
    PROJECT_URL: string;
    PROJECT_API_KEY: string;
  };
};

export const loader: LoaderFunction = () => {
  const { API_BASE_URL, PROJECT_URL, PROJECT_API_KEY } = process.env;
  invariant(
    API_BASE_URL,
    'API_BASE_URL is missing, please add it to .env file'
  );

  invariant(PROJECT_URL, 'PROJECT_URL is missing, please add it to .env file');

  invariant(
    PROJECT_API_KEY,
    'PROJECT_API_KEY is missing, please add it to .env file'
  );

  return json<EnvData>({
    env: {
      API_BASE_URL,
      PROJECT_URL,
      PROJECT_API_KEY,
    },
  });
};

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 0,
          },
        },
      })
  );
  const dehydratedState = useDehydratedState();

  const { env } = useLoaderData<ReturnType<typeof loader>>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-gray-100 text-gray-800 antialiased">
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <Navbar />
            <main className="mx-auto px-5 lg:px-8">
              <Outlet />
            </main>
            <Footer />
            <ScrollRestoration />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.env = ${JSON.stringify(env)}`,
              }}
            />
            <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js" />
            <Scripts />
            <LiveReload />
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
