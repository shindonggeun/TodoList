import TodoInput from '@src/components/Todo/TodoInput';
import TodoList from '@src/components/Todo/TodoList';
import ProgressBar from '@src/components/Todo/ProgressBar';
import {
  useGetTodoListInfiniteQuery,
  useUpdateIsCompletedTodoMutation,
  useDeleteTodoMutation,
} from '@src/queries/TodoQuery';
import { useEffect } from 'react';
import { useTodoStore } from '@src/stores/TodoStore';
import { Button, Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

export default function TodoContainer() {
  const { data, fetchNextPage, hasNextPage, refetch } = useGetTodoListInfiniteQuery(); // 무한 스크롤 쿼리
  const { todos, setTodos, getCheckedTodoIds, deleteTodo, clearTodos } = useTodoStore(); // 상태 초기화 로직 추가
  const { mutate: completeTodos } = useUpdateIsCompletedTodoMutation();
  const { mutate: removeTodo } = useDeleteTodoMutation(); // 삭제 Mutation
  const { ref, inView } = useInView(); // 스크롤 감지

  // 상태 초기화 후 데이터를 다시 불러옴
  const refreshTodos = async () => {
    clearTodos(); // 상태 초기화
    await refetch(); // 데이터를 다시 불러옴
  };

  // 백엔드에서 받아온 데이터를 Zustand에 저장
  useEffect(() => {
    if (data) {
      const allTodos = data.pages.flatMap((page) => page.contents);
      setTodos((prevTodos) => {
        const newTodoIds = new Set(prevTodos.map((todo) => todo.id));
        const uniqueTodos = allTodos.filter((todo) => !newTodoIds.has(todo.id));
        return [...uniqueTodos, ...prevTodos]; // 새 데이터는 앞쪽에 추가
      });
    }
  }, [data, setTodos]);

  // 스크롤 끝에 도달하면 다음 페이지의 데이터를 불러옴
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage(); // 다음 페이지 데이터를 불러옴
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 완료된 할 일 개수 및 전체 할 일 개수 계산
  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length;
  const totalTodosCount = todos.length;

  // 할 일을 삭제하는 핸들러
  const handleDelete = (todoId: number) => {
    removeTodo(todoId, {
      onSuccess: () => {
        deleteTodo(todoId); // 상태에서 할 일 제거
        refreshTodos(); // 상태를 초기화하고 다시 불러옴
      },
    });
  };

  // 체크된 할 일 목록 완료 처리
  const handleCompleteChecked = () => {
    const checkedTodoIds = getCheckedTodoIds();
    if (checkedTodoIds.length > 0) {
      completeTodos(checkedTodoIds, {
        onSuccess: async () => {
          await refreshTodos(); // 상태를 초기화하고 다시 불러옴
        },
      });
    }
  };

  return (
    <Box className="bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-4">TODOLIST</h1>

      {/* 할 일 추가 후 새로고침 없이 목록 갱신 */}
      <TodoInput onTodoAdded={refreshTodos} />

      {/* 스크롤이 적용된 TodoList */}
      <Box
        sx={{
          height: '300px', // 높이를 지정하여 스크롤이 가능하도록 설정
          overflowY: 'auto', // Y축 스크롤 가능
        }}
      >
        <TodoList onDelete={handleDelete} /> {/* 삭제 핸들러 전달 */}
      </Box>

      {/* 스크롤 감지용 ref */}
      <div ref={ref} className="h-1" /> {/* 스크롤 끝에 도달하면 데이터 로드 */}

      <Box className="progress-section mt-4">
        <div className="flex items-center space-x-4">
          <div className="flex-grow" style={{ maxWidth: '85%' }}>
            {/* 완료된 할 일과 전체 할 일 수를 전달하여 ProgressBar를 업데이트 */}
            <ProgressBar
              completedTodosCount={completedTodosCount}
              totalTodosCount={totalTodosCount}
            />
          </div>

          {getCheckedTodoIds().length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              className="mt-4"
              onClick={handleCompleteChecked}
            >
              REMOVE CHECKED
            </Button>
          )}
        </div>
      </Box>
    </Box>
  );
}
