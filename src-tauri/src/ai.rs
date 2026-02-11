use crate::storage::ChatMessage;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct OpenAIRequest {
    model: String,
    messages: Vec<OpenAIMessage>,
}

#[derive(Serialize, Deserialize)]
struct OpenAIMessage {
    role: String,
    content: String,
}

#[derive(Deserialize)]
struct OpenAIResponse {
    choices: Vec<OpenAIChoice>,
}

#[derive(Deserialize)]
struct OpenAIChoice {
    message: OpenAIMessage,
}

#[derive(Serialize)]
struct ClaudeRequest {
    model: String,
    max_tokens: u32,
    system: String,
    messages: Vec<OpenAIMessage>,
}

#[derive(Deserialize)]
struct ClaudeResponse {
    content: Vec<ClaudeContent>,
}

#[derive(Deserialize)]
struct ClaudeContent {
    text: String,
}

#[tauri::command]
pub async fn chat(
    provider: String,
    model: String,
    api_key: String,
    system_prompt: String,
    history: Vec<ChatMessage>,
) -> Result<String, String> {
    println!("[KeXin] provider={}, model={}, history_len={}", provider, model, history.len());
    let client = reqwest::Client::new();

    match provider.as_str() {
        "claude" => {
            let messages: Vec<OpenAIMessage> = history
                .iter()
                .map(|m| OpenAIMessage {
                    role: m.role.clone(),
                    content: m.content.clone(),
                })
                .collect();

            let body = ClaudeRequest {
                model,
                max_tokens: 1024,
                system: system_prompt,
                messages,
            };

            let resp = client
                .post("https://api.anthropic.com/v1/messages")
                .header("x-api-key", &api_key)
                .header("anthropic-version", "2023-06-01")
                .header("content-type", "application/json")
                .json(&body)
                .send()
                .await
                .map_err(|e| e.to_string())?;

            let status = resp.status();
            let text = resp.text().await.map_err(|e| e.to_string())?;
            println!("[KeXin] Claude status={}, body={}", status, text.chars().take(100).collect::<String>());
            let parsed: ClaudeResponse =
                serde_json::from_str(&text).map_err(|_| format!("API error: {}", text))?;
            Ok(parsed.content.first().map(|c| c.text.clone()).unwrap_or_default())
        }
        _ => {
            // OpenAI / DeepSeek share the same format
            let base_url = match provider.as_str() {
                "openai" => "https://api.openai.com",
                _ => "https://api.deepseek.com",
            };

            let mut messages: Vec<OpenAIMessage> = vec![OpenAIMessage {
                role: "system".into(),
                content: system_prompt,
            }];
            messages.extend(history.iter().map(|m| OpenAIMessage {
                role: m.role.clone(),
                content: m.content.clone(),
            }));

            let body = OpenAIRequest { model, messages };

            let resp = client
                .post(format!("{}/v1/chat/completions", base_url))
                .header("Authorization", format!("Bearer {}", api_key))
                .header("content-type", "application/json")
                .json(&body)
                .send()
                .await
                .map_err(|e| e.to_string())?;

            let status = resp.status();
            let text = resp.text().await.map_err(|e| e.to_string())?;
            println!("[KeXin] {} status={}, body={}", provider, status, text.chars().take(100).collect::<String>());
            let parsed: OpenAIResponse =
                serde_json::from_str(&text).map_err(|_| format!("API error: {}", text))?;
            Ok(parsed
                .choices
                .first()
                .map(|c| c.message.content.clone())
                .unwrap_or_default())
        }
    }
}
