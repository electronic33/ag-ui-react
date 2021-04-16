import React, { useState } from 'react';
import { SuggestionTextInput } from '../src';

export default {
  title: 'FORMS/SuggestionTextInput',
  component: SuggestionTextInput,
};

export const Default = () => {
  const [value, setValue] = useState<string>('');
  const [currentSuggData, setCurrentSuggData] = useState<string>();

  return (
    <div className="inline-flex space-x-5">
      <SuggestionTextInput
        containerClassName="w-96"
        onChange={setValue}
        value={value}
        label="Textinput with suggestions"
        onSelect={(suggestion) => setCurrentSuggData(suggestion.metadata)}
        suggestions={[
          { label: 'a', metadata: 'This is the data for "a"' },
          { label: 'ab', metadata: 'This is the data for "ab"' },
          { label: 'abc', metadata: 'This is the data for "abc"' },
          { label: 'abcd', metadata: 'This is the data for "abcd"' },
          { label: 'ef', metadata: 'This is the data for "ef"' },
          { label: 'efg', metadata: 'This is the data for "efg"' },
          { label: 'efgh', metadata: 'This is the data for "efgh"' },
          { label: 'ijk', metadata: 'This is the data for "ijk"' },
          { label: 'ijklm', metadata: 'This is the data for "ijklm"' },
        ]}
      />
      <p>Current Option Metadata: {currentSuggData || 'None'}</p>
    </div>
  );
};
