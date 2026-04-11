# Samsung-SolarCell-Remote-HA-Card

📱 Overview

Tired of remote buttons rendering differently on your iPhone vs. your PC? The Odin Remote Card solves the "Emoji-mismatch" and "Shifting Layout" issues found in standard YAML nesting. By using embedded SVG paths and a rigid CSS Grid, this card ensures your Netflix, YouTube, and Disney+ buttons look pixel-perfect everywhere.
✨ Key Features

    Zero Dependency Rendering: Uses raw SVG vectors for brand logos—no external URLs or OS emojis that break on mobile.

    Intelligent Play/Pause: Built-in logic to handle Samsung's KEY_PLAYPAUSE toggle or KEY_ENTER fallbacks.

    Optimized for Mobile: Replaces heavy custom:button-card nesting with a single lightweight JS element, reducing dashboard lag.

    HACS Compatible: Easily installable and updatable via the Home Assistant Community Store.

🛠️ Installation

    Add this URL as a Custom Repository in HACS (Category: Lovelace).

    Install "Odin Samsung Remote Card."

    Add the card to your dashboard:

YAML

type: custom:samsung-remote-card
entity: remote.odin
media_player: media_player.odin # For smart play/pause logic

🎨 Visual Style

    Background: Premium Anthracite (#1c1c1c) with a subtle inner-inset shadow.

    Buttons: Glossy finish with 15px-30px radius corners.

    Layout: Vertical stack with responsive grid-row distribution.
