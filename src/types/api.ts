import type { IronSession } from 'iron-session';

export type ResponseData<T = {}> = {
  message: string;
  data?: T;
};

export type TUser = NonNullable<IronSession['user']>;
