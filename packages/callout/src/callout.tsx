import React from 'react';
import classNames from 'classnames';
import { BsInfoCircleFill } from 'react-icons/bs';
import {
  AiFillCheckCircle,
  AiFillWarning,
  AiFillExclamationCircle,
} from 'react-icons/ai';

type CalloutProps = {
  header?: string;
  intent?: 'primary' | 'success' | 'warning' | 'danger';
  iconClassName?: string;
  children?: React.ReactNode;
  Icon?: React.ComponentType<{ className: string }> | undefined | null;
};

export const Callout = ({
  Icon,
  intent,
  header,
  children,
  iconClassName,
}: CalloutProps): React.ReactElement => {
  let IntentIcon;
  if (Icon) {
    IntentIcon = <Icon className={classNames(iconClassName)} />;
  } else if (Icon === null) {
    IntentIcon = undefined;
  } else {
    if (Icon === undefined && intent === 'primary') {
      IntentIcon = (
        <BsInfoCircleFill className="flex-shrink-0 mr-2 text-2xl text-blue-500" />
      );
    }
    if (Icon === undefined && intent === 'success') {
      IntentIcon = (
        <AiFillCheckCircle className="flex-shrink-0 mr-2 text-3xl text-green-500" />
      );
    }
    if (Icon === undefined && intent === 'warning') {
      IntentIcon = (
        <AiFillWarning className="flex-shrink-0 mr-2 text-3xl text-yellow-500" />
      );
    }
    if (Icon === undefined && intent === 'danger') {
      IntentIcon = (
        <AiFillExclamationCircle className="flex-shrink-0 mr-4 text-3xl text-red-500" />
      );
    }
  }
  return (
    <div
      className={classNames('flex p-4', {
        'bg-gray-200': !intent,
        'bg-blue-100': intent === 'primary',
        'bg-green-100': intent === 'success',
        'bg-yellow-100': intent === 'warning',
        'bg-red-100': intent === 'danger',
      })}
    >
      {Icon !== null && <div> {IntentIcon}</div>}
      <div className="flex flex-col">
        {header && (
          <p
            className={classNames('text-xl -mt-0.5 mb-1 font-semibold', {
              'text-gray-700': !intent,
              'text-blue-600': intent === 'primary',
              'text-green-600': intent === 'success',
              'text-yellow-600': intent === 'warning',
              'text-red-600': intent === 'danger',
            })}
          >
            {header}
          </p>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};
