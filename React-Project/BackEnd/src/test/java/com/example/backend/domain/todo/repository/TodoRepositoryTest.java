package com.example.backend.domain.todo.repository;

import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.entity.Todo;
import com.example.backend.global.config.QuerydslConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@EnableJpaAuditing
@Import(QuerydslConfig.class)
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    @DisplayName("할일 목록 가져오기 성공 테스트 - 커서 기반 페이징 (lastTodoId = 11)")
    public void 할일_목록_가져오기_커서_기반_테스트() {
        // Given (준비 단계)
        for (long i = 1; i <= 14; i++) {
            todoRepository.save(Todo.builder().content("할일 " + i).isCompleted(false).build());
        }

        // When (실행 단계)
        Slice<TodoResponse> result = todoRepository.findTodoListNoOffset(11L, 10);

        // Then (검증 단계)
        assertThat(result.getContent().size()).isEqualTo(10); // 10개의 할일만 가져와야 함
        assertThat(result.hasNext()).isFalse(); // 더 이상의 페이지가 없으므로 hasNext는 false
        assertThat(result.getContent().get(0).content()).isEqualTo("할일 10"); // 첫 번째 항목은 "할일 10"
        assertThat(result.getContent().get(9).content()).isEqualTo("할일 1"); // 마지막 항목은 "할일 1"
    }

    @Test
    @DisplayName("할일 저장하기 성공 테스트")
    public void 할일_저장하기_테스트() {
        // Given (준비 단계)
        Todo todo = Todo.builder()
                .content("새 할일")
                .isCompleted(false)
                .build();

        // When (실행 단계)
        Todo savedTodo = todoRepository.save(todo);

        // Then (검증 단계)
        assertThat(savedTodo.getId()).isNotNull(); // 저장 후 ID가 생성되었는지 확인
        assertThat(savedTodo.getContent()).isEqualTo("새 할일");
    }

    @Test
    @DisplayName("할일 아이디로 해당 할일 찾기 테스트")
    public void 할일_아이디로_해당_할일_찾기_테스트() {
        // Given (준비 단계)
        Todo todo = Todo.builder()
                .content("테스트 할일")
                .isCompleted(false)
                .build();

        todoRepository.save(todo);

        // When (실행 단계)
        Optional<Todo> foundTodo = todoRepository.findById(todo.getId());


        // Then (검증 단계)
        assertThat(foundTodo).isPresent(); // 해당 할 일 존재하는지 확인
        assertThat(foundTodo.get().getContent()).isEqualTo("테스트 할일");
    }
}
