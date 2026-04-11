class SamsungRemoteCard extends HTMLElement {
  set editMode(editMode) {}

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity (remote.odin)");
    }
    this.config = config;
  }

  render() {
    if (!this.config) return;

    this.innerHTML = `
      <style>
        .remote-shell {
          background: #1c1c1c;
          border-radius: 50px;
          padding: 30px 15px;
          border: 2px solid #141414;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          max-width: 250px;
          margin: auto;
        }
        .row { display: flex; justify-content: space-around; width: 100%; gap: 10px; }
        .btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 15px;
          color: white;
          padding: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
        .btn-power { color: #ff3b30; }
        .btn-app { height: 40px; border-radius: 20px; font-weight: bold; }
        .btn-netflix { background: #000; color: #E50914; font-size: 18px; }
        .btn-youtube { background: #fff; color: #000; }
      </style>
      <div class="remote-shell">
        <div class="row">
           <div class="btn btn-power" onclick="this._send('KEY_POWER')">
             <ha-icon icon="mdi:power"></ha-icon>
           </div>
           <div class="btn" style="color: #1DB954" onclick="this._send('launch_spotify')">
             <ha-icon icon="mdi:spotify"></ha-icon>
           </div>
        </div>

        <div class="row">
          <div class="btn btn-app btn-netflix" onclick="this._send('launch_netflix')">NETFLIX</div>
          <div class="btn btn-app btn-youtube" onclick="this._send('launch_youtube')">
            <svg viewBox="0 0 24 24" style="width:24px;height:24px;margin-right:5px;"><path fill="#FF0000" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,8.07 21.8,9.44 21.8,11.3V12.7C21.8,14.56 21.69,15.93 21.56,16.83C21.43,17.74 21.11,18.41 20.6,18.85C20.08,19.3 19.33,19.5 18.33,19.5C17.33,19.5 16,19.5 14.33,19.5H9.67C8,19.5 6.67,19.5 5.67,19.5C4.67,19.5 3.92,19.3 3.4,18.85C2.89,18.41 2.57,17.74 2.44,16.83C2.31,15.93 2.2,14.56 2.2,12.7V11.3C2.2,9.44 2.31,8.07 2.44,7.17C2.57,6.26 2.89,5.59 3.4,5.15C3.92,4.7 4.67,4.5 5.67,4.5C6.67,4.5 8,4.5 9.67,4.5H14.33C16,4.5 17.33,4.5 18.33,4.5C19.33,4.5 20.08,4.7 20.6,5.15C21.11,5.59 21.43,6.26 21.56,7.17Z"/></svg>
            YouTube
          </div>
        </div>
      </div>
    `;
  }

  _send(cmd) {
    const service = cmd.includes('launch') ? 'shell_command' : 'remote';
    const action = cmd.includes('launch') ? cmd : 'send_command';
    
    this._hass.callService(service, action, {
      entity_id: this.config.entity,
      command: cmd
    });
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.content) {
      this.render();
      this.content = true;
    }
  }

  getCardSize() { return 5; }
}

customElements.define("samsung-remote-card", SamsungRemoteCard);
