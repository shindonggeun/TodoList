// components/Todo/TodoList.tsx

import TodoItem from '@src/components/Todo/TodoItem';
import { useTodoStore } from '@src/stores/TodoStore';

export default function TodoList() {
  const { todos } = useTodoStore(); // zustand store에서 할 일 목록 가져옴 (저장된 변수)

  return (
    <div>
      {todos.length === 0 ? (
        <p>할일 목록이 없습니다.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id} // 할 일 아이템에 고유 key값 (UUID) 저장
            task={todo.task} // 할 일 내용
            completed={todo.completed} // 완료 여부
            id={todo.id} // 할 일 고유 ID
          />
        ))
      )}
    </div>
  );
};
