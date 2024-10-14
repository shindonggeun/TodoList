package com.example.backend.domain.todo.entity;

import com.example.backend.domain.todo.dto.TodoRequest;
import com.example.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseEntity {
    @Id
    @Comment("할일 아이디")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Comment("할일 내용")
    @Column(columnDefinition = "VARCHAR(40)", nullable = false)
    private String content;

    @Comment("완료 여부")
    @Column(nullable = false)
    private Boolean isCompleted;

    public void update(TodoRequest todoRequest) {
        this.content = todoRequest.content();
    }

    public void updateIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
