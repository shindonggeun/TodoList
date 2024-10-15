package com.example.backend;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.entity.Todo;
import com.example.backend.domain.todo.repository.TodoRepository;
import com.example.backend.domain.todo.service.TodoServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoServiceImpl todoService;

    @DisplayName("할일 생성하기 성공")
    @Test
    public void 할일생성하기() {
        // Given
        TodoRequest todoRequest = new TodoRequest("할일 테스트 가즈아");
        Todo todo = Todo.builder()
                .content("할일 테스트 가즈아")
                .isCompleted(false)
                .build();

        when(todoRepository.save(any(Todo.class))).thenReturn(todo);

        // When
        todoService.createTodo(todoRequest);

        // Then
        verify(todoRepository, times(1)).save(any(Todo.class));
    }
}
