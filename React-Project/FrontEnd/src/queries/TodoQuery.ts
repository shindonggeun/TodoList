// src/queries/TodoQuery.ts

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodoList, createTodo, updateTodo, deleteTodo, updateIsCompletedTodo } from "@src/api/TodoApi";
import { TodoRequest } from "@src/types/TodoType";

// 할 일 목록을 무한 스크롤로 가져오는 쿼리 훅
export const useGetTodoListInfiniteQuery = () => {
    return useInfiniteQuery({
        queryKey: ['todoList'],
        queryFn: async ({ pageParam = undefined }) => {
            const response = await getTodoList(pageParam);
            return response.dataBody;
        },
        getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.contents[lastPage.contents.length - 1].id : undefined,
        initialPageParam: undefined,
    });
};

// 할 일 생성하기 위한 mutation 훅
export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TodoRequest) => createTodo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] }); // 생성 후 목록 갱신
        },
    });
};

// 할 일 수정하기 위한 mutation 훅
export const useUpdateTodoMutation = (todoId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: TodoRequest) => updateTodo(todoId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] }); // 수정 후 목록 갱신
        },
    });
};

// 선택된 할 일을 완료 처리하는 mutation 훅
export const useUpdateIsCompletedTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todoIds: number[]) => updateIsCompletedTodo(todoIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] }); // 완료 처리 후 목록을 갱신
        }
    })
}

// 할 일을 삭제하는 mutation 훅
export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todoId: number) => deleteTodo(todoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] }); // 삭제 후 목록 갱신
        },
    });
};
