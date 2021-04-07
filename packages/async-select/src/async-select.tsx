import React, { useCallback, useEffect } from 'react';
import { Select } from '@app-garage/select';
// import { Spinner } from "@app-garage/spinner";

export function useFetch<T>(url: string) {
  const [response, setResponse] = React.useState<T>();
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setIsLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setResponse(json);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, isLoading, refetch: fetchData };
}

type AsyncSelectTypes = {
  selected: string;
  setSelected: () => void;
  labelKey: string;
  valueKey: string;
};

export const AsyncSelect = ({
  selected,
  setSelected,
  labelKey,
  valueKey,
}: AsyncSelectTypes): React.ReactElement => {
  const { response, error, isLoading, refetch } = useFetch(
    'https://randomuser.me/api/?results=5',
  );

  return (
    <div>
      <Select
        isLoading={isLoading}
        loadingText="Loading.."
        retryFn={refetch}
        error={error ? 'Error loading the resources' : ''}
        containerClassName="max-w-sm w-64 mb-5 my-2 mr-2"
        onChange={setSelected}
        selected={selected}
        label="Select"
        options={response.results.map((responseItem) => ({
          label: responseItem[labelKey],
          value: responseItem[valueKey],
        }))}
      />
    </div>
  );
};
