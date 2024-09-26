// store/TodoStore.ts
import { create } from 'zustand';
import { TodoType } from '@src/types/TodoType';
import { v4 as uuidv4 } from 'uuid';

type TodoState = {
  todos: TodoType[];
  addTodo: (task: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, newTask: string) => void;
  removeCheckedTodos: () => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  
  addTodo: (task: string) =>
    set((state) => ({
      todos: [...state.todos, { id: uuidv4(), task, completed: false }],
    })),

  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  deleteTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  updateTodo: (id: string, newTask: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      ),
    })),

  removeCheckedTodos: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),
}));
