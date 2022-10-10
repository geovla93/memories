import type { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '@/lib/iron-session';

import type { ResponseData } from '@/types/api';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.session.destroy();
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
}

export default withSessionRoute(handler);
