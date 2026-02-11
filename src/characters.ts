export type PetState = "idle" | "thinking" | "talking" | "hover" | "click";

export interface Character {
  id: string;
  name: string;
  svg: (state: PetState) => string;
  css: string;
}

const DEFS = `<defs>
  <radialGradient id="g-shine" cx="35%" cy="30%" r="65%">
    <stop offset="0%" stop-color="rgba(255,255,255,0.4)"/>
    <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
  </radialGradient>
  <filter id="f-shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-opacity="0.15"/>
  </filter>
</defs>`;

// 特效
function sparkles(state: PetState): string {
  if (state === "click") return `
    <text x="15" y="10" font-size="8" class="sparkle-1">✦</text>
    <text x="72" y="14" font-size="6" class="sparkle-2">♥</text>
    <text x="50" y="6" font-size="7" class="sparkle-3">✧</text>`;
  if (state === "thinking") return `
    <circle cx="68" cy="18" r="2" fill="#aaa" class="dot-1"/>
    <circle cx="74" cy="12" r="2.5" fill="#bbb" class="dot-2"/>
    <circle cx="80" cy="6" r="3" fill="#ccc" class="dot-3"/>`;
  return "";
}

// 通用眼睛
function eyes(state: PetState, color: string, lx: number, rx: number, y: number, r = 7): string {
  if (state === "click") return `
    <path d="M${lx-r},${y} Q${lx},${y-r} ${lx+r},${y}" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M${rx-r},${y} Q${rx},${y-r} ${rx+r},${y}" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  if (state === "hover") return `
    <line x1="${lx-5}" y1="${y-2}" x2="${lx}" y2="${y+1}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    <line x1="${lx}" y1="${y+1}" x2="${lx+5}" y2="${y-2}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    <line x1="${rx-5}" y1="${y-2}" x2="${rx}" y2="${y+1}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
    <line x1="${rx}" y1="${y+1}" x2="${rx+5}" y2="${y-2}" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`;
  const px = state === "thinking" ? 2 : 0;
  const py = state === "thinking" ? -1 : 0;
  return `
    <ellipse cx="${lx}" cy="${y}" rx="${r}" ry="${r+1}" fill="white" stroke="${color}" stroke-width="1.2"/>
    <circle cx="${lx+px}" cy="${y+py}" r="${r*0.45}" fill="${color}"/>
    <circle cx="${lx+px-1.5}" cy="${y+py-2}" r="${r*0.2}" fill="white"/>
    <circle cx="${lx+px+1}" cy="${y+py-1}" r="${r*0.12}" fill="white"/>
    <ellipse cx="${rx}" cy="${y}" rx="${r}" ry="${r+1}" fill="white" stroke="${color}" stroke-width="1.2"/>
    <circle cx="${rx+px}" cy="${y+py}" r="${r*0.45}" fill="${color}"/>
    <circle cx="${rx+px-1.5}" cy="${y+py-2}" r="${r*0.2}" fill="white"/>
    <circle cx="${rx+px+1}" cy="${y+py-1}" r="${r*0.12}" fill="white"/>
    ${state === "talking" ? `
      <circle cx="${lx+px}" cy="${y+py-1}" r="${r*0.15}" fill="white" class="eye-sparkle"/>
      <circle cx="${rx+px}" cy="${y+py-1}" r="${r*0.15}" fill="white" class="eye-sparkle"/>` : ""}`;
}

function mouth(state: PetState, cx: number, y: number): string {
  if (state === "talking") return `<ellipse cx="${cx}" cy="${y+1}" rx="4" ry="5" fill="#FF6B81"/>
    <ellipse cx="${cx}" cy="${y-1}" rx="3.5" ry="2" fill="#FF8FA0"/>`;
  if (state === "click") return `<path d="M${cx-7},${y-1} Q${cx},${y+8} ${cx+7},${y-1}" fill="#FF6B81" stroke="#e85566" stroke-width="0.5"/>
    <path d="M${cx-5},${y-1} Q${cx},${y+2} ${cx+5},${y-1}" fill="white" opacity="0.6"/>`;
  if (state === "hover") return `<circle cx="${cx}" cy="${y}" r="2.5" fill="#FF8FA0"/>`;
  if (state === "thinking") return `<path d="M${cx-5},${y} Q${cx-2},${y+3} ${cx},${y} Q${cx+2},${y-3} ${cx+5},${y}" stroke="#e88" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  return `<path d="M${cx-4},${y} Q${cx},${y+5} ${cx+4},${y}" stroke="#FF6B81" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
}

function blush(state: PetState, lx: number, rx: number, y: number): string {
  const o = (state === "hover" || state === "click") ? 0.7 : 0.35;
  const r = (state === "hover" || state === "click") ? 6 : 5;
  return `<ellipse cx="${lx}" cy="${y}" rx="${r}" ry="3.5" fill="rgba(255,120,120,${o})"/>
    <ellipse cx="${rx}" cy="${y}" rx="${r}" ry="3.5" fill="rgba(255,120,120,${o})"/>`;
}


// ===== 小樱 - 粉色双马尾女孩 =====
const sakura: Character = {
  id: "sakura", name: "小樱",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <!-- 双马尾 -->
    <path d="M20,30 Q10,45 14,65 Q16,70 20,65 Q18,50 24,35Z" fill="#FF9EB5"/>
    <path d="M80,30 Q90,45 86,65 Q84,70 80,65 Q82,50 76,35Z" fill="#FF9EB5"/>
    <path class="hair-sway" d="M20,30 Q8,50 16,72" stroke="#FFB7C5" stroke-width="3" fill="none" opacity="0.5"/>
    <path class="hair-sway-r" d="M80,30 Q92,50 84,72" stroke="#FFB7C5" stroke-width="3" fill="none" opacity="0.5"/>
    <!-- 头 -->
    <ellipse cx="50" cy="38" rx="28" ry="26" fill="#FFE8D0"/>
    <ellipse cx="50" cy="38" rx="28" ry="26" fill="url(#g-shine)"/>
    <!-- 头发 -->
    <ellipse cx="50" cy="28" rx="30" ry="22" fill="#FFB7C5"/>
    <path d="M22,28 Q30,10 50,6 Q70,10 78,28 Q70,22 50,18 Q30,22 22,28Z" fill="#FF9EB5"/>
    <!-- 蝴蝶结 -->
    <path d="M28,22 Q22,14 18,20 Q22,24 28,22Z" fill="#FF4D6D"/>
    <path d="M28,22 Q22,30 18,24 Q22,20 28,22Z" fill="#FF4D6D"/>
    <circle cx="28" cy="22" r="2" fill="#FF6B88"/>
    <path d="M72,22 Q78,14 82,20 Q78,24 72,22Z" fill="#FF4D6D"/>
    <path d="M72,22 Q78,30 82,24 Q78,20 72,22Z" fill="#FF4D6D"/>
    <circle cx="72" cy="22" r="2" fill="#FF6B88"/>
    <!-- 刘海 -->
    <path d="M24,32 Q32,22 40,30 Q44,24 50,28 Q56,24 60,30 Q68,22 76,32 Q70,28 50,26 Q30,28 24,32Z" fill="#FFB7C5"/>
    ${eyes(s, "#5a3020", 38, 62, 42)}
    ${blush(s, 26, 74, 50)}
    ${mouth(s, 50, 54)}
    </g>
    <!-- 身体-连衣裙 -->
    <g filter="url(#f-shadow)">
    <path d="M34,62 L28,100 Q50,108 72,100 L66,62 Q50,68 34,62Z" fill="#FF8FAA"/>
    <path d="M28,100 Q50,108 72,100 Q66,105 50,110 Q34,105 28,100Z" fill="#FF7A98"/>
    <path d="M38,68 L50,72 L62,68" stroke="white" stroke-width="1.5" fill="none" opacity="0.6"/>
    <ellipse cx="50" cy="70" rx="2" ry="2" fill="#FF4D6D"/>
    <!-- 手臂 -->
    <rect class="arm-l" x="18" y="66" width="12" height="28" rx="6" fill="#FFE8D0"/>
    <rect class="arm-r" x="70" y="66" width="12" height="28" rx="6" fill="#FFE8D0"/>
    <!-- 腿 -->
    <rect x="36" y="102" width="10" height="14" rx="5" fill="#FFE8D0"/>
    <rect x="54" y="102" width="10" height="14" rx="5" fill="#FFE8D0"/>
    <ellipse cx="41" cy="117" rx="7" ry="3" fill="#FF8FAA"/>
    <ellipse cx="59" cy="117" rx="7" ry="3" fill="#FF8FAA"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 小蓝 - 蓝色呆毛男孩 =====
const xiaolan: Character = {
  id: "xiaolan", name: "小蓝",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <!-- 头 -->
    <ellipse cx="50" cy="38" rx="27" ry="25" fill="#FFE8D0"/>
    <ellipse cx="50" cy="38" rx="27" ry="25" fill="url(#g-shine)"/>
    <!-- 头发 -->
    <ellipse cx="50" cy="28" rx="29" ry="22" fill="#5B9BD5"/>
    <path d="M23,30 Q32,10 50,6 Q68,10 77,30 Q68,24 50,20 Q32,24 23,30Z" fill="#4A8AC4"/>
    <!-- 呆毛 -->
    <path class="ahoge" d="M50,8 Q45,0 55,-4 Q52,2 56,6" fill="#5B9BD5" stroke="#4A8AC4" stroke-width="0.5"/>
    <!-- 刘海 -->
    <path d="M25,32 Q35,24 50,28 Q65,24 75,32 Q65,28 50,26 Q35,28 25,32Z" fill="#5B9BD5"/>
    <path d="M23,30 L18,42" stroke="#5B9BD5" stroke-width="7" stroke-linecap="round"/>
    <!-- 眼镜 -->
    <circle cx="38" cy="42" r="10" fill="none" stroke="#3D5A80" stroke-width="1.8"/>
    <circle cx="62" cy="42" r="10" fill="none" stroke="#3D5A80" stroke-width="1.8"/>
    <line x1="48" y1="42" x2="52" y2="42" stroke="#3D5A80" stroke-width="1.5"/>
    ${eyes(s, "#2a4a6b", 38, 62, 42)}
    ${blush(s, 26, 74, 50)}
    ${mouth(s, 50, 54)}
    </g>
    <!-- 身体-卫衣 -->
    <g filter="url(#f-shadow)">
    <path d="M32,62 L28,100 Q50,106 72,100 L68,62 Q50,68 32,62Z" fill="#5B9BD5"/>
    <path d="M40,72 Q50,76 60,72 L60,88 Q50,92 40,88Z" fill="#4A8AC4" opacity="0.4"/>
    <text x="44" y="82" font-size="8" fill="white" opacity="0.7" font-family="sans-serif">KX</text>
    <!-- 帽衫兜帽线 -->
    <path d="M38,64 Q50,70 62,64" stroke="#4A8AC4" stroke-width="1.5" fill="none"/>
    <!-- 手臂 -->
    <rect class="arm-l" x="16" y="66" width="14" height="28" rx="7" fill="#5B9BD5"/>
    <rect class="arm-r" x="70" y="66" width="14" height="28" rx="7" fill="#5B9BD5"/>
    <!-- 腿-牛仔裤 -->
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#3D5A80"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#3D5A80"/>
    <ellipse cx="40" cy="115" rx="7" ry="3.5" fill="#444"/>
    <ellipse cx="60" cy="115" rx="7" ry="3.5" fill="#444"/>
    </g>
  </svg>`,
  css: ""
};


// ===== 猫咪 - 橘猫拟人 =====
const neko: Character = {
  id: "neko", name: "猫咪",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <!-- 猫耳 -->
    <polygon class="ear-l" points="24,28 14,4 40,22" fill="#F4A460"/>
    <polygon class="ear-l" points="26,26 18,8 38,22" fill="#FFD5B0"/>
    <polygon class="ear-r" points="76,28 86,4 60,22" fill="#F4A460"/>
    <polygon class="ear-r" points="74,26 82,8 62,22" fill="#FFD5B0"/>
    <!-- 头 -->
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#F4A460"/>
    <ellipse cx="50" cy="42" rx="24" ry="22" fill="#FFF0E0"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${eyes(s, "#5a3e28", 38, 62, 40)}
    ${blush(s, 26, 74, 48)}
    <!-- 猫鼻 -->
    <path d="M48,50 L50,52 L52,50Z" fill="#FFB0B0"/>
    ${s === "talking"
      ? `<ellipse cx="50" cy="56" rx="4" ry="4.5" fill="#FF6B81"/>
         <ellipse cx="50" cy="54" rx="3" ry="1.5" fill="#FF8FA0"/>`
      : s === "click"
        ? `<path d="M43,54 Q50,62 57,54" fill="#FF6B81" stroke="#e85566" stroke-width="0.5"/>`
        : s === "hover"
          ? `<circle cx="50" cy="54" r="2" fill="#FF8FA0"/>`
          : `<path d="M46,54 L50,57 L54,54" stroke="#FF8FA0" stroke-width="1.5" fill="none" stroke-linecap="round"/>`}
    <!-- 胡须 -->
    <line class="whisker" x1="4" y1="42" x2="26" y2="46" stroke="#ddd" stroke-width="1"/>
    <line class="whisker" x1="4" y1="50" x2="26" y2="50" stroke="#ddd" stroke-width="1"/>
    <line class="whisker" x1="96" y1="42" x2="74" y2="46" stroke="#ddd" stroke-width="1"/>
    <line class="whisker" x1="96" y1="50" x2="74" y2="50" stroke="#ddd" stroke-width="1"/>
    </g>
    <!-- 身体 -->
    <g filter="url(#f-shadow)">
    <path d="M32,64 L28,100 Q50,106 72,100 L68,64 Q50,70 32,64Z" fill="#F4A460"/>
    <ellipse cx="50" cy="82" rx="12" ry="14" fill="#FFF0E0"/>
    <!-- 铃铛项圈 -->
    <path d="M34,64 Q50,70 66,64" stroke="#FF4444" stroke-width="2.5" fill="none"/>
    <circle cx="50" cy="68" r="3.5" fill="#FFD700" stroke="#DAA520" stroke-width="0.8"/>
    <line x1="50" y1="66" x2="50" y2="70" stroke="#DAA520" stroke-width="0.6"/>
    <!-- 手臂-肉球 -->
    <rect class="arm-l" x="16" y="68" width="14" height="24" rx="7" fill="#F4A460"/>
    <ellipse cx="23" cy="93" rx="5" ry="4" fill="#FFF0E0"/>
    <circle cx="21" cy="92" r="1.5" fill="#FFD5B0"/>
    <circle cx="25" cy="92" r="1.5" fill="#FFD5B0"/>
    <circle cx="23" cy="95" r="1.5" fill="#FFD5B0"/>
    <rect class="arm-r" x="70" y="68" width="14" height="24" rx="7" fill="#F4A460"/>
    <ellipse cx="77" cy="93" rx="5" ry="4" fill="#FFF0E0"/>
    <circle cx="75" cy="92" r="1.5" fill="#FFD5B0"/>
    <circle cx="79" cy="92" r="1.5" fill="#FFD5B0"/>
    <circle cx="77" cy="95" r="1.5" fill="#FFD5B0"/>
    <!-- 腿 -->
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#F4A460"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#F4A460"/>
    <ellipse cx="40" cy="115" rx="7" ry="3.5" fill="#F4A460"/>
    <ellipse cx="60" cy="115" rx="7" ry="3.5" fill="#F4A460"/>
    <!-- 尾巴 -->
    <path class="tail" d="M72,96 Q92,86 88,66 Q86,56 92,46" stroke="#F4A460" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M72,96 Q92,86 88,66 Q86,56 92,46" stroke="#FFD5B0" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 兔兔 - 白粉兔子 =====
const bunny: Character = {
  id: "bunny", name: "兔兔",
  svg: (s) => `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <!-- 长耳朵 -->
    <ellipse class="ear-l" cx="36" cy="14" rx="8" ry="22" fill="white" stroke="#f0e0e0" stroke-width="0.8"/>
    <ellipse class="ear-l" cx="36" cy="14" rx="5" ry="18" fill="#FFD5D5"/>
    <ellipse class="ear-r" cx="64" cy="14" rx="8" ry="22" fill="white" stroke="#f0e0e0" stroke-width="0.8"/>
    <ellipse class="ear-r" cx="64" cy="14" rx="5" ry="18" fill="#FFD5D5"/>
    ${""}
    <!-- 头 -->
    <ellipse cx="50" cy="46" rx="28" ry="26" fill="white" stroke="#f5e5e5" stroke-width="0.5"/>
    <ellipse cx="50" cy="46" rx="28" ry="26" fill="url(#g-shine)"/>
    ${eyes(s, "#d4577a", 38, 62, 44)}
    ${blush(s, 26, 74, 52)}
    <!-- 兔鼻 -->
    <ellipse cx="50" cy="52" rx="3" ry="2" fill="#FFB0B0"/>
    ${s === "talking"
      ? `<ellipse cx="50" cy="57" rx="3.5" ry="4" fill="#FF6B81"/>`
      : s === "click"
        ? `<path d="M43,56 Q50,64 57,56" fill="#FF6B81"/>`
        : s === "hover"
          ? `<circle cx="50" cy="56" r="2" fill="#FF8FA0"/>`
          : `<path d="M47,56 Q50,59 53,56" stroke="#FF8FA0" stroke-width="1.5" fill="none"/>`}
    </g>
    <!-- 身体 -->
    <g filter="url(#f-shadow)">
    <path d="M32,70 L28,106 Q50,114 72,106 L68,70 Q50,76 32,70Z" fill="white" stroke="#f5e5e5" stroke-width="0.5"/>
    <ellipse cx="50" cy="88" rx="10" ry="12" fill="#FFE8E8"/>
    <!-- 粉色围裙 -->
    <path d="M36,74 L34,104 Q50,110 66,104 L64,74 Q50,78 36,74Z" fill="#FFE0E8" opacity="0.7"/>
    <path d="M42,76 L50,80 L58,76" stroke="#FFB0C0" stroke-width="1" fill="none"/>
    <!-- 蝴蝶结 -->
    <path d="M50,76 Q44,72 46,76 Q44,80 50,76Z" fill="#FF8FAA"/>
    <path d="M50,76 Q56,72 54,76 Q56,80 50,76Z" fill="#FF8FAA"/>
    <circle cx="50" cy="76" r="1.5" fill="#FF6B88"/>
    <!-- 手臂 -->
    <rect class="arm-l" x="16" y="74" width="14" height="24" rx="7" fill="white" stroke="#f5e5e5" stroke-width="0.5"/>
    <rect class="arm-r" x="70" y="74" width="14" height="24" rx="7" fill="white" stroke="#f5e5e5" stroke-width="0.5"/>
    <!-- 大脚 -->
    <ellipse cx="38" cy="114" rx="10" ry="12" fill="white" stroke="#f5e5e5" stroke-width="0.5"/>
    <ellipse cx="62" cy="114" rx="10" ry="12" fill="white" stroke="#f5e5e5" stroke-width="0.5"/>
    <ellipse cx="38" cy="118" rx="6" ry="4" fill="#FFD5D5"/>
    <ellipse cx="62" cy="118" rx="6" ry="4" fill="#FFD5D5"/>
    <!-- 蓬松尾巴 -->
    <circle cx="72" cy="100" r="8" fill="white" stroke="#f5e5e5" stroke-width="0.5"/>
    <circle cx="74" cy="98" r="4" fill="#FFF5F5"/>
    </g>
  </svg>`,
  css: ""
};


// ===== 小熊 - 棕色小熊 =====
const bear: Character = {
  id: "bear", name: "小熊",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <!-- 圆耳 -->
    <circle class="ear-l" cx="24" cy="18" r="12" fill="#A0724A"/>
    <circle class="ear-l" cx="24" cy="18" r="7" fill="#C49A6C"/>
    <circle class="ear-r" cx="76" cy="18" r="12" fill="#A0724A"/>
    <circle class="ear-r" cx="76" cy="18" r="7" fill="#C49A6C"/>
    <!-- 头 -->
    <ellipse cx="50" cy="40" rx="30" ry="28" fill="#C49A6C"/>
    <ellipse cx="50" cy="44" rx="18" ry="14" fill="#DEB887"/>
    <ellipse cx="50" cy="40" rx="30" ry="28" fill="url(#g-shine)"/>
    ${eyes(s, "#3e2518", 38, 62, 38, 6)}
    ${blush(s, 24, 76, 46)}
    <!-- 熊鼻 -->
    <ellipse cx="50" cy="48" rx="5" ry="3.5" fill="#6B4226"/>
    <ellipse cx="48" cy="47" rx="2" ry="1.2" fill="#8B5E3C" opacity="0.6"/>
    ${s === "talking"
      ? `<ellipse cx="50" cy="55" rx="4" ry="5" fill="#FF6B81"/>
         <ellipse cx="50" cy="53" rx="3" ry="1.5" fill="#FF8FA0"/>`
      : s === "click"
        ? `<path d="M42,54 Q50,63 58,54" fill="#FF6B81" stroke="#e85566" stroke-width="0.5"/>`
        : s === "hover"
          ? `<circle cx="50" cy="54" r="2.5" fill="#FF8FA0"/>`
          : `<path d="M46,54 Q50,58 54,54" stroke="#6B4226" stroke-width="1.8" fill="none" stroke-linecap="round"/>`}
    </g>
    <!-- 身体 -->
    <g filter="url(#f-shadow)">
    <path d="M30,66 L26,102 Q50,110 74,102 L70,66 Q50,72 30,66Z" fill="#C49A6C"/>
    <ellipse cx="50" cy="84" rx="14" ry="16" fill="#DEB887"/>
    <!-- 红色领结 -->
    <path d="M50,68 Q42,62 44,68 Q42,74 50,68Z" fill="#FF4444"/>
    <path d="M50,68 Q58,62 56,68 Q58,74 50,68Z" fill="#FF4444"/>
    <circle cx="50" cy="68" r="2.5" fill="#CC2222"/>
    <!-- 蜂蜜罐(idle时) -->
    ${s === "idle" ? `
      <g transform="translate(72,80)">
        <rect x="-6" y="-8" width="12" height="14" rx="3" fill="#DAA520"/>
        <rect x="-8" y="-10" width="16" height="5" rx="2" fill="#B8860B"/>
        <text x="0" y="2" font-size="6" fill="white" text-anchor="middle" font-family="sans-serif">蜜</text>
        <path d="M-2,-12 Q0,-16 2,-12" stroke="#DAA520" stroke-width="1.5" fill="none"/>
      </g>` : ""}
    <!-- 手臂 -->
    <rect class="arm-l" x="14" y="68" width="14" height="28" rx="7" fill="#C49A6C"/>
    <ellipse cx="21" cy="97" rx="5" ry="4" fill="#A0724A"/>
    <rect class="arm-r" x="72" y="68" width="14" height="28" rx="7" fill="#C49A6C"/>
    <ellipse cx="79" cy="97" rx="5" ry="4" fill="#A0724A"/>
    <!-- 腿 -->
    <ellipse cx="38" cy="110" rx="10" ry="8" fill="#C49A6C"/>
    <ellipse cx="62" cy="110" rx="10" ry="8" fill="#C49A6C"/>
    <ellipse cx="38" cy="113" rx="6" ry="3.5" fill="#A0724A"/>
    <ellipse cx="62" cy="113" rx="6" ry="3.5" fill="#A0724A"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 精灵 - 绿色森林精灵 =====
const elf: Character = {
  id: "elf", name: "精灵",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    <defs>
      <linearGradient id="g-cloak" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4AA84A"/>
        <stop offset="100%" stop-color="#2D7A2D"/>
      </linearGradient>
    </defs>
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <!-- 尖耳 -->
    <polygon points="14,40 -2,20 30,34" fill="#FFE8D0"/>
    <polygon points="16,38 2,24 28,34" fill="#FFF0E0"/>
    <polygon points="86,40 102,20 70,34" fill="#FFE8D0"/>
    <polygon points="84,38 98,24 72,34" fill="#FFF0E0"/>
    <!-- 头 -->
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFF0E0"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g-shine)"/>
    <!-- 头发 -->
    <ellipse cx="50" cy="28" rx="28" ry="22" fill="#5DAE5D"/>
    <path d="M24,30 Q34,10 50,6 Q66,10 76,30 Q66,22 50,18 Q34,22 24,30Z" fill="#4A9A4A"/>
    <!-- 花环 -->
    <circle cx="30" cy="24" r="3" fill="#FF8FAA"/>
    <circle cx="30" cy="24" r="1.5" fill="#FFB7C5"/>
    <circle cx="42" cy="18" r="2.5" fill="#FFD700"/>
    <circle cx="42" cy="18" r="1.2" fill="#FFE44D"/>
    <circle cx="58" cy="18" r="2.5" fill="#FF8FAA"/>
    <circle cx="58" cy="18" r="1.2" fill="#FFB7C5"/>
    <circle cx="70" cy="24" r="3" fill="#FFD700"/>
    <circle cx="70" cy="24" r="1.5" fill="#FFE44D"/>
    <path d="M28,26 Q36,20 44,20 Q50,18 56,20 Q64,20 72,26" stroke="#5DAE5D" stroke-width="1.5" fill="none"/>
    <!-- 刘海 -->
    <path d="M26,32 Q38,24 50,28 Q62,24 74,32 Q62,28 50,26 Q38,28 26,32Z" fill="#5DAE5D"/>
    ${eyes(s, "#2d5a2d", 38, 62, 42)}
    ${blush(s, 26, 74, 50)}
    ${mouth(s, 50, 54)}
    </g>
    <!-- 身体-斗篷 -->
    <g filter="url(#f-shadow)">
    <path d="M22,62 L14,106 Q50,116 86,106 L78,62 Q50,70 22,62Z" fill="url(#g-cloak)"/>
    <path d="M30,64 L26,102 Q50,110 74,102 L70,64 Q50,70 30,64Z" fill="#5DAE5D"/>
    <!-- 斗篷扣-宝石 -->
    <circle cx="50" cy="68" r="4" fill="#FFD700" stroke="#DAA520" stroke-width="1"/>
    <circle cx="50" cy="68" r="2" fill="#FFE44D"/>
    <circle cx="49" cy="67" r="0.8" fill="white" opacity="0.8"/>
    <!-- 魔杖 -->
    ${s !== "hover" ? `
      <g class="wand">
        <line x1="82" y1="70" x2="90" y2="50" stroke="#8B6914" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="90" cy="48" r="4" fill="#7FFF7F" opacity="0.6" class="wand-glow"/>
        <path d="M87,45 L90,42 L93,45 L90,48Z" fill="#FFD700"/>
        ${s === "idle" ? `
          <circle cx="90" cy="48" r="6" fill="#7FFF7F" opacity="0.2" class="wand-pulse"/>` : ""}
        ${s === "click" ? `
          <circle cx="88" cy="44" r="1.5" fill="#FFD700" class="sparkle-1"/>
          <circle cx="94" cy="46" r="1" fill="#7FFF7F" class="sparkle-2"/>
          <circle cx="90" cy="42" r="1.2" fill="white" class="sparkle-3"/>` : ""}
      </g>` : ""}
    <!-- 手臂 -->
    <rect class="arm-l" x="10" y="66" width="14" height="28" rx="7" fill="#4AA84A"/>
    <rect class="arm-r" x="76" y="66" width="14" height="28" rx="7" fill="#4AA84A"/>
    <!-- 腿 -->
    <rect x="36" y="102" width="10" height="14" rx="5" fill="#FFF0E0"/>
    <rect x="54" y="102" width="10" height="14" rx="5" fill="#FFF0E0"/>
    <!-- 精灵靴 -->
    <path d="M32,114 L44,114 L38,120Z" fill="#5DAE5D"/>
    <path d="M56,114 L68,114 L62,120Z" fill="#5DAE5D"/>
    </g>
  </svg>`,
  css: ""
};


// ===== 7. 小狐 - 红色狐狸 =====
const fox: Character = {
  id: "fox", name: "小狐",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <polygon class="ear-l" points="22,28 10,2 38,20" fill="#E8652B"/>
    <polygon class="ear-l" points="24,26 16,8 36,20" fill="#FFF0E0"/>
    <polygon class="ear-r" points="78,28 90,2 62,20" fill="#E8652B"/>
    <polygon class="ear-r" points="76,26 84,8 64,20" fill="#FFF0E0"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#E8652B"/>
    <ellipse cx="50" cy="44" rx="20" ry="18" fill="white"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${eyes(s, "#5a2800", 38, 62, 40)}
    ${blush(s, 26, 74, 48)}
    <ellipse cx="50" cy="50" rx="3" ry="2" fill="#333"/>
    ${mouth(s, 50, 55)}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M32,64 L28,100 Q50,106 72,100 L68,64 Q50,70 32,64Z" fill="#E8652B"/>
    <ellipse cx="50" cy="82" rx="10" ry="12" fill="white"/>
    <rect class="arm-l" x="16" y="68" width="14" height="24" rx="7" fill="#E8652B"/>
    <rect class="arm-r" x="70" y="68" width="14" height="24" rx="7" fill="#E8652B"/>
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#E8652B"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#E8652B"/>
    <path class="tail" d="M72,94 Q96,80 92,60 Q90,50 96,42" stroke="#E8652B" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M92,60 Q90,50 96,42" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 8. 企鹅 =====
const penguin: Character = {
  id: "penguin", name: "企鹅",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="42" rx="30" ry="28" fill="#2C3E50"/>
    <ellipse cx="50" cy="44" rx="22" ry="22" fill="white"/>
    <ellipse cx="50" cy="42" rx="30" ry="28" fill="url(#g-shine)"/>
    ${eyes(s, "#1a1a2e", 38, 62, 40)}
    ${blush(s, 28, 72, 48)}
    <path d="M47,48 L50,52 L53,48Z" fill="#F4A460"/>
    ${mouth(s, 50, 55)}
    </g>
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="86" rx="24" ry="28" fill="#2C3E50"/>
    <ellipse cx="50" cy="88" rx="16" ry="22" fill="white"/>
    <path d="M50,72 L46,76 L54,76Z" fill="#FFD700"/>
    <rect class="arm-l" x="14" y="72" width="14" height="22" rx="7" fill="#2C3E50"/>
    <rect class="arm-r" x="72" y="72" width="14" height="22" rx="7" fill="#2C3E50"/>
    <ellipse cx="38" cy="114" rx="10" ry="4" fill="#F4A460"/>
    <ellipse cx="62" cy="114" rx="10" ry="4" fill="#F4A460"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 9. 小龙 - 紫色小龙 =====
const dragon: Character = {
  id: "dragon", name: "小龙",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <polygon class="ear-l" points="20,30 8,10 34,24" fill="#9B59B6"/>
    <polygon class="ear-r" points="80,30 92,10 66,24" fill="#9B59B6"/>
    <path d="M38,8 L42,18 L46,6 L50,16 L54,4 L58,18 L62,10" stroke="#9B59B6" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#9B59B6"/>
    <ellipse cx="50" cy="42" rx="22" ry="20" fill="#D2B4DE"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${eyes(s, "#4a1a6b", 38, 62, 40, 8)}
    ${blush(s, 24, 76, 50)}
    <ellipse cx="50" cy="50" rx="4" ry="2.5" fill="#7D3C98"/>
    ${s === "talking" ? `<ellipse cx="50" cy="56" rx="5" ry="5" fill="#FF6B81"/>
      <path d="M44,54 L46,50 L48,54" fill="#FF8C00" opacity="0.6"/>` : mouth(s, 50, 55)}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M30,64 L26,100 Q50,108 74,100 L70,64 Q50,70 30,64Z" fill="#9B59B6"/>
    <ellipse cx="50" cy="82" rx="12" ry="14" fill="#D2B4DE"/>
    <rect class="arm-l" x="14" y="68" width="14" height="24" rx="7" fill="#9B59B6"/>
    <rect class="arm-r" x="72" y="68" width="14" height="24" rx="7" fill="#9B59B6"/>
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#9B59B6"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#9B59B6"/>
    <path class="tail" d="M72,96 Q90,90 86,74 Q84,66 90,58" stroke="#9B59B6" stroke-width="5" fill="none" stroke-linecap="round"/>
    <polygon points="88,56 92,50 94,58" fill="#9B59B6"/>
    <path d="M36,8 Q50,0 64,8" stroke="#7D3C98" stroke-width="2" fill="none" opacity="0.5"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 10. 柴犬 =====
const shiba: Character = {
  id: "shiba", name: "柴犬",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <polygon class="ear-l" points="22,30 14,6 38,22" fill="#D4883E"/>
    <polygon class="ear-r" points="78,30 86,6 62,22" fill="#D4883E"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#D4883E"/>
    <ellipse cx="50" cy="44" rx="20" ry="18" fill="#FFF5E0"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${eyes(s, "#2c1810", 38, 62, 38, 5)}
    ${blush(s, 26, 74, 46)}
    <ellipse cx="50" cy="48" rx="4" ry="3" fill="#333"/>
    ${s === "click" ? `<path d="M42,52 Q50,62 58,52" fill="#FF6B81"/>` :
      s === "talking" ? `<ellipse cx="50" cy="55" rx="4" ry="5" fill="#FF6B81"/>` :
      s === "hover" ? `<circle cx="50" cy="52" r="2" fill="#FF8FA0"/>` :
      `<path d="M46,52 Q50,56 54,52" stroke="#333" stroke-width="1.5" fill="none"/>`}
    ${s === "idle" ? `<path d="M56,52 Q62,48 58,44" stroke="#FF8FA0" stroke-width="1" fill="none" opacity="0.6"/>` : ""}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M32,64 L28,100 Q50,106 72,100 L68,64 Q50,70 32,64Z" fill="#D4883E"/>
    <ellipse cx="50" cy="82" rx="10" ry="12" fill="#FFF5E0"/>
    <rect class="arm-l" x="16" y="68" width="14" height="24" rx="7" fill="#D4883E"/>
    <rect class="arm-r" x="70" y="68" width="14" height="24" rx="7" fill="#D4883E"/>
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#D4883E"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#D4883E"/>
    <path class="tail" d="M72,90 Q84,78 78,66 Q76,62 80,58" stroke="#D4883E" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`,
  css: ""
};


// ===== 11. 熊猫 =====
const panda: Character = {
  id: "panda", name: "熊猫",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <circle class="ear-l" cx="24" cy="18" r="12" fill="#1a1a1a"/>
    <circle class="ear-r" cx="76" cy="18" r="12" fill="#1a1a1a"/>
    <ellipse cx="50" cy="40" rx="30" ry="28" fill="white"/>
    <ellipse cx="38" cy="38" rx="12" ry="10" fill="#1a1a1a" transform="rotate(-10,38,38)"/>
    <ellipse cx="62" cy="38" rx="12" ry="10" fill="#1a1a1a" transform="rotate(10,62,38)"/>
    <ellipse cx="50" cy="40" rx="30" ry="28" fill="url(#g-shine)"/>
    ${eyes(s, "#111", 38, 62, 40, 6)}
    ${blush(s, 24, 76, 50)}
    <ellipse cx="50" cy="50" rx="4" ry="3" fill="#333"/>
    ${mouth(s, 50, 55)}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M30,66 L26,102 Q50,110 74,102 L70,66 Q50,72 30,66Z" fill="white"/>
    <ellipse cx="50" cy="84" rx="12" ry="14" fill="#f0f0f0"/>
    <rect class="arm-l" x="14" y="68" width="14" height="26" rx="7" fill="#1a1a1a"/>
    <rect class="arm-r" x="72" y="68" width="14" height="26" rx="7" fill="#1a1a1a"/>
    <rect x="34" y="100" width="12" height="14" rx="6" fill="#1a1a1a"/>
    <rect x="54" y="100" width="12" height="14" rx="6" fill="#1a1a1a"/>
    ${s === "idle" ? `<g transform="translate(50,84)"><ellipse rx="6" ry="4" fill="#7BC67E"/><text y="3" font-size="5" fill="white" text-anchor="middle">竹</text></g>` : ""}
    </g>
  </svg>`,
  css: ""
};

// ===== 12. 独角兽 =====
const unicorn: Character = {
  id: "unicorn", name: "独角兽",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <polygon points="50,0 46,24 54,24" fill="#FFD700"/>
    <polygon points="50,0 47,16 50,4 53,16" fill="#FFF0A0" opacity="0.6"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="white"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    <path d="M22,28 Q34,14 50,10 Q66,14 78,28 Q66,22 50,18 Q34,22 22,28Z" fill="#E8D0FF"/>
    <path d="M78,30 Q86,40 82,55" stroke="#FFB7C5" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M22,30 Q14,40 18,55" stroke="#B7D4FF" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${eyes(s, "#8B5CF6", 38, 62, 42)}
    ${blush(s, 26, 74, 50)}
    ${mouth(s, 50, 54)}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M32,64 L28,100 Q50,108 72,100 L68,64 Q50,70 32,64Z" fill="white"/>
    <path d="M32,64 L28,100 Q50,108 72,100 L68,64 Q50,70 32,64Z" fill="linear-gradient(#E8D0FF,#FFD0E8)" opacity="0.3"/>
    <rect class="arm-l" x="16" y="68" width="14" height="24" rx="7" fill="white"/>
    <rect class="arm-r" x="70" y="68" width="14" height="24" rx="7" fill="white"/>
    <rect x="35" y="100" width="11" height="14" rx="5" fill="white"/>
    <rect x="54" y="100" width="11" height="14" rx="5" fill="white"/>
    <ellipse cx="40" cy="115" rx="6" ry="3" fill="#E8D0FF"/>
    <ellipse cx="60" cy="115" rx="6" ry="3" fill="#FFD0E8"/>
    <path class="tail" d="M72,94 Q90,84 86,68" stroke="#E8D0FF" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path class="tail" d="M72,96 Q92,88 88,72" stroke="#FFB7C5" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path class="tail" d="M72,98 Q94,92 90,76" stroke="#B7D4FF" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 13. 机器人 =====
const robot: Character = {
  id: "robot", name: "机器人",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <line x1="50" y1="4" x2="50" y2="14" stroke="#888" stroke-width="2"/>
    <circle cx="50" cy="4" r="3" fill="#FF4444" class="${s === "thinking" ? "dot-1" : ""}"/>
    <rect x="22" y="14" width="56" height="50" rx="12" fill="#B0BEC5"/>
    <rect x="22" y="14" width="56" height="50" rx="12" fill="url(#g-shine)"/>
    <rect x="30" y="24" width="16" height="14" rx="4" fill="#263238"/>
    <rect x="54" y="24" width="16" height="14" rx="4" fill="#263238"/>
    ${s === "click" ? `
      <path d="M32,30 Q38,26 44,30" stroke="#4FC3F7" stroke-width="2.5" fill="none"/>
      <path d="M56,30 Q62,26 68,30" stroke="#4FC3F7" stroke-width="2.5" fill="none"/>` :
      s === "hover" ? `
      <line x1="33" y1="30" x2="37" y2="32" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="37" y1="32" x2="43" y2="30" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="57" y1="30" x2="61" y2="32" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="61" y1="32" x2="67" y2="30" stroke="#4FC3F7" stroke-width="2"/>` : `
      <circle cx="38" cy="30" r="4" fill="#4FC3F7" class="${s === "talking" ? "eye-sparkle" : ""}"/>
      <circle cx="62" cy="30" r="4" fill="#4FC3F7" class="${s === "talking" ? "eye-sparkle" : ""}"/>
      <circle cx="36" cy="28" r="1.5" fill="white"/><circle cx="60" cy="28" r="1.5" fill="white"/>`}
    ${s === "talking" ? `<rect x="40" y="46" width="20" height="10" rx="3" fill="#263238"/>
      <rect x="42" y="48" width="4" height="6" rx="1" fill="#4FC3F7"/><rect x="48" y="48" width="4" height="6" rx="1" fill="#4FC3F7"/><rect x="54" y="48" width="4" height="6" rx="1" fill="#4FC3F7"/>` :
      `<path d="M40,50 L60,50" stroke="#546E7A" stroke-width="2" stroke-linecap="round"/>`}
    </g>
    <g filter="url(#f-shadow)">
    <rect x="28" y="66" width="44" height="38" rx="8" fill="#78909C"/>
    <rect x="34" y="72" width="32" height="12" rx="4" fill="#546E7A"/>
    <circle cx="42" cy="78" r="2" fill="#4FC3F7"/><circle cx="50" cy="78" r="2" fill="#FF8A65"/><circle cx="58" cy="78" r="2" fill="#81C784"/>
    <rect class="arm-l" x="12" y="68" width="14" height="26" rx="7" fill="#90A4AE"/>
    <rect class="arm-r" x="74" y="68" width="14" height="26" rx="7" fill="#90A4AE"/>
    <circle cx="19" cy="95" r="5" fill="#78909C"/><circle cx="81" cy="95" r="5" fill="#78909C"/>
    <rect x="34" y="104" width="12" height="12" rx="4" fill="#546E7A"/>
    <rect x="54" y="104" width="12" height="12" rx="4" fill="#546E7A"/>
    <ellipse cx="40" cy="117" rx="8" ry="3" fill="#455A64"/>
    <ellipse cx="60" cy="117" rx="8" ry="3" fill="#455A64"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 14. 幽灵 =====
const ghost: Character = {
  id: "ghost", name: "幽灵",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <path d="M20,50 Q20,10 50,10 Q80,10 80,50 L80,100 Q74,90 68,100 Q62,90 56,100 Q50,90 44,100 Q38,90 32,100 Q26,90 20,100Z" fill="white" opacity="0.9"/>
    <path d="M20,50 Q20,10 50,10 Q80,10 80,50 L80,100 Q74,90 68,100 Q62,90 56,100 Q50,90 44,100 Q38,90 32,100 Q26,90 20,100Z" fill="url(#g-shine)"/>
    ${eyes(s, "#444", 38, 62, 40, 8)}
    ${blush(s, 24, 76, 50)}
    ${mouth(s, 50, 55)}
    <rect class="arm-l" x="10" y="52" width="12" height="20" rx="6" fill="white" opacity="0.85"/>
    <rect class="arm-r" x="78" y="52" width="12" height="20" rx="6" fill="white" opacity="0.85"/>
    </g>
  </svg>`,
  css: ""
};


// ===== 15. 小鸡 =====
const chick: Character = {
  id: "chick", name: "小鸡",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <path d="M44,10 Q46,2 50,6 Q54,2 56,10" fill="#FFD700" stroke="#F4A460" stroke-width="0.5"/>
    <ellipse cx="50" cy="40" rx="28" ry="28" fill="#FFE44D"/>
    <ellipse cx="50" cy="40" rx="28" ry="28" fill="url(#g-shine)"/>
    ${eyes(s, "#333", 38, 62, 36, 5)}
    ${blush(s, 26, 74, 44)}
    <polygon points="46,46 50,52 54,46" fill="#F4A460"/>
    ${s === "talking" ? `<polygon points="44,46 50,56 56,46" fill="#F4A460"/>` : ""}
    </g>
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="84" rx="22" ry="24" fill="#FFE44D"/>
    <ellipse cx="50" cy="86" rx="14" ry="16" fill="#FFF5B0"/>
    <rect class="arm-l" x="16" y="72" width="14" height="18" rx="7" fill="#FFE44D"/>
    <rect class="arm-r" x="70" y="72" width="14" height="18" rx="7" fill="#FFE44D"/>
    <ellipse cx="38" cy="110" rx="8" ry="4" fill="#F4A460"/>
    <ellipse cx="62" cy="110" rx="8" ry="4" fill="#F4A460"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 16. 史莱姆 =====
const slime: Character = {
  id: "slime", name: "史莱姆",
  svg: (s) => `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${DEFS}
    <defs><radialGradient id="g-slime" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#7FE8FF"/>
      <stop offset="100%" stop-color="#3DB8D6"/>
    </radialGradient></defs>
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <path d="M15,80 Q10,30 50,14 Q90,30 85,80 Q80,100 50,102 Q20,100 15,80Z" fill="url(#g-slime)"/>
    <path d="M15,80 Q10,30 50,14 Q90,30 85,80 Q80,100 50,102 Q20,100 15,80Z" fill="url(#g-shine)"/>
    <ellipse cx="42" cy="50" rx="8" ry="10" fill="white" opacity="0.3"/>
    ${eyes(s, "#1a6080", 38, 62, 52, 7)}
    ${blush(s, 24, 76, 62)}
    ${mouth(s, 50, 68)}
    </g>
  </svg>`,
  css: ""
};

// ===== 17. 恶魔 =====
const demon: Character = {
  id: "demon", name: "小恶魔",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <polygon points="22,26 16,4 32,20" fill="#E74C3C"/>
    <polygon points="78,26 84,4 68,20" fill="#E74C3C"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#2C2137"/>
    <ellipse cx="50" cy="42" rx="22" ry="20" fill="#3D2C4E"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${s === "click" ? `
      <path d="M31,40 Q38,34 45,40" stroke="#FF4444" stroke-width="2.5" fill="none"/>
      <path d="M55,40 Q62,34 69,40" stroke="#FF4444" stroke-width="2.5" fill="none"/>` :
      s === "hover" ? `
      <line x1="33" y1="38" x2="38" y2="42" stroke="#FF4444" stroke-width="2"/>
      <line x1="38" y1="42" x2="43" y2="38" stroke="#FF4444" stroke-width="2"/>
      <line x1="57" y1="38" x2="62" y2="42" stroke="#FF4444" stroke-width="2"/>
      <line x1="62" y1="42" x2="67" y2="38" stroke="#FF4444" stroke-width="2"/>` : `
      <ellipse cx="38" cy="40" rx="7" ry="8" fill="#1a1020"/>
      <circle cx="${s==="thinking"?40:38}" cy="40" r="3.5" fill="#FF4444"/>
      <circle cx="${s==="thinking"?39:37}" cy="38" r="1.2" fill="#FF8888"/>
      <ellipse cx="62" cy="40" rx="7" ry="8" fill="#1a1020"/>
      <circle cx="${s==="thinking"?64:62}" cy="40" r="3.5" fill="#FF4444"/>
      <circle cx="${s==="thinking"?63:61}" cy="38" r="1.2" fill="#FF8888"/>`}
    ${blush(s, 26, 74, 50)}
    ${s === "talking" ? `<path d="M42,54 L46,50 L50,54 L54,50 L58,54" fill="#E74C3C"/>` :
      s === "click" ? `<path d="M40,52 Q50,62 60,52" fill="#E74C3C"/>
        <path d="M44,52 L46,50 L48,52" fill="white" opacity="0.8"/>
        <path d="M52,52 L54,50 L56,52" fill="white" opacity="0.8"/>` :
      `<path d="M44,54 Q50,58 56,54" stroke="#E74C3C" stroke-width="1.5" fill="none"/>`}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M30,64 L26,100 Q50,108 74,100 L70,64 Q50,70 30,64Z" fill="#2C2137"/>
    <rect class="arm-l" x="14" y="68" width="14" height="24" rx="7" fill="#2C2137"/>
    <rect class="arm-r" x="72" y="68" width="14" height="24" rx="7" fill="#2C2137"/>
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#2C2137"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#2C2137"/>
    <path class="tail" d="M72,94 Q88,86 84,72 Q82,66 86,60" stroke="#2C2137" stroke-width="4" fill="none" stroke-linecap="round"/>
    <polygon points="84,58 88,52 90,60" fill="#E74C3C"/>
    <path d="M16,60 Q6,50 12,42 Q8,38 14,36" stroke="#2C2137" stroke-width="2" fill="none"/>
    <path d="M84,60 Q94,50 88,42 Q92,38 86,36" stroke="#2C2137" stroke-width="2" fill="none"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 18. 天使 =====
const angel: Character = {
  id: "angel", name: "天使",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="8" rx="10" ry="3" fill="none" stroke="#FFD700" stroke-width="2" class="wand-glow"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFF5E8"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g-shine)"/>
    <path d="M24,28 Q34,12 50,8 Q66,12 76,28 Q66,22 50,18 Q34,22 24,28Z" fill="#FFF0B0"/>
    <path d="M76,30 Q82,38 80,48" stroke="#FFF0B0" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M24,30 Q18,38 20,48" stroke="#FFF0B0" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${eyes(s, "#6B5B3A", 38, 62, 42)}
    ${blush(s, 26, 74, 50)}
    ${mouth(s, 50, 54)}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M32,64 L28,100 Q50,108 72,100 L68,64 Q50,70 32,64Z" fill="white"/>
    <path d="M10,68 Q-4,56 8,48 Q14,44 18,52 Q22,58 18,66Z" fill="white" opacity="0.85"/>
    <path d="M90,68 Q104,56 92,48 Q86,44 82,52 Q78,58 82,66Z" fill="white" opacity="0.85"/>
    <path d="M10,68 Q-2,58 8,50" stroke="#eee" stroke-width="0.8" fill="none"/>
    <path d="M90,68 Q102,58 92,50" stroke="#eee" stroke-width="0.8" fill="none"/>
    <rect class="arm-l" x="16" y="68" width="12" height="24" rx="6" fill="#FFF5E8"/>
    <rect class="arm-r" x="72" y="68" width="12" height="24" rx="6" fill="#FFF5E8"/>
    <rect x="36" y="100" width="10" height="14" rx="5" fill="#FFF5E8"/>
    <rect x="54" y="100" width="10" height="14" rx="5" fill="#FFF5E8"/>
    <ellipse cx="41" cy="115" rx="6" ry="3" fill="white"/>
    <ellipse cx="59" cy="115" rx="6" ry="3" fill="white"/>
    </g>
  </svg>`,
  css: ""
};


// ===== 19. 忍者 =====
const ninja: Character = {
  id: "ninja", name: "忍者",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFE8D0"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g-shine)"/>
    <rect x="22" y="22" width="56" height="16" rx="4" fill="#2C3E50"/>
    <path d="M78,26 Q90,22 96,28" stroke="#2C3E50" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M78,30 Q88,28 94,32" stroke="#34495E" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="22" y="46" width="56" height="14" rx="4" fill="#2C3E50"/>
    ${eyes(s, "#1a1a2e", 38, 62, 34, 6)}
    ${s === "talking" ? `<path d="M42,52 Q50,58 58,52" stroke="#FFE8D0" stroke-width="1.5" fill="none"/>` : ""}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M30,60 L26,100 Q50,108 74,100 L70,60 Q50,66 30,60Z" fill="#2C3E50"/>
    <path d="M44,64 L50,70 L56,64" stroke="#C0392B" stroke-width="2" fill="none"/>
    <rect class="arm-l" x="14" y="64" width="14" height="26" rx="7" fill="#2C3E50"/>
    <rect class="arm-r" x="72" y="64" width="14" height="26" rx="7" fill="#2C3E50"/>
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#34495E"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#34495E"/>
    ${s === "idle" ? `<line x1="80" y1="72" x2="92" y2="62" stroke="#888" stroke-width="1.5"/>
      <polygon points="90,60 96,58 92,64" fill="#aaa"/>` : ""}
    </g>
  </svg>`,
  css: ""
};

// ===== 20. 美人鱼 =====
const mermaid: Character = {
  id: "mermaid", name: "美人鱼",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFF0E0"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g-shine)"/>
    <ellipse cx="50" cy="28" rx="29" ry="22" fill="#1ABC9C"/>
    <path d="M22,30 Q34,12 50,8 Q66,12 78,30 Q66,22 50,18 Q34,22 22,30Z" fill="#16A085"/>
    <path d="M22,30 Q14,44 18,58" stroke="#1ABC9C" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M78,30 Q86,44 82,58" stroke="#1ABC9C" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${eyes(s, "#0e6655", 38, 62, 42)}
    ${blush(s, 26, 74, 50)}
    ${mouth(s, 50, 54)}
    <circle cx="36" cy="22" r="2" fill="#FFD700" opacity="0.7"/>
    </g>
    <g filter="url(#f-shadow)">
    <path d="M32,64 L30,86 Q50,90 70,86 L68,64 Q50,70 32,64Z" fill="#FFF0E0"/>
    <path d="M30,84 Q32,100 40,108 Q50,114 60,108 Q68,100 70,84 Q50,90 30,84Z" fill="#1ABC9C"/>
    <path d="M36,108 Q30,116 22,112 Q28,118 36,114Z" fill="#16A085"/>
    <path d="M64,108 Q70,116 78,112 Q72,118 64,114Z" fill="#16A085"/>
    <rect class="arm-l" x="16" y="68" width="14" height="22" rx="7" fill="#FFF0E0"/>
    <rect class="arm-r" x="70" y="68" width="14" height="22" rx="7" fill="#FFF0E0"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 21. 南瓜头 =====
const pumpkin: Character = {
  id: "pumpkin", name: "南瓜头",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <rect x="46" y="6" width="8" height="10" rx="2" fill="#5D8233"/>
    <path d="M48,10 Q40,4 36,10" stroke="#5D8233" stroke-width="2" fill="none"/>
    <ellipse cx="50" cy="42" rx="32" ry="28" fill="#E67E22"/>
    <ellipse cx="50" cy="42" rx="32" ry="28" fill="url(#g-shine)"/>
    <path d="M50,16 L50,68" stroke="#D35400" stroke-width="1" opacity="0.3"/>
    <path d="M30,18 Q30,42 30,68" stroke="#D35400" stroke-width="1" opacity="0.2"/>
    <path d="M70,18 Q70,42 70,68" stroke="#D35400" stroke-width="1" opacity="0.2"/>
    ${s === "click" ? `
      <path d="M30,36 L38,40 L30,44" fill="#FFD700"/>
      <path d="M70,36 L62,40 L70,44" fill="#FFD700"/>` :
      s === "hover" ? `
      <path d="M32,38 L38,42 L32,42Z" fill="#FFD700"/>
      <path d="M68,38 L62,42 L68,42Z" fill="#FFD700"/>` : `
      <polygon points="32,34 40,42 32,42" fill="#FFD700"/>
      <polygon points="68,34 60,42 68,42" fill="#FFD700"/>`}
    ${s === "talking" ? `<path d="M38,52 L42,48 L46,52 L50,48 L54,52 L58,48 L62,52 L62,56 L38,56Z" fill="#FFD700"/>` :
      s === "click" ? `<path d="M38,50 Q50,60 62,50" fill="#FFD700"/>` :
      `<path d="M38,52 L44,48 L50,52 L56,48 L62,52" stroke="#FFD700" stroke-width="2" fill="none"/>`}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M34,68 L30,100 Q50,106 70,100 L66,68 Q50,74 34,68Z" fill="#8B4513"/>
    <rect class="arm-l" x="16" y="70" width="14" height="22" rx="7" fill="#8B4513"/>
    <rect class="arm-r" x="70" y="70" width="14" height="22" rx="7" fill="#8B4513"/>
    <rect x="36" y="98" width="10" height="14" rx="5" fill="#6B3410"/>
    <rect x="54" y="98" width="10" height="14" rx="5" fill="#6B3410"/>
    <ellipse cx="41" cy="113" rx="6" ry="3" fill="#5D2D0C"/>
    <ellipse cx="59" cy="113" rx="6" ry="3" fill="#5D2D0C"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 22. 雪人 =====
const snowman: Character = {
  id: "snowman", name: "雪人",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <circle cx="50" cy="38" r="28" fill="white" stroke="#E8E8E8" stroke-width="0.5"/>
    <circle cx="50" cy="38" r="28" fill="url(#g-shine)"/>
    <rect x="30" y="8" width="40" height="14" rx="4" fill="#2C3E50"/>
    <rect x="26" y="18" width="48" height="6" rx="2" fill="#2C3E50"/>
    <path d="M56,14 Q60,6 64,14" stroke="#E74C3C" stroke-width="2" fill="none"/>
    ${eyes(s, "#1a1a1a", 38, 62, 36, 4)}
    <polygon points="48,44 52,44 50,52" fill="#E67E22"/>
    ${mouth(s, 50, 56)}
    </g>
    <g filter="url(#f-shadow)">
    <circle cx="50" cy="88" r="26" fill="white" stroke="#E8E8E8" stroke-width="0.5"/>
    <circle cx="50" cy="88" r="26" fill="url(#g-shine)"/>
    <path d="M36,68 Q50,74 64,68" stroke="#E74C3C" stroke-width="3" fill="none"/>
    <circle cx="50" cy="80" r="2" fill="#333"/>
    <circle cx="50" cy="90" r="2" fill="#333"/>
    <circle cx="50" cy="100" r="2" fill="#333"/>
    <rect class="arm-l" x="8" y="76" width="18" height="4" rx="2" fill="#8B6914"/>
    <rect class="arm-r" x="74" y="76" width="18" height="4" rx="2" fill="#8B6914"/>
    <line x1="12" y1="72" x2="16" y2="76" stroke="#8B6914" stroke-width="3" stroke-linecap="round"/>
    <line x1="88" y1="72" x2="84" y2="76" stroke="#8B6914" stroke-width="3" stroke-linecap="round"/>
    </g>
  </svg>`,
  css: ""
};


// ===== 23. 小羊 =====
const sheep: Character = {
  id: "sheep", name: "小羊",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <circle cx="26" cy="26" r="8" fill="#F5F0E8"/>
    <circle cx="74" cy="26" r="8" fill="#F5F0E8"/>
    <path d="M20,28 Q16,34 22,38" stroke="#F5F0E8" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M80,28 Q84,34 78,38" stroke="#F5F0E8" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="30" cy="20" r="10" fill="#F5F0E8"/>
    <circle cx="42" cy="16" r="10" fill="#F5F0E8"/>
    <circle cx="58" cy="16" r="10" fill="#F5F0E8"/>
    <circle cx="70" cy="20" r="10" fill="#F5F0E8"/>
    <circle cx="50" cy="14" r="9" fill="#F5F0E8"/>
    <ellipse cx="50" cy="42" rx="26" ry="24" fill="#FFF5E8"/>
    <ellipse cx="50" cy="42" rx="26" ry="24" fill="url(#g-shine)"/>
    ${eyes(s, "#5a4030", 38, 62, 40, 5)}
    ${blush(s, 26, 74, 48)}
    ${mouth(s, 50, 52)}
    </g>
    <g filter="url(#f-shadow)">
    <circle cx="32" cy="72" r="10" fill="#F5F0E8"/>
    <circle cx="50" cy="68" r="10" fill="#F5F0E8"/>
    <circle cx="68" cy="72" r="10" fill="#F5F0E8"/>
    <circle cx="40" cy="82" r="10" fill="#F5F0E8"/>
    <circle cx="60" cy="82" r="10" fill="#F5F0E8"/>
    <circle cx="50" cy="90" r="10" fill="#F5F0E8"/>
    <rect class="arm-l" x="14" y="70" width="12" height="22" rx="6" fill="#FFF5E8"/>
    <rect class="arm-r" x="74" y="70" width="12" height="22" rx="6" fill="#FFF5E8"/>
    <rect x="36" y="98" width="10" height="14" rx="4" fill="#FFF5E8"/>
    <rect x="54" y="98" width="10" height="14" rx="4" fill="#FFF5E8"/>
    <ellipse cx="41" cy="113" rx="6" ry="3" fill="#D4C4A8"/>
    <ellipse cx="59" cy="113" rx="6" ry="3" fill="#D4C4A8"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 24. 仙人掌 =====
const cactus: Character = {
  id: "cactus", name: "仙人掌",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <rect x="34" y="10" width="32" height="80" rx="16" fill="#5DAE5D"/>
    <rect x="34" y="10" width="32" height="80" rx="16" fill="url(#g-shine)"/>
    <rect class="arm-l" x="10" y="36" width="26" height="16" rx="8" fill="#5DAE5D"/>
    <rect x="10" y="28" width="16" height="26" rx="8" fill="#5DAE5D"/>
    <rect class="arm-r" x="64" y="44" width="26" height="16" rx="8" fill="#5DAE5D"/>
    <rect x="74" y="36" width="16" height="26" rx="8" fill="#5DAE5D"/>
    ${eyes(s, "#2d5a2d", 44, 56, 36, 4)}
    ${blush(s, 38, 62, 44)}
    ${mouth(s, 50, 48)}
    <circle cx="40" cy="20" r="3" fill="#FF69B4"/>
    <circle cx="40" cy="20" r="1.5" fill="#FFB7C5"/>
    </g>
    <g filter="url(#f-shadow)">
    <rect x="38" y="90" width="24" height="12" rx="4" fill="#8B6914"/>
    <rect x="34" y="100" width="32" height="10" rx="4" fill="#A0724A"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 25. 蘑菇 =====
const mushroom: Character = {
  id: "mushroom", name: "蘑菇",
  svg: (s) => `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="38" rx="40" ry="30" fill="#E74C3C"/>
    <ellipse cx="50" cy="38" rx="40" ry="30" fill="url(#g-shine)"/>
    <circle cx="34" cy="28" r="8" fill="white" opacity="0.7"/>
    <circle cx="60" cy="22" r="6" fill="white" opacity="0.7"/>
    <circle cx="72" cy="36" r="5" fill="white" opacity="0.7"/>
    <ellipse cx="50" cy="56" rx="22" ry="14" fill="#FFF5E8"/>
    ${eyes(s, "#5a2020", 42, 58, 52, 5)}
    ${blush(s, 34, 66, 58)}
    ${mouth(s, 50, 62)}
    </g>
    <g filter="url(#f-shadow)">
    <rect x="38" y="66" width="24" height="30" rx="8" fill="#FFF5E8"/>
    <rect class="arm-l" x="22" y="68" width="18" height="10" rx="5" fill="#FFF5E8"/>
    <rect class="arm-r" x="60" y="68" width="18" height="10" rx="5" fill="#FFF5E8"/>
    <ellipse cx="42" cy="98" rx="8" ry="4" fill="#D4B896"/>
    <ellipse cx="58" cy="98" rx="8" ry="4" fill="#D4B896"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 26. 星星 =====
const star: Character = {
  id: "star", name: "星星",
  svg: (s) => `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <polygon points="50,4 60,36 94,36 66,56 76,88 50,68 24,88 34,56 6,36 40,36" fill="#FFD700"/>
    <polygon points="50,4 60,36 94,36 66,56 76,88 50,68 24,88 34,56 6,36 40,36" fill="url(#g-shine)"/>
    <polygon points="50,14 56,34 74,34 60,46 64,66 50,54 36,66 40,46 26,34 44,34" fill="#FFE44D" opacity="0.5"/>
    ${eyes(s, "#B8860B", 42, 58, 42, 5)}
    ${blush(s, 34, 66, 50)}
    ${mouth(s, 50, 52)}
    </g>
  </svg>`,
  css: ""
};


// ===== 27. 章鱼 =====
const octopus: Character = {
  id: "octopus", name: "章鱼",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="40" rx="32" ry="30" fill="#E88FCF"/>
    <ellipse cx="50" cy="40" rx="32" ry="30" fill="url(#g-shine)"/>
    ${eyes(s, "#8B2268", 38, 62, 38, 7)}
    ${blush(s, 24, 76, 48)}
    ${mouth(s, 50, 52)}
    </g>
    <g filter="url(#f-shadow)">
    <path class="arm-l" d="M18,66 Q8,80 14,96 Q16,100 20,96 Q16,84 22,72Z" fill="#E88FCF"/>
    <path d="M26,68 Q18,84 24,100 Q26,104 30,100 Q24,88 30,74Z" fill="#E88FCF"/>
    <path d="M34,70 Q30,86 34,102 Q36,106 40,102 Q34,90 38,76Z" fill="#E88FCF"/>
    <path d="M50,72 Q50,90 48,104 Q50,108 52,104 Q52,90 50,76Z" fill="#E88FCF"/>
    <path d="M66,70 Q70,86 66,102 Q64,106 60,102 Q66,90 62,76Z" fill="#E88FCF"/>
    <path d="M74,68 Q82,84 76,100 Q74,104 70,100 Q76,88 70,74Z" fill="#E88FCF"/>
    <path class="arm-r" d="M82,66 Q92,80 86,96 Q84,100 80,96 Q84,84 78,72Z" fill="#E88FCF"/>
    <circle cx="18" cy="96" r="3" fill="#D470B0"/>
    <circle cx="86" cy="96" r="3" fill="#D470B0"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 28. 小鲸鱼 =====
const whale: Character = {
  id: "whale", name: "小鲸鱼",
  svg: (s) => `<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    ${s === "idle" || s === "click" ? `<path d="M48,8 Q46,2 50,4 Q54,2 52,8" stroke="#7EC8E3" stroke-width="2" fill="none" class="sparkle-1"/>` : ""}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="52" rx="38" ry="32" fill="#5DADE2"/>
    <ellipse cx="50" cy="52" rx="38" ry="32" fill="url(#g-shine)"/>
    <ellipse cx="50" cy="58" rx="28" ry="20" fill="#AED6F1"/>
    <path d="M84,40 Q96,28 92,44 Q96,52 86,50" fill="#5DADE2"/>
    ${eyes(s, "#1a4a6b", 38, 60, 46, 6)}
    ${blush(s, 26, 72, 56)}
    ${mouth(s, 50, 60)}
    <rect class="arm-l" x="8" y="48" width="12" height="16" rx="6" fill="#5DADE2"/>
    <rect class="arm-r" x="80" y="48" width="12" height="16" rx="6" fill="#5DADE2"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 29. 小蝙蝠 =====
const bat: Character = {
  id: "bat", name: "小蝙蝠",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <polygon class="ear-l" points="26,28 18,6 38,22" fill="#4A3560"/>
    <polygon class="ear-r" points="74,28 82,6 62,22" fill="#4A3560"/>
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="#4A3560"/>
    <ellipse cx="50" cy="42" rx="20" ry="18" fill="#6B4D8A"/>
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="url(#g-shine)"/>
    ${eyes(s, "#E8D0FF", 38, 62, 38, 6)}
    ${blush(s, 26, 74, 48)}
    ${s === "talking" ? `<path d="M44,52 L47,49 L50,52 L53,49 L56,52" fill="#E74C3C"/>` :
      s === "click" ? `<path d="M42,50 Q50,58 58,50" fill="#E74C3C"/>` :
      `<path d="M46,52 Q50,55 54,52" stroke="#E74C3C" stroke-width="1.5" fill="none"/>`}
    </g>
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="80" rx="18" ry="20" fill="#4A3560"/>
    <ellipse cx="50" cy="82" rx="12" ry="14" fill="#6B4D8A"/>
    <path class="arm-l" d="M32,62 Q4,50 8,72 Q10,78 16,74 Q12,66 20,60 L26,66Z" fill="#4A3560"/>
    <path d="M8,72 L12,66 M12,66 L16,72 M16,72 L20,66" stroke="#3A2550" stroke-width="1" fill="none"/>
    <path class="arm-r" d="M68,62 Q96,50 92,72 Q90,78 84,74 Q88,66 80,60 L74,66Z" fill="#4A3560"/>
    <path d="M92,72 L88,66 M88,66 L84,72 M84,72 L80,66" stroke="#3A2550" stroke-width="1" fill="none"/>
    <ellipse cx="42" cy="102" rx="6" ry="4" fill="#4A3560"/>
    <ellipse cx="58" cy="102" rx="6" ry="4" fill="#4A3560"/>
    </g>
  </svg>`,
  css: ""
};

// ===== 30. 太空人 =====
const astronaut: Character = {
  id: "astronaut", name: "太空人",
  svg: (s) => `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${DEFS}
    ${sparkles(s)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="38" rx="30" ry="28" fill="white" stroke="#ccc" stroke-width="1"/>
    <ellipse cx="50" cy="38" rx="30" ry="28" fill="url(#g-shine)"/>
    <rect x="24" y="22" width="52" height="34" rx="16" fill="#263238" opacity="0.15"/>
    <ellipse cx="50" cy="38" rx="22" ry="20" fill="#1a2a3a" opacity="0.8"/>
    <ellipse cx="50" cy="38" rx="22" ry="20" fill="url(#g-shine)"/>
    ${s === "click" ? `
      <path d="M38,36 Q42,32 46,36" stroke="#4FC3F7" stroke-width="2" fill="none"/>
      <path d="M54,36 Q58,32 62,36" stroke="#4FC3F7" stroke-width="2" fill="none"/>` :
      s === "hover" ? `
      <line x1="38" y1="35" x2="41" y2="37" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="41" y1="37" x2="44" y2="35" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="56" y1="35" x2="59" y2="37" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="59" y1="37" x2="62" y2="35" stroke="#4FC3F7" stroke-width="2"/>` : `
      <circle cx="42" cy="36" r="${s==="thinking"?3:3.5}" fill="#4FC3F7"/>
      <circle cx="40" cy="34" r="1.2" fill="white"/>
      <circle cx="58" cy="36" r="${s==="thinking"?3:3.5}" fill="#4FC3F7"/>
      <circle cx="56" cy="34" r="1.2" fill="white"/>`}
    ${s === "talking" ? `<ellipse cx="50" cy="44" rx="3" ry="3.5" fill="#4FC3F7"/>` :
      `<path d="M46,44 Q50,47 54,44" stroke="#4FC3F7" stroke-width="1.5" fill="none"/>`}
    <circle cx="62" cy="30" r="4" fill="white" opacity="0.15"/>
    </g>
    <g filter="url(#f-shadow)">
    <path d="M30,64 L26,100 Q50,108 74,100 L70,64 Q50,70 30,64Z" fill="white" stroke="#ccc" stroke-width="0.8"/>
    <circle cx="50" cy="76" r="4" fill="#E74C3C"/>
    <circle cx="50" cy="86" r="3" fill="#3498DB"/>
    <rect class="arm-l" x="12" y="66" width="16" height="26" rx="8" fill="white" stroke="#ccc" stroke-width="0.8"/>
    <rect class="arm-r" x="72" y="66" width="16" height="26" rx="8" fill="white" stroke="#ccc" stroke-width="0.8"/>
    <rect x="34" y="100" width="12" height="14" rx="5" fill="white" stroke="#ccc" stroke-width="0.8"/>
    <rect x="54" y="100" width="12" height="14" rx="5" fill="white" stroke="#ccc" stroke-width="0.8"/>
    <ellipse cx="40" cy="115" rx="8" ry="3.5" fill="#90A4AE"/>
    <ellipse cx="60" cy="115" rx="8" ry="3.5" fill="#90A4AE"/>
    </g>
  </svg>`,
  css: ""
};

export const characters: Character[] = [
  sakura, xiaolan, neko, bunny, bear, elf,
  fox, penguin, dragon, shiba, panda, unicorn, robot, ghost,
  chick, slime, demon, angel, ninja, mermaid, pumpkin, snowman,
  sheep, cactus, mushroom, star, octopus, whale, bat, astronaut
];

export function getCharacter(id: string): Character {
  return characters.find(c => c.id === id) || sakura;
}
