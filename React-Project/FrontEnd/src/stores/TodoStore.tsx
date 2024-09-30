// store/TodoStore.ts
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { TodoType } from '@src/types/TodoType';
import { v4 as uuidv4 } from 'uuid';

// 상태 관리할 Todo 관련 타입 정의
type TodoState = {
  todos: TodoType[]; // Todo 항목 목록
  addTodo: (task: string) => void; // 할 일 추가
  toggleTodo: (id: string) => void; // 할 일 완료 상태 토글
  deleteTodo: (id: string) => void; // 할 일 삭제
  updateTodo: (id: string, newTask: string) => void; // 할 일 내용 수정
  removeCheckedTodos: () => void; // 완료된 할 일 리스트 전체 삭제
};

// persist 미들웨어 옵션 타입
type MyPersist = (
  config: StateCreator<TodoState>,
  options: PersistOptions<TodoState>
) => StateCreator<TodoState>;

// zustand 스토어 정의
export const useTodoStore = create<TodoState>(
  (persist as MyPersist)(
    (set) => ({
      todos: [], // 할 일 목록의 초기값은 빈 배열로 설정

      // 할 일 추가 메서드
      addTodo: (task: string) =>
        set((state) => ({
          todos: [...state.todos, { id: uuidv4(), task, completed: false }],
        })),

      // 할 일 완료 상태 토글 변경 메서드
      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),

      // 할 일 삭제 메서드
      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      // 할 일 내용 수정 메서드
      updateTodo: (id: string, newTask: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, task: newTask } : todo
          ),
        })),

      // 완료된 할 일 리스트 삭제 메서드
      removeCheckedTodos: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: 'todo-storage', // 로컬 스토리지에 저장할 키 이름
      getStorage: () => localStorage, // 로컬 스토리지를 사용
    }
  )
);
