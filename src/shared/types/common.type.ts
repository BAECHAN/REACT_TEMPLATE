import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export type ResultType<T> = { ok: true; value: T } | { ok: false; error: Error };

export type PageType = {
  page: number;
  size: number;
  totalPage: number;
  totalCount: number;
};

export type ResponseType<T> = {
  data: T | null;
  page?: PageType;
};

export type OptionType<T> = {
  label: string;
  value: T;
};

export type FormType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
  reset: UseFormReset<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};
