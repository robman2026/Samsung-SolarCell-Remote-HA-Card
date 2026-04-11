/**
 * Samsung Solar Remote Card for Home Assistant
 * A pixel-perfect Samsung SolarCell remote control card
 *
 * @version 1.0.0
 * @author  Samsung Solar Remote Card contributors
 * @license MIT
 */

const CARD_VERSION = '1.0.0';

/* ─────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────── */
const STYLES = `
  :host {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .remote {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: #1c1c1c;
    border: 2px solid #141414;
    border-radius: 40px;
    padding: 28px 20px 36px;
    box-shadow:
      inset 0 4px 10px rgba(255,255,255,0.05),
      0 20px 60px rgba(0,0,0,0.8);
    width: 100%;
    max-width: 320px;
    box-sizing: border-box;
    font-family: -apple-system, 'Helvetica Neue', sans-serif;
  }

  /* ── Rows ── */
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
  }
  .row.center  { justify-content: center; }
  .row.spread  { justify-content: space-between; }

  /* ── Base button ── */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(40,40,40,0.9);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: filter .12s, transform .08s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    flex-shrink: 0;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
  }
  .btn:active { filter: brightness(1.5); transform: scale(0.90); }

  /* sizes */
  .btn-lg  { width: 54px; height: 54px; }
  .btn-md  { width: 50px; height: 50px; }
  .btn-sm  { width: 44px; height: 44px; }

  /* ── Power ── */
  .btn-power {
    width: 52px; height: 32px;
    border-radius: 16px;
    background: rgba(30,30,30,0.9);
    border: 1.5px solid #3a1515;
  }
  .btn-power svg { width:18px; height:18px; }

  /* ── Spotify ── */
  .btn-spotify {
    width: 52px; height: 32px;
    border-radius: 16px;
    background: #1DB954;
    border: none;
  }
  .btn-spotify svg { width:20px; height:20px; fill:white; }

  /* ── 123 button ── */
  .btn-123 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    padding: 6px;
  }
  .btn-123 .cog  { width:14px; height:14px; fill:white; }
  .btn-123 .num  { font-size:9px; font-weight:700; color:white; line-height:1; }
  .btn-123 .dots { display:flex; gap:3px; margin-top:1px; }
  .btn-123 .dot  { width:5px; height:5px; border-radius:50%; }

  /* ── D-pad ── */
  .dpad {
    position: relative;
    width: 180px;
    height: 180px;
    flex-shrink: 0;
  }
  .dpad-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 35%, #2a2a2a, #161616);
    box-shadow: 0 6px 20px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.05);
  }
  .dpad-btn {
    position: absolute;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: filter .1s;
    color: white;
  }
  .dpad-btn:active { filter: brightness(2); }
  .dpad-btn svg { width:28px; height:28px; fill:white; pointer-events:none; }

  .dpad-up    { top:4px;    left:50%; transform:translateX(-50%); width:80px;  height:60px; }
  .dpad-down  { bottom:4px; left:50%; transform:translateX(-50%); width:80px;  height:60px; }
  .dpad-left  { left:4px;   top:50%;  transform:translateY(-50%); width:60px;  height:80px; }
  .dpad-right { right:4px;  top:50%;  transform:translateY(-50%); width:60px;  height:80px; }

  .dpad-ok {
    position: absolute;
    top:50%; left:50%;
    transform: translate(-50%,-50%);
    width: 100px; height: 100px;
    border-radius: 50%;
    background: radial-gradient(circle at 40% 35%, #2e2e2e, #141414);
    box-shadow: 0 4px 14px rgba(0,0,0,0.9), inset 0 2px 5px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.04);
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: filter .1s, transform .08s;
  }
  .dpad-ok:active { filter: brightness(1.4); transform: translate(-50%,-50%) scale(0.93); }

  /* ── Pill buttons (vol/ch) ── */
  .pill-row { display:flex; gap:8px; width:100%; }
  .btn-pill {
    flex: 1;
    height: 36px;
    border-radius: 18px;
    background: rgba(40,40,40,0.9);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter .12s, transform .08s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
  }
  .btn-pill:active { filter: brightness(1.5); transform: scale(0.93); }
  .btn-pill svg { width:20px; height:20px; fill:white; }

  /* ── App buttons ── */
  .app-row { display:flex; gap:8px; width:100%; }
  .btn-app {
    flex: 1;
    height: 40px;
    border-radius: 16px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: filter .12s, transform .08s;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    gap: 5px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .btn-app:active { filter: brightness(1.3); transform: scale(0.95); }

  .btn-netflix {
    background: #000;
    border: 1px solid #1a1a1a;
  }
  .btn-netflix span {
    color: #e50914;
    font-weight: 900;
    font-size: 14px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .btn-youtube {
    background: #fff;
    border: 1px solid #eee;
  }
  .btn-youtube span {
    color: #000;
    font-weight: 700;
    font-size: 13px;
    white-space: nowrap;
  }
  .btn-youtube svg { flex-shrink:0; }

  .btn-prime {
    background: linear-gradient(200deg, #1098F7 0%, #001f3f 100%);
    border: 1px solid #1098F7;
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.2);
  }
  .btn-prime span {
    color: white;
    font-weight: 700;
    font-size: 13px;
    white-space: nowrap;
  }

  .btn-disney {
    background: linear-gradient(180deg, #016f7d 0%, #001f3f 100%);
    border: 1px solid #004d61;
  }
  .btn-disney-logo {
    width: 100%;
    height: 100%;
    background: url("https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg") center/contain no-repeat;
    filter: brightness(0) invert(1);
  }

  .btn-spotify-app {
    background: #1DB954;
    border: none;
  }
  .btn-spotify-app span {
    color: white;
    font-weight: 700;
    font-size: 13px;
    white-space: nowrap;
  }

  /* ── Divider ── */
  .divider {
    width: 90%;
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 2px 0;
  }

  /* ── Icon SVGs ── */
  svg { display:block; }
`;

/* ─────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────── */
const ICONS = {
  power:     `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v9" stroke="#cc2222" stroke-width="2.2" stroke-linecap="round"/><path d="M7 6.3A8 8 0 1 0 17 6.3" stroke="#cc2222" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>`,
  spotify:   `<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.224-2.723a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .519-.972c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 0 1 .257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 1 1-.543-1.794c3.531-1.071 9.404-.864 13.115 1.338a.937.937 0 0 1-.954 1.612z"/></svg>`,
  cog:       `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.484.484 0 0 0 14 3h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.476.476 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
  menu:      `<svg viewBox="0 0 24 24" fill="white"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`,
  mute:      `<svg viewBox="0 0 24 24" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,
  up:        `<svg viewBox="0 0 24 24" fill="white"><path d="M7 14l5-5 5 5z"/></svg>`,
  down:      `<svg viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>`,
  left:      `<svg viewBox="0 0 24 24" fill="white"><path d="M15 7l-5 5 5 5z"/></svg>`,
  right:     `<svg viewBox="0 0 24 24" fill="white"><path d="M9 7l5 5-5 5z"/></svg>`,
  back:      `<svg viewBox="0 0 24 24" fill="white"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
  home:      `<svg viewBox="0 0 24 24" fill="white"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  playpause: `<svg viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14l11-7-11-7z"/></svg>`,
  volup:     `<svg viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
  voldown:   `<svg viewBox="0 0 24 24" fill="white"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>`,
  chup:      `<svg viewBox="0 0 24 24" fill="white"><path d="M7 14l5-5 5 5z"/></svg>`,
  chdown:    `<svg viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>`,
  youtube:   `<svg viewBox="0 0 24 16" width="24" height="16"><rect width="24" height="16" rx="3.5" fill="#FF0000"/><polygon points="10,3.5 10,12.5 18,8" fill="white"/></svg>`,
};

/* ─────────────────────────────────────────────────────────────
   CUSTOM ELEMENT
───────────────────────────────────────────────────────────── */
class SamsungSolarRemoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass = null;
    this._config = {};
  }

  /* Called by HA to pass config */
  setConfig(config) {
    if (!config.media_player && !config.remote) {
      throw new Error('samsung-solar-remote: Please define at least media_player or remote entity.');
    }
    this._config = {
      media_player: config.media_player || '',
      remote:       config.remote       || '',
      spotify:      config.spotify      !== false,
      apps: {
        netflix:  config.apps?.netflix  !== false,
        youtube:  config.apps?.youtube  !== false,
        prime:    config.apps?.prime    !== false,
        disney:   config.apps?.disney   !== false,
      },
      commands: {
        power:     config.commands?.power     || 'turn_off',
        spotify:   config.commands?.spotify   || 'shell_command.launch_spotify',
        more:      config.commands?.more      || 'KEY_MORE',
        menu:      config.commands?.menu      || 'KEY_MENU',
        mute:      config.commands?.mute      || 'KEY_MUTE',
        up:        config.commands?.up        || 'KEY_UP',
        down:      config.commands?.down      || 'KEY_DOWN',
        left:      config.commands?.left      || 'KEY_LEFT',
        right:     config.commands?.right     || 'KEY_RIGHT',
        enter:     config.commands?.enter     || 'KEY_ENTER',
        back:      config.commands?.back      || 'KEY_RETURN',
        home:      config.commands?.home      || 'KEY_HOME',
        playpause: config.commands?.playpause || 'KEY_PLAYPAUSE',
        volup:     config.commands?.volup     || 'KEY_VOLUP',
        voldown:   config.commands?.voldown   || 'KEY_VOLDOWN',
        chup:      config.commands?.chup      || 'KEY_CHUP',
        chdown:    config.commands?.chdown    || 'KEY_CHDOWN',
        netflix:   config.commands?.netflix   || 'shell_command.launch_netflix',
        youtube:   config.commands?.youtube   || 'shell_command.launch_youtube',
        prime:     config.commands?.prime     || 'shell_command.launch_prime',
        disney:    config.commands?.disney    || 'shell_command.launch_disney',
      },
    };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
  }

  /* ── Helpers ── */
  _sendRemoteKey(command) {
    if (!this._hass || !this._config.remote) return;
    this._hass.callService('remote', 'send_command', {
      entity_id: this._config.remote,
      command,
    });
  }

  _callService(domain, service, data = {}) {
    if (!this._hass) return;
    this._hass.callService(domain, service, data);
  }

  _handleAction(action) {
    const c = this._config.commands;
    const mp = this._config.media_player;
    const remote = this._config.remote;

    switch (action) {
      case 'power':
        if (mp) this._callService('media_player', 'toggle', { entity_id: mp });
        break;
      case 'spotify':
        this._callService('shell_command', 'launch_spotify');
        break;
      case 'more':
      case 'menu':
      case 'mute':
      case 'up': case 'down': case 'left': case 'right': case 'enter':
      case 'back': case 'home': case 'playpause':
      case 'volup': case 'voldown': case 'chup': case 'chdown':
        this._sendRemoteKey(c[action]);
        break;
      case 'netflix':
        this._callService('shell_command', 'launch_netflix');
        break;
      case 'youtube':
        this._callService('shell_command', 'launch_youtube');
        break;
      case 'prime':
        this._callService('shell_command', 'launch_prime');
        break;
      case 'disney':
        this._callService('shell_command', 'launch_disney');
        break;
    }
  }

  _btn(action, cls, inner, tag = 'button') {
    return `<${tag} class="btn ${cls}" data-action="${action}" title="${action}">${inner}</${tag}>`;
  }

  /* ── Render ── */
  _render() {
    const cfg = this._config;

    const html = `
      <style>${STYLES}</style>
      <div class="remote">

        <!-- Power + Spotify -->
        <div class="row spread">
          <button class="btn-power" data-action="power">${ICONS.power}</button>
          ${cfg.spotify
            ? `<button class="btn-spotify" data-action="spotify">${ICONS.spotify}</button>`
            : '<span></span>'}
        </div>

        <!-- 123 · Menu · Mute -->
        <div class="row spread">
          <button class="btn btn-md btn-123" data-action="more">
            ${ICONS.cog.replace('<svg', '<svg class="cog"')}
            <span class="num">123</span>
            <span class="dots">
              <span class="dot" style="background:#ff4d4d"></span>
              <span class="dot" style="background:#4dff4d"></span>
              <span class="dot" style="background:#ffdb4d"></span>
              <span class="dot" style="background:#4d94ff"></span>
            </span>
          </button>
          <button class="btn btn-md" data-action="menu">${ICONS.menu}</button>
          <button class="btn btn-md" data-action="mute">${ICONS.mute}</button>
        </div>

        <div class="divider"></div>

        <!-- D-Pad -->
        <div class="dpad">
          <div class="dpad-ring"></div>
          <button class="dpad-btn dpad-up"    data-action="up">${ICONS.up}</button>
          <button class="dpad-btn dpad-left"  data-action="left">${ICONS.left}</button>
          <button class="dpad-ok"             data-action="enter"></button>
          <button class="dpad-btn dpad-right" data-action="right">${ICONS.right}</button>
          <button class="dpad-btn dpad-down"  data-action="down">${ICONS.down}</button>
        </div>

        <div class="divider"></div>

        <!-- Back · Home · Play/Pause -->
        <div class="row spread">
          <button class="btn btn-md" data-action="back">${ICONS.back}</button>
          <button class="btn btn-sm" data-action="home">${ICONS.home}</button>
          <button class="btn btn-md" data-action="playpause">${ICONS.playpause}</button>
        </div>

        <!-- Vol + Channel -->
        <div class="pill-row">
          <button class="btn-pill" data-action="volup">${ICONS.volup}</button>
          <button class="btn-pill" data-action="chup">${ICONS.chup}</button>
        </div>
        <div class="pill-row">
          <button class="btn-pill" data-action="voldown">${ICONS.voldown}</button>
          <button class="btn-pill" data-action="chdown">${ICONS.chdown}</button>
        </div>

        <div class="divider"></div>

        <!-- Apps row 1 -->
        ${(cfg.apps.netflix || cfg.apps.youtube) ? `
        <div class="app-row">
          ${cfg.apps.netflix ? `
          <button class="btn-app btn-netflix" data-action="netflix">
            <span>NETFLIX</span>
          </button>` : ''}
          ${cfg.apps.youtube ? `
          <button class="btn-app btn-youtube" data-action="youtube">
            ${ICONS.youtube}
            <span>YouTube</span>
          </button>` : ''}
        </div>` : ''}

        <!-- Apps row 2 -->
        ${(cfg.apps.prime || cfg.apps.disney) ? `
        <div class="app-row">
          ${cfg.apps.prime ? `
          <button class="btn-app btn-prime" data-action="prime">
            <span>Prime Video</span>
          </button>` : ''}
          ${cfg.apps.disney ? `
          <button class="btn-app btn-disney" data-action="disney">
            <div class="btn-disney-logo"></div>
          </button>` : ''}
        </div>` : ''}

      </div>
    `;

    this.shadowRoot.innerHTML = html;
    this._attachListeners();
  }

  _attachListeners() {
    this.shadowRoot.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', () => this._handleAction(el.dataset.action));
    });
  }

  /* HA requires this for the card size hint */
  getCardSize() { return 8; }

  /* ── Config editor (visual editor stub) ── */
  static getConfigElement() {
    return document.createElement('samsung-solar-remote-card-editor');
  }

  static getStubConfig() {
    return {
      media_player: 'media_player.samsung_tv',
      remote: 'remote.samsung_tv',
      spotify: true,
      apps: { netflix: true, youtube: true, prime: true, disney: true },
    };
  }
}

/* ─────────────────────────────────────────────────────────────
   REGISTER
───────────────────────────────────────────────────────────── */
customElements.define('samsung-solar-remote-card', SamsungSolarRemoteCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type:        'samsung-solar-remote-card',
  name:        'Samsung Solar Remote Card',
  description: 'A pixel-perfect Samsung SolarCell remote control for Home Assistant.',
  preview:     true,
  documentationURL: 'https://github.com/YOUR_USERNAME/samsung-solar-remote',
});

console.info(
  `%c SAMSUNG-SOLAR-REMOTE-CARD %c v${CARD_VERSION} `,
  'background:#1DB954;color:white;padding:2px 6px;border-radius:4px 0 0 4px;font-weight:bold',
  'background:#1c1c1c;color:white;padding:2px 6px;border-radius:0 4px 4px 0',
);
