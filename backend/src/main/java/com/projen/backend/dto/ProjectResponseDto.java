package com.projen.backend.dto;

import java.time.LocalDate;
import java.util.List;


public record ProjectResponseDto(
        Long id,
        String name,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Boolean isCompleted,
        List<TaskCategoryRequestDto> taskCategories
  
) {
}
