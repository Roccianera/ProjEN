
package com.projen.backend.dto;

import java.util.List;


public record TaskCategoryRequestDto(
        String name,
        List<TaskRequestDto> tasks
) {
}
