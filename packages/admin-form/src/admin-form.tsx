import React, { useCallback } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

import { FieldInputProps, TextInput } from '@app-garage/text-input';
import { ImageUploader } from '@app-garage/image-uploader';
import { Button } from '@app-garage/button';
import { Switch } from '@app-garage/switch';
import { Select } from '@app-garage/custom-select';
import { TextArea } from '@app-garage/text-area';
import { Checkbox } from '@app-garage/checkbox';

type FormItemCommonProps = {
  name: string;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  type: string;
};

type FormItemConditionalProps =
  | {
      type: 'text';
      initialValue: string;
      placeholder?: string;
      Icon?: React.ComponentType<{ className?: string }>;
    }
  | {
      type: 'number';
      initialValue: number | string;
      placeholder?: string;
      Icon?: React.ComponentType<{ className?: string }>;
    }
  | {
      type: 'textarea';
      initialValue: string;
      placeholder?: string;
      Icon?: React.ComponentType<{ className?: string }>;
    }
  | {
      type: 'checkbox';
      initialValue: boolean;
      placeholder?: string;
    }
  | {
      type: 'checkbox';
      initialValue: boolean;
      placeholder?: never;
    }
  | {
      type: 'switch';
      initialValue: boolean;
      placeholder?: never;
    }
  | {
      type: 'select';
      initialValue: number | string;
      placeholder?: never;
      options: {
        label: string;
        value: string | number;
        Icon?: React.ComponentType<{ className?: string }>;
      }[];
    }
  | {
      type: 'image-uploader';
      initialValue?: string;
      placeholder?: never;
      isMultiple: boolean;
    };

type AdminFormProps = {
  onCancel: () => void;
  // TODO: reserach if values can be set to typeof keyof items
  onSubmit: (formValues: Record<string, any>) => void;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  // TODO: reserach if keys can be set to typeof keyof items
  validationSchema?: Record<string, Yup.AnySchema>;
  items: (FormItemCommonProps & FormItemConditionalProps)[];
  className?: string;
};

export const AdminForm = ({
  onSubmit,
  items,
  validationSchema,
  className,
  isSubmitDisabled,
  isSubmitting,
  onCancel,
}: AdminFormProps) => {
  const getFormItem = useCallback(({ field, form, item }) => {
    switch (item.type) {
      case 'text': {
        return <TextInput field={field} form={form} {...item} />;
      }
      case 'number': {
        return <TextInput field={field} form={form} {...item} />;
      }
      case 'textarea': {
        return <TextArea field={field} form={form} {...item} />;
      }
      case 'checkbox': {
        return <Checkbox field={field} form={form} {...item} />;
      }
      case 'switch': {
        return <Switch field={field} form={form} {...item} />;
      }
      case 'select': {
        return <Select field={field} form={form} {...item} />;
      }
      case 'image-uploader': {
        return <ImageUploader field={field} form={form} {...item} />;
      }
      default: {
        return <TextInput field={field} form={form} {...item} />;
      }
    }
  }, []);

  return (
    <Formik
      initialValues={items.reduce(
        (result, currentValue) => ({
          ...result,
          [currentValue.name]: currentValue.initialValue,
        }),
        {},
      )}
      validationSchema={
        validationSchema && Yup.object().shape(validationSchema)
      }
      validateOnBlur
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form
          className={classNames(
            'flex flex-col items-center bg-gray-100',
            className,
          )}
        >
          <div className="w-full sticky top-0 flex justify-center py-2 bg-gray-50 z-10">
            <Button type="button" className="mr-4 text-lg" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => handleSubmit()}
              isLoading={isSubmitting}
              isDisabled={isSubmitDisabled}
            >
              {isSubmitting ? 'Submitting' : 'Submit'}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-5 row-span-full ">
            {items.map((item) => (
              <Field>
                {({
                  field,
                  form,
                }: {
                  field: FieldInputProps<any>;
                  form: FormikProps<any>;
                }) => getFormItem({ field, form, item })}
              </Field>
            ))}
          </div>
        </Form>
      )}
    </Formik>
  );
};
