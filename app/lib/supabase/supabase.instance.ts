import { sbClient } from './supabase.client';
import { sbServer } from './supabase.server';

const isServer = typeof document === 'undefined';

export const getSupabaseInstance = () => {
  return isServer ? sbServer : sbClient;
};
