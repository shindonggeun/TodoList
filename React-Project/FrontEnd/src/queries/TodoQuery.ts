// src/queries/todoQuery.ts
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodoList, createTodo, updateTodo, deleteTodo, updateIsCompletedTodo } from "@src/api/TodoApi";
import { TodoRequest } from "@src/types/TodoType";

// 무한 스크롤을 위한 할 일 목록을 가져오는 query 훅
export const useGetTodoListInfiniteQuery = () => {
    return useInfiniteQuery({
      queryKey: ['todoList'],
      queryFn: async ({ pageParam = undefined }) => {
        const response = await getTodoList(pageParam); // pageParam을 이용해 무한 스크롤 구현
        return response.dataBody;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNext) {
          return lastPage.contents[lastPage.contents.length - 1].id; // 마지막 Todo의 ID를 다음 페이지의 시작점으로 사용
        }
        return undefined; // 더 이상 페이지가 없으면 undefined 반환
      },
      initialPageParam: undefined,
    });
  };

// 할일 생성하기
export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TodoRequest) => createTodo(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['todoList']);
        },
    });
};

// 할일 수정하기
export const useUpdateTodoMutation = (todoId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TodoRequest) => updateTodo(todoId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['todoList']);
        },
    });
};

// 체크된 할일 목록 완료하기
export const useUpdateIsCompletedTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todoIds: number[]) => updateIsCompletedTodo(todoIds),
        onSuccess: () => {
            queryClient.invalidateQueries([`todoList`]); // 완료된 후에 목록을 갱신
        }
    })
}

// 할일 삭제하기
export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todoId: number) => deleteTodo(todoId),
        onSuccess: () => {
            queryClient.invalidateQueries(['todoList']);
        },
    });
};
