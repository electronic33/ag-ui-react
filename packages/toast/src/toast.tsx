/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTransition, animated } from 'react-spring';

import { nanoid } from 'nanoid';
import { usePrevious } from '@app-garage/utils';
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

type ToastOptionsWithId = {
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
  id: string;
};

export const ToastContext = createContext<{
  showToast: (options: ToastOptions) => string;
  closeToast: (id: string) => void;
  closeAllToasts: () => void;
}>({
  showToast: () => '',
  closeToast: () => '',
  closeAllToasts: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({
  children,
}: // position,
// duration,
{
  children: ReactNode;
}) => {
  // const [toasts, setToasts] = useState<ToastOptions[]>([]);
  const [topLeftToasts, setTopLeftToasts] = useState<ToastOptionsWithId[]>([]);
  const [topCenterToasts, setTopCenterToasts] = useState<ToastOptionsWithId[]>(
    [],
  );
  const [topRightToasts, setTopRightToasts] = useState<ToastOptionsWithId[]>(
    [],
  );
  const [bottomLeftToasts, setBottomLeftToasts] = useState<
    ToastOptionsWithId[]
  >([]);
  const [bottomCenterToasts, setBottomCenterToasts] = useState<
    ToastOptionsWithId[]
  >([]);
  const [bottomRightToasts, setBottomRightToasts] = useState<
    ToastOptionsWithId[]
  >([]);
  const prevTopLeftToasts = usePrevious<ToastOptionsWithId[]>(
    topLeftToasts,
    [],
  );
  const prevTopCenterToasts = usePrevious<ToastOptionsWithId[]>(
    topCenterToasts,
    [],
  );
  const prevTopRightToasts = usePrevious<ToastOptionsWithId[]>(
    topRightToasts,
    [],
  );
  const prevBottomLeftToasts = usePrevious<ToastOptionsWithId[]>(
    bottomLeftToasts,
    [],
  );
  const prevBottomCenterToasts = usePrevious<ToastOptionsWithId[]>(
    bottomCenterToasts,
    [],
  );
  const prevBottomRightToasts = usePrevious<ToastOptionsWithId[]>(
    bottomRightToasts,
    [],
  );

  useEffect(() => {
    if (
      prevTopLeftToasts &&
      topLeftToasts.length > 0 &&
      prevTopLeftToasts.length < topLeftToasts.length
    ) {
      const newToast = topLeftToasts[topLeftToasts.length - 1];

      if (newToast) {
        setTimeout(() => {
          setTopLeftToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== newToast.id),
          );
        }, newToast.timeout || 3000);
      }
    }
  }, [prevTopLeftToasts, topLeftToasts]);

  useEffect(() => {
    if (
      prevTopCenterToasts &&
      topCenterToasts.length > 0 &&
      prevTopCenterToasts.length < topCenterToasts.length
    ) {
      const newToast = topCenterToasts[topCenterToasts.length - 1];
      if (newToast) {
        setTimeout(() => {
          setTopCenterToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== newToast.id),
          );
        }, newToast.timeout || 3000);
      }
    }
  }, [prevTopCenterToasts, topCenterToasts]);

  useEffect(() => {
    if (
      prevTopRightToasts &&
      topRightToasts.length > 0 &&
      prevTopRightToasts.length < topRightToasts.length
    ) {
      const newToast = topRightToasts[topRightToasts.length - 1];
      if (newToast) {
        setTimeout(() => {
          setTopRightToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== newToast.id),
          );
        }, newToast.timeout || 3000);
      }
    }
  }, [prevTopRightToasts, topRightToasts]);

  useEffect(() => {
    if (
      prevBottomLeftToasts &&
      bottomLeftToasts.length > 0 &&
      prevBottomLeftToasts.length < bottomLeftToasts.length
    ) {
      const newToast = bottomLeftToasts[bottomLeftToasts.length - 1];
      if (newToast) {
        setTimeout(() => {
          setBottomLeftToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== newToast.id),
          );
        }, newToast.timeout || 3000);
      }
    }
  }, [bottomLeftToasts, prevBottomLeftToasts]);

  useEffect(() => {
    if (
      prevBottomCenterToasts &&
      bottomCenterToasts.length > 0 &&
      prevBottomCenterToasts.length < bottomCenterToasts.length
    ) {
      const newToast = bottomCenterToasts[bottomCenterToasts.length - 1];
      if (newToast) {
        setTimeout(() => {
          setBottomCenterToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== newToast.id),
          );
        }, newToast.timeout || 3000);
      }
    }
  }, [bottomCenterToasts, prevBottomCenterToasts]);

  useEffect(() => {
    if (
      prevBottomRightToasts &&
      bottomRightToasts.length > 0 &&
      prevBottomRightToasts.length < bottomRightToasts.length
    ) {
      const newToast = bottomRightToasts[bottomRightToasts.length - 1];
      if (newToast) {
        setTimeout(() => {
          setBottomRightToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== newToast.id),
          );
        }, newToast.timeout || 3000);
      }
    }
  }, [bottomRightToasts, prevBottomRightToasts]);

  const ToastComponent = ({
    toast,
    onClick,
  }: {
    toast: ToastOptionsWithId;
    onClick: () => void;
  }) => {
    let IntentIcon;
    if (toast.Icon) {
      IntentIcon = <toast.Icon className={classNames(toast.iconClassName)} />;
    } else if (toast.Icon === null) {
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

    return (
      <div
        id={toast.id}
        onClick={onClick}
        className={classNames(`flex p-4`, {
          'bg-gray-200': !toast.intent,
          'bg-blue-100': toast.intent === 'primary',
          'bg-green-100': toast.intent === 'success',
          'bg-yellow-100': toast.intent === 'warning',
          'bg-red-100': toast.intent === 'danger',
          // 'mb-4': toasts.length > 1,
        })}
      >
        {toast.Icon !== null && <div> {IntentIcon}</div>}
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
    );
  };

  const showToast = useCallback((newToast) => {
    // setToasts((prevToasts) => [...prevToasts, newToast]);
    const newToastId = nanoid();

    if (newToast.position === 'top-left') {
      setTopLeftToasts((prevToasts) => [
        ...prevToasts,
        { ...newToast, id: newToastId },
      ]);
    }
    if (newToast.position === 'top-center') {
      setTopCenterToasts((prevToasts) => [
        ...prevToasts,
        { ...newToast, id: newToastId },
      ]);
    }
    if (newToast.position === 'top-right') {
      setTopRightToasts((prevToasts) => [
        ...prevToasts,
        { ...newToast, id: newToastId },
      ]);
    }
    if (newToast.position === 'bottom-left') {
      setBottomLeftToasts((prevToasts) => [
        ...prevToasts,
        { ...newToast, id: newToastId },
      ]);
    }
    if (newToast.position === 'bottom-center') {
      setBottomCenterToasts((prevToasts) => [
        ...prevToasts,
        { ...newToast, id: newToastId },
      ]);
    }
    if (newToast.position === 'bottom-right') {
      setBottomRightToasts((prevToasts) => [
        ...prevToasts,
        { ...newToast, id: newToastId },
      ]);
    }

    return newToastId;
  }, []);

  const closeToast = (id: string) => {
    let found = false;

    setTopLeftToasts(topLeftToasts.filter((el) => el.id !== id));

    if (!found) {
      setTopLeftToasts(
        topLeftToasts.filter((el) => {
          const res = el.id !== id;

          if (res === false) {
            found = true;
          }

          return res;
        }),
      );
    }
    if (!found) {
      setTopCenterToasts(
        topCenterToasts.filter((el) => {
          const res = el.id !== id;

          if (res === false) {
            found = true;
          }

          return res;
        }),
      );
    }
    if (!found) {
      setTopRightToasts(
        topRightToasts.filter((el) => {
          const res = el.id !== id;

          if (res === false) {
            found = true;
          }

          return res;
        }),
      );
    }
    if (!found) {
      setBottomLeftToasts(
        bottomLeftToasts.filter((el) => {
          const res = el.id !== id;

          if (res === false) {
            found = true;
          }

          return res;
        }),
      );
    }
    if (!found) {
      setBottomCenterToasts(
        bottomCenterToasts.filter((el) => {
          const res = el.id !== id;

          if (res === false) {
            found = true;
          }

          return res;
        }),
      );
    }
    if (!found) {
      setBottomRightToasts(
        bottomRightToasts.filter((el) => {
          const res = el.id !== id;

          if (res === false) {
            found = true;
          }

          return res;
        }),
      );
    }
  };

  const closeAllToasts = () => {
    setTopLeftToasts([]);
    setTopCenterToasts([]);
    setTopRightToasts([]);
    setBottomLeftToasts([]);
    setBottomCenterToasts([]);
    setBottomRightToasts([]);
  };

  const getHeightById = (id: string) => {
    if (id) {
      const toastHeight = document.getElementById(id)?.offsetHeight || 0;
      const heightPx = `${toastHeight + 16}px`;
      return heightPx;
    }
  };

  const topLeftTransition = useTransition(topLeftToasts, (item) => item.id, {
    from: {
      transform: 'translatex(-1000px)',
      opacity: 0,
      height: '0px',
    },
    // @ts-ignore
    enter: (item) => async (next) => {
      await next({
        transform: 'translatex(0px)',
        opacity: 1,
        height: getHeightById(item.id),
      });
    },
    leave: {
      transform: 'translatex(-1000px)',
      opacity: 0,
      height: '0px',
    },
  });

  const topCenterTransition = useTransition(
    topCenterToasts,
    (item) => item.id,
    {
      from: {
        transform: 'translate3d(0,-1000px,0)',
        opacity: 0,
        height: '0px',
      },
      // @ts-ignore
      enter: (item) => async (next) => {
        await next({
          transform: 'translate3d(0,0px,0)',
          opacity: 1,
          height: getHeightById(item.id),
        });
      },
      leave: {
        transform: 'translate3d(0,-1000px,0)',
        opacity: 0,
        height: '0px',
      },
    },
  );
  const topRightTransition = useTransition(topRightToasts, (item) => item.id, {
    from: {
      transform: 'translatex(1000px)',
      opacity: 0,
      height: '0px',
    },
    // @ts-ignore
    enter: (item) => async (next) => {
      await next({
        transform: 'translatex(0px)',
        opacity: 1,
        height: getHeightById(item.id),
      });
    },
    leave: {
      transform: 'translatex(1000px)',
      opacity: 0,
      height: '0px',
    },
  });
  const bottomLeftTransition = useTransition(
    bottomLeftToasts,
    (item) => item.id,
    {
      from: {
        transform: 'translatex(-1000px)',
        opacity: 0,
        height: '0px',
      },
      // @ts-ignore
      enter: (item) => async (next) => {
        await next({
          transform: 'translatex(0px)',
          opacity: 1,
          height: getHeightById(item.id),
        });
      },
      leave: {
        transform: 'translatex(-1000px)',
        opacity: 0,
        height: '0px',
      },
    },
  );
  const bottomCenterTransition = useTransition(
    bottomCenterToasts,
    (item) => item.id,
    {
      from: {
        transform: 'translate3d(0,1000px,0)',
        opacity: 0,
        height: '0px',
      },
      // @ts-ignore
      enter: (item) => async (next) => {
        await next({
          transform: 'translate3d(0,0px,0)',
          opacity: 1,
          height: getHeightById(item.id),
        });
      },
      leave: {
        transform: 'translate3d(0,1000px,0)',
        opacity: 0,
        height: '0px',
      },
    },
  );
  const bottomRightTransition = useTransition(
    bottomRightToasts,
    (item) => item.id,
    {
      from: {
        transform: 'translatex(1000px)',
        opacity: 0,
        height: '0px',
      },
      // @ts-ignore
      enter: (item) => async (next) => {
        await next({
          transform: 'translatex(0px)',
          opacity: 1,
          height: getHeightById(item.id),
        });
      },
      leave: {
        transform: 'translatex(1000px)',
        opacity: 0,
        height: '0px',
      },
    },
  );

  return (
    <ToastContext.Provider value={{ showToast, closeToast, closeAllToasts }}>
      {children}

      {topLeftTransition.length ? (
        <div className="fixed top-0 left-3">
          {topLeftTransition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <ToastComponent
                    key={item.id}
                    toast={item}
                    onClick={() => {
                      const newOption = topLeftToasts.filter(
                        (filteredToast) => filteredToast !== item,
                      );
                      setTopLeftToasts(newOption);
                    }}
                  />
                </animated.div>
              ),
          )}
        </div>
      ) : null}

      {topCenterTransition.length ? (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2">
          {topCenterTransition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <ToastComponent
                    key={item.id}
                    toast={item}
                    onClick={() => {
                      const newOption = topCenterToasts.filter(
                        (filteredToast) => filteredToast !== item,
                      );
                      setTopCenterToasts(newOption);
                    }}
                  />
                </animated.div>
              ),
          )}
        </div>
      ) : null}

      {topRightTransition.length ? (
        <div className="fixed top-0 right-3">
          {topRightTransition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <ToastComponent
                    key={item.id}
                    toast={item}
                    onClick={() => {
                      const newOption = topRightToasts.filter(
                        (filteredToast) => filteredToast !== item,
                      );
                      setTopRightToasts(newOption);
                    }}
                  />
                </animated.div>
              ),
          )}
        </div>
      ) : null}

      {bottomLeftTransition.length ? (
        <div className="fixed bottom-0 left-3">
          {bottomLeftTransition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <ToastComponent
                    key={item.id}
                    toast={item}
                    onClick={() => {
                      const newOption = bottomLeftToasts.filter(
                        (filteredToast) => filteredToast !== item,
                      );
                      setBottomLeftToasts(newOption);
                    }}
                  />
                </animated.div>
              ),
          )}
        </div>
      ) : null}

      {bottomCenterTransition.length ? (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2">
          {bottomCenterTransition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <ToastComponent
                    key={item.id}
                    toast={item}
                    onClick={() => {
                      const newOption = bottomCenterToasts.filter(
                        (filteredToast) => filteredToast !== item,
                      );
                      setBottomCenterToasts(newOption);
                    }}
                  />
                </animated.div>
              ),
          )}
        </div>
      ) : null}

      {bottomRightTransition.length ? (
        <div className="fixed bottom-0 right-3">
          {bottomRightTransition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <ToastComponent
                    key={item.id}
                    toast={item}
                    onClick={() => {
                      const newOption = bottomRightToasts.filter(
                        (filteredToast) => filteredToast !== item,
                      );
                      setBottomRightToasts(newOption);
                    }}
                  />
                </animated.div>
              ),
          )}
        </div>
      ) : null}
    </ToastContext.Provider>
  );
};
