import React, { useEffect, useState } from 'react';
import { Progress } from '../src';

export default {
  title: 'FEEDBACK/Progress',
  component: Progress,
};

export const Default = (props): React.ReactNode => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 5,
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <Progress progressValue={progress} {...props} />;
};
