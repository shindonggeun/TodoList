package com.example.backend.domain.todo.repository;

import com.example.backend.domain.todo.dto.TodoResponse;
import org.springframework.data.domain.Slice;

public interface TodoRepositoryCustom {
    // noOffSet 방식을 사용하여 할일 목록 조회
    Slice<TodoResponse> findTodoListNoOffset(Long lastTodoId, int limit);
}
