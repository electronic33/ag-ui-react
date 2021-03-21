import React, { useState } from "react";
import Modal from "./Modal";
import "../../styles/index.css";
import Button from "../Button/Button";

export default {
  title: "OVERLAY/Modal",
  component: Modal,
};

export const Default = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        modalClassName="p-4"
      >
        <p className="mb-5">Modal Component</p>
        <div className="flex">
          <Button className="mr-10"> Button 1 </Button>
          <Button>Button 2</Button>
        </div>
      </Modal>
      <Button className="bg-blue-500" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
    </>
  );
};
