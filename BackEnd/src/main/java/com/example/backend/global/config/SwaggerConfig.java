package com.example.backend.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "TodoList 프로젝트 API 명세서",
                description = "Spring boot Server 전용",
                version = "v1"
        )
)
public class SwaggerConfig {
    // 클래스 구현 내용
}

