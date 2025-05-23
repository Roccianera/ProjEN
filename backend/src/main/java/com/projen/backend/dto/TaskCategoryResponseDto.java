package com.projen.backend.dto;

import java.util.List;

public record TaskCategoryResponseDto(
        Long id,
        String name,
        List<TaskResponseDto> tasks
) {
}
