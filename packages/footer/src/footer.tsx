import React from "react";
import { FaChrome } from "react-icons/fa";

const Footer = (): React.ReactElement => {
  return (
    <footer>
      {/* <div className="bg-gray-700 py-4 flex flex-col items-center px-4 768:px-10 justify-center text-white pt-5"></div> */}
      <div className="mt-auto bg-gray-800 w-full flex flex-col 768:flex-row justify-between items-center px-4 768:px-10 text-white py-5">
        <p>
          Lacul La Noroc |{" "}
          <a className="underline" href="/politica-de-confidentialitate">
            terms_and_conditions
          </a>
        </p>
        <div className="flex flex-col 768:flex-row items-center">
          <p className="inline my-3 768:my-0">powered_by:</p>{" "}
          <FaChrome className="768:ml-4" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
