// src/types/TodoType.ts

// Todo 항목 타입 정의
export type TodoType = {
  id: string;            // 할 일 고유 ID
  task: string;          // 할 일 내용 (문자열)
  completed: boolean;    // 할 일 완료 여부 (true: 완료, false: 미완료)
};

// ProgressBar 컴포넌트의 props 타입 정의
export type ProgressBarProps = {
  completedTodosCount: number; // 완료된 할 일 개수
  totalTodosCount: number;     // 전체 할 일 개수
};
