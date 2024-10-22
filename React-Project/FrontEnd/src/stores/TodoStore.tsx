import { create } from 'zustand';
import { Todo } from '@src/types/TodoType';

type TodoState = {
  todos: Todo[];
  setTodos: (updateFn: (prevTodos: Todo[]) => Todo[]) => void; // 할 일 목록 설정
  toggleTodo: (id: number) => void; // 할 일 완료 상태 토글
  getCheckedTodoIds: () => number[]; // 체크된 할 일의 ID 목록 반환
  deleteTodo: (id: number) => void; // 할 일 삭제 로직
  clearTodos: () => void; // 상태 초기화 로직 추가
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],

  // 백엔드에서 받아온 할 일을 Zustand에 저장 (중복 방지)
  setTodos: (updateFn) =>
    set((state) => ({
      todos: updateFn(state.todos),
    })),

  // 할 일 완료 상태 토글
  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    })),

  // 체크된 할 일 목록 반환
  getCheckedTodoIds: () =>
    get()
      .todos.filter((todo) => todo.isCompleted)
      .map((todo) => todo.id),

  // 상태에서 할 일 삭제
  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  // 상태를 초기화하는 함수
  clearTodos: () => set(() => ({ todos: [] })),
}));
