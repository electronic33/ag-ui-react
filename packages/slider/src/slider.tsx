import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Modal } from "@app-garage/modal";
import classNames from "classnames";
import { Arrow } from "./arrow";
import { Dot } from "./dots";
import { Slide } from "./slide";

type SliderTypes = {
  className?: string;
  withModal?: boolean;
  children?: React.ReactNode[];
  itemsToShow?: number;
  itemsToScroll?: number;
  breakpoints?: {
    minWidth: number;
    config: { itemsToScroll: number; itemsToShow: number };
  }[];
  setterFn?: (index: number) => void;
  startAtIndex?: number;
};

const Slider = ({
  className = "w-full",
  children,

  itemsToShow = 1,
  itemsToScroll = 1,
  breakpoints,
  setterFn,
  startAtIndex = 0,
}: SliderTypes): React.ReactElement => {
  const [width, setGetWidth] = useState(0);
  const [height, setGetHeight] = useState(0);
  const [dotsArr, setDotsArr] = useState([1, 2, 3]);
  const [activeDot, setActiveDot] = useState(0);
  const ref = useRef(null);
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0,
  });

  const [breakpointConfig, setBreakpointConfig] = useState(null);

  useLayoutEffect(() => {
    setGetWidth(ref.current.getBoundingClientRect().width);
    setGetHeight(ref.current.getBoundingClientRect().height);

    const screenWidth = window.innerWidth;

    if (breakpoints) {
      const currentBp = [...breakpoints]
        .sort((a, b) => a.minWidth - b.minWidth)
        .find((bp) => screenWidth < bp.minWidth);

      setBreakpointConfig(currentBp ? currentBp.config : null);
    }
  }, []);

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
      translate:
        startAtIndex * ((width / currentItemsToShow) * currentItemsToScroll),
      activeIndex: startAtIndex * currentItemsToScroll,
      transition: 0,
    });
    setActiveDot(startAtIndex);
  }, [width]);

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
    if (activeIndex / itemsToScroll === dotsNum - 1) {
      // if (activeIndex === children.length - currentItemsToShow) {
      return (
        setActiveDot(0),
        setState({
          ...state,
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
          ...state,
          transition: 0.45,
          activeIndex: index * currentItemsToScroll,
          translate:
            currentItemsToScroll === 1 ||
            (children.length - currentItemsToShow) % currentItemsToScroll === 0
              ? index * ((width / currentItemsToShow) * currentItemsToScroll)
              : index * ((width / currentItemsToShow) * currentItemsToScroll) -
                (currentItemsToScroll -
                  ((children.length -
                    (currentItemsToShow - currentItemsToScroll)) %
                    currentItemsToScroll)) *
                  (width / currentItemsToShow),
        })
      );
    }

    setState({
      ...state,
      activeIndex: activeIndex + currentItemsToScroll,
      translate:
        ((activeIndex + currentItemsToScroll) * width) / currentItemsToShow,
      transition: 0.45,
    });

    setActiveDot((prevActiveDot) => prevActiveDot + 1);
  };

  const prevSlide = () => {
    console.log("activeIndex / itemsToScroll", activeIndex / itemsToScroll);
    console.log("activeDot", activeDot);
    console.log("dotsNum", dotsNum);
    if (activeIndex === 0) {
      return (
        setActiveDot(
          (children.length - currentItemsToShow) / currentItemsToScroll,
        ),
        setState({
          ...state,
          translate:
            (width / currentItemsToShow) *
            Math.ceil(children.length - currentItemsToShow),
          transition: 0.45,

          activeIndex: children.length - currentItemsToShow,
        })
      );
    }

    setState({
      ...state,
      activeIndex: activeIndex - currentItemsToScroll,
      translate:
        ((activeIndex - currentItemsToScroll) * width) / currentItemsToShow,
      transition: 0.45,
    });
    setActiveDot((prevActiveDot) => {
      if (prevActiveDot === dotsNum) {
        return 0;
      }

      return prevActiveDot - 1;
    });
  };

  const dotsNum =
    Math.ceil((children.length - currentItemsToShow) / currentItemsToScroll) +
    1;

  const onDotClick = (index) => {
    setActiveDot(index);
    if (index + 1 === dotsNum) {
      setState({
        ...state,
        transition: 0.45,
        activeIndex: index * currentItemsToScroll,
        translate:
          currentItemsToScroll === 1 ||
          (children.length - currentItemsToShow) % currentItemsToScroll === 0
            ? index * ((width / currentItemsToShow) * currentItemsToScroll)
            : index * ((width / currentItemsToShow) * currentItemsToScroll) -
              (currentItemsToScroll -
                ((children.length -
                  (currentItemsToShow - currentItemsToScroll)) %
                  currentItemsToScroll)) *
                (width / currentItemsToShow),
      });
    } else {
      setState({
        ...state,
        transition: 0.45,
        translate:
          index * ((width / currentItemsToShow) * currentItemsToScroll),
        activeIndex: index * currentItemsToScroll,
      });
    }
  };

  console.log(
    "🚀 ~ file: Slider.tsx ~ line 216 ~ useLayoutEffect ~ children.length",
    children.length,
  );
  console.log(
    "🚀 ~ file: Slider.tsx ~ line 216 ~ useLayoutEffect ~ dotsNum",
    dotsNum,
  );

  useLayoutEffect(() => {
    let i;
    const dotsArray = [];
    for (i = 0; i < children.length; i++)
      if (i + 1 <= dotsNum) {
        dotsArray.push(i + 1);
      }
    console.log(
      "🚀 ~ file: Slider.tsx ~ line 226 ~ useLayoutEffect ~ dotsArray",
      dotsArray,
    );
    setDotsArr(dotsArray);
  }, []);

  return (
    <div className="main-div w-full h-full ">
      <div className="carousel-and-arrow-container h-full">
        <Arrow direction="left" handleClick={prevSlide} />
        <div
          ref={ref}
          className={classNames("carousel h-full", className)}
          style={{ width: `${width * 2}` }}
        >
          <div
            className="slider-content h-full"
            style={{
              transform: `translate(-${translate}px, ${0}px)`,
              transition: `transform ease-out ${transition}s`,
              width: `${(width * children.length) / currentItemsToShow}px`,
            }}
          >
            {React.Children.map(children || null, (child, i) => (
              <Slide
                key={i}
                height={height}
                width={width}
                setterFn={setterFn}
                index={i}
              >
                {child}
              </Slide>
            ))}
          </div>
        </div>
        <Arrow direction="right" handleClick={nextSlide} />
      </div>
      <Dot activeDot={activeDot} onDotClick={onDotClick} dotsArr={dotsArr} />
    </div>
  );
};

export const SliderWithModal = (
  props,
  { withModal = false }: SliderTypes,
): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedSlide, setClickedSlide] = useState(null);

  const setterFn = (index) => {
    setIsModalOpen(true);
    setClickedSlide(index);
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      {withModal && isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Slider
            {...props}
            itemsToShow={1}
            itemsToScroll={1}
            startAtIndex={clickedSlide}
          />
        </Modal>
      )}
      <Slider {...props} setterFn={withModal ? setterFn : null} />
    </div>
  );
};
