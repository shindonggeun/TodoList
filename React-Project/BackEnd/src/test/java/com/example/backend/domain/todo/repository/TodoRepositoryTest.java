package com.example.backend.domain.todo.repository;

import com.example.backend.domain.todo.entity.Todo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@EnableJpaAuditing
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    @DisplayName("완료하지 않은 할일 목록 가져오기 성공 테스트")
    public void 완료하지_않은_할일_목록_가져오기_테스트() {
        // Given (준비 단계)
        Todo todo1 = Todo.builder().content("할일1").isCompleted(false).build();
        Todo todo2 = Todo.builder().content("할일2").isCompleted(true).build();
        Todo todo3 = Todo.builder().content("할일3").isCompleted(false).build();

        todoRepository.save(todo1);
        todoRepository.save(todo2);
        todoRepository.save(todo3);

        // When (실행 단계)
        List<Todo> incompleteTodos = todoRepository.findByIsCompletedFalse();

        // Then (검증 단계)
        assertThat(incompleteTodos.size()).isEqualTo(2); // false인 것만 2개여야 함
        assertThat(incompleteTodos).extracting("content").containsExactly("할일1", "할일3");
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
