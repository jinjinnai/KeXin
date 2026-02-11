use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

fn data_dir(app: &tauri::AppHandle) -> PathBuf {
    let dir = app.path().app_data_dir().unwrap();
    fs::create_dir_all(&dir).ok();
    dir
}

#[derive(Serialize, Deserialize, Clone)]
pub struct ChatMessage {
    pub role: String,
    pub content: String,
}

#[derive(Serialize, Deserialize, Default)]
pub struct Settings {
    pub provider: String,
    pub model: String,
    pub system_prompt: String,
    #[serde(default = "default_pet_size")]
    pub pet_size: u32,
    #[serde(default = "default_character_id")]
    pub character_id: String,
}

fn default_pet_size() -> u32 { 100 }
fn default_character_id() -> String { "sakura".into() }

#[tauri::command]
pub fn save_history(app: tauri::AppHandle, messages: Vec<ChatMessage>) -> Result<(), String> {
    let path = data_dir(&app).join("chat_history.json");
    let json = serde_json::to_string_pretty(&messages).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn load_history(app: tauri::AppHandle) -> Result<Vec<ChatMessage>, String> {
    let path = data_dir(&app).join("chat_history.json");
    if !path.exists() {
        return Ok(vec![]);
    }
    let data = fs::read_to_string(path).map_err(|e| e.to_string())?;
    serde_json::from_str(&data).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_settings(app: tauri::AppHandle, settings: Settings) -> Result<(), String> {
    let path = data_dir(&app).join("settings.json");
    let json = serde_json::to_string_pretty(&settings).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn load_settings(app: tauri::AppHandle) -> Result<Settings, String> {
    let path = data_dir(&app).join("settings.json");
    if !path.exists() {
        return Ok(Settings {
            provider: "deepseek".into(),
            model: "deepseek-chat".into(),
            system_prompt: "你是可心，一个可爱的桌面宠物助手。请用简短、活泼的语气回复。".into(),
            pet_size: 100,
            character_id: "sakura".into(),
        });
    }
    let data = fs::read_to_string(path).map_err(|e| e.to_string())?;
    serde_json::from_str(&data).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_api_key(provider: String, key: String) -> Result<(), String> {
    let path = dirs::data_dir()
        .ok_or("Cannot find data dir")?
        .join("kexin");
    fs::create_dir_all(&path).map_err(|e| e.to_string())?;
    let keys_path = path.join("keys.json");
    let mut keys: serde_json::Map<String, serde_json::Value> = if keys_path.exists() {
        let data = fs::read_to_string(&keys_path).map_err(|e| e.to_string())?;
        serde_json::from_str(&data).unwrap_or_default()
    } else {
        serde_json::Map::new()
    };
    keys.insert(provider, serde_json::Value::String(key));
    let json = serde_json::to_string_pretty(&keys).map_err(|e| e.to_string())?;
    fs::write(keys_path, json).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_api_key(provider: String) -> Result<String, String> {
    let keys_path = dirs::data_dir()
        .ok_or("Cannot find data dir")?
        .join("kexin")
        .join("keys.json");
    if !keys_path.exists() {
        return Ok(String::new());
    }
    let data = fs::read_to_string(&keys_path).map_err(|e| e.to_string())?;
    let keys: serde_json::Map<String, serde_json::Value> =
        serde_json::from_str(&data).map_err(|e| e.to_string())?;
    Ok(keys
        .get(&provider)
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .to_string())
}
