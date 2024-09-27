// store/TodoStore.ts
import { create } from 'zustand';
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

export const useTodoStore = create<TodoState>((set) => ({
  todos: [], // 할 일 목록의 초기값은 빈 배열로 설정
  
  // 할 일 추가 메서드
  addTodo: (task: string) =>
    set((state) => ({
      // 새로운 할 일 항목을 목록에 추가, uuid를 통해 고유 ID값 생성
      todos: [...state.todos, { id: uuidv4(), task, completed: false }],
    })),

  // 할 일 완료 상태 토글 변경 메서드
  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        // 해당 id의 할 일의 완료 상태를 반전시켜줌 (true -> false, false -> true)
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  // 할 일 삭제 메서드
  deleteTodo: (id: string) =>
    set((state) => ({
      // 해당 id의 할 일을 목록에서 제거
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  // 할 일 내용 수정 메서드
  updateTodo: (id: string, newTask: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        // 해당 id의 할 일 내용을 새로 입력된 내용으로 업데이트
        todo.id === id ? { ...todo, task: newTask } : todo
      ),
    })),

  // 완료된 할 일 리스트 삭제 메서드
  removeCheckedTodos: () =>
    set((state) => ({
      // 완료된 항목 (completed가 true인 항목들) 필터링 하여 삭제 처리
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));
