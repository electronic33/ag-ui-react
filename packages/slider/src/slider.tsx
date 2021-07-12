import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Modal } from '@app-garage/modal';
import classNames from 'classnames';
import { Arrow } from './arrow';
import { Dots } from './dots';
import { Slide } from './slide';

type BreakpointConfig = {
  itemsToScroll: number;
  itemsToShow: number;
};

type SliderProps = {
  containerClassName?: string;
  children: React.ReactNode[];
  itemsToShow?: number;
  itemsToScroll?: number;
  breakpoints?: {
    minWidth: number;
    config: BreakpointConfig;
  }[];
  onSlideClick?: (index: number) => void;
  startAtIndex?: number;
};

const Slider = ({
  containerClassName,
  children,
  itemsToShow = 1,
  itemsToScroll = 1,
  breakpoints,
  onSlideClick,
  startAtIndex = 0,
}: SliderProps): React.ReactElement => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [dotsArr, setDotsArr] = useState([1, 2, 3]);
  const [activeDot, setActiveDot] = useState(0);
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0,
  });
  const [breakpointConfig, setBreakpointConfig] = useState<BreakpointConfig | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const { transition, translate, activeIndex } = state;

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width);
      setHeight(ref.current.getBoundingClientRect().height);
    }

    const screenWidth = window.innerWidth;

    if (breakpoints) {
      const currentBp = [...breakpoints]
        .sort((a, b) => a.minWidth - b.minWidth)
        .find((bp) => screenWidth < bp.minWidth);

      setBreakpointConfig(currentBp ? currentBp.config : null);
    }
  }, [breakpoints]);

  const currentItemsToShow = useMemo(
    () => breakpointConfig?.itemsToShow || itemsToShow,
    [breakpointConfig, itemsToShow],
  );

  const currentItemsToScroll = useMemo(
    () => breakpointConfig?.itemsToScroll || itemsToScroll,
    [breakpointConfig, itemsToScroll],
  );

  useEffect(() => {
    setState({
      translate: startAtIndex * ((width / currentItemsToShow) * currentItemsToScroll),
      activeIndex: startAtIndex * currentItemsToScroll,
      transition: 0,
    });

    setActiveDot(startAtIndex);
  }, [width, currentItemsToScroll, currentItemsToShow, startAtIndex]);

  const dotsNum = Math.ceil((children.length - currentItemsToShow) / currentItemsToScroll) + 1;

  const goToNextSlide = () => {
    if (activeIndex / itemsToScroll === dotsNum - 1) {
      return (
        setActiveDot(0),
        setState({
          translate: 0,
          activeIndex: 0,
          transition: 0.45,
        })
      );
    }

    if (activeIndex / itemsToScroll === dotsNum - 2) {
      const index = (activeIndex + itemsToScroll) / itemsToScroll;
      return (
        setActiveDot((prevActiveDot) => prevActiveDot + 1),
        setState({
          transition: 0.45,
          activeIndex: index * currentItemsToScroll,
          translate:
            currentItemsToScroll === 1 ||
            (children.length - currentItemsToShow) % currentItemsToScroll === 0
              ? index * ((width / currentItemsToShow) * currentItemsToScroll)
              : index * ((width / currentItemsToShow) * currentItemsToScroll) -
                (currentItemsToScroll -
                  ((children.length - (currentItemsToShow - currentItemsToScroll)) %
                    currentItemsToScroll)) *
                  (width / currentItemsToShow),
        })
      );
    }

    setState({
      activeIndex: activeIndex + currentItemsToScroll,
      translate: ((activeIndex + currentItemsToScroll) * width) / currentItemsToShow,
      transition: 0.45,
    });

    setActiveDot((prevActiveDot) => prevActiveDot + 1);
  };

  const goToPrevSlide = () => {
    if (activeIndex === 0) {
      return (
        setActiveDot((children.length - currentItemsToShow) / currentItemsToScroll),
        setState({
          ...state,
          translate: (width / currentItemsToShow) * Math.ceil(children.length - currentItemsToShow),
          transition: 0.45,

          activeIndex: children.length - currentItemsToShow,
        })
      );
    }

    setState({
      activeIndex: activeIndex - currentItemsToScroll,
      translate: ((activeIndex - currentItemsToScroll) * width) / currentItemsToShow,
      transition: 0.45,
    });
    setActiveDot((prevActiveDot) => {
      if (prevActiveDot === dotsNum) {
        return 0;
      }

      return prevActiveDot - 1;
    });
  };

  const onDotClick = (index: number) => {
    setActiveDot(index);
    if (index + 1 === dotsNum) {
      setState({
        transition: 0.45,
        activeIndex: index * currentItemsToScroll,
        translate:
          currentItemsToScroll === 1 ||
          (children.length - currentItemsToShow) % currentItemsToScroll === 0
            ? index * ((width / currentItemsToShow) * currentItemsToScroll)
            : index * ((width / currentItemsToShow) * currentItemsToScroll) -
              (currentItemsToScroll -
                ((children.length - (currentItemsToShow - currentItemsToScroll)) %
                  currentItemsToScroll)) *
                (width / currentItemsToShow),
      });
    } else {
      setState({
        transition: 0.45,
        translate: index * ((width / currentItemsToShow) * currentItemsToScroll),
        activeIndex: index * currentItemsToScroll,
      });
    }
  };

  useLayoutEffect(() => {
    const dotsArray = [];

    for (let i = 0; i < children.length; i += 1)
      if (i + 1 <= dotsNum) {
        dotsArray.push(i + 1);
      }

    setDotsArr(dotsArray);
  }, [children.length, dotsNum]);

  return (
    <div className={classNames('main-div', containerClassName)}>
      <div className="carousel-and-arrow-container">
        <Arrow direction="left" onClick={goToPrevSlide} />
        <div ref={ref} className="carousel" style={{ width: width * 2 }}>
          <div
            className="slider-content"
            style={{
              transform: `translate(-${translate}px, ${0}px)`,
              transition: `transform ease-out ${transition}s`,
              width: `${(width * children.length) / currentItemsToShow}px`,
            }}
          >
            {React.Children.map(children || null, (child, index) => (
              <Slide
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                height={height}
                width={width}
                onClick={onSlideClick}
                index={index}
              >
                {child}
              </Slide>
            ))}
          </div>
        </div>
        <Arrow direction="right" onClick={goToNextSlide} />
      </div>
      <Dots activeDot={activeDot} onDotClick={onDotClick} dotsArr={dotsArr} />
    </div>
  );
};

export const SliderWithModal = (props: SliderProps): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedSlide, setClickedSlide] = useState(0);

  const handleSlideClick = (index: number) => {
    setIsModalOpen(true);
    setClickedSlide(index);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Slider {...props} itemsToShow={1} itemsToScroll={1} startAtIndex={clickedSlide} />
      </Modal>
      <Slider {...props} onSlideClick={handleSlideClick} />
    </div>
  );
};
