import { getCurrentWindow } from "@tauri-apps/api/window";
import { initChat } from "./chat";
import { initSettings } from "./settings";
import { initPet } from "./pet";

window.addEventListener("DOMContentLoaded", async () => {
  initChat();
  const characterId = await initSettings();
  initPet(characterId);

  const pet = document.getElementById("pet")!;
  pet.addEventListener("mousedown", () => {
    getCurrentWindow().startDragging();
  });
});
