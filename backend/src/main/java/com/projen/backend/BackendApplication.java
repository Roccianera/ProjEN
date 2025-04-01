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

		
		/*
		 * 
		 ObjectMapper objectMapper = new ObjectMapper();
		 
		 JsonSchemaGenerator schemaGenerator= new JsonSchemaGenerator(objectMapper);
		 
		 JsonSchema schema = schemaGenerator.generateSchema(ProjectRequestDto.class);
		 
		 String jsonSchema = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(schema);
		 
		 // Stampare lo schema JSON
		 System.out.println(jsonSchema);
		 */











		SpringApplication.run(BackendApplication.class, args);
	}






}
