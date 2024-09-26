// containers/TodoContainer.tsx

import TodoInput from '@src/components/Todo/TodoInput';
import TodoList from '@src/components/Todo/TodoList';
import { useTodoStore } from '@src/stores/TodoStore';

const TodoContainer = () => {
  const { todos, removeCheckedTodos } = useTodoStore();

  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const totalTodosCount = todos.length;
  const completionRate = totalTodosCount > 0 ? (completedTodosCount / totalTodosCount) * 100 : 0;

  return (
    <div className="todo-container">
      <h1 className="text-center">TODOLIST</h1>

      {/* 할 일 추가 인풋 */}
      <TodoInput />

      {/* 할 일 목록 */}
      <TodoList />

      {/* 완료된 할 일 개수 및 진행도 */}
      <div className="progress-section mt-4">
        <p>{completedTodosCount} of {totalTodosCount} tasks done</p>

        <div className="progress-bar-container" style={{ background: '#e0e0e0', width: '100%', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
          <div
            className="progress-bar"
            style={{
              width: `${completionRate}%`,
              background: '#4caf50',
              height: '100%',
            }}
          />
        </div>
      </div>

      {/* 완료된 항목 삭제 버튼 */}
      <div className="remove-checked-section mt-4">
        <button
          onClick={removeCheckedTodos}
          className="remove-checked-btn bg-red-500 text-white p-2 rounded"
        >
          완료된 일들 삭제하기
        </button>
      </div>
    </div>
  );
};

export default TodoContainer;
