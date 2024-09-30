// components/Todo/TodoItem.tsx

import { useState } from 'react';
import { useTodoStore } from '@src/stores/TodoStore';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

type TodoItemProps = {
  task: string; // 할 일 내용
  completed: boolean; // 완료 여부
  id: string; // 할 일 고유 ID
};

const TodoItem = ({ task, completed, id }: TodoItemProps) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore(); // zustand에서 할 일 상태 변경 메서드, 할 일 삭제 메서드, 할 일 내용 수정 메서드 가져옴
  const [isUpdating, setIsUpdating] = useState(false); // 수정 모드 여부 상태
  const [newTask, setNewTask] = useState(task); // 수정 중인 할 일 내용을 로컬 상태로 관리

  // 수정 내용 저장 메서드
  const handleSave = () => {
    updateTodo(id, newTask); // zustand에서 할 일 내용 업데이트
    setIsUpdating(false); // 수정 모드 종료
  };

  return (
    <div className="bg-blue-50 flex items-center justify-between">
      <div>
        <input type="checkbox" checked={completed} onChange={() => toggleTodo(id)} />
        {isUpdating ? (
          <input
            className="ml-2 border p-1"
            value={newTask} // 수정 중인 내용 바인딩
            onChange={(e) => setNewTask(e.target.value)} // 입력값 변경 시 상태 업데이트
            onKeyDown={(e) => e.key === 'Enter' && handleSave()} // Enter키로 저장
          />
        ) : (
          <span className={completed ? 'line-through ml-2' : 'ml-2'}>
            {task} {/* 완료된 경우 텍스트에 줄 긋기 적용 */}
          </span>
        )}
      </div>

      <div>
        {/* 저장 및 수정 관련 버튼 부분*/}
        {isUpdating ? (
          // 저장 버튼: MUI의 Save 아이콘 버튼
          <IconButton color="primary" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        ) : (
          // 수정 버튼: MUI의 Edit 아이콘 버튼
          <IconButton color="primary" onClick={() => setIsUpdating(true)}>
            <EditIcon />
          </IconButton>
        )}

        {/* 삭제 버튼: MUI의 Delete 아이콘 버튼 */}
        <IconButton color="primary" onClick={() => deleteTodo(id)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TodoItem;
