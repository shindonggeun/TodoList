package com.example.backend.domain.todo.controller;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.service.TodoService;
import com.example.backend.global.common.dto.SliceResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TodoController.class)
public class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc; // HTTP 요청을 모킹하는 객체

    @MockBean
    private TodoService todoService; // 컨트롤러에 주입되는 서비스 객체

    @Autowired
    private ObjectMapper objectMapper;

    private TodoRequest todoRequest;
    private TodoResponse todoResponse;
    private TodoRequest updateTodoRequest;
    private TodoResponse updateTodoResponse;
    private List<TodoResponse> todoResponseList;

    @BeforeEach
    void setUp() {
        todoRequest = new TodoRequest("테스트 할일");
        todoResponse = TodoResponse.builder()
                .id(1L)
                .content("테스트 할일")
                .isCompleted(false)
                .build();

        updateTodoRequest = new TodoRequest("테스트 할일 - 수정");
        updateTodoResponse = TodoResponse.builder()
                .id(1L)
                .content("테스트 할일 - 수정")
                .isCompleted(false)
                .build();

        todoResponseList = new ArrayList<>();
        todoResponseList.add(TodoResponse.builder().id(1L).content("테스트 할일 1").isCompleted(false).build());
        todoResponseList.add(TodoResponse.builder().id(2L).content("테스트 할일 2").isCompleted(false).build());
        todoResponseList.add(TodoResponse.builder().id(3L).content("테스트 할일 3").isCompleted(false).build());
    }

    @Test
    @DisplayName("할일 목록 가져오기 성공 테스트")
    public void 할일_목록_가져오기_성공_테스트() throws Exception {
        // Given (준비 단계)
        SliceResponse<TodoResponse> todoResponseSlice = SliceResponse.of(new SliceImpl<>(todoResponseList));

        // todoService.getTodoList() 호출 시 미리 정의된 할일 목록 반환
        when(todoService.getTodoList(any(), anyInt())).thenReturn(todoResponseSlice);

        // When (실행 단계) & Then (검증 단계)
        mockMvc.perform(get("/api/v1/todos")
                        .param("lastTodoId", "1")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataHeader.successCode").value(0))  // 성공 코드가 0인지 확인
                .andExpect(jsonPath("$.dataBody.contents[0].id").value(1L))  // 첫번째 항목의 ID 확인
                .andExpect(jsonPath("$.dataBody.contents[0].content").value("테스트 할일 1"))  // 첫번째 항목의 content 확인
                .andExpect(jsonPath("$.dataBody.contents[1].id").value(2L))  // 두번째 항목의 ID 확인
                .andExpect(jsonPath("$.dataBody.contents[1].content").value("테스트 할일 2"))  // 두번째 항목의 content 확인
                .andExpect(jsonPath("$.dataBody.contents[2].id").value(3L))  // 세번째 항목의 ID 확인
                .andExpect(jsonPath("$.dataBody.contents[2].content").value("테스트 할일 3"));  // 세번째 항목의 content 확인
        
    }

    @Test
    @DisplayName("할일 생성하기 성공 테스트")
    public void 할일_생성하기_성공_테스트() throws Exception {
        // Given (준비 단계)
        when(todoService.createTodo(any(TodoRequest.class))).thenReturn(todoResponse);

        // When (실행 단계) & Then (검증 단계)
        mockMvc.perform(post("/api/v1/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(todoRequest))) // JSON으로 변환하여 전송
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataHeader.successCode").value(0))  // 성공 코드가 0인지 확인 (0이면 성공, 1이면 실패)
                .andExpect(jsonPath("$.dataBody.id").value(1L))
                .andExpect(jsonPath("$.dataBody.content").value("테스트 할일"));
    }

    @Test
    @DisplayName("할일 수정하기 성공 테스트")
    public void 할일_수정하기_성공_테스트() throws Exception {
        // Given (준비 단계)
        when(todoService.updateContentTodo(any(Long.class), any(TodoRequest.class))).thenReturn(updateTodoResponse);

        // When (실행 단계) & Then (검증 단계)
        mockMvc.perform(patch("/api/v1/todos/{todoId}/content", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateTodoRequest))) // JSON으로 변환하여 전송
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataHeader.successCode").value(0))  // 성공 코드가 0인지 확인 (0이면 성공, 1이면 실패)
                .andExpect(jsonPath("$.dataBody.id").value(1L))
                .andExpect(jsonPath("$.dataBody.content").value("테스트 할일 - 수정"));
    }

    @Test
    @DisplayName("체크된 할일 목록 완료하기 성공 테스트")
    public void 체크된_할일_목록_완료하기_성공_테스트() throws Exception {
        // Given (준비 단계)
        List<TodoResponse> todoResponses = List.of(
                TodoResponse.builder().id(1L).content("할일 1").isCompleted(true).build(),
                TodoResponse.builder().id(2L).content("할일 2").isCompleted(true).build()
        );

        when(todoService.updateIsCompletedTodoList(anyList())).thenReturn(todoResponses);

        // When (실행 단계) & Then (검증 단계)
        mockMvc.perform(patch("/api/v1/todos/complete")
                        .param("todoIds", "1", "2", "3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataHeader.successCode").value(0))
                .andExpect(jsonPath("$.dataBody[0].id").value(1L))
                .andExpect(jsonPath("$.dataBody[0].content").value("할일 1"))
                .andExpect(jsonPath("$.dataBody[0].isCompleted").value(true))
                .andExpect(jsonPath("$.dataBody[1].id").value(2L))
                .andExpect(jsonPath("$.dataBody[1].content").value("할일 2"))
                .andExpect(jsonPath("$.dataBody[1].isCompleted").value(true));
    }

    @Test
    @DisplayName("할일 삭제하기 성공 테스트")
    public void 할일_삭제하기_성공_테스트() throws Exception {
        // Given (준비 단계)
        when(todoService.deleteTodo(any(Long.class))).thenReturn(todoResponse);

        // When (실행 단계) & Then (검증 단계)
        mockMvc.perform(delete("/api/v1/todos/{todoId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataHeader.successCode").value(0))
                .andExpect(jsonPath("$.dataBody.id").value(1L))
                .andExpect(jsonPath("$.dataBody.content").value("테스트 할일"));
    }
}
