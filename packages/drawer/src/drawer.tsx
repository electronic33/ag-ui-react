import React, { useEffect, useMemo } from 'react';
import ReactScrollLock from 'react-scrolllock';
import classNames from 'classnames';
import { Link } from '@app-garage/link';
import { FocusLock } from '@app-garage/focus-trap';
import { useStopPropagation } from '@app-garage/utils';
import { useTransition, animated, config } from 'react-spring';
import { Button } from '@app-garage/button';

type DrawerTypes = {
  /**
   An array of objects, each object can have a title, an Icon, and somewhere to redirect to. It can also have a component property, in which case the component will be displayed as an item.
  */
  sidebarData?: {
    title?: string;
    to?: string;
    Icon?: React.ComponentType<{ className: string }>;
    Component?: React.ReactNode;
  }[];
  /**
   A component that will be displayed in the drawer. 
  */
  SidebarComponent?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  iconClassName?: string;
  textClassName?: string;
  drawerClassNames?: string;
  linkClassNames?: string;
};

export const Drawer = ({
  sidebarData,
  SidebarComponent,
  direction = 'left',
  isOpen,
  onClose,
  iconClassName,
  textClassName,
  drawerClassNames,
  linkClassNames,
}: DrawerTypes) => {
  const stopPropagation = useStopPropagation();

  useEffect(() => {
    const handleSpacebarPress = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleSpacebarPress);
    return () => document.removeEventListener('keydown', handleSpacebarPress);
  }, [isOpen, onClose]);

  const springConfig = useMemo(() => {
    switch (direction) {
      case 'top':
        return {
          from: {
            opacity: '0',
            top: '-100%',
            left: '0%',
          },
          enter: {
            opacity: '1',
            left: '0%',
            top: '0%',
          },
          leave: {
            opacity: '0',
            left: '0%',
            top: '-100%',
          },
          unique: true,
          config: config.default,
        };
      case 'right':
        return {
          from: {
            opacity: '0',
            top: '0%',
            right: '-100%',
          },
          enter: {
            opacity: '1',
            right: '-0%',
            top: '0%',
          },
          leave: {
            opacity: '0',
            right: '-100%',
            top: '0%',
          },
          unique: true,
          config: config.default,
        };
      case 'bottom':
        return {
          from: {
            opacity: '0',
            bottom: '-100%',
            left: '0%',
          },
          enter: {
            opacity: '1',
            left: '0%',
            bottom: '0%',
          },
          leave: {
            opacity: '0',
            left: '0%',
            bottom: '-100%',
          },
          unique: true,
          config: config.default,
        };
      case 'left':
        return {
          from: {
            opacity: '0',
            top: '0%',
            left: '-100%',
          },
          enter: {
            opacity: '1',
            left: '-0%',
            top: '0%',
          },
          leave: {
            opacity: '0',
            left: '-100%',
            top: '0%',
          },
          unique: true,
          config: config.default,
        };
      default:
        return {};
    }
  }, [direction]);

  const transitions = useTransition(isOpen, null, springConfig);

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <FocusLock key={key} isDisabled={!isOpen} restoreFocus>
              <ReactScrollLock>
                <animated.div
                  className="fixed top-0 left-0 z-10 w-screen h-screen bg-black bg-opacity-40"
                  onClick={onClose}
                  style={{ opacity: props.opacity }}
                >
                  <animated.nav
                    style={{ ...props, opacity: 1 }}
                    onClick={stopPropagation}
                    className={classNames(
                      'drawer',
                      {
                        'drawer-vertical':
                          direction === 'left' || direction === 'right',
                        'drawer-horizontal':
                          direction === 'top' || direction === 'bottom',
                      },
                      drawerClassNames,
                    )}
                  >
                    <ul className="drawer-ul ">
                      <li
                        className={classNames('drawer-li-1', {
                          'justify-start': direction === 'left',
                          'justify-end': direction === 'right',
                        })}
                      >
                        <Button
                          className={classNames('close-button-container', {
                            'pl-8': direction === 'left',
                            'pr-8': direction === 'right',
                          })}
                          onClick={onClose}
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
                          </svg>
                        </Button>
                      </li>
                      {SidebarComponent}
                      {sidebarData &&
                        sidebarData.map(({ title, Icon, to, Component }) => (
                          <li key={title} className="">
                            <Link
                              className={classNames(
                                'drawer-link',
                                linkClassNames,
                              )}
                              to={to || undefined}
                            >
                              {Icon && (
                                <Icon
                                  className={classNames(
                                    'drawer-link-icon',
                                    iconClassName,
                                  )}
                                />
                              )}

                              <div className={classNames(textClassName)}>
                                {title}
                              </div>
                            </Link>
                            {Component}
                          </li>
                        ))}
                    </ul>
                  </animated.nav>
                </animated.div>
              </ReactScrollLock>
            </FocusLock>
          ),
      )}
    </>
  );
};
