// components/Todo/TodoInput.tsx

import React, { useState } from 'react';

// TodoInput 컴포넌트는 새로운 할 일을 입력받는 역할을 합니다.
// 부모 컴포넌트(TodoContainer)에서 onAdd 함수가 props로 전달됩니다.
interface TodoInputProps {
  onAdd: (task: string) => void; // 할 일 추가하는 함수
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  // task라는 상태를 정의합니다. 사용자가 입력한 할 일을 저장합니다.
  const [task, setTask] = useState('');

  // 할 일 추가 버튼을 클릭했을 때 호출되는 함수입니다.
  const handleAdd = () => {
    // 입력된 내용이 공백이 아닌지 확인 후, onAdd 함수를 통해 새로운 할 일을 추가합니다.
    if (task.trim()) {
      onAdd(task); // 부모에게 입력된 할 일을 전달
      setTask(''); // 할 일 추가 후 입력 필드를 비웁니다.
    }
  };

  // 키보드에서 'Enter' 키를 눌렀을 때 할 일 추가 함수 호출
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd(); // 엔터 키를 누르면 handleAdd 함수 호출
    }
  };

  return (
    <div className="flex items-center">
      {/* 사용자가 할 일을 입력하는 입력 필드 */}
      <input
        className="border p-2 flex-1"
        value={task} // 현재 입력된 값을 상태(task)에 바인딩
        onChange={(e) => setTask(e.target.value)} // 입력 내용이 변경되면 상태를 업데이트
        onKeyDown={handleKeyDown} // 키보드 이벤트 핸들러 추가
        placeholder="해야할 일을 추가해주세요" // 사용자에게 보여줄 placeholder 텍스트
      />
      {/* 할 일을 추가하는 버튼 */}
      <button className="ml-2 bg-blue-500 text-white p-2" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default TodoInput;
