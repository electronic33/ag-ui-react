export type FieldInputProps<E extends HTMLButtonElement | HTMLInputElement> = {
  value: boolean;
  name: string;
  multiple?: boolean;
  checked?: boolean;
  onChange: {
    (event: React.ChangeEvent<E>): void;
    <T = string | React.ChangeEvent<E>>(
      field: T,
    ): T extends React.ChangeEvent<E>
      ? void
      : (event: string | React.ChangeEvent<E>) => void;
  };

  onBlur: {
    (event: React.FocusEvent<E>): void;
    <T = string | any>(fieldOrEvent: T): T extends string
      ? (event: any) => void
      : void;
  };
};

export type FormikProps = {
  touched?: Record<string, string>;
  errors?: Record<string, string>;
};

type UseFormikCompatibleValuesParams<
  T extends HTMLButtonElement | HTMLInputElement
> = {
  field?: FieldInputProps<T>;
  form?: FormikProps;
  value?: boolean;
  error?: string;
  name?: string;
  onChange?: (value: boolean) => void;
  onBlur?: (event: React.FocusEvent<T>) => void;
};

export function useFormikCompatibleValues<
  T extends HTMLButtonElement | HTMLInputElement
>({
  value,
  error,
  field,
  form,
  name,
  onChange,
  onBlur,
}: UseFormikCompatibleValuesParams<T>) {
  let formikCompatibleValue: boolean | undefined;

  if (value !== undefined) {
    formikCompatibleValue = value;
  } else if (field) {
    formikCompatibleValue = field.value;
  }

  let formikCompatibleError: string | undefined;

  if (error) {
    formikCompatibleError = error;
  } else if (form && field) {
    formikCompatibleError =
      form.errors?.[field.name] && form.touched?.[field.name]
        ? form.errors?.[field?.name]
        : '';
  }

  let formikCompatibleName: string | undefined;

  if (name) {
    formikCompatibleName = name;
  } else if (field) {
    formikCompatibleName = field.name;
  }

  let formikCompatibleOnChange: (value: boolean) => void;

  if (onChange) {
    formikCompatibleOnChange = onChange;
  } else if (field) {
    formikCompatibleOnChange = field.onChange;
  } else {
    formikCompatibleOnChange = () => {};
  }

  let formikCompatibleOnBlur: (event: React.FocusEvent<T>) => void;

  if (onBlur) {
    formikCompatibleOnBlur = onBlur;
  } else if (field) {
    formikCompatibleOnBlur = field.onBlur;
  } else {
    formikCompatibleOnBlur = () => {};
  }

  return {
    formikCompatibleValue,
    formikCompatibleError,
    formikCompatibleOnBlur,
    formikCompatibleOnChange,
    formikCompatibleName,
  };
}
