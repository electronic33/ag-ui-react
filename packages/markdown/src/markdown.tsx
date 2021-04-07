import React from 'react';
import ReactMarkdown from 'react-markdown';
import { TextArea } from '@app-garage/text-area';

type MarkDownProps = {
  value: string;
  onChange: () => void;
};

export const Markdown = ({ value, onChange }: MarkDownProps) => (
  <div className="flex">
    <div className="w-1/2 bg-gray-400 p-10">
      <TextArea className="w-full" value={value} onChange={onChange} />
    </div>
    <div className="markdown w-1/2 bg-gray-100 p-10 ">
      <ReactMarkdown source={value} />
    </div>
  </div>
);
