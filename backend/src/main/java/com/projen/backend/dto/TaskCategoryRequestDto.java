
package com.projen.backend.dto;

import java.util.List;


public record TaskCategoryRequestDto(
        Long id,
        String name,
        List<TaskRequestDto> tasks
) {
}
