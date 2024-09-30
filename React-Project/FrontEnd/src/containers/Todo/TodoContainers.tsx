// containers/TodoContainer.tsx

import TodoInput from '@src/components/Todo/TodoInput';
import TodoList from '@src/components/Todo/TodoList';
import { useTodoStore } from '@src/stores/TodoStore';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20, // 프로그레스 바의 높이를 20px로 설정
  borderRadius: 5, // 둥글게 처리
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[300], // 배경색 설정
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff', // 진행 부분의 색상 설정
  },
}));

const TodoContainer = () => {
  const { todos, removeCheckedTodos } = useTodoStore(); // zustand에서 할 일 상태 및 완료된 할 일 리스트 삭제 메서드 가져오기

  const completedTodosCount = todos.filter((todo) => todo.completed).length; // 완료된 할 일 개수 계산
  const totalTodosCount = todos.length; // 전체 할 일 개수
  const completionRate = totalTodosCount > 0 ? (completedTodosCount / totalTodosCount) * 100 : 0; // 완료된 할 일의 비율 계산

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-4">TODOLIST</h1>

      {/* 할 일 추가 인풋 */}
      <TodoInput />

      {/* 할 일 목록 */}
      <TodoList />

      {/* 완료된 할 일 개수 및 진행도 */}
      <div className="progress-section mt-4">
        {/* 프로그레스 바와 버튼을 flex로 가로 정렬 */}
        <div className="flex items-center justify-between space-x-4">
          {/* 프로그레시브 바 */}
          <div className="flex-1 relative">
            <Box sx={{ width: '100%' }}>
              <BorderLinearProgress
                variant="determinate"
                value={completionRate} 
              />
            </Box>
            {/* 프로그레스 바 내부에 텍스트를 중앙에 배치 */}
            <p className="absolute inset-0 flex items-center justify-center text-white font-semibold">
              {completedTodosCount} of {totalTodosCount} tasks done
            </p>
          </div>

          {/* 완료된 항목 삭제 버튼 */}
          <button
            onClick={removeCheckedTodos}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove checked
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
