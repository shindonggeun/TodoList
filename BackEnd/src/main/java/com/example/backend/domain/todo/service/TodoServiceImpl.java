package com.example.backend.domain.todo.service;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.entity.Todo;
import com.example.backend.domain.todo.exception.TodoErrorCode;
import com.example.backend.domain.todo.exception.TodoException;
import com.example.backend.domain.todo.repository.TodoRepository;
import com.example.backend.global.common.dto.SliceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return todoRepository.findById(todoId)
                .orElseThrow(() -> new TodoException(TodoErrorCode.NOT_FOUND_TODO));
    }
}
