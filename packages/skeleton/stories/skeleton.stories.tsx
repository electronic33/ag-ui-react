import React, { useState } from 'react';
import { Button } from '@app-garage/button';
import { Skeleton } from '../src';

export default {
  title: 'FEEDBACK/Skeleton',
  component: Skeleton,
};

export const Default = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading ? (
        <div>
          <Skeleton className="mb-3" type="circle" width="50px" height="50px" />
          <Skeleton className="mb-2" width="200px" height="16px" />
          <Skeleton width="200px" height="100px" />
        </div>
      ) : (
        <div>
          <img
            src="https://source.unsplash.com/random"
            className="mb-3 rounded-full h-12 w-12"
            alt=""
          />
          <p className="mb-2" style={{ width: 200, height: 16 }}>
            Fresh upload!
          </p>
          <img
            src="https://source.unsplash.com/random"
            className=" h-24 w-48"
            alt=""
          />
        </div>
      )}
      <Button onClick={() => setIsLoading((prevState) => !prevState)}>
        TRIGGER
      </Button>
    </div>
  );
};
