import React, { ReactElement } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

import {TextInput} from "@app-garage/text-input";
import {ImageUploader} from "@app-garage/image-uploader";
import {Button} from "@app-garage/button";
import {Switch} from "@app-garage/switch";
import {Select} from "@app-garage/select";
import {TextArea} from "@app-garage/text-area";

type FormItemCommonProps = {
  name: string;
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  type: string;
};

type FormItemConditionalProps =
  | {
      type: "text";
      initialValue: string;
      placeholder?: string;
      Icon?: ReactElement<{ className?: string }>;
    }
  | {
      type: "number";
      initialValue: number | string;
      placeholder?: string;
      Icon?: ReactElement<{ className?: string }>;
    }
  | {
      type: "textarea";
      initialValue: string;
      placeholder?: string;
      Icon?: ReactElement<{ className?: string }>;
    }
  | {
      type: "checkbox";
      initialValue: boolean;
      placeholder?: string;
    }
  | {
      type: "checkbox";
      initialValue: boolean;
      placeholder?: never;
    }
  | {
      type: "switch";
      initialValue: boolean;
      placeholder?: never;
    }
  | {
      type: "select";
      initialValue: number | string;
      placeholder?: never;
      options: {
        label: string;
        value: string | number;
        Icon?: ReactElement<{ className?: string }>;
      }[];
    }
  | {
      type: "image-uploader";
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
}: AdminFormProps): React.ReactElement => (
  <Formik
    initialValues={items.reduce((result, currentValue) => {
      result[currentValue.name] = currentValue.initialValue;

      return result;
    }, {})}
    validationSchema={Yup.object().shape(validationSchema)}
    validateOnBlur
    validateOnChange={false}
    onSubmit={onSubmit}
  >
    {(props) => {
      const { values, setFieldValue, handleSubmit } = props;

      return (
        <Form
          className={classNames(
            "flex flex-col items-center bg-gray-100",
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
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-5 row-span-full ">
            {items.map((item) => (
              <>
                {item.type === "text" && (
                  <div className="flex justify-center items-center">
                    <Field
                      errorInLabel
                      containerClassName={classNames(
                        "",
                        item.containerClassName,
                      )}
                      component={TextInput}
                      placeholder={item.placeholder}
                      type="text"
                      name={item.name}
                      label={item.label}
                      Icon={item.Icon}
                    />
                  </div>
                )}
                {item.type === "textarea" && (
                  <div className="flex justify-center items-center row-span-2 ">
                    <Field
                      errorInLabel
                      textarea
                      containerClassName={classNames(
                        "",
                        item.containerClassName,
                      )}
                      inputClassName="h-full w-full"
                      placeholder={item.placeholder}
                      type="text"
                      name={item.name}
                      label={item.label}
                      withRomanianFlag
                      Icon={item.Icon}
                      component={TextArea}
                    />
                  </div>
                )}
                {item.type === "number" && (
                  <div className="flex justify-center items-center">
                    <Field
                      errorInLabel
                      containerClassName={classNames(
                        "",
                        item.containerClassName,
                      )}
                      component={TextInput}
                      placeholder={item.placeholder}
                      type="number"
                      name={item.name}
                      label={item.label}
                      Icon={item.Icon}
                    />
                  </div>
                )}
                {item.type === "checkbox" && (
                  // TODO: move label to checkbox and use Checkbox
                  <>
                    <label className={classNames("", item.labelClassName)}>
                      <p className="mr-2">{item.label}</p>
                      <Field type="checkbox" name={item.name} />
                    </label>
                  </>
                )}
                {item.type === "switch" && (
                  // TODO: move label to switch
                  <>
                    <Switch
                      className="mr-5"
                      active={values[item.name]}
                      setActive={() =>
                        setFieldValue(`${item.name}`, !values[item.name])
                      }
                    />
                    <p className={classNames("", item.labelClassName)}>
                      {item.label}
                    </p>
                  </>
                )}
                {item.type === "select" && (
                  <div className="flex justify-center items-center">
                    <Select
                      containerClassName={item.containerClassName}
                      onChange={(selected) =>
                        setFieldValue(`${item.name}`, selected)
                      }
                      selected={values[item.name]}
                      label={item.label}
                      options={item.options}
                    />
                  </div>
                )}
                {item.type === "image-uploader" && (
                  <div className="col-span-full flex justify-center items-center">
                    <ImageUploader
                      multipleImages={item.isMultiple}
                      setImages={(images) =>
                        setFieldValue(`${item.name}`, images)
                      }
                      images={values[item.name]}
                      // error={touched?.newImages && errors?.newImages}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        </Form>
      );
    }}
  </Formik>
);
