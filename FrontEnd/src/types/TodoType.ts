// src/types/TodoType.ts

export interface Todo {
  id: number;            // 할 일 고유 ID
  content: string;          // 할 일 내용 (문자열)
  isCompleted: boolean;    // 할 일 완료 여부 (true: 완료, false: 미완료)
}

export interface TodoItemProps {
  content: string;      // 할 일 내용
  isCompleted: boolean; // 완료 여부
  id: number;           // 할 일 고유 ID
  onDelete: (id: number) => void;  // 삭제 핸들러
  onToggleChecked: (id: number) => void; // 체크박스 토글 핸들러
  isChecked: boolean; // 체크 여부
}

export interface TodoListProps {
  data: Todo[];              // Todo 배열
  onDelete: (id: number) => void;  // 삭제 핸들러
  onToggleChecked: (id: number) => void; // 체크박스 토글 핸들러
  checkedTodos: number[];  // 체크된 항목 ID 배열
}


export interface ProgressBarProps {
  completedTodosCount: number; // 완료된 할 일 개수
  totalTodosCount: number;     // 전체 할 일 개수
}

export interface TodoRequest {
  content: string; // 할 일 생성/수정 요청에서 사용할 필드
}