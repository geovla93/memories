import type { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'argon2';

import type { ResponseData, TUser } from '@/types/api';
import prisma from '@/lib/prisma';
import { schemas, validateSchema } from '@/utils/validation';
import { withSessionRoute } from '@/lib/iron-session';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<TUser>>,
) {
  try {
    const data = await validateSchema(schemas.credentials, req.body);
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      const isMatch = await verify(user.password, password);
      if (isMatch) {
        req.session.user = {
          id: user.id,
          email: user.email,
          name: `${user.name.first} ${user.name.last}`,
          avatar: user.avatar,
        };
        await req.session.save();

        return res
          .status(200)
          .json({ message: 'Logged in', data: req.session.user });
      }
    }

    res.status(400).json({ message: 'Invalid credentials' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Something went wrong.' });
  }
}

export default withSessionRoute(handler);
