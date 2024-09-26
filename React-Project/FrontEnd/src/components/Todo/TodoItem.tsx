// components/Todo/TodoItem.tsx

import { useState } from 'react';
import { useTodoStore } from '@src/stores/TodoStore';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import SaveIcon from '@mui/icons-material/Save'; 
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type TodoItemProps = {
  task: string;
  completed: boolean;
  id: string;
};

const TodoItem = ({ task, completed, id }: TodoItemProps) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [newTask, setNewTask] = useState(task);

  const handleSave = () => {
    updateTodo(id, newTask);
    setIsUpdating(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <input type="checkbox" checked={completed} onChange={() => toggleTodo(id)} />
        {isUpdating ? (
          <input
            className="ml-2 border p-1"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        ) : (
          <span className={completed ? 'line-through ml-2' : 'ml-2'}>
            {task}
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
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TodoItem;
