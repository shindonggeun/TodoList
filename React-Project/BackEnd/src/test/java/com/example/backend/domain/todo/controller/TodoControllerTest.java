package com.example.backend.domain.todo.controller;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.service.TodoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
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

    @BeforeEach
    void setUp() {
        todoRequest = new TodoRequest("테스트 할일");
        todoResponse = TodoResponse.builder()
                .id(1L)
                .content("테스트 할일")
                .isCompleted(false)
                .build();
    }

    @Test
    @DisplayName("할일 목록 가져오기 성공 테스트")
    public void 할일_목록_가져오기_성공_테스트() throws Exception {
        // Given (준비 단계)
        List<TodoResponse> todoResponseList = Arrays.asList(todoResponse);

        // todoService.getTodoList() 메소드가 호출되면, 해당 메소드가 할일 목록 응답 객체를 반환하도록 설정
        when(todoService.getTodoList()).thenReturn(todoResponseList);

        // When (실행 단계) & Then (검증 단계)
        mockMvc.perform(get("/api/todo/list"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataBody[0].id").value(todoResponse.id()))
                .andExpect(jsonPath("$.dataBody[0].content").value(todoResponse.content()))
                .andExpect(jsonPath("$.dataBody[0].isCompleted").value(todoResponse.isCompleted()));
    }

    @Test
    @DisplayName("할일 생성하기 성공 테스트")
    public void 할일_생성하기_성공_테스트() throws Exception {
        // Given (준비 단계)
        doNothing().when(todoService).createTodo(any(TodoRequest.class));

        // When (실행 단계) & Then (검증 단계)
        mockMvc.perform(post("/api/todo/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(todoRequest))) // JSON으로 변환하여 전송
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataHeader.successCode").value(0))  // 성공 코드가 0인지 확인 (0이면 성공, 1이면 실패)
                .andExpect(jsonPath("$.dataHeader.resultCode").isEmpty())  // 결과 코드가 null (또는 공백)인지 확인
                .andExpect(jsonPath("$.dataBody").isEmpty());  // dataBody는 Void이므로 비어 있어야 함
    }

    @Test
    @DisplayName("할일 수정하기 성공 테스트")
    public void 할일_수정하기_성공_테스트() throws Exception {
        // Given (준비 단계)
        Long todoId = 1L;
        doNothing().when(todoService).updateContentTodo(todoId, todoRequest);

        // When (실행 단계) & Then (검증 단계)
        mockMvc.perform(patch("/api/todo/update/content/{todoId}", todoId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(todoRequest))) // JSON으로 변환하여 전송
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dataHeader.successCode").value(0))  // 성공 코드가 0인지 확인 (0이면 성공, 1이면 실패)
                .andExpect(jsonPath("$.dataHeader.resultCode").isEmpty())  // 결과 코드가 null (또는 공백)인지 확인
                .andExpect(jsonPath("$.dataBody").isEmpty());  // dataBody는 Void이므로 비어 있어야 함
    }
}
