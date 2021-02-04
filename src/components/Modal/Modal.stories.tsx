import React from "react";
import Modal from "./Modal";
import "../../styles/index.css";

export default {
  title: "Modal",
};

export const Default = (): React.ReactNode => (
  <Modal>
    <p className="text-white">Modal Component</p>
  </Modal>
);
