// components/TodoInput.tsx
import { FormEvent, useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCreateTodoMutation } from '@src/queries/TodoQuery'; // React Query 훅 가져오기
import { useQueryClient } from '@tanstack/react-query'; // 쿼리 캐시 사용

export default function TodoInput({ onTodoAdded }: { onTodoAdded: () => void }) {
  const [inputContent, setContent] = useState<string>(''); // 입력한 할 일 내용
  const queryClient = useQueryClient(); // 쿼리 클라이언트 참조
  const { mutate: addNewTodo, isLoading } = useCreateTodoMutation(); // 할 일 생성 mutation 훅 사용

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputContent.trim()) {
      addNewTodo(
        { content: inputContent },
        {
          onSuccess: (newTodo) => {
            setContent(''); // 입력 초기화
            queryClient.invalidateQueries(['todoList']); // todoList 쿼리 무효화 -> 데이터 새로 가져옴
            onTodoAdded(); // 추가 완료 후 동작
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md flex items-center">
      <input
        className="border p-2 flex-1 mr-2 rounded-lg"
        value={inputContent}
        onChange={(e) => setContent(e.target.value)}
        placeholder="해야할 일을 추가해주세요"
        disabled={isLoading} // 로딩 중일 때 입력 비활성화
      />
      <IconButton color="primary" type="submit" disabled={isLoading}>
        <AddIcon />
      </IconButton>
    </form>
  );
}
