import React from 'react';
import classNames from 'classnames';

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
        <svg
          className="flex-shrink-0 mr-2 text-2xl text-blue-500"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (Icon === undefined && intent === 'success') {
      IntentIcon = (
        <svg
          className="flex-shrink-0 mr-2 text-3xl text-green-500"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 1024 1024"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
        </svg>
      );
    }
    if (Icon === undefined && intent === 'warning') {
      IntentIcon = (
        <svg
          className="flex-shrink-0 mr-2 text-3xl text-yellow-500"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 1024 1024"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" />
        </svg>
      );
    }
    if (Icon === undefined && intent === 'danger') {
      IntentIcon = (
        <svg
          className="flex-shrink-0 mr-4 text-3xl text-red-500"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 1024 1024"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z" />
        </svg>
      );
    }
  }
  return (
    <div
      className={classNames('callout-container', {
        'callout-container-nointent-bg': !intent,
        'callout-container-primary-bg': intent === 'primary',
        'callout-container-success-bg': intent === 'success',
        'callout-container-warning-bg': intent === 'warning',
        'callout-container-danger-bg': intent === 'danger',
      })}
    >
      {Icon !== null && <div> {IntentIcon}</div>}
      <div className="flex flex-col">
        {header && (
          <p
            className={classNames('text-xl -mt-0.5 mb-1 font-semibold', {
              'callout-container-nointent-text': !intent,
              'callout-container-primary-text': intent === 'primary',
              'callout-container-success-text': intent === 'success',
              'callout-container-warning-text': intent === 'warning',
              'callout-container-danger-text': intent === 'danger',
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
