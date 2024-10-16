package com.example.backend.domain.todo.service;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.entity.Todo;
import com.example.backend.domain.todo.repository.TodoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoServiceImpl todoService;

    @Test
    @DisplayName("할일 생성하기 성공 테스트")
    public void 할일_생성하기_테스트() {
        // Given (준비 단계)
        TodoRequest todoRequest = new TodoRequest("할일 테스트 가즈아");
        Todo todo = Todo.builder()
                .id(1L)
                .content("할일 테스트 가즈아")
                .isCompleted(false)
                .build();

        // todoRepository.save() 메소드가 호출되면, 해당 메소드가 할일 객체를 반환하도록 설정
        when(todoRepository.save(any(Todo.class))).thenReturn(todo);

        // When (실행 단계)
        todoService.createTodo(todoRequest);

        // Then (검증 단계)
        // todoRepository의 save 메소드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).save(any(Todo.class));
    }

    @Test
    @DisplayName("할일 목록 가져오기 성공 테스트")
    public void 할일_목록_가져오기_테스트() {
        // Given (준비 단계)
        List<Todo> todoList = List.of(
                Todo.builder().id(1L).content("할일 1").isCompleted(false).build(),
                Todo.builder().id(2L).content("할일 2").isCompleted(false).build()
        );

        // todoRepository.findAll() 메소드가 호출되면, 미리 정의된 리스트를 반환하도록 설정
        when(todoRepository.findByIsCompletedFalse()).thenReturn(todoList);

        // When (실행 단계)
        List<TodoResponse> todoResponseList = todoService.getTodoList();

        // Then (검증 단계)
        // 가져온 리스트가 두 개의 할 일을 포함하고 있는지 검증
        assertEquals(2, todoResponseList.size());
        assertEquals("할일 1", todoResponseList.get(0).content());
        assertEquals("할일 2", todoResponseList.get(1).content());

        // findAll 메소드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findByIsCompletedFalse();
    }

    @Test
    @DisplayName("할일 수정하기 성공 테스트")
    public void 할일_수정하기_테스트() {
        // Given (준비 단계)
        Long todoId = 1L;
        TodoRequest todoRequest = new TodoRequest("할일 수정 테스트");
        Todo existingTodo = Todo.builder()
                .id(todoId)
                .content("기존 할일")
                .isCompleted(false)
                .build();

        // todoRepository.findById()가 호출되면, 미리 정의된 기존 할 일 객체를 반환하도록 설정
        when(todoRepository.findById(todoId)).thenReturn(Optional.of(existingTodo));

        // When (실행 단계)
        todoService.updateContentTodo(todoId, todoRequest);

        // Then (검증 단계)
        // 할일 객체가 정상적으로 수정되었는지 검증
        assertEquals("할일 수정 테스트", existingTodo.getContent());
        // findById 메소드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findById(todoId);
    }

    @Test
    @DisplayName("할일 수정 실패 테스트 - 존재하지 않는 할일을 수정하려고 시도")
    public void 할일_수정_실패_테스트() {
        // Given (준비 단계)
        Long todoId = 1L;

        // todoRepository.findById()가 호출되면, 빈 Optional 객체를 반환하도록 설정
        when(todoRepository.findById(todoId)).thenReturn(Optional.empty());

        // When, Then (검증 단계)
        // 존재하지 않는 할 일 조회 시 RuntimeException이 발생하는지 검증
        // TODO: RuntimeException이 아닌 Custom Exception으로 처리
        Exception exception = assertThrows(RuntimeException.class, () -> {
            todoService.updateContentTodo(todoId, new TodoRequest("할일 수정 테스트"));
        });

        assertEquals("해당 할 일이 존재하지 않습니다.", exception.getMessage());
        // findById 메소드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findById(todoId);
    }
}
