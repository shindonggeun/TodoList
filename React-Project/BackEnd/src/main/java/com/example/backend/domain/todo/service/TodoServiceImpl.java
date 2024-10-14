package com.example.backend.domain.todo.service;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.entity.Todo;
import com.example.backend.domain.todo.repository.TodoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public List<TodoResponse> getTodoList() {
        // TODO: 추후에 QueryDSL 이용해서 페이지네이션 적용
        List<Todo> todoList = todoRepository.findAll();

        return todoList.stream()
                .map(todo -> TodoResponse.builder()
                        .content(todo.getContent())
                        .isCompleted(todo.getIsCompleted())
                        .build()
                ).toList();
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
