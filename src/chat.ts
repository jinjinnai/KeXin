import { invoke } from "@tauri-apps/api/core";
import { setPetState } from "./pet";

const messagesEl = document.getElementById("messages")!;
const chatInput = document.getElementById("chat-input") as HTMLInputElement;
const sendBtn = document.getElementById("send-btn")!;
const chatArea = document.getElementById("chat-area")!;
const petArea = document.getElementById("pet-area")!;

interface ChatMessage {
  role: string;
  content: string;
}

const chatCloseBtn = document.getElementById("chat-close-btn")!;

let history: ChatMessage[] = [];

export async function initChat() {
  try {
    history = await invoke<ChatMessage[]>("load_history");
    history.forEach((m) => appendBubble(m.role, m.content));
  } catch {}

  document.getElementById("chat-btn")!.addEventListener("click", () => {
    chatArea.classList.toggle("hidden");
  });

  chatCloseBtn.addEventListener("click", () => {
    chatArea.classList.add("hidden");
  });

  sendBtn.addEventListener("click", send);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
}

function appendBubble(role: string, content: string) {
  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = content;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

async function typeWriter(el: HTMLElement, text: string) {
  el.textContent = "";
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    messagesEl.scrollTop = messagesEl.scrollHeight;
    await new Promise((r) => setTimeout(r, 20));
  }
}

async function send() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = "";
  history.push({ role: "user", content: text });
  appendBubble("user", text);

  setPetState("thinking");
  const bubble = appendBubble("assistant", "思考中...");

  try {
    const settings = await invoke<{
      provider: string;
      model: string;
      system_prompt: string;
    }>("load_settings");

    const apiKey = await invoke<string>("get_api_key", {
      provider: settings.provider,
    });

    if (!apiKey) {
      bubble.textContent = "请先在设置中配置 API Key~";
      setPetState("idle");
      return;
    }

    const reply = await invoke<string>("chat", {
      provider: settings.provider,
      model: settings.model,
      apiKey,
      systemPrompt: settings.system_prompt,
      history,
    });

    setPetState("talking");
    await typeWriter(bubble, reply);
    history.push({ role: "assistant", content: reply });
    await invoke("save_history", { messages: history });
  } catch (e: any) {
    bubble.textContent = `出错了: ${e}`;
  }

  setPetState("idle");
}
