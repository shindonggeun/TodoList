import TodoInput from '@src/components/Todo/TodoInput';
import TodoList from '@src/components/Todo/TodoList';
import ProgressBar from '@src/components/Todo/ProgressBar';
import {
  useGetTodoListInfiniteQuery,
  useUpdateIsCompletedTodoMutation,
  useDeleteTodoMutation,
} from '@src/queries/TodoQuery';
import { Box, Button } from '@mui/material';
import InfiniteObserver from '@src/components/Todo/InfiniteObserver'; // 무한스크롤 감지기
import { useState } from 'react';

export default function TodoContainer() {
  const { data, fetchNextPage, hasNextPage, refetch, isFetching, isLoading } = useGetTodoListInfiniteQuery();
  const { mutate: completeTodos } = useUpdateIsCompletedTodoMutation();
  const { mutate: removeTodo } = useDeleteTodoMutation();
  
  const [checkedTodos, setCheckedTodos] = useState<number[]>([]); // 체크된 항목을 저장할 상태

  // 완료된 할 일 개수 및 전체 할 일 개수 계산
  const completedTodosCount = data?.pages.flatMap((page) => page.contents).filter((todo) => todo.isCompleted).length || 0;
  const totalTodosCount = data?.pages.flatMap((page) => page.contents).length || 0;

  // 체크박스 상태 관리 함수
  const handleToggleChecked = (todoId: number) => {
    setCheckedTodos((prev) =>
      prev.includes(todoId) ? prev.filter((id) => id !== todoId) : [...prev, todoId]
    );
  };

  // 체크된 항목 일괄 처리
  const handleCompleteChecked = () => {
    if (checkedTodos.length > 0) {
      completeTodos(checkedTodos, {
        onSuccess: () => {
          setCheckedTodos([]); // 완료 후 체크박스 초기화
          refetch(); // 목록을 새로 불러옴
        },
      });
    }
  };

  // 할 일 삭제 처리 함수
  const handleDelete = (todoId: number) => {
    removeTodo(todoId, {
      onSuccess: () => {
        setCheckedTodos((prevChecked) => prevChecked.filter((id) => id !== todoId)); // 삭제된 항목을 체크된 목록에서 제거
        refetch(); // 목록을 새로 불러옴
      },
    });
  };

  // 무한스크롤 콜백 함수
  const observerCallback: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage(); // 다음 페이지를 로드
    }
  };

  return (
    <Box className="bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-4">TODOLIST</h1>

      {/* 할 일 추가 후 새로고침 없이 목록 갱신 */}
      <TodoInput onTodoAdded={refetch} />

      {/* 할 일 목록 */}
      <Box sx={{ height: '300px', overflowY: 'auto' }}>
        <TodoList
          data={data?.pages.flatMap((page) => page.contents) || []}
          onDelete={handleDelete} // 삭제 처리 핸들러 전달
          onToggleChecked={handleToggleChecked} // 체크박스 상태 관리 함수 전달
          checkedTodos={checkedTodos} // 체크된 항목 전달
        />
      </Box>

      {/* 무한 스크롤 옵저버 */}
      <InfiniteObserver observerCallback={observerCallback} isFetching={isFetching} isLoading={isLoading} />

      <Box className="progress-section mt-4">
        <div className="flex items-center space-x-4">
          <div className="flex-grow" style={{ maxWidth: '85%' }}>
            {/* 체크된 항목과 전체 항목을 ProgressBar에 전달 */}
            <ProgressBar
              completedTodosCount={completedTodosCount + checkedTodos.length} // 완료된 항목 + 체크된 항목
              totalTodosCount={totalTodosCount}
            />
          </div>

          {checkedTodos.length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              className="mt-4"
              onClick={handleCompleteChecked} // 체크된 항목 일괄 처리
            >
              REMOVE CHECKED
            </Button>
          )}
        </div>
      </Box>
    </Box>
  );
}
