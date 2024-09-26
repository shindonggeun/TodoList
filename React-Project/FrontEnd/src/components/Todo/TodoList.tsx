// components/Todo/TodoList.tsx

import TodoItem from '@src/components/Todo/TodoItem';
import { useTodoStore } from '@src/stores/TodoStore';

const TodoList = () => {
  const { todos } = useTodoStore();

  return (
    <div>
      {todos.length === 0 ? (
        <p>할일 목록이 없습니다.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo.task}
            completed={todo.completed}
            id={todo.id}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
