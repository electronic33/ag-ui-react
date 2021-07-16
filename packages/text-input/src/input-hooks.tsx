export type TextFieldInputProps<E extends HTMLInputElement | HTMLTextAreaElement> = {
  value: string;
  name: string;
  multiple?: boolean;
  checked?: boolean;
  onChange: {
    (event: React.ChangeEvent<E>): void;
    <T = string | React.ChangeEvent<E>>(field: T): T extends React.ChangeEvent<E>
      ? void
      : (event: string | React.ChangeEvent<E>) => void;
  };

  onBlur: {
    (event: React.FocusEvent<E>): void;
    <T = string | any>(fieldOrEvent: T): T extends string ? (event: any) => void : void;
  };
};

export type TextFormikProps = {
  touched?: Record<string, string>;
  errors?: Record<string, string>;
};

type useTextInputValuesParams<T extends HTMLInputElement | HTMLTextAreaElement> = {
  field?: TextFieldInputProps<T>;
  form?: TextFormikProps;
  value?: string | number;
  error?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<T>) => void;
  onBlur?: (event: React.FocusEvent<T>) => void;
};

export function useTextInputValues<T extends HTMLInputElement | HTMLTextAreaElement>({
  value,
  error,
  field,
  form,
  name,
  onChange,
  onBlur,
}: useTextInputValuesParams<T>) {
  let formikCompatibleValue: string | number | undefined = '';

  if (value) {
    formikCompatibleValue = value;
  } else if (field) {
    formikCompatibleValue = field.value;
  }

  let formikCompatibleError: string | undefined = '';

  if (error) {
    formikCompatibleError = error;
  } else if (form && field) {
    formikCompatibleError =
      form.errors?.[field.name] && form.touched?.[field.name] ? form.errors?.[field?.name] : '';
  }

  let formikCompatibleName: string | undefined = '';

  if (name) {
    formikCompatibleName = name;
  } else if (field) {
    formikCompatibleName = field.name;
  }

  let formikCompatibleOnChange: (event: React.ChangeEvent<T>) => void;

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
