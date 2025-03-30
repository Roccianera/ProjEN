package com.projen.backend.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;

public record ProjectRequestDto(

        @NotBlank(message = "Project name is required")
        String name,
        @NotBlank(message = "Project description is required")
        String description,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate endDate,
        List<TaskCategoryRequestDto> taskCategories

        ) {
}
