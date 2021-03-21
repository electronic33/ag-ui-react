import React from "react";
import classNames from "classnames";

export interface ProgressTypes {
  progressValue: number;
  progressContainerClassNames: string;
  progressBarClassNames: string;
  /**
  A component that tracks the current value of the progress.
  */
  withTracker: boolean;
  trackerClassNames: string;
}

const Progress = ({
  progressValue,
  progressContainerClassNames,
  progressBarClassNames,
  withTracker,
  trackerClassNames,
}: ProgressTypes): React.ReactElement => {
  return (
    <div
      className="main-div-progress"
      role="progressbar"
      aria-valuenow={progressValue}
    >
      <div
        className={classNames(
          "progress-container ",
          progressContainerClassNames,
        )}
      >
        <div
          className={classNames("progress-bar ", progressBarClassNames)}
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
      {withTracker && (
        <p
          style={{ minWidth: "40px" }}
          className={classNames("progress-tracker", trackerClassNames)}
        >
          {progressValue}%
        </p>
      )}
    </div>
  );
};

export default Progress;
