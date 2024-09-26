// components/Todo/TodoItem.tsx

import { useState } from 'react';
import { useTodoStore } from '@src/stores/TodoStore';

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
        {isUpdating ? (
          <button className="text-green-500" onClick={handleSave}>
            저장
          </button>
        ) : (
          <button className="text-blue-500" onClick={() => setIsUpdating(true)}>
            수정
          </button>
        )}
        <button className="text-red-500 ml-2" onClick={() => deleteTodo(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
