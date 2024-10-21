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
    public TodoResponse createTodo(TodoRequest todoRequest) {
        Todo todo = todoRepository.save(todoRequest.toEntity());

        return TodoResponse.builder()
                .id(todo.getId())
                .content(todo.getContent())
                .isCompleted(todo.getIsCompleted())
                .build();
    }

    @Override
    public TodoResponse updateContentTodo(Long todoId, TodoRequest todoRequest) {
        Todo todo = findTodoById(todoId);
        todo.updateContent(todoRequest);

        return TodoResponse.builder()
                .id(todo.getId())
                .content(todo.getContent())
                .isCompleted(todo.getIsCompleted())
                .build();
    }

    @Override
    public List<TodoResponse> updateIsCompletedTodoList(List<Long> todoIdList) {
        List<Todo> todoList = todoRepository.findAllByIdIn(todoIdList);

        todoList.forEach(todo -> todo.updateIsCompleted(true));

        return todoRepository.saveAll(todoList).stream()
                .map(todo -> TodoResponse.builder()
                        .id(todo.getId())
                        .content(todo.getContent())
                        .isCompleted(todo.getIsCompleted())
                        .build())
                .toList();
    }

    @Override
    public TodoResponse deleteTodo(Long todoId) {
        Todo todo = findTodoById(todoId);
        todoRepository.delete(todo);

        return TodoResponse.builder()
                .id(todo.getId())
                .content(todo.getContent())
                .isCompleted(todo.getIsCompleted())
                .build();
    }

    private Todo findTodoById(Long todoId) {
        // TODO: Custom Exception 처리
        return todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("해당 할 일이 존재하지 않습니다."));
    }
}
