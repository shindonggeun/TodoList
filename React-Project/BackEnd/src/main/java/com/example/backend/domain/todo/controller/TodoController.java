package com.example.backend.domain.todo.controller;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.service.TodoService;
import com.example.backend.global.common.dto.Message;
import com.example.backend.global.common.dto.SliceResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "할일", description = "할일 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/todos")
public class TodoController {

    private final TodoService todoService;

    @Operation(
            summary = " 할일 목록 가져오기",
            description = "할일 목록을 가져오는 기능입니다. 마지막 ID 커서 기반 noOffSet 방식이 적용되어 있습니다."
    )
    @GetMapping
    public ResponseEntity<Message<SliceResponse<TodoResponse>>> getTodoList(@RequestParam(required = false) Long lastTodoId,
                                                                   @RequestParam(defaultValue = "10") int limit) {
        SliceResponse<TodoResponse> todoResponseList = todoService.getTodoList(lastTodoId, limit);
        return ResponseEntity.ok().body(Message.success(todoResponseList));
    }

    @Operation(
            summary = " 할일 생성하기",
            description = "할일을 생성하는 기능입니다."
    )
    @PostMapping
    public ResponseEntity<Message<Void>> createTodo(@RequestBody TodoRequest todoRequest) {
        todoService.createTodo(todoRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = " 할일 수정하기",
            description = "할일(내용)을 수정하는 기능입니다."
    )
    @PatchMapping("/{todoId}/content")
    public ResponseEntity<Message<Void>> updateContentTodo(@PathVariable Long todoId, TodoRequest todoRequest) {
        todoService.updateContentTodo(todoId, todoRequest);
        return ResponseEntity.ok().body(Message.success());
    }
}
