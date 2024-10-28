package com.example.backend.domain.todo.dto;

import com.example.backend.domain.todo.entity.Todo;

public record TodoRequest(
        String content
) {

    public Todo toEntity() {
        return Todo.builder()
                .content(content)
                .isCompleted(false)
                .build();
    }
}
