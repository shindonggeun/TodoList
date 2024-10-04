// containers/TodoContainer.tsx

import TodoInput from '@src/components/Todo/TodoInput';
import TodoList from '@src/components/Todo/TodoList';
import ProgressBar from '@src/components/Todo/ProgressBar';
import { useTodoStore } from '@src/stores/TodoStore';

export default function TodoContainer() {
  const { todos, removeCheckedTodos } = useTodoStore(); // zustand에서 할 일 상태 및 완료된 할 일 리스트 삭제 메서드 가져오기

  const completedTodosCount = todos.filter((todo) => todo.completed).length; // 완료된 할 일 개수 계산
  const totalTodosCount = todos.length; // 전체 할 일 개수

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-4">TODOLIST</h1>

      {/* 할 일 추가 인풋 컴포넌트 */}
      <TodoInput />

      {/* 할 일 목록 컴포넌트 */}
      <TodoList />

      {/* 완료된 할 일 개수 및 진행도를 보여주는 프로그레스 바 컴포넌트 */}
      <div className="progress-section mt-4">
        {/* 프로그레스 바와 버튼을 flex로 가로 정렬 */}
        <div className="flex items-center justify-between space-x-4">
          {/* 프로그레스 바 컴포넌트 */}
          <ProgressBar
            completedTodosCount={completedTodosCount} // 완료된 할 일 개수 전달
            totalTodosCount={totalTodosCount} // 전체 할 일 개수 전달
          />

          {/* 완료된 항목 삭제 버튼 (완료된 항목이 하나 이상 있을 때만 버튼이 보이도록 조건부 렌더링)*/}
          {completedTodosCount > 0 && (
            <button
              onClick={removeCheckedTodos} // 완료된 할 일 목록 삭제하는 함수
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Remove checked
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

