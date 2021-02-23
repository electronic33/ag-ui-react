import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Arrow from "./Arrow";
import Dots from "./Dots";
import Slide from "./Slide";
import Modal from "../Modal/Modal";

interface SliderTypes {
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
}

const Slider = ({
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
    console.log("activeIndex / itemsToScroll", activeIndex / itemsToScroll);
    console.log("activeDot", activeDot);
    console.log("dotsNum", dotsNum);
    console.log("activeIndex", activeIndex);
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
        setActiveDot((prevActiveDot) => {
          return prevActiveDot + 1;
        }),
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

    setActiveDot((prevActiveDot) => {
      return prevActiveDot + 1;
    });
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

  useLayoutEffect(() => {
    let i;
    const dotsArray = [];
    for (i = 0; i < children.length; i++)
      if (i + 1 <= dotsNum) {
        dotsArray.push(i + 1);
      }
    setDotsArr(dotsArray);
  }, []);

  return (
    <div className="main-div w-full">
      <div className="carousel-and-arrow-container">
        <Arrow direction="left" handleClick={prevSlide} />
        <div
          ref={ref}
          className="carousel w-full"
          style={{ width: `${width * 2}` }}
        >
          <div
            className="slider-content "
            style={{
              transform: `translate(-${translate}px, ${0}px)`,
              transition: `transform ease-out ${transition}s`,
              width: `${(width * children.length) / currentItemsToShow}px`,
            }}
          >
            {React.Children.map(children || null, (child, i) => {
              return (
                <Slide
                  key={i}
                  height={height}
                  width={width}
                  setterFn={setterFn}
                  index={i}
                >
                  {child}
                </Slide>
              );
            })}
          </div>
        </div>
        <Arrow direction="right" handleClick={nextSlide} />
      </div>
      <Dots activeDot={activeDot} onDotClick={onDotClick} dotsArr={dotsArr} />
    </div>
  );
};

const SliderWithModal = (props: SliderTypes): React.ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedSlide, setClickedSlide] = useState(null);

  const setterFn = (index) => {
    setIsModalOpen(true);
    setClickedSlide(index);
  };
  return (
    <div>
      {props.withModal && isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Slider
            {...props}
            itemsToShow={1}
            itemsToScroll={1}
            startAtIndex={clickedSlide}
          />
        </Modal>
      )}
      <Slider {...props} setterFn={props.withModal ? setterFn : null} />
    </div>
  );
};
export default SliderWithModal;
