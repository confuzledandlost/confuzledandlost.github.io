// filepath: /Users/brandon/Documents/SSU-SNHU-SRJC/Personal_Site/portfolio-vite/src/hooks/useInView.js
import { useState, useEffect } from "react";

export const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return isInView;
};