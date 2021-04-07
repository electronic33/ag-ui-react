import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Field, FieldInputProps, FormikProps } from 'formik';
import { TextInput } from '@app-garage/text-input';
import { Switch } from '@app-garage/switch';
import { Select } from '@app-garage/custom-select';
import { ImageUploader } from '@app-garage/image-uploader';
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

type FormItem = FormItemCommonProps & FormItemConditionalProps;

type AdminFormProps = {
  items: FormItem[];
  className?: string;
};

export const AdminFormPart = ({ items, className }: AdminFormProps) => {
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
    <div
      className={classNames('grid grid-cols-3 gap-5 row-span-full', className)}
    >
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
  );
};
