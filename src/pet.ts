import { getCharacter, type PetState } from "./characters";

const pet = document.getElementById("pet")!;
let state: PetState = "idle";
let currentCharId = "sakura";
let interactionLock = false;
let idleTimer: number | null = null;

// 20+ 随机 idle 动作
const IDLE_ACTIONS = [
  "idle",        // 默认弹跳
  "act-nod",     // 点头
  "act-shake",   // 摇头
  "act-spin",    // 转圈
  "act-jump",    // 跳跃
  "act-squat",   // 蹲下弹起
  "act-lean-l",  // 左倾
  "act-lean-r",  // 右倾
  "act-peek-l",  // 左探头
  "act-peek-r",  // 右探头
  "act-stretch", // 伸懒腰
  "act-dizzy",   // 晕眩转
  "act-float",   // 飘浮
  "act-dance",   // 跳舞
  "act-wave",    // 招手
  "act-stomp",   // 跺脚
  "act-yawn",    // 打哈欠(缩放)
  "act-shiver",  // 发抖
  "act-bounce2", // 双重弹跳
  "act-roll",    // 翻滚
  "act-sway",    // 左右摇摆
  "act-tiptoe",  // 踮脚
  "act-slide-l", // 左滑
  "act-slide-r", // 右滑
];

function startIdleLoop() {
  stopIdleLoop();
  idleTimer = window.setInterval(() => {
    if (state !== "idle" || interactionLock) return;
    const action = IDLE_ACTIONS[Math.floor(Math.random() * IDLE_ACTIONS.length)];
    pet.className = action;
    // 动作播放完恢复 idle
    if (action !== "idle") {
      setTimeout(() => {
        if (!interactionLock && (state === "idle")) pet.className = "idle";
      }, 2500);
    }
  }, 4000);
}

function stopIdleLoop() {
  if (idleTimer !== null) { clearInterval(idleTimer); idleTimer = null; }
}

export function setCharacter(id: string) {
  currentCharId = id;
  renderPet();
}

export function setPetState(s: PetState) {
  state = s;
  renderPet();
  if (s === "idle") startIdleLoop(); else stopIdleLoop();
}

export function getPetState() {
  return state;
}

function renderPet() {
  const char = getCharacter(currentCharId);
  pet.innerHTML = char.svg(state);
  pet.className = state;
}

function playState(s: PetState, duration: number) {
  if (interactionLock) return;
  interactionLock = true;
  const prev = state;
  setPetState(s);
  setTimeout(() => {
    if (state === s) setPetState(prev === "hover" || prev === "click" ? "idle" : prev);
    interactionLock = false;
  }, duration);
}

export function initPet(characterId?: string) {
  if (characterId) currentCharId = characterId;
  renderPet();
  startIdleLoop();

  pet.addEventListener("mouseenter", () => {
    if (state === "idle" && !interactionLock) setPetState("hover");
  });
  pet.addEventListener("mouseleave", () => {
    if (state === "hover") setPetState("idle");
  });

  pet.addEventListener("click", (e) => {
    e.stopPropagation();
    if (state === "thinking" || state === "talking") return;
    playState("click", 700);
  });

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

  pet.addEventListener("mouseup", () => {
    pet.classList.add("dragged");
    setTimeout(() => pet.classList.remove("dragged"), 500);
  });
}
