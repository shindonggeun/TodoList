// components/Todo/TodoInput.tsx

import { useState } from 'react';
import { useTodoStore } from '@src/stores/TodoStore';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Add 아이콘 import

// 할 일 추가 기능을 담당하는 컴포넌트
const TodoInput = () => {
  const { addTodo } = useTodoStore(); // zustand store에서 할 일을 추가하는 함수 가져옴
  const [task, setTask] = useState(''); // 사용자가 입력한 할 일 내용을 관리하는 로컬 상태

  // 할 일을 추가하는 함수
  const handleAdd = () => {
    // 해당 할 일 입력값 양쪽 공백 지웠는데 비어 있지 않은 경우 (즉, 입력값 있는 경우)
    if (task.trim()) {
      addTodo(task); // zustand store의 addTodo 메서드 호출하여 새로운 할 일 추가
      setTask(''); // 입력값 필드 초기화
    }
  };

  // 키보드에서 'Enter' 키를 눌렀을 때 할 일을 추가하는 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd(); // 'Enter'키 누른 경우 할 일 추가
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md flex items-center">
      {/* 사용자가 할 일을 입력하는 입력 필드 */}
      <input
        className="border p-2 flex-1 mr-2 rounded-lg"
        value={task} // 입력된 할 일 필드값
        onChange={(e) => setTask(e.target.value)} // 입력값이 변경된 경우 상태 업데이트
        onKeyDown={handleKeyDown}
        placeholder="해야할 일을 추가해주세요"
      />
      {/* MUI의 IconButton을 사용하여 Add 버튼 대체 */}
      <IconButton color="primary" onClick={handleAdd}>
        <AddIcon /> {/* Add 아이콘 적용 */}
      </IconButton>
    </div>
  );
};

export default TodoInput;
