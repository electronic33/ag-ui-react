import React, { useCallback, useEffect, useState } from "react";
import { string } from "yup/lib/locale";
import Select from "../Select/Select";
import Spinner from "../Spinner/Spinner";

export const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // const fetchData = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   setTimeout(() => {
  //     setError("asd");

  //     setIsLoading(false);
  //   }, 500);
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(url, options);
  //     const json = await res.json();
  //     setResponse(json);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [url, options]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setIsLoading(true);
      const res = await fetch(url, options);
      const json = await res.json();
      setResponse(json);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, isLoading, refetch: fetchData };
};

export interface AsyncSelectTypes {
  selected: string;
  setSelected: () => void;
  labelKey: string;
  valueKey: string;
}

const AsyncSelect = ({
  selected,
  setSelected,
  labelKey,
  valueKey,
}: AsyncSelectTypes): React.ReactElement => {
  const { response, error, isLoading, refetch } = useFetch(
    "https://randomuser.me/api/?results=5",
    {},
  );

  return (
    <div>
      <Select
        isLoading={isLoading}
        loadingText="Loading.."
        retryFn={refetch}
        error={error ? "Error loading the resources" : ""}
        className="max-w-sm w-64 mb-5 my-2 mr-2"
        onChange={setSelected}
        selected={selected}
        label="Select"
        options={response?.results.map((responseItem) => ({
          label: responseItem[labelKey],
          value: responseItem[valueKey],
        }))}
      />
    </div>
  );
};

export default AsyncSelect;
