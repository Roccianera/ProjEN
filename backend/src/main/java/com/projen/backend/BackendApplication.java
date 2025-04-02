package com.projen.backend;

import java.rmi.server.ExportException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.module.jsonSchema.JsonSchema;
import com.fasterxml.jackson.module.jsonSchema.JsonSchemaGenerator;
import com.projen.backend.dto.ProjectRequestDto;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args)  {








		SpringApplication.run(BackendApplication.class, args);
	}






}
