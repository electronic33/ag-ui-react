export type FieldInputProps = {
  value: boolean;
  name: string;
  multiple?: boolean;
  checked?: boolean;
  onChange: {
    (event: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (event: string | React.ChangeEvent<any>) => void;
  };

  onBlur: {
    (event: React.FocusEvent<HTMLButtonElement>): void;
    <T = string | any>(fieldOrEvent: T): T extends string
      ? (event: any) => void
      : void;
  };
};

export type FormikProps = {
  touched?: Record<string, string>;
  errors?: Record<string, string>;
};

type UseFormikCompatibleValuesParams = {
  field?: FieldInputProps;
  form?: FormikProps;
  value?: boolean;
  error?: string;
  name?: string;
  onChange?: (value: boolean) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
};

export const useFormikCompatibleValues = ({
  value,
  error,
  field,
  form,
  name,
  onChange,
  onBlur,
}: UseFormikCompatibleValuesParams) => {
  let formikCompatibleValue;

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

  let formikCompatibleOnChange:
    | UseFormikCompatibleValuesParams['onChange']
    | FieldInputProps['onChange'];

  if (onChange) {
    formikCompatibleOnChange = onChange;
  } else if (field) {
    formikCompatibleOnChange = field.onChange;
  }

  let formikCompatibleOnBlur:
    | UseFormikCompatibleValuesParams['onBlur']
    | FieldInputProps['onBlur'];

  if (onBlur) {
    formikCompatibleOnBlur = onBlur;
  } else if (field) {
    formikCompatibleOnBlur = field.onBlur;
  }

  return {
    formikCompatibleValue,
    formikCompatibleError,
    formikCompatibleOnBlur,
    formikCompatibleOnChange,
    formikCompatibleName,
  };
};
