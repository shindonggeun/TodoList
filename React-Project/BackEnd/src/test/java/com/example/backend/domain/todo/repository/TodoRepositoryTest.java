package com.example.backend.domain.todo.repository;

import com.example.backend.domain.todo.dto.TodoRequest;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@EnableJpaAuditing
@Import(QuerydslConfig.class)
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

//    @Test
//    @DisplayName("할일 목록 가져오기 성공 테스트 - 커서 기반 페이징 (lastTodoId = 11)")
//    public void 할일_목록_가져오기_성공_테스트() {
//        // Given (준비 단계)
//        for (long i = 1; i <= 14; i++) {
//            todoRepository.save(Todo.builder().content("할일 " + i).isCompleted(false).build());
//        }
//
//        // When (실행 단계)
//        Slice<TodoResponse> result = todoRepository.findTodoListNoOffset(11L, 10);
//
//        // Then (검증 단계)
//        assertThat(result.getContent().size()).isEqualTo(10); // 10개의 할일만 가져와야 함
//        assertThat(result.hasNext()).isFalse(); // 더 이상의 페이지가 없으므로 hasNext는 false
//        assertThat(result.getContent().get(0).content()).isEqualTo("할일 10"); // 첫 번째 항목은 "할일 10"
//        assertThat(result.getContent().get(9).content()).isEqualTo("할일 1"); // 마지막 항목은 "할일 1"
//    }

    @Test
    @DisplayName("할일 생성하기 성공 테스트")
    public void 할일_생성하기_성공_테스트() {
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

    @Test
    @DisplayName("할일 내용 수정 성공 테스트")
    public void 할일_내용_수정_성공_테스트() {
        // Given (준비 단계)
        Todo todo = Todo.builder()
                .content("할일")
                .isCompleted(false)
                .build();

        todoRepository.save(todo);

        TodoRequest request = new TodoRequest("수정된 할 일");

        // When (실행 단계)
        todo.updateContent(request);

        // Then (검증 단계)
        assertThat(todo.getContent()).isEqualTo("수정된 할 일");
    }

    @Test
    @DisplayName("할일 목록 완료 처리 성공 테스트")
    public void 할일_목록_완료_처리_성공_테스트() {
        // Given (준비 단계)
        Todo todo1 = Todo.builder().content("할일 1").isCompleted(false).build();
        Todo todo2 = Todo.builder().content("할일 2").isCompleted(false).build();
        Todo todo3 = Todo.builder().content("할일 3").isCompleted(false).build();

        // DB에 저장
        todoRepository.saveAll(List.of(todo1, todo2, todo3));

        // 저장된 ID 가져오기
        List<Long> todoIdList = List.of(todo1.getId(), todo2.getId(), todo3.getId());

        // When (실행 단계)
        List<Todo> todoListToUpdate = todoRepository.findAllByIdIn(todoIdList);
        todoListToUpdate.forEach(todo -> todo.updateIsCompleted(true)); // 할일 완료 처리

        // Then (검증 단계)
        // ID로 다시 가져와서 모든 할일이 완료 상태인지 확인
        List<Todo> updatedTodoList = todoRepository.findAllByIdIn(todoIdList);

        // 완료 여부 검증
        assertThat(updatedTodoList).hasSize(3);
        assertThat(updatedTodoList.stream().allMatch(Todo::getIsCompleted)).isTrue(); // 모든 할일이 완료되었는지 확인
    }

    @Test
    @DisplayName("할일 삭제하기 성공 테스트")
    public void 할일_삭제하기_성공_테스트() {
        // Given (준비 단계)
        Todo todo = Todo.builder()
                .content("삭제할 할일")
                .isCompleted(false)
                .build();

        todoRepository.save(todo);

        // When (실행 단계)
        todoRepository.deleteById(todo.getId());

        // Then (검증 단계)
        Optional<Todo> deletedTodo = todoRepository.findById(todo.getId());
        assertThat(deletedTodo).isNotPresent(); // 할일이 삭제되었는지 확인
    }

}
