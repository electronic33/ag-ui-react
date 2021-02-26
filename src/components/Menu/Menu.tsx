import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useLayoutEffect,
} from "react";
import classNames from "classnames";
import { VscTriangleRight } from "react-icons/vsc";

interface MenuTypes {
  tipClassName?: string;
  delay?: number;
  children?: React.ReactNode;
  direction?: string;
  containerClasses?: string;
  arrowClasses?: string;
}

const Menu = ({
  delay,
  children,
  menuData,
  active,
  setActive,
}: MenuTypes): React.ReactElement => {
  console.log("🚀 ~ file: Menu.tsx ~ line 27 ~ menuData", menuData);
  const menuRef = useRef<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>();

  const [isVerticalInView, setIsVerticalInView] = useState(undefined);
  const [isHorizontalInView, setIsHorizontalInView] = useState(undefined);

  useMemo(() => {
    function handleClickOutside(event) {
      if (
        active &&
        menuRef.current &&
        containerRef.current &&
        !menuRef.current.contains(event.target) &&
        !containerRef.current.contains(event.target)
      ) {
        setActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [scroll, setScroll] = useState({
    y: window.pageYOffset,
    x: window.pageXOffset,
  });
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setScroll({
        y: window.pageYOffset,
        x: window.pageXOffset,
      });
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  });

  useLayoutEffect(() => {
    const containerSpecs = containerRef?.current?.getBoundingClientRect();
    if (containerSpecs) {
    }
    const menuSpecs = menuRef?.current?.getBoundingClientRect();
    if (menuSpecs) {
    }
    if (containerSpecs && menuSpecs) {
      containerSpecs.bottom - menuSpecs.height > 0
        ? setIsVerticalInView(true)
        : setIsVerticalInView(false);
    }
    if (containerSpecs && menuSpecs && width) {
      const elementAndViewportRightSideDistance = width - containerSpecs.right;
      elementAndViewportRightSideDistance - menuSpecs.width > 0
        ? setIsHorizontalInView(true)
        : setIsHorizontalInView(false);
    }
  }, [active, width, height, scroll]);

  return (
    <div
      className="relative bg-red-600"
      ref={containerRef}
      onClick={() => {
        if (active) setActive(false);
        else {
          setActive(true);
        }
      }}
    >
      {children}
      {active && (
        <div
          ref={menuRef}
          className={classNames(`absolute w-full max-w-4xl  `, {
            "bottom-0": isVerticalInView,
            "top-0": !isVerticalInView,
            "left-full": isHorizontalInView,
            "right-full": !isHorizontalInView,
          })}
          style={{ bottom: "-10px" }}
        >
          {menuData}
        </div>
      )}
    </div>
  );
};

export default Menu;
