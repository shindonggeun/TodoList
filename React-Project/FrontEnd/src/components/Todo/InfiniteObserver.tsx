// InfiniteObserver.tsx
import { useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  observerCallback: IntersectionObserverCallback;
  isFetching: boolean;
  isLoading: boolean;
};

export default function InfiniteObserver({ observerCallback, isFetching, isLoading }: Props) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerCallback]);

  return (
    <div ref={observerRef}>
      {isFetching || isLoading ? <CircularProgress /> : null}
    </div>
  );
}
