import { ReactNode } from "react";
import { FormProvider, FieldValues, SubmitHandler, useForm, Resolver } from "react-hook-form";

interface formConfig {
  defaultValues?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
}

interface IProps extends formConfig {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
}

const SZForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  const formConfig: formConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submitHandler = methods.handleSubmit;

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default SZForm;
