// src/api/todoApi.ts
import { customAxios } from "@src/util/auth/customAxios";
import { TodoRequest } from "@src/types/TodoType";
import qs from 'qs'


// 할일 목록 가져오기 (NoOffSet 방식)
export const getTodoList = async (lastTodoId?: number) => {
    return customAxios
    .get(`/todos`, {
        params: lastTodoId
    })
    .then(res => res.data)
    .catch(err => console.log(err))
};

// 할일 생성하기
export const createTodo = async (data: TodoRequest) => {
    return customAxios
    .post('/todos', data)
    .then(res => res.data)
    .catch(err => console.log(err))
};

// 할일 내용 수정하기
export const updateTodo = async (todoId: number, data: TodoRequest) => {
    return customAxios
    .patch(`/todos/${todoId}/content`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
};

// 체크된 할일 목록 완료하기
export const updateIsCompletedTodo = async (todoIds: number[]) => {
    return customAxios
    .patch(`/todos/complete`, null, {
        params: { todoIds },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }) 
    })
    .then(res => res.data)
    .catch(err => console.log(err))
};

// 할일 삭제하기
export const deleteTodo = async (todoId: number) => {
    return customAxios
    .delete(`/todos/${todoId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
};