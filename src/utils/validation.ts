import { z } from 'zod';

const userDataSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
      invalid_type_error: 'Email must be a string.',
    })
    .email({ message: 'Email must be a valid email address.' }),
  password: z
    .string({
      required_error: 'Password is required.',
      invalid_type_error: 'Password must be a string.',
    })
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  firstName: z
    .string({
      required_error: 'First name is required.',
      invalid_type_error: 'First name must be a string.',
    })
    .min(3, { message: 'First name must be at least 3 characters long.' }),
  lastName: z
    .string({
      required_error: 'Last name is required.',
      invalid_type_error: 'Last name must be a string.',
    })
    .min(3, { message: 'Last name must be at least 3 characters long.' }),
  avatar: z
    .string({
      invalid_type_error: 'Avatar must be a string.',
    })
    .optional(),
});

const credentialsSchema = userDataSchema.pick({
  email: true,
  password: true,
});

export const schemas = {
  userData: userDataSchema,
  credentials: credentialsSchema,
};

export async function validateSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): Promise<T> {
  const result = await schema.spa(data);
  if (!result.success) {
    const formattedError = formatZodError(result.error);

    throw new Error(formattedError);
  }

  return result.data;
}

function formatZodError(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join(', ');
}
