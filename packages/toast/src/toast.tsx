/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import {
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiFillWarning,
} from 'react-icons/ai';
import classNames from 'classnames';

type ToastOptions = {
  intent?: 'primary' | 'success' | 'warning' | 'danger';
  text: string;
  header?: string;
  Icon?: React.ComponentType<{ className: string }>;
  iconClassName?: string;
  timeout?: number;
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};

export const ToastContext = createContext<(options: ToastOptions) => void>(
  () => {},
);

export const useToast = () => {
  const triggerToast = useContext(ToastContext);

  return triggerToast;
};

export const ToastProvider = ({
  children,
}: // position,
// duration,
{
  children: ReactNode;
}) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((prevToasts) => prevToasts.slice(1)),
        toasts[0].timeout || 3000,
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const triggerToast = useCallback((newToast) => {
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }, []);

  const getIcon = (toast: ToastOptions) => {
    let IntentIcon;
    if (toast.Icon) {
      IntentIcon = <toast.Icon className={classNames(toast.iconClassName)} />;
    } else if (toasts[0].Icon === null) {
      IntentIcon = undefined;
    } else {
      if (toast.Icon === undefined && toast.intent === 'primary') {
        IntentIcon = (
          <BsInfoCircleFill className="flex-shrink-0 mr-2 text-2xl text-blue-500" />
        );
      }
      if (toast.Icon === undefined && toast.intent === 'success') {
        IntentIcon = (
          <AiFillCheckCircle className="flex-shrink-0 mr-2 text-3xl text-green-500" />
        );
      }
      if (toast.Icon === undefined && toast.intent === 'warning') {
        IntentIcon = (
          <AiFillWarning className="flex-shrink-0 mr-2 text-3xl text-yellow-500" />
        );
      }
      if (toast.Icon === undefined && toast.intent === 'danger') {
        IntentIcon = (
          <AiFillExclamationCircle className="flex-shrink-0 mr-4 text-3xl text-red-500" />
        );
      }
    }
    return IntentIcon;
  };

  const getPositionClasses = (toast: ToastOptions) => {
    let pos;

    if (toasts.length > 0) {
      if (toast.position === 'top-left') {
        pos = 'self-start';
      }
      if (toast.position === 'top-center') {
        pos = 'self-start mx-auto';
      }
      if (toast.position === 'top-right') {
        pos = 'self-start ml-auto';
      }
      if (toast.position === 'bottom-left') {
        pos = 'self-end';
      }
      if (toast.position === 'bottom-center') {
        pos = 'self-end mx-auto';
      }
      if (toast.position === 'bottom-right') {
        pos = 'self-end ml-auto';
      }
    }
    return pos;
  };

  // useLayoutEffect(() => {
  //   if (ref.current && ref.current.clientWidth) {
  //     setWidth(ref.current.clientWidth);
  //   }
  // }, []);

  return (
    <ToastContext.Provider value={triggerToast}>
      {children}
      <div className="fixed top-0 flex w-screen h-screen p-6">
        {toasts.map((toast, index) => (
          <div
            ref={ref}
            onClick={() => {
              const newOption = toasts.filter(
                (_filteredToast, toastIndex) => toastIndex !== index,
              );
              setToasts(newOption);
            }}
            // style={
            //   (toasts[0].position === 'top-center' && ref.current && width) ||
            //   (toasts[0].position === 'bottom-center' && ref.current && width)
            //     ? {
            //         marginLeft: -(width / 2),
            //       }
            //     : {}
            // }
            className={classNames(
              `flex p-4 max-w-sm rounded-md shadow-md cursor-pointer ${getPositionClasses(
                toast,
              )}`,
              {
                'bg-gray-200': !toast.intent,
                'bg-blue-100': toast.intent === 'primary',
                'bg-green-100': toast.intent === 'success',
                'bg-yellow-100': toast.intent === 'warning',
                'bg-red-100': toast.intent === 'danger',
                'mb-4': toasts.length > 1,
              },
            )}
          >
            {toast.Icon !== null && <div> {getIcon(toast)}</div>}
            <div className="flex flex-col">
              {toast.header && (
                <p
                  className={classNames('text-xl -mt-0.5 mb-1 font-semibold', {
                    'text-gray-700': !toast.intent,
                    'text-blue-600': toast.intent === 'primary',
                    'text-green-600': toast.intent === 'success',
                    'text-yellow-600': toast.intent === 'warning',
                    'text-red-600': toast.intent === 'danger',
                  })}
                >
                  {toast.header}
                </p>
              )}
              <div>{toast.text}</div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
