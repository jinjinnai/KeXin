(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(r){if(r.ep)return;r.ep=!0;const c=i(r);fetch(r.href,c)}})();function wl(l,e,i,s){if(typeof e=="function"?l!==e||!s:!e.has(l))throw new TypeError("Cannot read private member from an object whose class did not declare it");return i==="m"?s:i==="a"?s.call(l):s?s.value:e.get(l)}function gl(l,e,i,s,r){if(typeof e=="function"?l!==e||!0:!e.has(l))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(l,i),i}var Z;const F="__TAURI_TO_IPC_KEY__";function ul(l,e=!1){return window.__TAURI_INTERNALS__.transformCallback(l,e)}async function t(l,e={},i){return window.__TAURI_INTERNALS__.invoke(l,e,i)}class Fl{get rid(){return wl(this,Z,"f")}constructor(e){Z.set(this,void 0),gl(this,Z,e)}async close(){return t("plugin:resources|close",{rid:this.rid})}}Z=new WeakMap;class cl{constructor(...e){this.type="Logical",e.length===1?"Logical"in e[0]?(this.width=e[0].Logical.width,this.height=e[0].Logical.height):(this.width=e[0].width,this.height=e[0].height):(this.width=e[0],this.height=e[1])}toPhysical(e){return new B(this.width*e,this.height*e)}[F](){return{width:this.width,height:this.height}}toJSON(){return this[F]()}}class B{constructor(...e){this.type="Physical",e.length===1?"Physical"in e[0]?(this.width=e[0].Physical.width,this.height=e[0].Physical.height):(this.width=e[0].width,this.height=e[0].height):(this.width=e[0],this.height=e[1])}toLogical(e){return new cl(this.width/e,this.height/e)}[F](){return{width:this.width,height:this.height}}toJSON(){return this[F]()}}class E{constructor(e){this.size=e}toLogical(e){return this.size instanceof cl?this.size:this.size.toLogical(e)}toPhysical(e){return this.size instanceof B?this.size:this.size.toPhysical(e)}[F](){return{[`${this.size.type}`]:{width:this.size.width,height:this.size.height}}}toJSON(){return this[F]()}}class al{constructor(...e){this.type="Logical",e.length===1?"Logical"in e[0]?(this.x=e[0].Logical.x,this.y=e[0].Logical.y):(this.x=e[0].x,this.y=e[0].y):(this.x=e[0],this.y=e[1])}toPhysical(e){return new m(this.x*e,this.y*e)}[F](){return{x:this.x,y:this.y}}toJSON(){return this[F]()}}class m{constructor(...e){this.type="Physical",e.length===1?"Physical"in e[0]?(this.x=e[0].Physical.x,this.y=e[0].Physical.y):(this.x=e[0].x,this.y=e[0].y):(this.x=e[0],this.y=e[1])}toLogical(e){return new al(this.x/e,this.y/e)}[F](){return{x:this.x,y:this.y}}toJSON(){return this[F]()}}class M{constructor(e){this.position=e}toLogical(e){return this.position instanceof al?this.position:this.position.toLogical(e)}toPhysical(e){return this.position instanceof m?this.position:this.position.toPhysical(e)}[F](){return{[`${this.position.type}`]:{x:this.position.x,y:this.position.y}}}toJSON(){return this[F]()}}var w;(function(l){l.WINDOW_RESIZED="tauri://resize",l.WINDOW_MOVED="tauri://move",l.WINDOW_CLOSE_REQUESTED="tauri://close-requested",l.WINDOW_DESTROYED="tauri://destroyed",l.WINDOW_FOCUS="tauri://focus",l.WINDOW_BLUR="tauri://blur",l.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",l.WINDOW_THEME_CHANGED="tauri://theme-changed",l.WINDOW_CREATED="tauri://window-created",l.WEBVIEW_CREATED="tauri://webview-created",l.DRAG_ENTER="tauri://drag-enter",l.DRAG_OVER="tauri://drag-over",l.DRAG_DROP="tauri://drag-drop",l.DRAG_LEAVE="tauri://drag-leave"})(w||(w={}));async function nl(l,e){window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(l,e),await t("plugin:event|unlisten",{event:l,eventId:e})}async function ol(l,e,i){var s;const r=typeof(i==null?void 0:i.target)=="string"?{kind:"AnyLabel",label:i.target}:(s=i==null?void 0:i.target)!==null&&s!==void 0?s:{kind:"Any"};return t("plugin:event|listen",{event:l,target:r,handler:ul(e)}).then(c=>async()=>nl(l,c))}async function kl(l,e,i){return ol(l,s=>{nl(l,s.id),e(s)},i)}async function $l(l,e){await t("plugin:event|emit",{event:l,payload:e})}async function ml(l,e,i){await t("plugin:event|emit_to",{target:typeof l=="string"?{kind:"AnyLabel",label:l}:l,event:e,payload:i})}class C extends Fl{constructor(e){super(e)}static async new(e,i,s){return t("plugin:image|new",{rgba:z(e),width:i,height:s}).then(r=>new C(r))}static async fromBytes(e){return t("plugin:image|from_bytes",{bytes:z(e)}).then(i=>new C(i))}static async fromPath(e){return t("plugin:image|from_path",{path:e}).then(i=>new C(i))}async rgba(){return t("plugin:image|rgba",{rid:this.rid}).then(e=>new Uint8Array(e))}async size(){return t("plugin:image|size",{rid:this.rid})}}function z(l){return l==null?null:typeof l=="string"?l:l instanceof C?l.rid:l}var T;(function(l){l[l.Critical=1]="Critical",l[l.Informational=2]="Informational"})(T||(T={}));class vl{constructor(e){this._preventDefault=!1,this.event=e.event,this.id=e.id}preventDefault(){this._preventDefault=!0}isPreventDefault(){return this._preventDefault}}var j;(function(l){l.None="none",l.Normal="normal",l.Indeterminate="indeterminate",l.Paused="paused",l.Error="error"})(j||(j={}));function hl(){return new dl(window.__TAURI_INTERNALS__.metadata.currentWindow.label,{skip:!0})}async function S(){return t("plugin:window|get_all_windows").then(l=>l.map(e=>new dl(e,{skip:!0})))}const O=["tauri://created","tauri://error"];class dl{constructor(e,i={}){var s;this.label=e,this.listeners=Object.create(null),i!=null&&i.skip||t("plugin:window|create",{options:{...i,parent:typeof i.parent=="string"?i.parent:(s=i.parent)===null||s===void 0?void 0:s.label,label:e}}).then(async()=>this.emit("tauri://created")).catch(async r=>this.emit("tauri://error",r))}static async getByLabel(e){var i;return(i=(await S()).find(s=>s.label===e))!==null&&i!==void 0?i:null}static getCurrent(){return hl()}static async getAll(){return S()}static async getFocusedWindow(){for(const e of await S())if(await e.isFocused())return e;return null}async listen(e,i){return this._handleTauriEvent(e,i)?()=>{const s=this.listeners[e];s.splice(s.indexOf(i),1)}:ol(e,i,{target:{kind:"Window",label:this.label}})}async once(e,i){return this._handleTauriEvent(e,i)?()=>{const s=this.listeners[e];s.splice(s.indexOf(i),1)}:kl(e,i,{target:{kind:"Window",label:this.label}})}async emit(e,i){if(O.includes(e)){for(const s of this.listeners[e]||[])s({event:e,id:-1,payload:i});return}return $l(e,i)}async emitTo(e,i,s){if(O.includes(i)){for(const r of this.listeners[i]||[])r({event:i,id:-1,payload:s});return}return ml(e,i,s)}_handleTauriEvent(e,i){return O.includes(e)?(e in this.listeners?this.listeners[e].push(i):this.listeners[e]=[i],!0):!1}async scaleFactor(){return t("plugin:window|scale_factor",{label:this.label})}async innerPosition(){return t("plugin:window|inner_position",{label:this.label}).then(e=>new m(e))}async outerPosition(){return t("plugin:window|outer_position",{label:this.label}).then(e=>new m(e))}async innerSize(){return t("plugin:window|inner_size",{label:this.label}).then(e=>new B(e))}async outerSize(){return t("plugin:window|outer_size",{label:this.label}).then(e=>new B(e))}async isFullscreen(){return t("plugin:window|is_fullscreen",{label:this.label})}async isMinimized(){return t("plugin:window|is_minimized",{label:this.label})}async isMaximized(){return t("plugin:window|is_maximized",{label:this.label})}async isFocused(){return t("plugin:window|is_focused",{label:this.label})}async isDecorated(){return t("plugin:window|is_decorated",{label:this.label})}async isResizable(){return t("plugin:window|is_resizable",{label:this.label})}async isMaximizable(){return t("plugin:window|is_maximizable",{label:this.label})}async isMinimizable(){return t("plugin:window|is_minimizable",{label:this.label})}async isClosable(){return t("plugin:window|is_closable",{label:this.label})}async isVisible(){return t("plugin:window|is_visible",{label:this.label})}async title(){return t("plugin:window|title",{label:this.label})}async theme(){return t("plugin:window|theme",{label:this.label})}async isAlwaysOnTop(){return t("plugin:window|is_always_on_top",{label:this.label})}async center(){return t("plugin:window|center",{label:this.label})}async requestUserAttention(e){let i=null;return e&&(e===T.Critical?i={type:"Critical"}:i={type:"Informational"}),t("plugin:window|request_user_attention",{label:this.label,value:i})}async setResizable(e){return t("plugin:window|set_resizable",{label:this.label,value:e})}async setEnabled(e){return t("plugin:window|set_enabled",{label:this.label,value:e})}async isEnabled(){return t("plugin:window|is_enabled",{label:this.label})}async setMaximizable(e){return t("plugin:window|set_maximizable",{label:this.label,value:e})}async setMinimizable(e){return t("plugin:window|set_minimizable",{label:this.label,value:e})}async setClosable(e){return t("plugin:window|set_closable",{label:this.label,value:e})}async setTitle(e){return t("plugin:window|set_title",{label:this.label,value:e})}async maximize(){return t("plugin:window|maximize",{label:this.label})}async unmaximize(){return t("plugin:window|unmaximize",{label:this.label})}async toggleMaximize(){return t("plugin:window|toggle_maximize",{label:this.label})}async minimize(){return t("plugin:window|minimize",{label:this.label})}async unminimize(){return t("plugin:window|unminimize",{label:this.label})}async show(){return t("plugin:window|show",{label:this.label})}async hide(){return t("plugin:window|hide",{label:this.label})}async close(){return t("plugin:window|close",{label:this.label})}async destroy(){return t("plugin:window|destroy",{label:this.label})}async setDecorations(e){return t("plugin:window|set_decorations",{label:this.label,value:e})}async setShadow(e){return t("plugin:window|set_shadow",{label:this.label,value:e})}async setEffects(e){return t("plugin:window|set_effects",{label:this.label,value:e})}async clearEffects(){return t("plugin:window|set_effects",{label:this.label,value:null})}async setAlwaysOnTop(e){return t("plugin:window|set_always_on_top",{label:this.label,value:e})}async setAlwaysOnBottom(e){return t("plugin:window|set_always_on_bottom",{label:this.label,value:e})}async setContentProtected(e){return t("plugin:window|set_content_protected",{label:this.label,value:e})}async setSize(e){return t("plugin:window|set_size",{label:this.label,value:e instanceof E?e:new E(e)})}async setMinSize(e){return t("plugin:window|set_min_size",{label:this.label,value:e instanceof E?e:e?new E(e):null})}async setMaxSize(e){return t("plugin:window|set_max_size",{label:this.label,value:e instanceof E?e:e?new E(e):null})}async setSizeConstraints(e){function i(s){return s?{Logical:s}:null}return t("plugin:window|set_size_constraints",{label:this.label,value:{minWidth:i(e==null?void 0:e.minWidth),minHeight:i(e==null?void 0:e.minHeight),maxWidth:i(e==null?void 0:e.maxWidth),maxHeight:i(e==null?void 0:e.maxHeight)}})}async setPosition(e){return t("plugin:window|set_position",{label:this.label,value:e instanceof M?e:new M(e)})}async setFullscreen(e){return t("plugin:window|set_fullscreen",{label:this.label,value:e})}async setSimpleFullscreen(e){return t("plugin:window|set_simple_fullscreen",{label:this.label,value:e})}async setFocus(){return t("plugin:window|set_focus",{label:this.label})}async setFocusable(e){return t("plugin:window|set_focusable",{label:this.label,value:e})}async setIcon(e){return t("plugin:window|set_icon",{label:this.label,value:z(e)})}async setSkipTaskbar(e){return t("plugin:window|set_skip_taskbar",{label:this.label,value:e})}async setCursorGrab(e){return t("plugin:window|set_cursor_grab",{label:this.label,value:e})}async setCursorVisible(e){return t("plugin:window|set_cursor_visible",{label:this.label,value:e})}async setCursorIcon(e){return t("plugin:window|set_cursor_icon",{label:this.label,value:e})}async setBackgroundColor(e){return t("plugin:window|set_background_color",{color:e})}async setCursorPosition(e){return t("plugin:window|set_cursor_position",{label:this.label,value:e instanceof M?e:new M(e)})}async setIgnoreCursorEvents(e){return t("plugin:window|set_ignore_cursor_events",{label:this.label,value:e})}async startDragging(){return t("plugin:window|start_dragging",{label:this.label})}async startResizeDragging(e){return t("plugin:window|start_resize_dragging",{label:this.label,value:e})}async setBadgeCount(e){return t("plugin:window|set_badge_count",{label:this.label,value:e})}async setBadgeLabel(e){return t("plugin:window|set_badge_label",{label:this.label,value:e})}async setOverlayIcon(e){return t("plugin:window|set_overlay_icon",{label:this.label,value:e?z(e):void 0})}async setProgressBar(e){return t("plugin:window|set_progress_bar",{label:this.label,value:e})}async setVisibleOnAllWorkspaces(e){return t("plugin:window|set_visible_on_all_workspaces",{label:this.label,value:e})}async setTitleBarStyle(e){return t("plugin:window|set_title_bar_style",{label:this.label,value:e})}async setTheme(e){return t("plugin:window|set_theme",{label:this.label,value:e})}async onResized(e){return this.listen(w.WINDOW_RESIZED,i=>{i.payload=new B(i.payload),e(i)})}async onMoved(e){return this.listen(w.WINDOW_MOVED,i=>{i.payload=new m(i.payload),e(i)})}async onCloseRequested(e){return this.listen(w.WINDOW_CLOSE_REQUESTED,async i=>{const s=new vl(i);await e(s),s.isPreventDefault()||await this.destroy()})}async onDragDropEvent(e){const i=await this.listen(w.DRAG_ENTER,h=>{e({...h,payload:{type:"enter",paths:h.payload.paths,position:new m(h.payload.position)}})}),s=await this.listen(w.DRAG_OVER,h=>{e({...h,payload:{type:"over",position:new m(h.payload.position)}})}),r=await this.listen(w.DRAG_DROP,h=>{e({...h,payload:{type:"drop",paths:h.payload.paths,position:new m(h.payload.position)}})}),c=await this.listen(w.DRAG_LEAVE,h=>{e({...h,payload:{type:"leave"}})});return()=>{i(),r(),s(),c()}}async onFocusChanged(e){const i=await this.listen(w.WINDOW_FOCUS,r=>{e({...r,payload:!0})}),s=await this.listen(w.WINDOW_BLUR,r=>{e({...r,payload:!1})});return()=>{i(),s()}}async onScaleChanged(e){return this.listen(w.WINDOW_SCALE_FACTOR_CHANGED,e)}async onThemeChanged(e){return this.listen(w.WINDOW_THEME_CHANGED,e)}}var J;(function(l){l.Disabled="disabled",l.Throttle="throttle",l.Suspend="suspend"})(J||(J={}));var K;(function(l){l.Default="default",l.FluentOverlay="fluentOverlay"})(K||(K={}));var Y;(function(l){l.AppearanceBased="appearanceBased",l.Light="light",l.Dark="dark",l.MediumLight="mediumLight",l.UltraDark="ultraDark",l.Titlebar="titlebar",l.Selection="selection",l.Menu="menu",l.Popover="popover",l.Sidebar="sidebar",l.HeaderView="headerView",l.Sheet="sheet",l.WindowBackground="windowBackground",l.HudWindow="hudWindow",l.FullScreenUI="fullScreenUI",l.Tooltip="tooltip",l.ContentBackground="contentBackground",l.UnderWindowBackground="underWindowBackground",l.UnderPageBackground="underPageBackground",l.Mica="mica",l.Blur="blur",l.Acrylic="acrylic",l.Tabbed="tabbed",l.TabbedDark="tabbedDark",l.TabbedLight="tabbedLight"})(Y||(Y={}));var X;(function(l){l.FollowsWindowActiveState="followsWindowActiveState",l.Active="active",l.Inactive="inactive"})(X||(X={}));const o=`<defs>
  <radialGradient id="g-shine" cx="35%" cy="30%" r="65%">
    <stop offset="0%" stop-color="rgba(255,255,255,0.4)"/>
    <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
  </radialGradient>
  <filter id="f-shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-opacity="0.15"/>
  </filter>
</defs>`;function a(l){return l==="click"?`
    <text x="15" y="10" font-size="8" class="sparkle-1">✦</text>
    <text x="72" y="14" font-size="6" class="sparkle-2">♥</text>
    <text x="50" y="6" font-size="7" class="sparkle-3">✧</text>`:l==="thinking"?`
    <circle cx="68" cy="18" r="2" fill="#aaa" class="dot-1"/>
    <circle cx="74" cy="12" r="2.5" fill="#bbb" class="dot-2"/>
    <circle cx="80" cy="6" r="3" fill="#ccc" class="dot-3"/>`:""}function d(l,e,i,s,r,c=7){if(l==="click")return`
    <path d="M${i-c},${r} Q${i},${r-c} ${i+c},${r}" stroke="${e}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M${s-c},${r} Q${s},${r-c} ${s+c},${r}" stroke="${e}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;if(l==="hover")return`
    <line x1="${i-5}" y1="${r-2}" x2="${i}" y2="${r+1}" stroke="${e}" stroke-width="2" stroke-linecap="round"/>
    <line x1="${i}" y1="${r+1}" x2="${i+5}" y2="${r-2}" stroke="${e}" stroke-width="2" stroke-linecap="round"/>
    <line x1="${s-5}" y1="${r-2}" x2="${s}" y2="${r+1}" stroke="${e}" stroke-width="2" stroke-linecap="round"/>
    <line x1="${s}" y1="${r+1}" x2="${s+5}" y2="${r-2}" stroke="${e}" stroke-width="2" stroke-linecap="round"/>`;const h=l==="thinking"?2:0,$=l==="thinking"?-1:0;return`
    <ellipse cx="${i}" cy="${r}" rx="${c}" ry="${c+1}" fill="white" stroke="${e}" stroke-width="1.2"/>
    <circle cx="${i+h}" cy="${r+$}" r="${c*.45}" fill="${e}"/>
    <circle cx="${i+h-1.5}" cy="${r+$-2}" r="${c*.2}" fill="white"/>
    <circle cx="${i+h+1}" cy="${r+$-1}" r="${c*.12}" fill="white"/>
    <ellipse cx="${s}" cy="${r}" rx="${c}" ry="${c+1}" fill="white" stroke="${e}" stroke-width="1.2"/>
    <circle cx="${s+h}" cy="${r+$}" r="${c*.45}" fill="${e}"/>
    <circle cx="${s+h-1.5}" cy="${r+$-2}" r="${c*.2}" fill="white"/>
    <circle cx="${s+h+1}" cy="${r+$-1}" r="${c*.12}" fill="white"/>
    ${l==="talking"?`
      <circle cx="${i+h}" cy="${r+$-1}" r="${c*.15}" fill="white" class="eye-sparkle"/>
      <circle cx="${s+h}" cy="${r+$-1}" r="${c*.15}" fill="white" class="eye-sparkle"/>`:""}`}function n(l,e,i){return l==="talking"?`<ellipse cx="${e}" cy="${i+1}" rx="4" ry="5" fill="#FF6B81"/>
    <ellipse cx="${e}" cy="${i-1}" rx="3.5" ry="2" fill="#FF8FA0"/>`:l==="click"?`<path d="M${e-7},${i-1} Q${e},${i+8} ${e+7},${i-1}" fill="#FF6B81" stroke="#e85566" stroke-width="0.5"/>
    <path d="M${e-5},${i-1} Q${e},${i+2} ${e+5},${i-1}" fill="white" opacity="0.6"/>`:l==="hover"?`<circle cx="${e}" cy="${i}" r="2.5" fill="#FF8FA0"/>`:l==="thinking"?`<path d="M${e-5},${i} Q${e-2},${i+3} ${e},${i} Q${e+2},${i-3} ${e+5},${i}" stroke="#e88" stroke-width="1.5" fill="none" stroke-linecap="round"/>`:`<path d="M${e-4},${i} Q${e},${i+5} ${e+4},${i}" stroke="#FF6B81" stroke-width="1.8" fill="none" stroke-linecap="round"/>`}function f(l,e,i,s){const r=l==="hover"||l==="click"?.7:.35,c=l==="hover"||l==="click"?6:5;return`<ellipse cx="${e}" cy="${s}" rx="${c}" ry="3.5" fill="rgba(255,120,120,${r})"/>
    <ellipse cx="${i}" cy="${s}" rx="${c}" ry="3.5" fill="rgba(255,120,120,${r})"/>`}const fl={id:"sakura",name:"小樱",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
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
    ${d(l,"#5a3020",38,62,42)}
    ${f(l,26,74,50)}
    ${n(l,50,54)}
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
  </svg>`,css:""},Ql={id:"xiaolan",name:"小蓝",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
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
    ${d(l,"#2a4a6b",38,62,42)}
    ${f(l,26,74,50)}
    ${n(l,50,54)}
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
  </svg>`,css:""},El={id:"neko",name:"猫咪",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
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
    ${d(l,"#5a3e28",38,62,40)}
    ${f(l,26,74,48)}
    <!-- 猫鼻 -->
    <path d="M48,50 L50,52 L52,50Z" fill="#FFB0B0"/>
    ${l==="talking"?`<ellipse cx="50" cy="56" rx="4" ry="4.5" fill="#FF6B81"/>
         <ellipse cx="50" cy="54" rx="3" ry="1.5" fill="#FF8FA0"/>`:l==="click"?'<path d="M43,54 Q50,62 57,54" fill="#FF6B81" stroke="#e85566" stroke-width="0.5"/>':l==="hover"?'<circle cx="50" cy="54" r="2" fill="#FF8FA0"/>':'<path d="M46,54 L50,57 L54,54" stroke="#FF8FA0" stroke-width="1.5" fill="none" stroke-linecap="round"/>'}
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
  </svg>`,css:""},Dl={id:"bunny",name:"兔兔",svg:l=>`<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <!-- 长耳朵 -->
    <ellipse class="ear-l" cx="36" cy="14" rx="8" ry="22" fill="white" stroke="#f0e0e0" stroke-width="0.8"/>
    <ellipse class="ear-l" cx="36" cy="14" rx="5" ry="18" fill="#FFD5D5"/>
    <ellipse class="ear-r" cx="64" cy="14" rx="8" ry="22" fill="white" stroke="#f0e0e0" stroke-width="0.8"/>
    <ellipse class="ear-r" cx="64" cy="14" rx="5" ry="18" fill="#FFD5D5"/>
    
    <!-- 头 -->
    <ellipse cx="50" cy="46" rx="28" ry="26" fill="white" stroke="#f5e5e5" stroke-width="0.5"/>
    <ellipse cx="50" cy="46" rx="28" ry="26" fill="url(#g-shine)"/>
    ${d(l,"#d4577a",38,62,44)}
    ${f(l,26,74,52)}
    <!-- 兔鼻 -->
    <ellipse cx="50" cy="52" rx="3" ry="2" fill="#FFB0B0"/>
    ${l==="talking"?'<ellipse cx="50" cy="57" rx="3.5" ry="4" fill="#FF6B81"/>':l==="click"?'<path d="M43,56 Q50,64 57,56" fill="#FF6B81"/>':l==="hover"?'<circle cx="50" cy="56" r="2" fill="#FF8FA0"/>':'<path d="M47,56 Q50,59 53,56" stroke="#FF8FA0" stroke-width="1.5" fill="none"/>'}
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
  </svg>`,css:""},bl={id:"bear",name:"小熊",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
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
    ${d(l,"#3e2518",38,62,38,6)}
    ${f(l,24,76,46)}
    <!-- 熊鼻 -->
    <ellipse cx="50" cy="48" rx="5" ry="3.5" fill="#6B4226"/>
    <ellipse cx="48" cy="47" rx="2" ry="1.2" fill="#8B5E3C" opacity="0.6"/>
    ${l==="talking"?`<ellipse cx="50" cy="55" rx="4" ry="5" fill="#FF6B81"/>
         <ellipse cx="50" cy="53" rx="3" ry="1.5" fill="#FF8FA0"/>`:l==="click"?'<path d="M42,54 Q50,63 58,54" fill="#FF6B81" stroke="#e85566" stroke-width="0.5"/>':l==="hover"?'<circle cx="50" cy="54" r="2.5" fill="#FF8FA0"/>':'<path d="M46,54 Q50,58 54,54" stroke="#6B4226" stroke-width="1.8" fill="none" stroke-linecap="round"/>'}
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
    ${l==="idle"?`
      <g transform="translate(72,80)">
        <rect x="-6" y="-8" width="12" height="14" rx="3" fill="#DAA520"/>
        <rect x="-8" y="-10" width="16" height="5" rx="2" fill="#B8860B"/>
        <text x="0" y="2" font-size="6" fill="white" text-anchor="middle" font-family="sans-serif">蜜</text>
        <path d="M-2,-12 Q0,-16 2,-12" stroke="#DAA520" stroke-width="1.5" fill="none"/>
      </g>`:""}
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
  </svg>`,css:""},Bl={id:"elf",name:"精灵",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    <defs>
      <linearGradient id="g-cloak" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4AA84A"/>
        <stop offset="100%" stop-color="#2D7A2D"/>
      </linearGradient>
    </defs>
    ${a(l)}
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
    ${d(l,"#2d5a2d",38,62,42)}
    ${f(l,26,74,50)}
    ${n(l,50,54)}
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
    ${l!=="hover"?`
      <g class="wand">
        <line x1="82" y1="70" x2="90" y2="50" stroke="#8B6914" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="90" cy="48" r="4" fill="#7FFF7F" opacity="0.6" class="wand-glow"/>
        <path d="M87,45 L90,42 L93,45 L90,48Z" fill="#FFD700"/>
        ${l==="idle"?`
          <circle cx="90" cy="48" r="6" fill="#7FFF7F" opacity="0.2" class="wand-pulse"/>`:""}
        ${l==="click"?`
          <circle cx="88" cy="44" r="1.5" fill="#FFD700" class="sparkle-1"/>
          <circle cx="94" cy="46" r="1" fill="#7FFF7F" class="sparkle-2"/>
          <circle cx="90" cy="42" r="1.2" fill="white" class="sparkle-3"/>`:""}
      </g>`:""}
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
  </svg>`,css:""},Cl={id:"fox",name:"小狐",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <polygon class="ear-l" points="22,28 10,2 38,20" fill="#E8652B"/>
    <polygon class="ear-l" points="24,26 16,8 36,20" fill="#FFF0E0"/>
    <polygon class="ear-r" points="78,28 90,2 62,20" fill="#E8652B"/>
    <polygon class="ear-r" points="76,26 84,8 64,20" fill="#FFF0E0"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#E8652B"/>
    <ellipse cx="50" cy="44" rx="20" ry="18" fill="white"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${d(l,"#5a2800",38,62,40)}
    ${f(l,26,74,48)}
    <ellipse cx="50" cy="50" rx="3" ry="2" fill="#333"/>
    ${n(l,50,55)}
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
  </svg>`,css:""},Al={id:"penguin",name:"企鹅",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="42" rx="30" ry="28" fill="#2C3E50"/>
    <ellipse cx="50" cy="44" rx="22" ry="22" fill="white"/>
    <ellipse cx="50" cy="42" rx="30" ry="28" fill="url(#g-shine)"/>
    ${d(l,"#1a1a2e",38,62,40)}
    ${f(l,28,72,48)}
    <path d="M47,48 L50,52 L53,48Z" fill="#F4A460"/>
    ${n(l,50,55)}
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
  </svg>`,css:""},Ll={id:"dragon",name:"小龙",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <polygon class="ear-l" points="20,30 8,10 34,24" fill="#9B59B6"/>
    <polygon class="ear-r" points="80,30 92,10 66,24" fill="#9B59B6"/>
    <path d="M38,8 L42,18 L46,6 L50,16 L54,4 L58,18 L62,10" stroke="#9B59B6" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#9B59B6"/>
    <ellipse cx="50" cy="42" rx="22" ry="20" fill="#D2B4DE"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${d(l,"#4a1a6b",38,62,40,8)}
    ${f(l,24,76,50)}
    <ellipse cx="50" cy="50" rx="4" ry="2.5" fill="#7D3C98"/>
    ${l==="talking"?`<ellipse cx="50" cy="56" rx="5" ry="5" fill="#FF6B81"/>
      <path d="M44,54 L46,50 L48,54" fill="#FF8C00" opacity="0.6"/>`:n(l,50,55)}
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
  </svg>`,css:""},Ml={id:"shiba",name:"柴犬",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <polygon class="ear-l" points="22,30 14,6 38,22" fill="#D4883E"/>
    <polygon class="ear-r" points="78,30 86,6 62,22" fill="#D4883E"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#D4883E"/>
    <ellipse cx="50" cy="44" rx="20" ry="18" fill="#FFF5E0"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${d(l,"#2c1810",38,62,38,5)}
    ${f(l,26,74,46)}
    <ellipse cx="50" cy="48" rx="4" ry="3" fill="#333"/>
    ${l==="click"?'<path d="M42,52 Q50,62 58,52" fill="#FF6B81"/>':l==="talking"?'<ellipse cx="50" cy="55" rx="4" ry="5" fill="#FF6B81"/>':l==="hover"?'<circle cx="50" cy="52" r="2" fill="#FF8FA0"/>':'<path d="M46,52 Q50,56 54,52" stroke="#333" stroke-width="1.5" fill="none"/>'}
    ${l==="idle"?'<path d="M56,52 Q62,48 58,44" stroke="#FF8FA0" stroke-width="1" fill="none" opacity="0.6"/>':""}
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
  </svg>`,css:""},_l={id:"panda",name:"熊猫",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <circle class="ear-l" cx="24" cy="18" r="12" fill="#1a1a1a"/>
    <circle class="ear-r" cx="76" cy="18" r="12" fill="#1a1a1a"/>
    <ellipse cx="50" cy="40" rx="30" ry="28" fill="white"/>
    <ellipse cx="38" cy="38" rx="12" ry="10" fill="#1a1a1a" transform="rotate(-10,38,38)"/>
    <ellipse cx="62" cy="38" rx="12" ry="10" fill="#1a1a1a" transform="rotate(10,62,38)"/>
    <ellipse cx="50" cy="40" rx="30" ry="28" fill="url(#g-shine)"/>
    ${d(l,"#111",38,62,40,6)}
    ${f(l,24,76,50)}
    <ellipse cx="50" cy="50" rx="4" ry="3" fill="#333"/>
    ${n(l,50,55)}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M30,66 L26,102 Q50,110 74,102 L70,66 Q50,72 30,66Z" fill="white"/>
    <ellipse cx="50" cy="84" rx="12" ry="14" fill="#f0f0f0"/>
    <rect class="arm-l" x="14" y="68" width="14" height="26" rx="7" fill="#1a1a1a"/>
    <rect class="arm-r" x="72" y="68" width="14" height="26" rx="7" fill="#1a1a1a"/>
    <rect x="34" y="100" width="12" height="14" rx="6" fill="#1a1a1a"/>
    <rect x="54" y="100" width="12" height="14" rx="6" fill="#1a1a1a"/>
    ${l==="idle"?'<g transform="translate(50,84)"><ellipse rx="6" ry="4" fill="#7BC67E"/><text y="3" font-size="5" fill="white" text-anchor="middle">竹</text></g>':""}
    </g>
  </svg>`,css:""},Zl={id:"unicorn",name:"独角兽",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <polygon points="50,0 46,24 54,24" fill="#FFD700"/>
    <polygon points="50,0 47,16 50,4 53,16" fill="#FFF0A0" opacity="0.6"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="white"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    <path d="M22,28 Q34,14 50,10 Q66,14 78,28 Q66,22 50,18 Q34,22 22,28Z" fill="#E8D0FF"/>
    <path d="M78,30 Q86,40 82,55" stroke="#FFB7C5" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M22,30 Q14,40 18,55" stroke="#B7D4FF" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${d(l,"#8B5CF6",38,62,42)}
    ${f(l,26,74,50)}
    ${n(l,50,54)}
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
  </svg>`,css:""},Il={id:"robot",name:"机器人",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <line x1="50" y1="4" x2="50" y2="14" stroke="#888" stroke-width="2"/>
    <circle cx="50" cy="4" r="3" fill="#FF4444" class="${l==="thinking"?"dot-1":""}"/>
    <rect x="22" y="14" width="56" height="50" rx="12" fill="#B0BEC5"/>
    <rect x="22" y="14" width="56" height="50" rx="12" fill="url(#g-shine)"/>
    <rect x="30" y="24" width="16" height="14" rx="4" fill="#263238"/>
    <rect x="54" y="24" width="16" height="14" rx="4" fill="#263238"/>
    ${l==="click"?`
      <path d="M32,30 Q38,26 44,30" stroke="#4FC3F7" stroke-width="2.5" fill="none"/>
      <path d="M56,30 Q62,26 68,30" stroke="#4FC3F7" stroke-width="2.5" fill="none"/>`:l==="hover"?`
      <line x1="33" y1="30" x2="37" y2="32" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="37" y1="32" x2="43" y2="30" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="57" y1="30" x2="61" y2="32" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="61" y1="32" x2="67" y2="30" stroke="#4FC3F7" stroke-width="2"/>`:`
      <circle cx="38" cy="30" r="4" fill="#4FC3F7" class="${l==="talking"?"eye-sparkle":""}"/>
      <circle cx="62" cy="30" r="4" fill="#4FC3F7" class="${l==="talking"?"eye-sparkle":""}"/>
      <circle cx="36" cy="28" r="1.5" fill="white"/><circle cx="60" cy="28" r="1.5" fill="white"/>`}
    ${l==="talking"?`<rect x="40" y="46" width="20" height="10" rx="3" fill="#263238"/>
      <rect x="42" y="48" width="4" height="6" rx="1" fill="#4FC3F7"/><rect x="48" y="48" width="4" height="6" rx="1" fill="#4FC3F7"/><rect x="54" y="48" width="4" height="6" rx="1" fill="#4FC3F7"/>`:'<path d="M40,50 L60,50" stroke="#546E7A" stroke-width="2" stroke-linecap="round"/>'}
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
  </svg>`,css:""},zl={id:"ghost",name:"幽灵",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <path d="M20,50 Q20,10 50,10 Q80,10 80,50 L80,100 Q74,90 68,100 Q62,90 56,100 Q50,90 44,100 Q38,90 32,100 Q26,90 20,100Z" fill="white" opacity="0.9"/>
    <path d="M20,50 Q20,10 50,10 Q80,10 80,50 L80,100 Q74,90 68,100 Q62,90 56,100 Q50,90 44,100 Q38,90 32,100 Q26,90 20,100Z" fill="url(#g-shine)"/>
    ${d(l,"#444",38,62,40,8)}
    ${f(l,24,76,50)}
    ${n(l,50,55)}
    <rect class="arm-l" x="10" y="52" width="12" height="20" rx="6" fill="white" opacity="0.85"/>
    <rect class="arm-r" x="78" y="52" width="12" height="20" rx="6" fill="white" opacity="0.85"/>
    </g>
  </svg>`,css:""},Sl={id:"chick",name:"小鸡",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <path d="M44,10 Q46,2 50,6 Q54,2 56,10" fill="#FFD700" stroke="#F4A460" stroke-width="0.5"/>
    <ellipse cx="50" cy="40" rx="28" ry="28" fill="#FFE44D"/>
    <ellipse cx="50" cy="40" rx="28" ry="28" fill="url(#g-shine)"/>
    ${d(l,"#333",38,62,36,5)}
    ${f(l,26,74,44)}
    <polygon points="46,46 50,52 54,46" fill="#F4A460"/>
    ${l==="talking"?'<polygon points="44,46 50,56 56,46" fill="#F4A460"/>':""}
    </g>
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="84" rx="22" ry="24" fill="#FFE44D"/>
    <ellipse cx="50" cy="86" rx="14" ry="16" fill="#FFF5B0"/>
    <rect class="arm-l" x="16" y="72" width="14" height="18" rx="7" fill="#FFE44D"/>
    <rect class="arm-r" x="70" y="72" width="14" height="18" rx="7" fill="#FFE44D"/>
    <ellipse cx="38" cy="110" rx="8" ry="4" fill="#F4A460"/>
    <ellipse cx="62" cy="110" rx="8" ry="4" fill="#F4A460"/>
    </g>
  </svg>`,css:""},Ol={id:"slime",name:"史莱姆",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${o}
    <defs><radialGradient id="g-slime" cx="40%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#7FE8FF"/>
      <stop offset="100%" stop-color="#3DB8D6"/>
    </radialGradient></defs>
    ${a(l)}
    <g filter="url(#f-shadow)">
    <path d="M15,80 Q10,30 50,14 Q90,30 85,80 Q80,100 50,102 Q20,100 15,80Z" fill="url(#g-slime)"/>
    <path d="M15,80 Q10,30 50,14 Q90,30 85,80 Q80,100 50,102 Q20,100 15,80Z" fill="url(#g-shine)"/>
    <ellipse cx="42" cy="50" rx="8" ry="10" fill="white" opacity="0.3"/>
    ${d(l,"#1a6080",38,62,52,7)}
    ${f(l,24,76,62)}
    ${n(l,50,68)}
    </g>
  </svg>`,css:""},Wl={id:"demon",name:"小恶魔",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <polygon points="22,26 16,4 32,20" fill="#E74C3C"/>
    <polygon points="78,26 84,4 68,20" fill="#E74C3C"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="#2C2137"/>
    <ellipse cx="50" cy="42" rx="22" ry="20" fill="#3D2C4E"/>
    <ellipse cx="50" cy="40" rx="28" ry="26" fill="url(#g-shine)"/>
    ${l==="click"?`
      <path d="M31,40 Q38,34 45,40" stroke="#FF4444" stroke-width="2.5" fill="none"/>
      <path d="M55,40 Q62,34 69,40" stroke="#FF4444" stroke-width="2.5" fill="none"/>`:l==="hover"?`
      <line x1="33" y1="38" x2="38" y2="42" stroke="#FF4444" stroke-width="2"/>
      <line x1="38" y1="42" x2="43" y2="38" stroke="#FF4444" stroke-width="2"/>
      <line x1="57" y1="38" x2="62" y2="42" stroke="#FF4444" stroke-width="2"/>
      <line x1="62" y1="42" x2="67" y2="38" stroke="#FF4444" stroke-width="2"/>`:`
      <ellipse cx="38" cy="40" rx="7" ry="8" fill="#1a1020"/>
      <circle cx="${l==="thinking"?40:38}" cy="40" r="3.5" fill="#FF4444"/>
      <circle cx="${l==="thinking"?39:37}" cy="38" r="1.2" fill="#FF8888"/>
      <ellipse cx="62" cy="40" rx="7" ry="8" fill="#1a1020"/>
      <circle cx="${l==="thinking"?64:62}" cy="40" r="3.5" fill="#FF4444"/>
      <circle cx="${l==="thinking"?63:61}" cy="38" r="1.2" fill="#FF8888"/>`}
    ${f(l,26,74,50)}
    ${l==="talking"?'<path d="M42,54 L46,50 L50,54 L54,50 L58,54" fill="#E74C3C"/>':l==="click"?`<path d="M40,52 Q50,62 60,52" fill="#E74C3C"/>
        <path d="M44,52 L46,50 L48,52" fill="white" opacity="0.8"/>
        <path d="M52,52 L54,50 L56,52" fill="white" opacity="0.8"/>`:'<path d="M44,54 Q50,58 56,54" stroke="#E74C3C" stroke-width="1.5" fill="none"/>'}
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
  </svg>`,css:""},Nl={id:"angel",name:"天使",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="8" rx="10" ry="3" fill="none" stroke="#FFD700" stroke-width="2" class="wand-glow"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFF5E8"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g-shine)"/>
    <path d="M24,28 Q34,12 50,8 Q66,12 76,28 Q66,22 50,18 Q34,22 24,28Z" fill="#FFF0B0"/>
    <path d="M76,30 Q82,38 80,48" stroke="#FFF0B0" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M24,30 Q18,38 20,48" stroke="#FFF0B0" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${d(l,"#6B5B3A",38,62,42)}
    ${f(l,26,74,50)}
    ${n(l,50,54)}
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
  </svg>`,css:""},Gl={id:"ninja",name:"忍者",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFE8D0"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g-shine)"/>
    <rect x="22" y="22" width="56" height="16" rx="4" fill="#2C3E50"/>
    <path d="M78,26 Q90,22 96,28" stroke="#2C3E50" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M78,30 Q88,28 94,32" stroke="#34495E" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="22" y="46" width="56" height="14" rx="4" fill="#2C3E50"/>
    ${d(l,"#1a1a2e",38,62,34,6)}
    ${l==="talking"?'<path d="M42,52 Q50,58 58,52" stroke="#FFE8D0" stroke-width="1.5" fill="none"/>':""}
    </g>
    <g filter="url(#f-shadow)">
    <path d="M30,60 L26,100 Q50,108 74,100 L70,60 Q50,66 30,60Z" fill="#2C3E50"/>
    <path d="M44,64 L50,70 L56,64" stroke="#C0392B" stroke-width="2" fill="none"/>
    <rect class="arm-l" x="14" y="64" width="14" height="26" rx="7" fill="#2C3E50"/>
    <rect class="arm-r" x="72" y="64" width="14" height="26" rx="7" fill="#2C3E50"/>
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#34495E"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#34495E"/>
    ${l==="idle"?`<line x1="80" y1="72" x2="92" y2="62" stroke="#888" stroke-width="1.5"/>
      <polygon points="90,60 96,58 92,64" fill="#aaa"/>`:""}
    </g>
  </svg>`,css:""},Pl={id:"mermaid",name:"美人鱼",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFF0E0"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g-shine)"/>
    <ellipse cx="50" cy="28" rx="29" ry="22" fill="#1ABC9C"/>
    <path d="M22,30 Q34,12 50,8 Q66,12 78,30 Q66,22 50,18 Q34,22 22,30Z" fill="#16A085"/>
    <path d="M22,30 Q14,44 18,58" stroke="#1ABC9C" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M78,30 Q86,44 82,58" stroke="#1ABC9C" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${d(l,"#0e6655",38,62,42)}
    ${f(l,26,74,50)}
    ${n(l,50,54)}
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
  </svg>`,css:""},Tl={id:"pumpkin",name:"南瓜头",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <rect x="46" y="6" width="8" height="10" rx="2" fill="#5D8233"/>
    <path d="M48,10 Q40,4 36,10" stroke="#5D8233" stroke-width="2" fill="none"/>
    <ellipse cx="50" cy="42" rx="32" ry="28" fill="#E67E22"/>
    <ellipse cx="50" cy="42" rx="32" ry="28" fill="url(#g-shine)"/>
    <path d="M50,16 L50,68" stroke="#D35400" stroke-width="1" opacity="0.3"/>
    <path d="M30,18 Q30,42 30,68" stroke="#D35400" stroke-width="1" opacity="0.2"/>
    <path d="M70,18 Q70,42 70,68" stroke="#D35400" stroke-width="1" opacity="0.2"/>
    ${l==="click"?`
      <path d="M30,36 L38,40 L30,44" fill="#FFD700"/>
      <path d="M70,36 L62,40 L70,44" fill="#FFD700"/>`:l==="hover"?`
      <path d="M32,38 L38,42 L32,42Z" fill="#FFD700"/>
      <path d="M68,38 L62,42 L68,42Z" fill="#FFD700"/>`:`
      <polygon points="32,34 40,42 32,42" fill="#FFD700"/>
      <polygon points="68,34 60,42 68,42" fill="#FFD700"/>`}
    ${l==="talking"?'<path d="M38,52 L42,48 L46,52 L50,48 L54,52 L58,48 L62,52 L62,56 L38,56Z" fill="#FFD700"/>':l==="click"?'<path d="M38,50 Q50,60 62,50" fill="#FFD700"/>':'<path d="M38,52 L44,48 L50,52 L56,48 L62,52" stroke="#FFD700" stroke-width="2" fill="none"/>'}
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
  </svg>`,css:""},Rl={id:"snowman",name:"雪人",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <circle cx="50" cy="38" r="28" fill="white" stroke="#E8E8E8" stroke-width="0.5"/>
    <circle cx="50" cy="38" r="28" fill="url(#g-shine)"/>
    <rect x="30" y="8" width="40" height="14" rx="4" fill="#2C3E50"/>
    <rect x="26" y="18" width="48" height="6" rx="2" fill="#2C3E50"/>
    <path d="M56,14 Q60,6 64,14" stroke="#E74C3C" stroke-width="2" fill="none"/>
    ${d(l,"#1a1a1a",38,62,36,4)}
    <polygon points="48,44 52,44 50,52" fill="#E67E22"/>
    ${n(l,50,56)}
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
  </svg>`,css:""},Hl={id:"sheep",name:"小羊",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
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
    ${d(l,"#5a4030",38,62,40,5)}
    ${f(l,26,74,48)}
    ${n(l,50,52)}
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
  </svg>`,css:""},Ul={id:"cactus",name:"仙人掌",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <rect x="34" y="10" width="32" height="80" rx="16" fill="#5DAE5D"/>
    <rect x="34" y="10" width="32" height="80" rx="16" fill="url(#g-shine)"/>
    <rect class="arm-l" x="10" y="36" width="26" height="16" rx="8" fill="#5DAE5D"/>
    <rect x="10" y="28" width="16" height="26" rx="8" fill="#5DAE5D"/>
    <rect class="arm-r" x="64" y="44" width="26" height="16" rx="8" fill="#5DAE5D"/>
    <rect x="74" y="36" width="16" height="26" rx="8" fill="#5DAE5D"/>
    ${d(l,"#2d5a2d",44,56,36,4)}
    ${f(l,38,62,44)}
    ${n(l,50,48)}
    <circle cx="40" cy="20" r="3" fill="#FF69B4"/>
    <circle cx="40" cy="20" r="1.5" fill="#FFB7C5"/>
    </g>
    <g filter="url(#f-shadow)">
    <rect x="38" y="90" width="24" height="12" rx="4" fill="#8B6914"/>
    <rect x="34" y="100" width="32" height="10" rx="4" fill="#A0724A"/>
    </g>
  </svg>`,css:""},Vl={id:"mushroom",name:"蘑菇",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="38" rx="40" ry="30" fill="#E74C3C"/>
    <ellipse cx="50" cy="38" rx="40" ry="30" fill="url(#g-shine)"/>
    <circle cx="34" cy="28" r="8" fill="white" opacity="0.7"/>
    <circle cx="60" cy="22" r="6" fill="white" opacity="0.7"/>
    <circle cx="72" cy="36" r="5" fill="white" opacity="0.7"/>
    <ellipse cx="50" cy="56" rx="22" ry="14" fill="#FFF5E8"/>
    ${d(l,"#5a2020",42,58,52,5)}
    ${f(l,34,66,58)}
    ${n(l,50,62)}
    </g>
    <g filter="url(#f-shadow)">
    <rect x="38" y="66" width="24" height="30" rx="8" fill="#FFF5E8"/>
    <rect class="arm-l" x="22" y="68" width="18" height="10" rx="5" fill="#FFF5E8"/>
    <rect class="arm-r" x="60" y="68" width="18" height="10" rx="5" fill="#FFF5E8"/>
    <ellipse cx="42" cy="98" rx="8" ry="4" fill="#D4B896"/>
    <ellipse cx="58" cy="98" rx="8" ry="4" fill="#D4B896"/>
    </g>
  </svg>`,css:""},ql={id:"star",name:"星星",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <polygon points="50,4 60,36 94,36 66,56 76,88 50,68 24,88 34,56 6,36 40,36" fill="#FFD700"/>
    <polygon points="50,4 60,36 94,36 66,56 76,88 50,68 24,88 34,56 6,36 40,36" fill="url(#g-shine)"/>
    <polygon points="50,14 56,34 74,34 60,46 64,66 50,54 36,66 40,46 26,34 44,34" fill="#FFE44D" opacity="0.5"/>
    ${d(l,"#B8860B",42,58,42,5)}
    ${f(l,34,66,50)}
    ${n(l,50,52)}
    </g>
  </svg>`,css:""},jl={id:"octopus",name:"章鱼",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="40" rx="32" ry="30" fill="#E88FCF"/>
    <ellipse cx="50" cy="40" rx="32" ry="30" fill="url(#g-shine)"/>
    ${d(l,"#8B2268",38,62,38,7)}
    ${f(l,24,76,48)}
    ${n(l,50,52)}
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
  </svg>`,css:""},Jl={id:"whale",name:"小鲸鱼",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    ${l==="idle"||l==="click"?'<path d="M48,8 Q46,2 50,4 Q54,2 52,8" stroke="#7EC8E3" stroke-width="2" fill="none" class="sparkle-1"/>':""}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="52" rx="38" ry="32" fill="#5DADE2"/>
    <ellipse cx="50" cy="52" rx="38" ry="32" fill="url(#g-shine)"/>
    <ellipse cx="50" cy="58" rx="28" ry="20" fill="#AED6F1"/>
    <path d="M84,40 Q96,28 92,44 Q96,52 86,50" fill="#5DADE2"/>
    ${d(l,"#1a4a6b",38,60,46,6)}
    ${f(l,26,72,56)}
    ${n(l,50,60)}
    <rect class="arm-l" x="8" y="48" width="12" height="16" rx="6" fill="#5DADE2"/>
    <rect class="arm-r" x="80" y="48" width="12" height="16" rx="6" fill="#5DADE2"/>
    </g>
  </svg>`,css:""},Kl={id:"bat",name:"小蝙蝠",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <polygon class="ear-l" points="26,28 18,6 38,22" fill="#4A3560"/>
    <polygon class="ear-r" points="74,28 82,6 62,22" fill="#4A3560"/>
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="#4A3560"/>
    <ellipse cx="50" cy="42" rx="20" ry="18" fill="#6B4D8A"/>
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="url(#g-shine)"/>
    ${d(l,"#E8D0FF",38,62,38,6)}
    ${f(l,26,74,48)}
    ${l==="talking"?'<path d="M44,52 L47,49 L50,52 L53,49 L56,52" fill="#E74C3C"/>':l==="click"?'<path d="M42,50 Q50,58 58,50" fill="#E74C3C"/>':'<path d="M46,52 Q50,55 54,52" stroke="#E74C3C" stroke-width="1.5" fill="none"/>'}
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
  </svg>`,css:""},Yl={id:"astronaut",name:"太空人",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g filter="url(#f-shadow)">
    <ellipse cx="50" cy="38" rx="30" ry="28" fill="white" stroke="#ccc" stroke-width="1"/>
    <ellipse cx="50" cy="38" rx="30" ry="28" fill="url(#g-shine)"/>
    <rect x="24" y="22" width="52" height="34" rx="16" fill="#263238" opacity="0.15"/>
    <ellipse cx="50" cy="38" rx="22" ry="20" fill="#1a2a3a" opacity="0.8"/>
    <ellipse cx="50" cy="38" rx="22" ry="20" fill="url(#g-shine)"/>
    ${l==="click"?`
      <path d="M38,36 Q42,32 46,36" stroke="#4FC3F7" stroke-width="2" fill="none"/>
      <path d="M54,36 Q58,32 62,36" stroke="#4FC3F7" stroke-width="2" fill="none"/>`:l==="hover"?`
      <line x1="38" y1="35" x2="41" y2="37" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="41" y1="37" x2="44" y2="35" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="56" y1="35" x2="59" y2="37" stroke="#4FC3F7" stroke-width="2"/>
      <line x1="59" y1="37" x2="62" y2="35" stroke="#4FC3F7" stroke-width="2"/>`:`
      <circle cx="42" cy="36" r="${l==="thinking"?3:3.5}" fill="#4FC3F7"/>
      <circle cx="40" cy="34" r="1.2" fill="white"/>
      <circle cx="58" cy="36" r="${l==="thinking"?3:3.5}" fill="#4FC3F7"/>
      <circle cx="56" cy="34" r="1.2" fill="white"/>`}
    ${l==="talking"?'<ellipse cx="50" cy="44" rx="3" ry="3.5" fill="#4FC3F7"/>':'<path d="M46,44 Q50,47 54,44" stroke="#4FC3F7" stroke-width="1.5" fill="none"/>'}
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
  </svg>`,css:""},y=`<defs>
  <radialGradient id="g3d-face" cx="40%" cy="35%" r="60%">
    <stop offset="0%" stop-color="rgba(255,255,255,0.5)"/>
    <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
  </radialGradient>
  <filter id="f3d" x="-10%" y="-10%" width="130%" height="130%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
    <feOffset dx="2" dy="3" result="off"/>
    <feFlood flood-color="rgba(0,0,0,0.2)" result="color"/>
    <feComposite in="color" in2="off" operator="in" result="shadow"/>
    <feMerge><feMergeNode in="shadow"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>`;function x(l,e,i,s,r,c=8){if(l==="click")return`
    <path d="M${i-c},${r} Q${i},${r-c*.9} ${i+c},${r}" stroke="${e}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M${s-c},${r} Q${s},${r-c*.9} ${s+c},${r}" stroke="${e}" stroke-width="3" fill="none" stroke-linecap="round"/>`;if(l==="hover")return`
    <line x1="${i-c*.7}" y1="${r-2}" x2="${i}" y2="${r+2}" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="${i}" y1="${r+2}" x2="${i+c*.7}" y2="${r-2}" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="${s-c*.7}" y1="${r-2}" x2="${s}" y2="${r+2}" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="${s}" y1="${r+2}" x2="${s+c*.7}" y2="${r-2}" stroke="${e}" stroke-width="2.5" stroke-linecap="round"/>`;const h=l==="thinking"?3:0;return`
    <ellipse cx="${i}" cy="${r}" rx="${c}" ry="${c+1.5}" fill="white"/>
    <circle cx="${i+h}" cy="${r}" r="${c*.5}" fill="${e}"/>
    <circle cx="${i+h-2}" cy="${r-2.5}" r="${c*.22}" fill="white"/>
    <ellipse cx="${s}" cy="${r}" rx="${c}" ry="${c+1.5}" fill="white"/>
    <circle cx="${s+h}" cy="${r}" r="${c*.5}" fill="${e}"/>
    <circle cx="${s+h-2}" cy="${r-2.5}" r="${c*.22}" fill="white"/>`}function p(l,e,i,s){const r=s==="hover"||s==="click"?.5:.25;return`<ellipse cx="${l}" cy="${i}" rx="7" ry="4" fill="rgba(255,100,100,${r})"/>
    <ellipse cx="${e}" cy="${i}" rx="7" ry="4" fill="rgba(255,100,100,${r})"/>`}const Xl={id:"crystal",name:"水晶球",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs><radialGradient id="g-crystal" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#E0F0FF"/><stop offset="40%" stop-color="#A0D0FF"/>
      <stop offset="100%" stop-color="#6090D0"/>
    </radialGradient></defs>
    <circle cx="50" cy="46" r="36" fill="url(#g-crystal)"/>
    <circle cx="50" cy="46" r="36" fill="url(#g3d-face)" opacity="0.6"/>
    <ellipse cx="38" cy="32" rx="12" ry="8" fill="white" opacity="0.25" transform="rotate(-20,38,32)"/>
    ${x(l,"#2050A0",38,62,44)}
    ${p(26,74,54,l)}
    ${n(l,50,58)}
    </g>
    <g filter="url(#f3d)">
    <rect x="34" y="84" width="32" height="8" rx="4" fill="#8B7355"/>
    <rect x="30" y="90" width="40" height="10" rx="3" fill="#A08060"/>
    </g>
  </svg>`,css:""},le={id:"capsule",name:"胶囊人",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs>
      <linearGradient id="g-cap-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FF8FAA"/><stop offset="100%" stop-color="#E05070"/>
      </linearGradient>
      <linearGradient id="g-cap-bot" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFF5F0"/><stop offset="100%" stop-color="#F0D8D0"/>
      </linearGradient>
    </defs>
    <rect x="22" y="8" width="56" height="100" rx="28" fill="url(#g-cap-bot)"/>
    <rect x="22" y="8" width="56" height="55" rx="28" fill="url(#g-cap-top)"/>
    <rect x="22" y="8" width="56" height="100" rx="28" fill="url(#g3d-face)" opacity="0.4"/>
    <ellipse cx="40" cy="24" rx="10" ry="6" fill="white" opacity="0.2" transform="rotate(-15,40,24)"/>
    ${x(l,"#803050",40,60,40,7)}
    ${p(28,72,50,l)}
    ${n(l,50,54)}
    <rect class="arm-l" x="10" y="56" width="14" height="24" rx="7" fill="#FF8FAA"/>
    <rect class="arm-r" x="76" y="56" width="14" height="24" rx="7" fill="#FF8FAA"/>
    </g>
  </svg>`,css:""},ee={id:"earth",name:"地球",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs><radialGradient id="g-earth" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#7EC8E3"/><stop offset="100%" stop-color="#2E86AB"/>
    </radialGradient></defs>
    <circle cx="50" cy="48" r="38" fill="url(#g-earth)"/>
    <path d="M30,28 Q38,24 42,30 Q48,26 52,32 Q46,38 40,34 Q34,36 30,28Z" fill="#5DAE5D" opacity="0.7"/>
    <path d="M56,36 Q64,30 72,36 Q76,44 70,50 Q62,48 56,42Z" fill="#5DAE5D" opacity="0.7"/>
    <path d="M34,52 Q42,48 48,54 Q44,62 36,60 Q30,58 34,52Z" fill="#5DAE5D" opacity="0.7"/>
    <circle cx="50" cy="48" r="38" fill="url(#g3d-face)" opacity="0.5"/>
    <ellipse cx="36" cy="32" rx="14" ry="8" fill="white" opacity="0.15" transform="rotate(-25,36,32)"/>
    ${x(l,"#1a4a6b",38,62,46,7)}
    ${p(26,74,56,l)}
    ${n(l,50,60)}
    </g>
  </svg>`,css:""},ie={id:"dice",name:"骰子",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs><linearGradient id="g-dice" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#D8D8D8"/>
    </linearGradient></defs>
    <rect x="14" y="10" width="72" height="72" rx="12" fill="url(#g-dice)"/>
    <rect x="14" y="10" width="72" height="72" rx="12" fill="url(#g3d-face)" opacity="0.3"/>
    <path d="M14,70 L14,82 Q14,90 22,90 L78,90 Q86,90 86,82 L86,70" fill="#C0C0C0" opacity="0.4"/>
    ${x(l,"#333",38,62,40,7)}
    ${p(26,74,52,l)}
    ${n(l,50,56)}
    <circle cx="24" cy="20" r="4" fill="#E74C3C" opacity="0.6"/>
    <circle cx="76" cy="20" r="4" fill="#E74C3C" opacity="0.6"/>
    <circle cx="76" cy="72" r="4" fill="#E74C3C" opacity="0.6"/>
    </g>
  </svg>`,css:""},te={id:"moon",name:"月亮",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs><radialGradient id="g-moon" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#FFF8DC"/><stop offset="100%" stop-color="#F0D060"/>
    </radialGradient></defs>
    <circle cx="50" cy="48" r="36" fill="url(#g-moon)"/>
    <circle cx="66" cy="36" r="24" fill="#1a1a3a" opacity="0.08"/>
    <circle cx="50" cy="48" r="36" fill="url(#g3d-face)" opacity="0.4"/>
    <ellipse cx="36" cy="34" rx="10" ry="6" fill="white" opacity="0.2" transform="rotate(-20,36,34)"/>
    <circle cx="36" cy="56" r="4" fill="#E8D060" opacity="0.3"/>
    <circle cx="62" cy="64" r="3" fill="#E8D060" opacity="0.3"/>
    ${x(l,"#8B7020",38,58,46,6)}
    ${p(28,68,54,l)}
    ${n(l,48,58)}
    </g>
  </svg>`,css:""},re={id:"sun",name:"太阳",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g>
    <line x1="50" y1="2" x2="50" y2="16" stroke="#FFD700" stroke-width="4" stroke-linecap="round" class="sparkle-1"/>
    <line x1="50" y1="82" x2="50" y2="96" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="14" y1="14" x2="24" y2="24" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="76" y1="24" x2="86" y2="14" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="2" y1="48" x2="16" y2="48" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="84" y1="48" x2="98" y2="48" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="14" y1="82" x2="24" y2="72" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <line x1="76" y1="72" x2="86" y2="82" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    </g>
    <g filter="url(#f3d)">
    <defs><radialGradient id="g-sun" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#FFF0A0"/><stop offset="100%" stop-color="#FFA500"/>
    </radialGradient></defs>
    <circle cx="50" cy="48" r="32" fill="url(#g-sun)"/>
    <circle cx="50" cy="48" r="32" fill="url(#g3d-face)" opacity="0.5"/>
    <ellipse cx="38" cy="36" rx="10" ry="6" fill="white" opacity="0.2" transform="rotate(-20,38,36)"/>
    ${x(l,"#B8600B",40,60,44,6)}
    ${p(28,72,54,l)}
    ${n(l,50,56)}
    </g>
  </svg>`,css:""},se={id:"apple",name:"苹果",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs><radialGradient id="g-apple" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#FF6B6B"/><stop offset="100%" stop-color="#CC2020"/>
    </radialGradient></defs>
    <rect x="46" y="4" width="4" height="12" rx="2" fill="#5D8233"/>
    <path d="M52,10 Q60,4 58,12" stroke="#5DAE5D" stroke-width="2" fill="none"/>
    <ellipse cx="50" cy="52" rx="34" ry="36" fill="url(#g-apple)"/>
    <path d="M50,18 Q46,22 50,26" stroke="#CC2020" stroke-width="2" fill="none"/>
    <ellipse cx="50" cy="52" rx="34" ry="36" fill="url(#g3d-face)" opacity="0.4"/>
    <ellipse cx="36" cy="36" rx="10" ry="7" fill="white" opacity="0.2" transform="rotate(-25,36,36)"/>
    ${x(l,"#6B1010",38,62,48,6)}
    ${p(26,74,58,l)}
    ${n(l,50,62)}
    </g>
  </svg>`,css:""},ce={id:"diamond",name:"钻石",svg:l=>`<svg viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs><linearGradient id="g-diamond" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E0F8FF"/><stop offset="50%" stop-color="#80D0F0"/>
      <stop offset="100%" stop-color="#40A0D0"/>
    </linearGradient></defs>
    <polygon points="50,6 86,36 50,96 14,36" fill="url(#g-diamond)"/>
    <polygon points="50,6 86,36 50,96 14,36" fill="url(#g3d-face)" opacity="0.3"/>
    <polygon points="50,6 62,36 50,96 38,36" fill="white" opacity="0.1"/>
    <line x1="14" y1="36" x2="86" y2="36" stroke="white" stroke-width="1" opacity="0.3"/>
    <line x1="38" y1="36" x2="50" y2="6" stroke="white" stroke-width="0.8" opacity="0.2"/>
    <line x1="62" y1="36" x2="50" y2="6" stroke="white" stroke-width="0.8" opacity="0.2"/>
    ${x(l,"#206080",40,60,40,6)}
    ${p(30,70,48,l)}
    ${n(l,50,52)}
    </g>
  </svg>`,css:""},ae={id:"princess",name:"公主",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <polygon points="34,10 38,0 42,8 46,0 50,10 54,0 58,8 62,0 66,10" fill="#FFD700"/>
    <rect x="34" y="10" width="32" height="8" rx="2" fill="#FFD700"/>
    <circle cx="42" cy="14" r="2" fill="#E74C3C"/><circle cx="50" cy="14" r="2" fill="#3498DB"/><circle cx="58" cy="14" r="2" fill="#E74C3C"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFF0E0"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g3d-face)" opacity="0.4"/>
    <path d="M23,30 Q34,14 50,10 Q66,14 77,30 Q66,24 50,20 Q34,24 23,30Z" fill="#FFD700"/>
    <path d="M23,30 Q16,44 20,58" stroke="#FFD700" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M77,30 Q84,44 80,58" stroke="#FFD700" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${x(l,"#8B5CF6",38,62,40)}
    ${p(26,74,50,l)}
    ${n(l,50,54)}
    </g>
    <g filter="url(#f3d)">
    <path d="M30,62 L22,106 Q50,116 78,106 L70,62 Q50,68 30,62Z" fill="#E8A0D0"/>
    <path d="M22,106 Q50,116 78,106 Q70,112 50,118 Q30,112 22,106Z" fill="#D080B8"/>
    <path d="M40,66 L50,72 L60,66" stroke="white" stroke-width="1.5" fill="none" opacity="0.5"/>
    <ellipse cx="50" cy="70" rx="3" ry="3" fill="#FFD700"/>
    <rect class="arm-l" x="14" y="66" width="12" height="26" rx="6" fill="#FFF0E0"/>
    <rect class="arm-r" x="74" y="66" width="12" height="26" rx="6" fill="#FFF0E0"/>
    <rect x="36" y="106" width="10" height="10" rx="5" fill="#FFF0E0"/>
    <rect x="54" y="106" width="10" height="10" rx="5" fill="#FFF0E0"/>
    <ellipse cx="41" cy="117" rx="6" ry="3" fill="#E8A0D0"/>
    <ellipse cx="59" cy="117" rx="6" ry="3" fill="#E8A0D0"/>
    </g>
  </svg>`,css:""},ne={id:"knight",name:"骑士",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs><linearGradient id="g-armor" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C0C8D0"/><stop offset="100%" stop-color="#808890"/>
    </linearGradient></defs>
    <ellipse cx="50" cy="38" rx="26" ry="28" fill="url(#g-armor)"/>
    <ellipse cx="50" cy="38" rx="26" ry="28" fill="url(#g3d-face)" opacity="0.4"/>
    <rect x="24" y="10" width="52" height="20" rx="8" fill="url(#g-armor)"/>
    <path d="M44,6 Q50,-2 56,6 L56,14 L44,14Z" fill="#E74C3C"/>
    <rect x="28" y="30" width="44" height="20" rx="4" fill="#1a1a2a" opacity="0.7"/>
    ${x(l,"#4FC3F7",40,60,38,6)}
    </g>
    <g filter="url(#f3d)">
    <path d="M28,58 L24,100 Q50,108 76,100 L72,58 Q50,64 28,58Z" fill="url(#g-armor)"/>
    <path d="M28,58 L24,100 Q50,108 76,100 L72,58 Q50,64 28,58Z" fill="url(#g3d-face)" opacity="0.3"/>
    <line x1="50" y1="62" x2="50" y2="96" stroke="#A0A8B0" stroke-width="1" opacity="0.3"/>
    <line x1="32" y1="78" x2="68" y2="78" stroke="#A0A8B0" stroke-width="1" opacity="0.3"/>
    <rect class="arm-l" x="10" y="60" width="16" height="30" rx="8" fill="url(#g-armor)"/>
    <rect class="arm-r" x="74" y="60" width="16" height="30" rx="8" fill="url(#g-armor)"/>
    ${l==="idle"?`<g transform="translate(84,56)">
      <rect x="-2" y="-30" width="4" height="36" rx="2" fill="#8B6914"/>
      <rect x="-8" y="-32" width="16" height="6" rx="2" fill="#A0A8B0"/>
    </g>`:""}
    <rect x="32" y="98" width="14" height="14" rx="4" fill="url(#g-armor)"/>
    <rect x="54" y="98" width="14" height="14" rx="4" fill="url(#g-armor)"/>
    <ellipse cx="39" cy="113" rx="8" ry="3.5" fill="#808890"/>
    <ellipse cx="61" cy="113" rx="8" ry="3.5" fill="#808890"/>
    </g>
  </svg>`,css:""},oe={id:"pirate",name:"海盗",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="#FFE0C0"/>
    <ellipse cx="50" cy="40" rx="27" ry="25" fill="url(#g3d-face)" opacity="0.4"/>
    <path d="M22,28 Q34,8 50,6 Q66,8 78,28 L80,20 Q66,2 50,0 Q34,2 20,20Z" fill="#2C3E50"/>
    <path d="M20,20 L80,20 L82,28 L18,28Z" fill="#2C3E50"/>
    <circle cx="50" cy="18" r="4" fill="#FFD700"/>
    <ellipse cx="62" cy="38" rx="10" ry="10" fill="#1a1a1a"/>
    <line x1="54" y1="30" x2="70" y2="46" stroke="#1a1a1a" stroke-width="2"/>
    <line x1="70" y1="30" x2="54" y2="46" stroke="#1a1a1a" stroke-width="2"/>
    ${l==="click"?`
      <path d="M31,38 Q38,32 45,38" stroke="#5a3020" stroke-width="3" fill="none" stroke-linecap="round"/>
    `:l==="hover"?`
      <line x1="33" y1="36" x2="38" y2="40" stroke="#5a3020" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="38" y1="40" x2="43" y2="36" stroke="#5a3020" stroke-width="2.5" stroke-linecap="round"/>
    `:`
      <ellipse cx="38" cy="38" rx="8" ry="9.5" fill="white"/>
      <circle cx="${l==="thinking"?41:38}" cy="38" r="4" fill="#5a3020"/>
      <circle cx="${l==="thinking"?39:36}" cy="36" r="1.8" fill="white"/>
    `}
    ${p(24,74,48,l)}
    ${n(l,50,52)}
    </g>
    <g filter="url(#f3d)">
    <path d="M30,62 L26,100 Q50,108 74,100 L70,62 Q50,68 30,62Z" fill="#E74C3C"/>
    <path d="M38,66 L50,72 L62,66" stroke="#FFD700" stroke-width="2" fill="none"/>
    <rect class="arm-l" x="14" y="64" width="14" height="28" rx="7" fill="#FFE0C0"/>
    <rect class="arm-r" x="72" y="64" width="14" height="28" rx="7" fill="#FFE0C0"/>
    <rect x="35" y="98" width="11" height="16" rx="5" fill="#2C3E50"/>
    <rect x="54" y="98" width="11" height="16" rx="5" fill="#2C3E50"/>
    <ellipse cx="40" cy="115" rx="7" ry="3" fill="#5D4037"/>
    <ellipse cx="60" cy="115" rx="7" ry="3" fill="#5D4037"/>
    </g>
  </svg>`,css:""},he={id:"wizard",name:"巫师",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <defs><linearGradient id="g-wiz-hat" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4A3080"/><stop offset="100%" stop-color="#2A1850"/>
    </linearGradient></defs>
    <polygon points="50,-4 30,30 70,30" fill="url(#g-wiz-hat)"/>
    <ellipse cx="50" cy="30" rx="26" ry="6" fill="#2A1850"/>
    <circle cx="50" cy="10" r="4" fill="#FFD700" class="wand-glow"/>
    <text x="42" y="22" font-size="8" fill="#FFD700" opacity="0.6">&#9733;</text>
    <text x="54" y="18" font-size="5" fill="#FFD700" opacity="0.4">&#9733;</text>
    <ellipse cx="50" cy="44" rx="24" ry="22" fill="#FFF0E0"/>
    <ellipse cx="50" cy="44" rx="24" ry="22" fill="url(#g3d-face)" opacity="0.4"/>
    <path d="M30,50 Q26,56 30,60" stroke="#C0C0C0" stroke-width="2" fill="none"/>
    <path d="M70,50 Q74,56 70,60" stroke="#C0C0C0" stroke-width="2" fill="none"/>
    ${x(l,"#4A3080",40,60,42,6)}
    ${p(28,72,50,l)}
    ${n(l,50,54)}
    </g>
    <g filter="url(#f3d)">
    <path d="M30,64 L24,106 Q50,114 76,106 L70,64 Q50,70 30,64Z" fill="#4A3080"/>
    <path d="M30,64 L24,106 Q50,114 76,106 L70,64 Q50,70 30,64Z" fill="url(#g3d-face)" opacity="0.2"/>
    <text x="44" y="86" font-size="10" fill="#FFD700" opacity="0.5">&#9733;</text>
    <rect class="arm-l" x="12" y="66" width="14" height="28" rx="7" fill="#4A3080"/>
    <rect class="arm-r" x="74" y="66" width="14" height="28" rx="7" fill="#4A3080"/>
    ${l!=="hover"?`<g class="wand">
      <line x1="82" y1="70" x2="94" y2="48" stroke="#8B6914" stroke-width="3" stroke-linecap="round"/>
      <circle cx="94" cy="46" r="4" fill="#A070FF" opacity="0.6" class="wand-glow"/>
    </g>`:""}
    <rect x="36" y="104" width="10" height="12" rx="5" fill="#FFF0E0"/>
    <rect x="54" y="104" width="10" height="12" rx="5" fill="#FFF0E0"/>
    <ellipse cx="41" cy="117" rx="6" ry="3" fill="#3A2060"/>
    <ellipse cx="59" cy="117" rx="6" ry="3" fill="#3A2060"/>
    </g>
  </svg>`,css:""},de={id:"pixel",name:"像素人",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${o}
    ${a(l)}
    <g>
    <rect x="30" y="6" width="40" height="8" fill="#5a3825"/>
    <rect x="26" y="14" width="48" height="8" fill="#5a3825"/>
    <rect x="26" y="22" width="8" height="8" fill="#FFE0BD"/>
    <rect x="34" y="22" width="8" height="8" fill="white"/>
    <rect x="42" y="22" width="16" height="8" fill="#FFE0BD"/>
    <rect x="58" y="22" width="8" height="8" fill="white"/>
    <rect x="66" y="22" width="8" height="8" fill="#FFE0BD"/>
    ${l==="click"?`
      <rect x="36" y="24" width="4" height="2" fill="#333"/>
      <rect x="60" y="24" width="4" height="2" fill="#333"/>
    `:`
      <rect x="36" y="24" width="4" height="4" fill="#333"/>
      <rect x="60" y="24" width="4" height="4" fill="#333"/>
    `}
    <rect x="26" y="30" width="48" height="8" fill="#FFE0BD"/>
    ${l==="talking"?'<rect x="42" y="34" width="16" height="4" fill="#E85D6F"/>':l==="click"?'<rect x="38" y="32" width="24" height="4" fill="#E85D6F"/>':'<rect x="42" y="34" width="16" height="2" fill="#E85D6F"/>'}
    <rect x="26" y="38" width="48" height="8" fill="#FFE0BD"/>
    </g>
    <g>
    <rect x="30" y="46" width="40" height="8" fill="#3498DB"/>
    <rect x="30" y="54" width="40" height="8" fill="#3498DB"/>
    <rect x="30" y="62" width="40" height="8" fill="#3498DB"/>
    <rect x="18" y="46" width="12" height="32" fill="#FFE0BD"/>
    <rect x="70" y="46" width="12" height="32" fill="#FFE0BD"/>
    <rect x="30" y="70" width="40" height="8" fill="#3498DB"/>
    <rect x="30" y="78" width="18" height="8" fill="#2C3E50"/>
    <rect x="52" y="78" width="18" height="8" fill="#2C3E50"/>
    <rect x="30" y="86" width="18" height="8" fill="#2C3E50"/>
    <rect x="52" y="86" width="18" height="8" fill="#2C3E50"/>
    <rect x="26" y="94" width="20" height="6" fill="#8B6914"/>
    <rect x="54" y="94" width="20" height="6" fill="#8B6914"/>
    </g>
  </svg>`,css:""},fe={id:"chef",name:"厨师",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <circle cx="38" cy="10" r="10" fill="white"/>
    <circle cx="62" cy="10" r="10" fill="white"/>
    <circle cx="50" cy="8" r="12" fill="white"/>
    <circle cx="50" cy="14" r="10" fill="white"/>
    <ellipse cx="50" cy="42" rx="26" ry="24" fill="#FFE0C0"/>
    <ellipse cx="50" cy="42" rx="26" ry="24" fill="url(#g3d-face)" opacity="0.4"/>
    ${x(l,"#5a3020",40,60,40,6)}
    ${p(28,72,50,l)}
    ${n(l,50,52)}
    <path d="M36,52 Q40,56 44,52" stroke="#5a3020" stroke-width="1.5" fill="none"/>
    </g>
    <g filter="url(#f3d)">
    <path d="M28,64 L24,104 Q50,112 76,104 L72,64 Q50,70 28,64Z" fill="white"/>
    <path d="M28,64 L24,104 Q50,112 76,104 L72,64 Q50,70 28,64Z" fill="url(#g3d-face)" opacity="0.2"/>
    <circle cx="50" cy="74" r="2.5" fill="#333"/>
    <circle cx="50" cy="84" r="2.5" fill="#333"/>
    <circle cx="50" cy="94" r="2.5" fill="#333"/>
    <rect class="arm-l" x="12" y="66" width="14" height="28" rx="7" fill="white"/>
    <rect class="arm-r" x="74" y="66" width="14" height="28" rx="7" fill="white"/>
    ${l==="idle"?`<g transform="translate(80,72)">
      <rect x="-2" y="-16" width="4" height="20" rx="1" fill="#888"/>
      <ellipse cx="0" cy="-18" rx="8" ry="4" fill="#666"/>
    </g>`:""}
    <rect x="34" y="102" width="12" height="12" rx="4" fill="#2C3E50"/>
    <rect x="54" y="102" width="12" height="12" rx="4" fill="#2C3E50"/>
    <ellipse cx="40" cy="115" rx="7" ry="3" fill="#1a1a1a"/>
    <ellipse cx="60" cy="115" rx="7" ry="3" fill="#1a1a1a"/>
    </g>
  </svg>`,css:""},ye={id:"scientist",name:"科学家",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="#FFF0E0"/>
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="url(#g3d-face)" opacity="0.4"/>
    <path d="M24,30 Q36,10 50,8 Q64,10 76,30 Q64,24 50,20 Q36,24 24,30Z" fill="white" stroke="#eee" stroke-width="0.5"/>
    <path d="M24,30 Q20,36 24,42" stroke="white" stroke-width="4" fill="none"/>
    <path d="M76,30 Q80,36 76,42" stroke="white" stroke-width="4" fill="none"/>
    <circle cx="40" cy="38" r="10" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="60" cy="38" r="10" fill="none" stroke="#333" stroke-width="2"/>
    <line x1="50" y1="38" x2="50" y2="38" stroke="#333" stroke-width="3"/>
    <line x1="30" y1="36" x2="24" y2="34" stroke="#333" stroke-width="2"/>
    <line x1="70" y1="36" x2="76" y2="34" stroke="#333" stroke-width="2"/>
    ${x(l,"#333",40,60,38,5)}
    ${p(28,72,48,l)}
    ${n(l,50,52)}
    </g>
    <g filter="url(#f3d)">
    <path d="M28,62 L24,104 Q50,112 76,104 L72,62 Q50,68 28,62Z" fill="white"/>
    <path d="M28,62 L24,104 Q50,112 76,104 L72,62 Q50,68 28,62Z" fill="url(#g3d-face)" opacity="0.15"/>
    <rect x="36" y="66" width="28" height="18" rx="4" fill="#E8E8E8" opacity="0.5"/>
    <rect class="arm-l" x="10" y="64" width="16" height="28" rx="8" fill="white"/>
    <rect class="arm-r" x="74" y="64" width="16" height="28" rx="8" fill="white"/>
    ${l==="idle"?`<g transform="translate(82,68)">
      <path d="M0,0 L0,20 L-6,24 L6,24 L0,20" fill="none" stroke="#3498DB" stroke-width="2"/>
      <ellipse cx="0" cy="10" rx="4" ry="6" fill="#2ECC71" opacity="0.5"/>
    </g>`:""}
    <rect x="34" y="102" width="12" height="12" rx="4" fill="#2C3E50"/>
    <rect x="54" y="102" width="12" height="12" rx="4" fill="#2C3E50"/>
    <ellipse cx="40" cy="115" rx="7" ry="3" fill="#1a1a1a"/>
    <ellipse cx="60" cy="115" rx="7" ry="3" fill="#1a1a1a"/>
    </g>
  </svg>`,css:""},xe={id:"vampire",name:"吸血鬼",svg:l=>`<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">${y}
    ${a(l)}
    <g filter="url(#f3d)">
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="#F0E0E8"/>
    <ellipse cx="50" cy="40" rx="26" ry="24" fill="url(#g3d-face)" opacity="0.4"/>
    <path d="M24,30 Q36,10 50,8 Q64,10 76,30 Q64,22 50,18 Q36,22 24,30Z" fill="#1a1a2a"/>
    <path d="M26,30 L22,20 Q20,16 24,18Z" fill="#1a1a2a"/>
    <path d="M74,30 L78,20 Q80,16 76,18Z" fill="#1a1a2a"/>
    ${x(l,"#CC0000",40,60,38,7)}
    ${p(28,72,48,l)}
    ${l==="talking"?`<path d="M40,54 Q50,62 60,54" fill="#800020"/>
      <polygon points="44,54 46,60 48,54" fill="white"/>
      <polygon points="52,54 54,60 56,54" fill="white"/>`:l==="click"?`<path d="M40,52 Q50,60 60,52" fill="#800020"/>
      <polygon points="44,52 46,58 48,52" fill="white"/><polygon points="52,52 54,58 56,52" fill="white"/>`:'<path d="M44,52 Q50,56 56,52" stroke="#800020" stroke-width="1.8" fill="none"/>'}
    </g>
    <g filter="url(#f3d)">
    <path d="M14,58 Q-2,46 10,36 Q16,32 20,40 Q24,48 20,56Z" fill="#800020" opacity="0.8"/>
    <path d="M86,58 Q102,46 90,36 Q84,32 80,40 Q76,48 80,56Z" fill="#800020" opacity="0.8"/>
    <path d="M28,62 L24,104 Q50,112 76,104 L72,62 Q50,68 28,62Z" fill="#1a1a2a"/>
    <path d="M28,62 L24,104 Q50,112 76,104 L72,62 Q50,68 28,62Z" fill="url(#g3d-face)" opacity="0.15"/>
    <path d="M38,66 L50,72 L62,66" stroke="#800020" stroke-width="2" fill="none"/>
    <rect class="arm-l" x="12" y="64" width="14" height="28" rx="7" fill="#1a1a2a"/>
    <rect class="arm-r" x="74" y="64" width="14" height="28" rx="7" fill="#1a1a2a"/>
    <rect x="34" y="102" width="12" height="12" rx="4" fill="#1a1a2a"/>
    <rect x="54" y="102" width="12" height="12" rx="4" fill="#1a1a2a"/>
    <ellipse cx="40" cy="115" rx="7" ry="3" fill="#111"/>
    <ellipse cx="60" cy="115" rx="7" ry="3" fill="#111"/>
    </g>
  </svg>`,css:""},yl=[fl,Ql,El,Dl,bl,Bl,Cl,Al,Ll,Ml,_l,Zl,Il,zl,Sl,Ol,Wl,Nl,Gl,Pl,Tl,Rl,Hl,Ul,Vl,ql,jl,Jl,Kl,Yl,Xl,le,ee,ie,te,re,se,ce,ae,ne,oe,he,de,fe,ye,xe];function pe(l){return yl.find(e=>e.id===l)||fl}const k=document.getElementById("pet");let g="idle",V="sakura",v=!1,I=null;const ll=["idle","act-nod","act-shake","act-spin","act-jump","act-squat","act-lean-l","act-lean-r","act-peek-l","act-peek-r","act-stretch","act-dizzy","act-float","act-dance","act-wave","act-stomp","act-yawn","act-shiver","act-bounce2","act-roll","act-sway","act-tiptoe","act-slide-l","act-slide-r"];function xl(){pl(),I=window.setInterval(()=>{if(g!=="idle"||v)return;const l=ll[Math.floor(Math.random()*ll.length)];k.className=l,l!=="idle"&&setTimeout(()=>{!v&&g==="idle"&&(k.className="idle")},2500)},4e3)}function pl(){I!==null&&(clearInterval(I),I=null)}function we(l){V=l,q()}function u(l){g=l,q(),l==="idle"?xl():pl()}function q(){const l=pe(V);k.innerHTML=l.svg(g),k.className=g}function ge(l,e){if(v)return;v=!0;const i=g;u(l),setTimeout(()=>{g===l&&u(i==="hover"||i==="click"?"idle":i),v=!1},e)}function ue(l){l&&(V=l),q(),xl(),k.addEventListener("mouseenter",()=>{g==="idle"&&!v&&u("hover")}),k.addEventListener("mouseleave",()=>{g==="hover"&&u("idle")}),k.addEventListener("click",e=>{e.stopPropagation(),!(g==="thinking"||g==="talking")&&ge("click",700)}),k.addEventListener("dblclick",e=>{e.stopPropagation(),!(g==="thinking"||g==="talking")&&(v=!0,u("click"),setTimeout(()=>{u("idle"),setTimeout(()=>{u("click"),setTimeout(()=>{u("idle"),v=!1},500)},150)},500))}),k.addEventListener("mouseup",()=>{k.classList.add("dragged"),setTimeout(()=>k.classList.remove("dragged"),500)})}const A=document.getElementById("messages"),R=document.getElementById("chat-input"),Fe=document.getElementById("send-btn"),el=document.getElementById("chat-area");document.getElementById("pet-area");const ke=document.getElementById("chat-close-btn");let b=[];async function $e(){try{b=await t("load_history"),b.forEach(l=>H(l.role,l.content))}catch{}document.getElementById("chat-btn").addEventListener("click",()=>{el.classList.toggle("hidden")}),ke.addEventListener("click",()=>{el.classList.add("hidden")}),Fe.addEventListener("click",il),R.addEventListener("keydown",l=>{l.key==="Enter"&&il()})}function H(l,e){const i=document.createElement("div");return i.className=`msg ${l}`,i.textContent=e,A.appendChild(i),A.scrollTop=A.scrollHeight,i}async function me(l,e){l.textContent="";for(let i=0;i<e.length;i++)l.textContent+=e[i],A.scrollTop=A.scrollHeight,await new Promise(s=>setTimeout(s,20))}async function il(){const l=R.value.trim();if(!l)return;R.value="",b.push({role:"user",content:l}),H("user",l),u("thinking");const e=H("assistant","思考中...");try{const i=await t("load_settings"),s=await t("get_api_key",{provider:i.provider});if(!s){e.textContent="请先在设置中配置 API Key~",u("idle");return}const r=await t("chat",{provider:i.provider,model:i.model,apiKey:s,systemPrompt:i.system_prompt,history:b});u("talking"),await me(e,r),b.push({role:"assistant",content:r}),await t("save_history",{messages:b})}catch(i){e.textContent=`出错了: ${i}`}u("idle")}const W=document.getElementById("settings-panel"),D=document.getElementById("provider-select"),U=document.getElementById("model-select"),_=document.getElementById("api-key-input"),tl=document.getElementById("system-prompt"),ve=document.getElementById("save-settings-btn"),Qe=document.getElementById("close-settings-btn"),Ee=document.getElementById("settings-btn"),Q=document.getElementById("pet-size-input"),rl=document.getElementById("pet-size-val"),sl=document.getElementById("pet"),N=document.getElementById("character-grid");let L="sakura";const De={deepseek:["deepseek-chat","deepseek-reasoner"],openai:["gpt-4o","gpt-4o-mini","o1-mini"],claude:["claude-sonnet-4-5-20250929","claude-haiku-4-5-20251001"]};function G(l){sl.style.width=l+"px",sl.style.height=l+"px"}function P(){const l=De[D.value]||[];U.innerHTML=l.map(e=>`<option value="${e}">${e}</option>`).join("")}async function be(){Q.addEventListener("input",()=>{rl.textContent=Q.value,G(Number(Q.value))}),D.addEventListener("change",async()=>{P(),_.value=await t("get_api_key",{provider:D.value})}),Ee.addEventListener("click",async()=>{W.classList.remove("hidden");try{const l=await t("load_settings");D.value=l.provider,P(),U.value=l.model,tl.value=l.system_prompt,Q.value=String(l.pet_size||100),rl.textContent=Q.value,L=l.character_id||"sakura",Be(),_.value=await t("get_api_key",{provider:l.provider})}catch{}}),Qe.addEventListener("click",()=>W.classList.add("hidden")),ve.addEventListener("click",async()=>{try{await t("save_settings",{settings:{provider:D.value,model:U.value,system_prompt:tl.value,pet_size:Number(Q.value),character_id:L}}),G(Number(Q.value)),we(L),_.value&&await t("save_api_key",{provider:D.value,key:_.value}),W.classList.add("hidden")}catch(l){alert("保存失败: "+l)}}),P();try{const l=await t("load_settings");return l.pet_size&&G(l.pet_size),l.character_id||"sakura"}catch{}return"sakura"}function Be(){N.innerHTML=yl.map(l=>`
    <div class="char-option${l.id===L?" active":""}" data-id="${l.id}">
      ${l.svg("idle")}
      <span>${l.name}</span>
    </div>
  `).join(""),N.querySelectorAll(".char-option").forEach(l=>{l.addEventListener("click",()=>{L=l.dataset.id,N.querySelectorAll(".char-option").forEach(e=>e.classList.remove("active")),l.classList.add("active")})})}window.addEventListener("DOMContentLoaded",async()=>{$e();const l=await be();ue(l),document.getElementById("pet").addEventListener("mousedown",()=>{hl().startDragging()})});
