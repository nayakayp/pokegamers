import { useEffect, useState, useRef } from 'react';

type IntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

type UseInViewResult = {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
};

const useInView = (options?: IntersectionObserverOptions): UseInViewResult => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setInView(entry.isIntersecting);
      });
    }, options);

    const target = ref.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [options]);

  return { ref, inView };
};

export default useInView;
