package com.example.backend.domain.todo.service;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;

import java.util.List;

public interface TodoService {

    // 할 일 목록 조회
    // TODO: 페이지네이션 적용
    List<TodoResponse> getTodoList();

    // 할 일 생성
    TodoResponse createTodo(TodoRequest todoRequest);

    // 할 일 수정
    void updateTodo(Long todoId, TodoRequest todoRequest);

    void updateTodoStatus(Long todoId, boolean isCompleted);
}
