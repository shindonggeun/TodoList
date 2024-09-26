// components/Todo/TodoItem.tsx

import React from 'react';

// TodoItem 컴포넌트의 props를 정의합니다.
interface TodoItemProps {
  task: string; // 할 일 내용
  completed: boolean; // 할 일의 완료 여부
  onToggle: () => void; // 완료 상태를 변경하는 함수
  onDelete: () => void; // 할 일을 삭제하는 함수
}

const TodoItem: React.FC<TodoItemProps> = ({ task, completed, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        {/* 완료 여부를 나타내는 체크박스 */}
        <input type="checkbox" checked={completed} onChange={onToggle} />
        {/* 완료된 할 일은 취소선을 적용 */}
        <span className={completed ? 'line-through ml-2' : 'ml-2'}>{task}</span>
      </div>
      {/* 할 일을 삭제하는 버튼 */}
      <button className="text-red-500" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
