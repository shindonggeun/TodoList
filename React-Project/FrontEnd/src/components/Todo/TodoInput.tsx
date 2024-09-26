// components/Todo/TodoInput.tsx

import { useState } from 'react';
import { useTodoStore } from '@src/stores/TodoStore';

// 할 일 추가 기능을 담당하는 컴포넌트
const TodoInput = () => {
  // zustand store에서 할 일을 추가하는 함수 가져옴
  const { addTodo } = useTodoStore();

  // 사용자가 입력한 할 일 내용을 관리하는 로컬 상태
  const [task, setTask] = useState('');

  // 할 일을 추가하는 함수
  const handleAdd = () => {
    // 해당 할 일 입력값 양쪽 공백 지웠는데 비어 있지 않은 경우 (즉, 입력값 있는 경우)
    if (task.trim()) {
      addTodo(task); // 새로운 할 일 추가 (zustand)
      setTask(''); // 입력값 필드 지움
    }
  };

  // 키보드에서 'Enter' 키를 눌렀을 때 할 일을 추가하는 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="flex items-center">
      {/* 사용자가 할 일을 입력하는 입력 필드 */}
      <input
        className="border p-2 flex-1"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="해야할 일을 추가해주세요"
      />
      <button className="ml-2 bg-blue-500 text-white p-2" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
