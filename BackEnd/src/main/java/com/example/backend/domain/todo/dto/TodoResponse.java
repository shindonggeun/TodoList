package com.example.backend.domain.todo.dto;

import lombok.Builder;

@Builder
public record TodoResponse(
        long id,
        String content,
        boolean isCompleted
) {
}
