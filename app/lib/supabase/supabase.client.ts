import { createClient } from '@supabase/supabase-js';

import type { Database } from '~/types/supabase';

export const sbClient = createClient<Database>(
  window.env.PROJECT_URL,
  window.env.PROJECT_API_KEY
);
