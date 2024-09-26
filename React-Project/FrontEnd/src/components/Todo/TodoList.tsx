// components/Todo/TodoList.tsx

import React from 'react';
import TodoItem from '@src/components/Todo/TodoItem';
import { TodoType } from '@src/types/TodoType'; // TodoType 불러오기

type TodoListProps = {
  todos: TodoType[];         // 할 일 목록 배열
  onToggle: (id: string) => void;   // 완료 상태 변경 함수
  onDelete: (id: string) => void;   // 삭제 함수
  onUpdate: (id: string, newTask: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onUpdate }) => {
  return (
    <div>
      {/* 할 일 목록이 비어 있는지 확인하여 조건부 렌더링 */}
      {todos.length === 0 ? (
        <p>할일 목록이 없습니다.</p>  // 할 일이 없을 때 보여줄 메시지
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}                // 고유 ID를 key로 전달
            task={todo.task}             // 할 일 내용
            completed={todo.completed}   // 완료 상태
            onToggle={() => onToggle(todo.id)}   // 완료 상태 변경 함수
            onDelete={() => onDelete(todo.id)}   // 삭제 함수
            onUpdate={(newTask) => onUpdate(todo.id, newTask)}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
