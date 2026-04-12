# Samsung Solar Remote Card

A pixel-perfect **Samsung SolarCell remote control** custom card for [Home Assistant](https://www.home-assistant.io/).

![Samsung Solar Remote Card](https://raw.githubusercontent.com/robman2026/Samsung-SolarCell-Remote-HA-Card/main/preview.png)

## Features

- 🎨 Matches somehow the real Samsung SolarCell remote layout
- 📱 Fully responsive — works on mobile and desktop
- 🎛️ Configurable entity IDs, apps, and commands
- 🟢 Spotify, Netflix, YouTube, Prime Video, Disney+ buttons

---
## 📸 Preview

<img width="225" alt="image" src="https://github.com/user-attachments/assets/0a347ffa-36dc-4978-a45b-4adb179db6cd" />


## Installation

### Via HACS (recommended)

1. Open HACS in your Home Assistant instance
2. Go to **Frontend**
3. Click the three-dot menu → **Custom repositories**
4. Add `https://github.com/robman2026/Samsung-SolarCell-Remote-HA-Card` as category **Lovelace**
5. Click **Install**
6. Reload your browser

### Manual

1. Download `samsung-solar-remote.js` from the [latest release](https://github.com/robman2026/Samsung-SolarCell-Remote-HA-Card/releases)
2. Copy it to `/config/www/samsung-solar-remote.js`
3. Add to your `configuration.yaml` (or via UI → Settings → Dashboards → Resources):
   ```yaml
   lovelace:
     resources:
       - url: /local/samsung-solar-remote.js
         type: module
   ```
4. Reload Home Assistant

---

## Usage

Add to your Lovelace dashboard:

```yaml
type: custom:samsung-solar-remote-card
media_player: media_player.samsung_tv
remote: remote.samsung_tv
```

### Full configuration example

```yaml
type: custom:samsung-solar-remote-card
media_player: media_player.Odin       # used for power toggle
remote: remote.Odin                   # used for key commands
spotify: true                         # show Spotify button (default: true)
apps:
  netflix: true
  youtube: true
  prime: true
  disney: true
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `media_player` | string | **required** | `media_player` entity for power |
| `remote` | string | **required** | `remote` entity for key commands |
| `spotify` | boolean | `true` | Show Spotify shortcut button |
| `apps.netflix` | boolean | `true` | Show Netflix button |
| `apps.youtube` | boolean | `true` | Show YouTube button |
| `apps.prime` | boolean | `true` | Show Prime Video button |
| `apps.disney` | boolean | `true` | Show Disney+ button |

---

## Shell Commands

The app buttons call `shell_command` services. Add these to your `configuration.yaml`:

```yaml
shell_command:
  launch_netflix:  "your-command-here"
  launch_youtube:  "your-command-here"
  launch_prime:    "your-command-here"
  launch_disney:   "your-command-here"
  launch_spotify:  "your-command-here"
```

For Samsung TVs with the SmartThings integration, you can also use:

```yaml
shell_command:
  launch_netflix: >-
    curl -s -X POST http://YOUR_TV_IP:8001/api/v2/applications/11101200001
```

---

## Supported Remote Commands

The card uses standard Samsung remote key codes:

| Button | Key Code |
|--------|----------|
| Up | `KEY_UP` |
| Down | `KEY_DOWN` |
| Left | `KEY_LEFT` |
| Right | `KEY_RIGHT` |
| OK / Enter | `KEY_ENTER` |
| Back | `KEY_RETURN` |
| Home | `KEY_HOME` |
| Menu (123) | `KEY_MORE` |
| Menu (≡) | `KEY_MENU` |
| Mute | `KEY_MUTE` |
| Volume Up | `KEY_VOLUP` |
| Volume Down | `KEY_VOLDOWN` |
| Channel Up | `KEY_CHUP` |
| Channel Down | `KEY_CHDOWN` |
| Play/Pause | `KEY_ENTER` |

---

## License

MIT License — free to use, modify, and distribute.
If you find this useful, please ⭐ star the repo!
