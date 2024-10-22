import TodoItem from '@src/components/Todo/TodoItem';
import { useTodoStore } from '@src/stores/TodoStore';

export default function TodoList({ onDelete }) {
  const { todos } = useTodoStore();

  return (
    <div>
      {todos.length === 0 ? (
        <p>할일 목록이 없습니다.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            content={todo.content}
            isCompleted={todo.isCompleted}
            onDelete={onDelete} // 삭제 핸들러 전달
          />
        ))
      )}
    </div>
  );
}
