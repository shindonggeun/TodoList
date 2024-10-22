// components/Todo/TodoInput.tsx
import { FormEvent, useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCreateTodoMutation } from '@src/queries/TodoQuery'; // React Query 훅 가져오기

export default function TodoInput({ onTodoAdded }: { onTodoAdded: () => void }) {
  const [inputContent, setContent] = useState<string>(''); // 입력한 할 일 내용
  const { mutate: addNewTodo } = useCreateTodoMutation(); // 할 일 생성 mutation 훅 사용

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputContent.trim()) {
      addNewTodo({ content: inputContent }, { onSuccess: onTodoAdded });
      setContent(''); // 입력 초기화
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md flex items-center">
      <input
        className="border p-2 flex-1 mr-2 rounded-lg"
        value={inputContent}
        onChange={(e) => setContent(e.target.value)}
        placeholder="해야할 일을 추가해주세요"
      />
      <IconButton color="primary" type="submit">
        <AddIcon />
      </IconButton>
    </form>
  );
}
