package com.example.backend.domain.todo.service;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.entity.Todo;
import com.example.backend.domain.todo.repository.TodoRepository;
import com.example.backend.global.common.dto.SliceResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public SliceResponse<TodoResponse> getTodoList(Long lastTodoId, int limit) {
        Slice<TodoResponse> todoResponseList = todoRepository.findTodoListNoOffset(lastTodoId, limit);
        return SliceResponse.of(todoResponseList);
    }

    @Override
    public void createTodo(TodoRequest todoRequest) {
        todoRepository.save(todoRequest.toEntity());
    }

    @Override
    public void updateContentTodo(Long todoId, TodoRequest todoRequest) {
        Todo todo = findTodoById(todoId);
        todo.update(todoRequest);
    }

    private Todo findTodoById(Long todoId) {
        // TODO: Custom Exception 처리
        return todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("해당 할 일이 존재하지 않습니다."));
    }
}
