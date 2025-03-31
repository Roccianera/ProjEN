package com.projen.backend.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;


public record ProjectResponseDto(
        Long id,
        String name,
        String description,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate startDate,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate endDate,
        Boolean isCompleted,
        List<TaskCategoryResponseDto> taskCategories
  
) {
}
