import {
  type FormHTMLAttributes,
  Children,
  isValidElement,
  createElement,
} from 'react';
import type { Schema } from 'zod';
import {
  type SubmitHandler,
  type FieldValues,
  type DeepPartial,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormProps<T extends FieldValues> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  onSubmit: SubmitHandler<T>;
  defaultValues: DeepPartial<T>;
  schema: Schema<T>;
};

const Form = <T extends FieldValues>({
  onSubmit,
  defaultValues,
  schema,
  ...props
}: FormProps<T>) => {
  const methods = useForm<T>({ defaultValues, resolver: zodResolver(schema) });
  const { handleSubmit } = methods;

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      {Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          return child.props.name
            ? createElement(child.type, {
                ...child.props,
                control: methods.control,
                key: child.props.name,
              })
            : child;
        }

        return null;
      })}
    </form>
  );
};

export default Form;
