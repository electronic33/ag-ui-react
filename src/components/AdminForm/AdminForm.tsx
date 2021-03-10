import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { BiTrash } from "react-icons/bi";
import classNames from "classnames";
import TextInput from "../TextInput/TextInput";
import ImageUploader from "../ImageUploader/ImageUploader";
import Spinner from "../ButtonSpinner/ButtonSpinner";
import Button from "../Button/Button";
import Switch from "../Switch/Switch";
import Select from "../Select/Select";
import AdminFormPart from "../AdminFormPart/AdminFormPart";
import TextArea from "../TextArea/TextArea";

const reducer = (array) => {
  return array.reduce((result, currentValue) => {
    {
      result[currentValue.name] = currentValue.initialValue;
    }

    return result;
  }, {});
};

const AdminForm = ({
  isLoading,
  error,
  onSubmit,
  toBeUpdatedPierId,
  initialValues,
  items,
  className,
  validationSchema,
}) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    // return <ErrorMessage>{getErrorMessage(error)}</ErrorMessage>;
    <h1>Error</h1>;
  }

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center bg-gray-100">
        <Formik
          initialValues={reducer(items)}
          validationSchema={Yup.object().shape(validationSchema)}
          onSubmit={async (formValues) => {
            await onSubmit(formValues);
          }}
        >
          {(props) => {
            const {
              values,
              setFieldValue,
              dirty,
              isSubmitting,
              handleSubmit,
              handleReset,
              touched,
              errors,
            } = props;

            return (
              <div className="w-full">
                <Form
                  onSubmit={handleSubmit}
                  className={classNames("", className)}
                >
                  <div className="flex justify-center mt-2 640:mt-0">
                    <Button
                      type="button"
                      className="mr-4 text-lg"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => handleSubmit()}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex">
                          <Spinner className="mr-2" /> Elküldés
                        </div>
                      ) : (
                        "Elküldés"
                      )}
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-5 row-span-full ">
                    {items.map((item) => (
                      <>
                        {item.type === "text" && (
                          <div className="flex justify-center items-center">
                            <Field
                              errorInLabel
                              className={classNames("", item.className)}
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
                              className={classNames("", item.className)}
                              inputClassName="h-full w-full"
                              component={TextArea}
                              placeholder={item.placeholder}
                              type="text"
                              name={item.name}
                              label={item.label}
                              withRomanianFlag
                              Icon={item.Icon}
                            />
                          </div>
                        )}
                        {item.type === "number" && (
                          <div className="flex justify-center items-center">
                            <Field
                              errorInLabel
                              className={classNames("", item.className)}
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
                          <div
                            className={classNames("", item.containerClassName)}
                          >
                            <label
                              className={classNames("", item.labelClassName)}
                            >
                              <p className="mr-2">{item.label}</p>
                              <Field type="checkbox" name={item.name} />
                            </label>
                          </div>
                        )}
                        {item.type === "switch" && (
                          <div
                            className={classNames("", item.containerClassName)}
                          >
                            <Switch
                              className="mr-5"
                              active={values[item.name]}
                              setActive={() =>
                                setFieldValue(
                                  `${item.name}`,
                                  !values[item.name],
                                )
                              }
                            />
                            <p className={classNames("", item.labelClassName)}>
                              {item.label}
                            </p>
                          </div>
                        )}
                        {item.type === "select" && (
                          <div className="flex justify-center items-center">
                            <Select
                              className={item.className}
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
                              multipleImages={item.multipleImages}
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
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AdminForm;
