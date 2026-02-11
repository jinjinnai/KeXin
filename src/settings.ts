import { invoke } from "@tauri-apps/api/core";
import { characters } from "./characters";
import { setCharacter } from "./pet";

const panel = document.getElementById("settings-panel")!;
const providerSelect = document.getElementById("provider-select") as HTMLSelectElement;
const modelSelect = document.getElementById("model-select") as HTMLSelectElement;
const apiKeyInput = document.getElementById("api-key-input") as HTMLInputElement;
const systemPrompt = document.getElementById("system-prompt") as HTMLTextAreaElement;
const saveBtn = document.getElementById("save-settings-btn")!;
const closeBtn = document.getElementById("close-settings-btn")!;
const settingsBtn = document.getElementById("settings-btn")!;
const petSizeInput = document.getElementById("pet-size-input") as HTMLInputElement;
const petSizeVal = document.getElementById("pet-size-val")!;
const petEl = document.getElementById("pet")!;
const charGrid = document.getElementById("character-grid")!;
let selectedCharId = "sakura";

const MODELS: Record<string, string[]> = {
  deepseek: ["deepseek-chat", "deepseek-reasoner"],
  openai: ["gpt-4o", "gpt-4o-mini", "o1-mini"],
  claude: ["claude-sonnet-4-5-20250929", "claude-haiku-4-5-20251001"],
};

function applyPetSize(size: number) {
  petEl.style.width = size + "px";
  petEl.style.height = size + "px";
}

function updateModelOptions() {
  const models = MODELS[providerSelect.value] || [];
  modelSelect.innerHTML = models.map((m) => `<option value="${m}">${m}</option>`).join("");
}

export async function initSettings() {
  petSizeInput.addEventListener("input", () => {
    petSizeVal.textContent = petSizeInput.value;
    applyPetSize(Number(petSizeInput.value));
  });

  providerSelect.addEventListener("change", async () => {
    updateModelOptions();
    apiKeyInput.value = await invoke<string>("get_api_key", { provider: providerSelect.value });
  });

  settingsBtn.addEventListener("click", async () => {
    panel.classList.remove("hidden");
    try {
      const s = await invoke<{ provider: string; model: string; system_prompt: string; pet_size: number; character_id: string }>("load_settings");
      providerSelect.value = s.provider;
      updateModelOptions();
      modelSelect.value = s.model;
      systemPrompt.value = s.system_prompt;
      petSizeInput.value = String(s.pet_size || 100);
      petSizeVal.textContent = petSizeInput.value;
      selectedCharId = s.character_id || "sakura";
      renderCharGrid();
      apiKeyInput.value = await invoke<string>("get_api_key", { provider: s.provider });
    } catch {}
  });

  closeBtn.addEventListener("click", () => panel.classList.add("hidden"));

  saveBtn.addEventListener("click", async () => {
    try {
      await invoke("save_settings", {
        settings: {
          provider: providerSelect.value,
          model: modelSelect.value,
          system_prompt: systemPrompt.value,
          pet_size: Number(petSizeInput.value),
          character_id: selectedCharId,
        },
      });
      applyPetSize(Number(petSizeInput.value));
      setCharacter(selectedCharId);
      if (apiKeyInput.value) {
        await invoke("save_api_key", { provider: providerSelect.value, key: apiKeyInput.value });
      }
      panel.classList.add("hidden");
    } catch (e: any) {
      alert("保存失败: " + e);
    }
  });

  updateModelOptions();

  // 启动时应用已保存的设置
  try {
    const s = await invoke<{ pet_size: number; character_id: string }>("load_settings");
    if (s.pet_size) applyPetSize(s.pet_size);
    return s.character_id || "sakura";
  } catch {}
  return "sakura";
}

function renderCharGrid() {
  charGrid.innerHTML = characters.map(c => `
    <div class="char-option${c.id === selectedCharId ? ' active' : ''}" data-id="${c.id}">
      ${c.svg("idle")}
      <span>${c.name}</span>
    </div>
  `).join("");
  charGrid.querySelectorAll(".char-option").forEach(el => {
    el.addEventListener("click", () => {
      selectedCharId = (el as HTMLElement).dataset.id!;
      charGrid.querySelectorAll(".char-option").forEach(e => e.classList.remove("active"));
      el.classList.add("active");
    });
  });
}
