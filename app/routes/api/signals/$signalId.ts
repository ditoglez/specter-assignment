import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { getSupabaseInstance } from '~/lib/supabase/supabase.instance';
import type { Database } from '~/types/supabase';

export type SignalRow = Partial<Database['public']['Tables']['signals']['Row']>;

const fetchSignal = async (id: number) => {
  const { data, error } = await getSupabaseInstance()
    .from('signals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = Number(params.signalId);

  invariant(id, 'params.signalId is missing');

  const data = await fetchSignal(id);

  return json(data);
};
