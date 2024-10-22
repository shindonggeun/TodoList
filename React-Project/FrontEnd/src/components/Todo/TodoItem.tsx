import { useState } from 'react';
import { useTodoStore } from '@src/stores/TodoStore';
import { Todo } from '@src/types/TodoType';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import { useUpdateTodoMutation } from '@src/queries/TodoQuery';

export default function TodoItem({ content, isCompleted, id, onDelete }: Todo & { onDelete: (id: number) => void }) {
  const { toggleTodo } = useTodoStore(); // Zustand에서 할 일 상태 변경 메서드
  const [isUpdating, setIsUpdating] = useState<boolean>(false); // 수정 모드 여부 상태
  const [newContent, setNewContent] = useState<string>(content); // 수정 중인 할 일 내용을 로컬 상태로 관리

  const { mutate: updateTodo } = useUpdateTodoMutation(id); // 할일 수정

  // 수정 내용 저장 메서드
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTodo({ content: newContent });
    setIsUpdating(false);
  };

  return (
    <div className="bg-blue-50 flex items-center justify-between">
      <div>
        {/* 체크박스 클릭 시 완료 상태 토글 */}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => toggleTodo(id)}
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
