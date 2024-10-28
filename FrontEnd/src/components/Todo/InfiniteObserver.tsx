// src/components/Todo/InfiniteObserver.tsx

import { useEffect, useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  observerCallback: IntersectionObserverCallback;  // IntersectionObserver가 작동할 때 호출될 콜백 함수
  isFetching: boolean; // 데이터를 불러오는 중인지 나타내는 상태값 (React Query 상태)
  isLoading: boolean;  // 초기 로딩 중인지 나타내는 상태값 (React Query 상태)
};

export default function InfiniteObserver({ observerCallback, isFetching, isLoading }: Props) {
  const observerRef = useRef<HTMLDivElement>(null); // 관찰 대상 DOM 요소를 참조하기 위한 ref

  // IntersectionObserver 설정과 해제 로직
  useEffect(() => {
    // IntersectionObserver 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3, // 요소가 30% 정도 보일 때 observerCallback을 호출
    });

    // observerRef가 가리키는 요소가 있으면 해당 요소를 관찰
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // 컴포넌트가 언마운트되거나 observerRef가 변경되면, 기존 요소 관찰을 중단
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current); // 메모리 누수를 방지하기 위해 관찰 해제
      }
    };
  }, [observerCallback]); // observerCallback이 변경될 때마다 observer를 재설정

  return (
    <div ref={observerRef}>
      {/* 데이터를 불러오는 중일 때 로딩 인디케이터를 보여줍니다. */}
      {isFetching || isLoading ? <CircularProgress /> : null}
    </div>
  );
}
