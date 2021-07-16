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
  const [topCenterToasts, setTopCenterToasts] = useState<ToastOptionsWithId[]>([]);
  const [topRightToasts, setTopRightToasts] = useState<ToastOptionsWithId[]>([]);
  const [bottomLeftToasts, setBottomLeftToasts] = useState<ToastOptionsWithId[]>([]);
  const [bottomCenterToasts, setBottomCenterToasts] = useState<ToastOptionsWithId[]>([]);
  const [bottomRightToasts, setBottomRightToasts] = useState<ToastOptionsWithId[]>([]);
  const prevTopLeftToasts = usePrevious<ToastOptionsWithId[]>(topLeftToasts, []);
  const prevTopCenterToasts = usePrevious<ToastOptionsWithId[]>(topCenterToasts, []);
  const prevTopRightToasts = usePrevious<ToastOptionsWithId[]>(topRightToasts, []);
  const prevBottomLeftToasts = usePrevious<ToastOptionsWithId[]>(bottomLeftToasts, []);
  const prevBottomCenterToasts = usePrevious<ToastOptionsWithId[]>(bottomCenterToasts, []);
  const prevBottomRightToasts = usePrevious<ToastOptionsWithId[]>(bottomRightToasts, []);

  useEffect(() => {
    if (
      prevTopLeftToasts &&
      topLeftToasts.length > 0 &&
      prevTopLeftToasts.length < topLeftToasts.length
    ) {
      const newToast = topLeftToasts[topLeftToasts.length - 1];

      if (newToast) {
        setTimeout(() => {
          setTopLeftToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
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
          setTopCenterToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
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
          setTopRightToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
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
          setBottomLeftToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
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
          setBottomCenterToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
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
          setBottomRightToasts((prevToasts) => prevToasts.filter((t) => t.id !== newToast.id));
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
          <svg
            className="toast-default-icon-primary"
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
      if (toast.Icon === undefined && toast.intent === 'success') {
        IntentIcon = (
          <svg
            className="toast-default-icon-success"
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
      if (toast.Icon === undefined && toast.intent === 'warning') {
        IntentIcon = (
          <svg
            className="toast-default-icon-warning"
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
      if (toast.Icon === undefined && toast.intent === 'danger') {
        IntentIcon = (
          <svg
            className="toast-default-icon-danger"
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
        id={toast.id}
        onClick={onClick}
        className={classNames(`toast`, {
          'toast-no-intent': !toast.intent,
          'toast-primary': toast.intent === 'primary',
          'toast-success': toast.intent === 'success',
          'toast-warning': toast.intent === 'warning',
          'toast-danger': toast.intent === 'danger',
          // 'mb-4': toasts.length > 1,
        })}
      >
        {toast.Icon !== null && <div> {IntentIcon}</div>}
        <div className="toast-text-container">
          {toast.header && (
            <p
              className={classNames('toast-header-container', {
                'toast-header-no-intent': !toast.intent,
                'toast-header-primary': toast.intent === 'primary',
                'toast-header-success': toast.intent === 'success',
                'toast-header-warning': toast.intent === 'warning',
                'toast-header-danger': toast.intent === 'danger',
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
      setTopLeftToasts((prevToasts) => [...prevToasts, { ...newToast, id: newToastId }]);
    }
    if (newToast.position === 'top-center') {
      setTopCenterToasts((prevToasts) => [...prevToasts, { ...newToast, id: newToastId }]);
    }
    if (newToast.position === 'top-right') {
      setTopRightToasts((prevToasts) => [...prevToasts, { ...newToast, id: newToastId }]);
    }
    if (newToast.position === 'bottom-left') {
      setBottomLeftToasts((prevToasts) => [...prevToasts, { ...newToast, id: newToastId }]);
    }
    if (newToast.position === 'bottom-center') {
      setBottomCenterToasts((prevToasts) => [...prevToasts, { ...newToast, id: newToastId }]);
    }
    if (newToast.position === 'bottom-right') {
      setBottomRightToasts((prevToasts) => [...prevToasts, { ...newToast, id: newToastId }]);
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

  const topCenterTransition = useTransition(topCenterToasts, (item) => item.id, {
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
  });
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
  const bottomLeftTransition = useTransition(bottomLeftToasts, (item) => item.id, {
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
  const bottomCenterTransition = useTransition(bottomCenterToasts, (item) => item.id, {
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
  });
  const bottomRightTransition = useTransition(bottomRightToasts, (item) => item.id, {
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

  return (
    <ToastContext.Provider value={{ showToast, closeToast, closeAllToasts }}>
      {children}

      {topLeftTransition.length ? (
        <div className="toast-top-left">
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
        <div className="toast-top-center transform -translate-x-1/2">
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
        <div className="toast-top-right">
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
        <div className="toast-bottom-left">
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
        <div className="toast-bottom-center transform -translate-x-1/2">
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
        <div className="toast-bottom-right">
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
