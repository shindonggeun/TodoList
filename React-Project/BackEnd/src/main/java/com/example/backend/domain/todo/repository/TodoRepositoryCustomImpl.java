package com.example.backend.domain.todo.repository;

import com.example.backend.domain.todo.dto.TodoResponse;
import com.example.backend.domain.todo.entity.QTodo;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TodoRepositoryCustomImpl implements TodoRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<TodoResponse> findTodoListNoOffset(Long lastTodoId, int limit) {
        QTodo todo = QTodo.todo;

        BooleanExpression cursorCondition = lastTodoId != null ? todo.id.lt(lastTodoId) : null;

        List<TodoResponse> todoResponseList = queryFactory
                .select(Projections.constructor(TodoResponse.class,
                        todo.id,
                        todo.content,
                        todo.isCompleted
                ))
                .from(todo)
                .where(todo.isCompleted.eq(false)
                        .and(cursorCondition))
                .orderBy(todo.id.desc())
                .limit(limit + 1)
                .fetch();

        boolean hasNext = hasNext(todoResponseList, limit);

        // 다음 페이지가 있는 경우 마지막 데이터는 제외
        if (hasNext) {
            todoResponseList.removeLast();
        }

        return new SliceImpl<>(todoResponseList, Pageable.unpaged(), hasNext);
    }

    private boolean hasNext(List<?> contents, int limit) {
        return contents.size() > limit;
    }
}
