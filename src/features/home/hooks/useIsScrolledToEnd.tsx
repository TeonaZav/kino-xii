import { type RefObject, useEffect, useState } from "react";

const END_THRESHOLD_PX = 2;

const useIsScrolledToEnd = (scrollerRef: RefObject<HTMLElement | null>) => {
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const update = () => {
      const { scrollLeft, clientWidth, scrollWidth } = scroller;

      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - END_THRESHOLD_PX);
    };

    update();

    scroller.addEventListener("scroll", update, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(update);

    resizeObserver.observe(scroller);

    if (scroller.firstElementChild) {
      resizeObserver.observe(scroller.firstElementChild);
    }

    return () => {
      scroller.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [scrollerRef]);

  return isAtEnd;
};

export default useIsScrolledToEnd;
