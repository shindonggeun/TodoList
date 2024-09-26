// containers/TodoContainer.tsx

import React, { useState } from 'react';
import TodoInput from '@src/components/Todo/TodoInput';
import TodoList from '@src/components/Todo/TodoList';
import { TodoType } from '@src/types/TodoType';
import { v4 as uuidv4 } from 'uuid';

const TodoContainer: React.FC = () => {
  // 할 일 상태 관리
  const [todos, setTodos] = useState<TodoType[]>([]);

  // 새로운 할 일 추가 함수
  const handleAddTodo = (task: string) => {
    const newTodo: TodoType = {
      id: uuidv4(),     // UUID를 이용하여 고유 ID 생성
      task,
      completed: false,
    };
    setTodos([...todos, newTodo]);  // 기존 할 일 목록에 새로운 할 일 추가
  };

  // 완료 상태 토글 함수
  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일 삭제 함수
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 완료된 할 일들만 삭제하는 함수
  const handleRemoveChecked = () => {
    // 완료되지 않은 할 일만 남기고 필터링
    setTodos(todos.filter(todo => !todo.completed));
  };

  // 완료된 할 일 개수 계산
  const completedTodosCount = todos.filter(todo => todo.completed).length;
  const totalTodosCount = todos.length;

  // 완료된 퍼센티지 계산 (0으로 나눠지는 경우 대비)
  const completionRate = totalTodosCount > 0 ? (completedTodosCount / totalTodosCount) * 100 : 0;

  return (
    <div className="todo-container">
      <h1 className="text-center">TODOLIST</h1>
      
      {/* 할 일 추가 인풋 */}
      <TodoInput onAdd={handleAddTodo} />
      
      {/* 할 일 목록 */}
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />

      {/* 완료된 할 일 개수 및 진행도 */}
      <div className="progress-section mt-4">
        <p>{completedTodosCount} of {totalTodosCount} tasks done</p>
        
        {/* 프로그레스 바 */}
        <div className="progress-bar-container" style={{ background: '#e0e0e0', width: '100%', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
          <div 
            className="progress-bar" 
            style={{
              width: `${completionRate}%`, 
              background: '#4caf50', 
              height: '100%'
            }} 
          />
        </div>
      </div>

      {/* 완료된 항목 삭제 버튼 */}
      <div className="remove-checked-section mt-4">
        <button
          onClick={handleRemoveChecked}
          className="remove-checked-btn bg-red-500 text-white p-2 rounded"
        >
          완료된 일들 삭제하기
        </button>
      </div>
    </div>
  );
};

export default TodoContainer;
