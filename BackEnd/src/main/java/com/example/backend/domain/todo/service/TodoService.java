package com.example.backend.domain.todo.service;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.global.common.dto.SliceResponse;

import java.util.List;

public interface TodoService {

    // 할일 목록 조회
    SliceResponse<TodoResponse> getTodoList(Long lastTodoId, int limit);

    // 할일 생성
    TodoResponse createTodo(TodoRequest todoRequest);

    // 할일 내용 수정
    TodoResponse updateContentTodo(Long todoId, TodoRequest todoRequest);

    // 할일 체크한 것들 완료 처리
    List<TodoResponse> updateIsCompletedTodoList(List<Long> todoIdList);

    // 할일 삭제하기
    TodoResponse deleteTodo(Long todoId);
}
