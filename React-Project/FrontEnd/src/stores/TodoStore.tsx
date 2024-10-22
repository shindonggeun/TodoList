import { create } from 'zustand';
import { Todo } from '@src/types/TodoType';

type TodoState = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void; // 할 일 목록을 설정하는 간단한 함수
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],

  // 할 일 목록을 React Query를 통해 받은 데이터로 설정하는 함수
  setTodos: (todos: Todo[]) =>
    set(() => ({
      todos,
    })),
}));
