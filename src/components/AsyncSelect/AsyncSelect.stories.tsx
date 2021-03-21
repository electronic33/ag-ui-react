import React, { useState } from "react";
import AsyncSelect from "./AsyncSelect";
import { useFetch } from "./AsyncSelect";
import "../../styles/index.css";

export default {
  title: "OTHERS/AsyncSelect",
  component: AsyncSelect,
};

export const Top = (): React.ReactNode => {
  const [selected, setSelected] = useState();

  return (
    <div className="w-96">
      <AsyncSelect
        fetchHook={useFetch}
        selected={selected}
        setSelected={setSelected}
        labelKey="email"
        valueKey="cell"
      ></AsyncSelect>
    </div>
  );
};
