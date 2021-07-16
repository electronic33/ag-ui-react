import React from 'react';
import ReactMarkdown from 'react-markdown';
import { TextArea } from '@app-garage/text-area';

type MarkDownProps = {
  value: string;
  onChange: () => void;
};

export const Markdown = ({ value, onChange }: MarkDownProps) => (
  <div className="markdown-container">
    <div className="markdown-textarea-container">
      <TextArea className="markdown-textarea-container" value={value} onChange={onChange} />
    </div>
    <div className="markdown">
      <ReactMarkdown source={value} />
    </div>
  </div>
);
