// src/components/Todo/TodoItem.tsx

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { useUpdateTodoMutation } from '@src/queries/TodoQuery';
import { TodoItemProps } from '@src/types/TodoType';

export default function TodoItem({ content, isCompleted, id, onDelete, onToggleChecked, isChecked }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(content);

  const { mutate: updateTodo } = useUpdateTodoMutation(id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTodo({ content: newContent });
    setIsUpdating(false);
  };

  return (
    <div className="bg-blue-50 flex items-center justify-between">
      <div>
        {/* 체크박스 클릭 시 상태 변경 */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggleChecked(id)} // 체크 상태 변경 호출
        />

        {isUpdating ? (
          <form onSubmit={handleSubmit}>
            <input
              className="ml-2 border p-1"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </form>
        ) : (
          <span className={isCompleted ? 'line-through ml-2' : 'ml-2'}>
            {content}
          </span>
        )}
      </div>

      <div>
        {isUpdating ? (
          <IconButton color="primary" onClick={handleSubmit} type="submit">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={() => setIsUpdating(true)} type="button">
            <EditIcon />
          </IconButton>
        )}

        <IconButton color="primary" onClick={() => onDelete(id)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
