import React, { useState } from "react";
import Modal from "./Modal";
import "../../styles/index.css";
import Button from "../Button/Button";

export default {
  title: "Modal",
  component: Modal,
};

export const Default = (props): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} {...props}>
          <div className="flex flex-col items-center justify-center">
            <p className="text-white mb-5">Modal Component</p>
            <div className="flex">
              <Button className="mr-10"> Button 1 </Button>
              <Button>Button 2</Button>
            </div>
          </div>
        </Modal>
      )}
      <Button className="bg-blue-500" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
    </>
  );
};
