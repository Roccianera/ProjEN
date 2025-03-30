/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.projen.backend.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;


public record TaskResponseDto(
        Long id,
        String name,
        String description,
        Boolean isCompleted,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate startDate,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate endDate
) {
}
