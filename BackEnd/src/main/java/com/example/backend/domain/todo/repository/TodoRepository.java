package com.example.backend.domain.todo.repository;

import com.example.backend.domain.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long>, TodoRepositoryCustom {
    List<Todo> findAllByIdIn(List<Long> todoIdList);
}
