package com.example.backend.domain.todo.service;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.entity.Todo;
import com.example.backend.domain.todo.exception.TodoException;
import com.example.backend.domain.todo.repository.TodoRepository;
import com.example.backend.global.common.dto.SliceResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.SliceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository; // 모킹된 레포지토리 객체

    @InjectMocks
    private TodoServiceImpl todoService; // 모킹된 레포지토리를 주입받은 실제 서비스 객체

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
    @DisplayName("할일 목록 가져오기 성공 테스트 - 커서 기반 페이징")
    public void 할일_목록_가져오기_성공_테스트() {
        // Given (준비 단계)

        List<TodoResponse> todoResponseList = new ArrayList<>();
        for (long i = 14; i >= 1; i--) {
            todoResponseList.add(TodoResponse.builder().id(i).content("할일 " + i).isCompleted(false).build());
        }

        // 실제 페이징 처리를 위해 필요한 첫 10개의 할일만 슬라이스로 추출
        List<TodoResponse> pageContent = todoResponseList.subList(0, 10);
        SliceImpl<TodoResponse> slice = new SliceImpl<>(pageContent);

        // todoRepository.findTodoListNoOffset을 호출하면 미리 정의된 slice를 반환하도록 모킹
        when(todoRepository.findTodoListNoOffset(null, 10)).thenReturn(slice);

        // When (실행 단계)
        // lastTodoId = 10을 넘기고 할일 목록을 조회
        SliceResponse<TodoResponse> result = todoService.getTodoList(null, 10);

        // Then (검증 단계)
        // 반환된 할일 목록의 크기가 10개인지 검증
        assertEquals(10, result.getContents().size());

        // 목록이 정확한지 검증 (ID 순서대로 할일이 14에서 5까지 있는지 확인)
        assertEquals("할일 14", result.getContents().get(0).content());
        assertEquals("할일 5", result.getContents().get(9).content());

        // 마지막 페이지이므로 hasNext는 false여야 함
        assertFalse(result.getHasNext());

        // findTodoListNoOffset 메소드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findTodoListNoOffset(null, 10);
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
        TodoResponse result = todoService.updateContentTodo(todoId, todoRequest);

        // Then (검증 단계)
        // 할일 객체가 정상적으로 수정되었는지 검증
        assertEquals("할일 수정 테스트", result.content());  // result를 사용하여 검증
        assertEquals(todoId, result.id()); // ID 값도 일치하는지 확인

        // findById 메서드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findById(todoId);
    }

    @Test
    @DisplayName("할일 수정 실패 테스트 - 존재하지 않는 할일을 수정하려고 시도")
    public void 할일_수정_실패_테스트() {
        // Given (준비 단계)
        Long todoId = 1L;

        // todoRepository.findById()가 호출되면, 빈 Optional 객체를 반환하도록 설정
        when(todoRepository.findById(todoId)).thenReturn(Optional.empty());

        // When, Then (실행 및 검증 단계)
        // 존재하지 않는 할 일 조회 시 TodoException이 발생하는지 검증
        Exception exception = assertThrows(TodoException.class, () -> {
            todoService.updateContentTodo(todoId, new TodoRequest("할일 수정 테스트"));
        });

        assertEquals("해당 할일을 찾을 수 없습니다.", exception.getMessage());
        // findById 메소드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findById(todoId);
    }

    @Test
    @DisplayName("할일 목록 완료 처리 성공 테스트")
    public void 할일_목록_완료_처리_성공_테스트() {
        // Given (준비 단계)
        List<Long> todoIdList = List.of(1L, 2L, 3L);
        List<Todo> todoList = new ArrayList<>();

        todoList.add(Todo.builder().id(1L).content("할일 1").isCompleted(false).build());
        todoList.add(Todo.builder().id(2L).content("할일 2").isCompleted(false).build());
        todoList.add(Todo.builder().id(3L).content("할일 3").isCompleted(false).build());

        // todoRespository.findAllByIn()이 호출되면, 미리 정의된 할일 목록 반환
        when(todoRepository.findAllByIdIn(todoIdList)).thenReturn(todoList);

        // When (실행 단계)
        List<TodoResponse> result = todoService.updateIsCompletedTodoList(todoIdList);

        // Then (검증 단계)
        // 할일들이 정상적으로 완료 처리되었는지 검증
        result.forEach(todoResponse -> assertTrue(todoResponse.isCompleted()));

        // findAllByIdIn 메서드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findAllByIdIn(todoIdList);

        // saveAll 메서드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).saveAll(todoList);
    }

    @Test
    @DisplayName("할일 삭제하기 성공 테스트")
    public void 할일_삭제하기_성공_테스트() {
        // Given (준비 단계)
        Long todoId = 1L;
        Todo todo = Todo.builder()
                .id(todoId)
                .content("삭제할 할일")
                .isCompleted(false)
                .build();

        // todoRepository.findById()가 호출되면, 미리 정의된 할일 반환
        when(todoRepository.findById(todoId)).thenReturn(Optional.of(todo));

        // when (실행 단계)
        TodoResponse result = todoService.deleteTodo(todoId);

        // Then (검증 단계)
        // 삭제된 할일이 반환되었는지 검증
        assertEquals(todoId, result.id());

        // findById 메서드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findById(todoId);

        // delete 메서드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).delete(todo);
    }

    @Test
    @DisplayName("할일 삭제 실패 테스트 - 존재하지 않는 할일 삭제 시도")
    public void 할일_삭제_실패_테스트() {
        // Given (준비 단계)
        Long todoId = 1L;

        // todoRepository.findById()가 호출되면, 빈 Optional 반환
        when(todoRepository.findById(todoId)).thenReturn(Optional.empty());

        // When, Then (실행 및 검증 단계)
        // 존재하지 않는 할일 삭제 시 Exception 발생 여부 검증
        Exception exception = assertThrows(TodoException.class, () -> {
            todoService.deleteTodo(todoId);
        });

        assertEquals("해당 할일을 찾을 수 없습니다.", exception.getMessage());

        // findById 메서드가 정확히 한 번 호출되었는지 검증
        verify(todoRepository, times(1)).findById(todoId);

        // delete 메서드가 호출되지 않았는지 검증
        verify(todoRepository, times(0)).delete(any());
    }
}
