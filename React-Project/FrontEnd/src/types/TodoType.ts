// src/types/TodoType.ts

// Todo 항목 인터페이스 정의
export interface Todo {
  id: string;            // 할 일 고유 ID
  task: string;          // 할 일 내용 (문자열)
  completed: boolean;    // 할 일 완료 여부 (true: 완료, false: 미완료)
}

export interface TodoItemProps {
  task: string; // 할 일 내용
  completed: boolean; // 완료 여부
  id: string; // 할 일 고유 ID
}

export interface ProgressBarProps {
  completedTodosCount: number; // 완료된 할 일 개수
  totalTodosCount: number;     // 전체 할 일 개수
}
