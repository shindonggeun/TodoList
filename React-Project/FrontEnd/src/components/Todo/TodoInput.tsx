// components/Todo/TodoInput.tsx

import { useState } from 'react';
import { useTodoStore } from '@src/stores/TodoStore';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Add 아이콘 import

// 할 일 추가 기능을 담당하는 컴포넌트
export default function TodoInput() {
  const { addTodo } = useTodoStore(); // zustand store에서 할 일을 추가하는 함수 가져옴
  const [task, setTask] = useState<string>(''); // 사용자가 입력한 할 일 내용을 관리하는 로컬 상태

  const handleSubmit = e => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task);
      setTask('');
    }
  }


  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md flex items-center">
      <input
        className="border p-2 flex-1 mr-2 rounded-lg"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="해야할 일을 추가해주세요"
      />
      <IconButton color="primary" type="submit">
        <AddIcon />
      </IconButton>
    </form>
  )
};