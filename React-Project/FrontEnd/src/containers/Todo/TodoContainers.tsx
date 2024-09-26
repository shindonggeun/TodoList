// containers/TodoContainer.tsx

import TodoInput from '@src/components/Todo/TodoInput';
import TodoList from '@src/components/Todo/TodoList';
import { useTodoStore } from '@src/stores/TodoStore';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

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

        {/* MUI의 LinearProgress 컴포넌트로 프로그레시브 바 구현 */}
        <Box sx={{ width: '100%', marginTop: 2 }}>
          <LinearProgress variant="determinate" value={completionRate} />
        </Box>
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
