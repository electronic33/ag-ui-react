import React from 'react';
import classNames from 'classnames';

type ProgressTypes = {
  progressValue: number;
  progressContainerClassNames: string;
  progressBarClassNames: string;
  /**
  A component that tracks the current value of the progress.
  */
  withTracker: boolean;
  trackerClassNames: string;
};

export const Progress = ({
  progressValue,
  progressContainerClassNames,
  progressBarClassNames,
  withTracker,
  trackerClassNames,
}: ProgressTypes): React.ReactElement => (
  <div className="main-div-progress" role="progressbar" aria-valuenow={progressValue}>
    <div className={classNames('progress-container ', progressContainerClassNames)}>
      <div
        className={classNames('progress-bar ', progressBarClassNames)}
        style={{ width: `${progressValue}%` }}
      />
    </div>
    {withTracker && (
      <p style={{ minWidth: '40px' }} className={classNames('progress-tracker', trackerClassNames)}>
        {progressValue}%
      </p>
    )}
  </div>
);
