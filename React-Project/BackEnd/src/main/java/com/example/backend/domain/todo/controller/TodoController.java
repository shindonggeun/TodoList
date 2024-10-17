package com.example.backend.domain.todo.controller;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.service.TodoService;
import com.example.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "할일", description = "할일 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/todo")
public class TodoController {

    private final TodoService todoService;

    @Operation(
            summary = " 할일 목록 가져오기",
            description = "할일 목록을 가져오는 기능입니다."
    )
    @GetMapping("/list")
    public ResponseEntity<Message<List<TodoResponse>>> getTodoList() {
        List<TodoResponse> todoResponseList = todoService.getTodoList();
        return ResponseEntity.ok().body(Message.success(todoResponseList));
    }

    @Operation(
            summary = " 할일 생성하기",
            description = "할일을 생성하는 기능입니다."
    )
    @PostMapping("/create")
    public ResponseEntity<Message<Void>> createTodo(TodoRequest todoRequest) {
        todoService.createTodo(todoRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = " 할일 수정하기",
            description = "할일(내용)을 수정하는 기능입니다."
    )
    @PatchMapping("/update/content/{todoId}")
    public ResponseEntity<Message<Void>> updateContentTodo(@PathVariable Long todoId, TodoRequest todoRequest) {
        todoService.updateContentTodo(todoId, todoRequest);
        return ResponseEntity.ok().body(Message.success());
    }
}
