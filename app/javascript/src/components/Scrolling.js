import { useEffect, useState } from "react";

export const ScrollingTop = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
  }, []);

  return scrollTop;
}

export default ScrollingTop;
