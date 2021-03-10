import React from "react";
import Modal from "./Modal";
import "../../styles/index.css";

export default {
  title: "Modal",
  component: Modal,
};

export const Default = (props): React.ReactNode => (
  <Modal {...props}>
    <p className="text-white">Modal Component</p>
  </Modal>
);
