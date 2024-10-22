import TodoItem from '@src/components/Todo/TodoItem';

export default function TodoList({ data, onDelete, onToggleChecked, checkedTodos }) {
  return (
    <div>
      {data.length === 0 ? (
        <p>할일 목록이 없습니다.</p>
      ) : (
        data.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onDelete={onDelete} // 삭제 핸들러 전달
            onToggleChecked={onToggleChecked} // 체크박스 핸들러 전달
            isChecked={checkedTodos.includes(todo.id)} // 체크 여부 전달
          />
        ))
      )}
    </div>
  );
}
