import React, { useCallback, useEffect } from 'react';
import { Select } from '@app-garage/custom-select';

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
  value?: string;
  onChange: (value: any) => void;
  labelKey: string;
  valueKey: string;
  apiUrl: string;
  queryParams?: string;
  dataResponseKey: string;
};

export const AsyncSelect = ({
  value,
  onChange,
  labelKey,
  valueKey,
  apiUrl,
  queryParams,
  dataResponseKey,
}: AsyncSelectTypes): React.ReactElement => {
  const { response, error, isLoading, refetch } = useFetch<object>(`${apiUrl}${queryParams}`);

  return (
    <div>
      <Select
        isLoading={isLoading}
        loadingText="Loading.."
        placeholder="Select..."
        retryFn={refetch}
        error={error ? 'Error loading the resources' : ''}
        containerClassName="async-select-container max-w-sm w-64 mb-5 my-2 mr-2"
        onChange={onChange}
        value={value}
        label="Select"
        options={
          !isLoading && !error && response
            ? response?.[dataResponseKey]?.map((responseItem: any) => ({
                label: responseItem[labelKey].en,
                value: responseItem[valueKey],
              }))
            : []
        }
      />
    </div>
  );
};
