import { getCharacter, type PetState } from "./characters";

const pet = document.getElementById("pet")!;
let state: PetState = "idle";
let currentCharId = "sakura";
let interactionLock = false;

export function setCharacter(id: string) {
  currentCharId = id;
  renderPet();
}

export function setPetState(s: PetState) {
  state = s;
  renderPet();
}

export function getPetState() {
  return state;
}

function renderPet() {
  const char = getCharacter(currentCharId);
  pet.innerHTML = char.svg(state);
  pet.className = state;
}

// 临时播放一个状态，然后恢复
function playState(s: PetState, duration: number) {
  if (interactionLock) return;
  interactionLock = true;
  const prev = state;
  setPetState(s);
  setTimeout(() => {
    // 只在没被 thinking/talking 覆盖时恢复
    if (state === s) setPetState(prev === "hover" || prev === "click" ? "idle" : prev);
    interactionLock = false;
  }, duration);
}

export function initPet(characterId?: string) {
  if (characterId) currentCharId = characterId;
  renderPet();

  // 鼠标悬停 → 害羞
  pet.addEventListener("mouseenter", () => {
    if (state === "idle" && !interactionLock) setPetState("hover");
  });
  pet.addEventListener("mouseleave", () => {
    if (state === "hover") setPetState("idle");
  });

  // 点击 → 开心跳跃
  pet.addEventListener("click", (e) => {
    e.stopPropagation();
    if (state === "thinking" || state === "talking") return;
    playState("click", 700);
  });

  // 双击 → 额外反应（连续跳两下）
  pet.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    if (state === "thinking" || state === "talking") return;
    interactionLock = true;
    setPetState("click");
    setTimeout(() => {
      setPetState("idle");
      setTimeout(() => {
        setPetState("click");
        setTimeout(() => {
          setPetState("idle");
          interactionLock = false;
        }, 500);
      }, 150);
    }, 500);
  });

  // 拖拽松手 → 晃动
  pet.addEventListener("mouseup", () => {
    pet.classList.add("dragged");
    setTimeout(() => pet.classList.remove("dragged"), 500);
  });
}
