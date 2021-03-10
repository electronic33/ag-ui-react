import React from "react";
import classNames from "classnames";
import { Field } from "formik";
import TextInput from "../TextInput/TextInput";
import Switch from "../Switch/Switch";
import Select from "../Select/Select";
import ImageUploader from "../ImageUploader/ImageUploader";
import TextArea from "../TextArea/TextArea";

const AdminFormPart = ({ items, values, setFieldValue, className }) => {
  return (
    <div
      className={classNames("grid grid-cols-3 gap-5 row-span-full", className)}
    >
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
          {item.type === "checkbox" && (
            <div className={classNames("", item.containerClassName)}>
              <label className={classNames("", item.labelClassName)}>
                <p className="mr-2">{item.label}</p>
                <Field type="checkbox" name={item.name} />
              </label>
            </div>
          )}
          {item.type === "switch" && (
            <div className={classNames("", item.containerClassName)}>
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
            </div>
          )}
          {item.type === "select" && (
            <div className="flex justify-center items-center">
              <Select
                className={item.className}
                onChange={(selected) => setFieldValue(`${item.name}`, selected)}
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
                setImages={(images) => setFieldValue(`${item.name}`, images)}
                images={values[item.name]}
                // error={touched?.newImages && errors?.newImages}
              />
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default AdminFormPart;
