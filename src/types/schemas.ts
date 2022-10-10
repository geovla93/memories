import { z } from 'zod';

import { schemas } from '@/utils/validation';

export type Credentials = z.infer<typeof schemas.credentials>;
export type UserData = z.infer<typeof schemas.userData>;
