import { createClient } from '@supabase/supabase-js';

import type { Database } from '~/types/supabase';

export const sbServer = createClient<Database>(
  process.env.PROJECT_URL as string,
  process.env.PROJECT_API_KEY as string
);
