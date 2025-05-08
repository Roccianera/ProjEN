package com.projen.backend.service;

import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi.ChatModel;
import org.springframework.ai.openai.api.ResponseFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenAiService {

    private final OpenAiChatModel chatModel;

    @Value("${spring.ai.openai.api-key:}")
    private String apiKey;

    public String generateObjectFromPromptandSchema(String requesProject, String schema) {
        // Check if API key is available
        if (apiKey == null || apiKey.isEmpty()) {
            return "Error: OpenAI API key is not configured. Please set spring.ai.openai.api-key.";
        }

        //TODO refactor
        String jsonSchema2 = """
            {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "taskCategories": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "tasks": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string"
                            },
                            "description": {
                              "type": "string"
                            }
                          },
                          "required": ["name", "description"],
                          "additionalProperties": false
                        }
                      }
                    },
                    "required": ["name", "tasks"],
                    "additionalProperties": false
                  }
                }
              },
              "required": ["name", "description", "taskCategories"],
              "additionalProperties": false
            }
            """;
            

        Prompt prompt = new Prompt(requesProject,
        OpenAiChatOptions.builder()
            .model(ChatModel.GPT_4_O_MINI)
            
            .responseFormat(new ResponseFormat(ResponseFormat.Type.JSON_SCHEMA,jsonSchema2))
            .build());

        ChatResponse response = chatModel.call(prompt);

        return response.getResult().getOutput().getText();

    }






}
