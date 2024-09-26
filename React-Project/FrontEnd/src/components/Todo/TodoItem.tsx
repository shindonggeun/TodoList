// components/Todo/TodoItem.tsx

import React, { useState } from 'react';

// TodoItem 컴포넌트의 props를 정의합니다.
interface TodoItemProps {
  task: string; // 할 일 내용
  completed: boolean; // 할 일의 완료 여부
  onToggle: () => void; // 완료 상태를 변경하는 함수
  onDelete: () => void; // 할 일을 삭제하는 함수
  onUpdate: (newTask: string) => void; // 할 일을 수정하는 함수
}

const TodoItem: React.FC<TodoItemProps> = ({ task, completed, onToggle, onDelete, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);  // 수정 모드를 관리하는 상태
  const [newTask, setNewTask] = useState(task);  // 수정할 내용을 위한 상태

  const handleSave = () => {
    onUpdate(newTask); // 수정한 내용 저장
    setIsUpdating(false); // 수정 모드 종료
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <input type="checkbox" checked={completed} onChange={onToggle} />
        {isUpdating ? (
          <input
            className="ml-2 border p-1"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}  // 엔터키로 저장
          />
        ) : (
          <span className={completed ? 'line-through ml-2' : 'ml-2'}>
            {task}
          </span>
        )}
      </div>
      
      <div>
        {isUpdating ? (
          <button className="text-green-500" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="text-blue-500" onClick={() => setIsUpdating(true)}>
            Edit
          </button>
        )}
        <button className="text-red-500 ml-2" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
