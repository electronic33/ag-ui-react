import React from "react";
import * as Yup from "yup";
import { AdminForm } from "../src";

export default {
  title: "FORMS/AdminForm",
  component: AdminForm,
};

export const Default = (): React.ReactNode => (
  <AdminForm
    onCancel={() => console.log("I canceled")}
    onSubmit={(sa) => console.log(sa)}
    className="p-5 bg-gray-100 flex flex-col justify-start items-center"
    items={[
      {
        type: "text",
        initialValue: "Text",
        containerClassName: "max-w-sm w-72 mb-5 my-2",
        placeholder: "Name goes here...",
        name: "text",
        label: "Text",
      },
      {
        type: "number",
        initialValue: 20,
        containerClassName: "max-w-sm w-72 mb-5 my-2",
        placeholder: "Price goes here...",
        name: "price",
        label: "Price",
      },
      {
        type: "textarea",
        initialValue:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pellentesque volutpat odio. Curabitur blandit sagittis velit quis tristique. Mauris dolor ipsum, blandit in facilisis in, volutpat a enim. Maecenas tincidunt libero ac est interdum tempor. Etiam ultrices erat orci, vel accumsan orci sollicitudin vel. Nunc eleifend, velit at ullamcorper scelerisque, sem ante placerat justo, at bibendum metus nisl elementum felis. Phasellus aliquam sem eget gravida tristique. Nulla facilisi. Duis ac est quis velit tempor convallis.",
        containerClassName: "h-full w-full",
        placeholder: "Name goes here...",
        name: "textarea",
        label: "Textarea",
      },
      {
        type: "checkbox",
        initialValue: false,
        name: "checkbox",
        label: "Checkbox",
        containerClassName: "mb-5 bg-white rounded p-5 border border-gray-300",
        labelClassName: "flex items-center justify-between mb-2",
      },
      {
        type: "switch",
        initialValue: false,
        name: "switch",
        label: "Switch",
        containerClassName:
          "flex items-center justify-center mb-5 bg-white rounded p-5 border border-gray-300 ",
        labelClassName: "mr-3",
      },
      {
        type: "select",
        initialValue: 0,
        containerClassName: "max-w-sm w-64 mb-5 my-2",
        name: "select",
        label: "Select",
        options: [
          { label: "Default Option", value: 0 },
          { label: "Option 1", value: 1 },
          {
            label: "Option 2",
            value: 2,
          },
          {
            label: "Option 3",
            value: 3,
          },
        ],
      },
      {
        type: "image-uploader",
        name: "image-uploader",
        label: "Image uploader",
        isMultiple: false,
      },
    ]}
    validationSchema={{
      name: Yup.string().max(21, "Max 21 karakter").required("Kötelező"),
      price: Yup.number()
        .typeError("Számot írj")
        .positive("Pozitív számot írj"),
      checkbox: Yup.boolean(),
    }}
  />
);
