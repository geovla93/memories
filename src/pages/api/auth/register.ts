import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, User } from '@prisma/client';
import { hash } from 'argon2';

import type { ResponseData } from '@/types/api';
import prisma from '@/lib/prisma';
import { validateSchema, schemas } from '@/utils/validation';
import { defaultAvatarUrl } from '@/utils/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<User>>,
) {
  try {
    const data = await validateSchema(schemas.userData, req.body);

    const { email, password, firstName, lastName, avatar } = data;
    const hashedPassword = await hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        avatar: data.avatar ?? defaultAvatarUrl,
        name: { first: firstName, last: lastName },
      },
    });

    res
      .status(200)
      .json({ message: `Created user with id: ${user.id}`, data: user });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(400).json({
          message: `A user with that email already exists`,
        });
      }
    }

    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Something went wrong.' });
  }
}
