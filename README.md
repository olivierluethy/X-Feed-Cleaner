<div align="center">
  <img src="logo128.png" alt="X-Feed Cleaner logo" width="140" />
  <h1>X-Feed Cleaner</h1>
  <p><b>Keep focused, stay productive on X.</b><br/>A Chrome extension that strips distracting elements out of X.com (formerly Twitter) for a calmer, more intentional feed.</p>
  <p>
    <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
    <img alt="Manifest V3" src="https://img.shields.io/badge/Manifest-V3-4285F4?logo=googlechrome&logoColor=white">
    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black">
    <img alt="Chrome Extension" src="https://img.shields.io/badge/Chrome-Extension-34A853?logo=googlechrome&logoColor=white">
  </p>
</div>

---

X-Feed Cleaner removes the parts of X.com that pull you away from what you actually came for. It runs quietly in the background, hiding attention-grabbing UI on the home timeline, the explore/communities surfaces, and beyond — so the site stays usable but stops nudging you into endless scrolling.

## Features

- **Cleaner home timeline** — hides distracting modules so your feed stays focused on content.
- **Explore & Communities trimming** — removes suggested/explore clutter (`communitiesExplore`, `communitiesSuggested`) from the discovery surfaces.
- **Side-panel blocking** — strips out promotional and recommendation panels on the side rails.
- **Notification favicon reset** — replaces the tab favicon so the unread-count badge stops baiting you back.
- **Stopwatch toggle** — an optional built-in timer to keep sessions intentional.
- **Popup controls** — toggle behaviors on and off from the toolbar popup.
- **Zero-config** — works on both `x.com` and `twitter.com` as soon as it's installed.

## Tech stack

- **Chrome Extension, Manifest V3** — service-worker background, content scripts, popup UI.
- **Vanilla JavaScript** — no frameworks or build step; scripts injected directly into the page.
- **`chrome.storage`** — persists your preferences across sessions.
- **HTML / CSS** — popup and info pages (FAQ, update, downloaded).

## Getting started

This is an unpacked Chrome extension — install it in developer mode:

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the project folder.
5. Open [x.com](https://x.com) — the feed is cleaned automatically. Use the toolbar popup to adjust options.

## Project structure

```
manifest.json     # MV3 configuration, content-script wiring
background.js      # service worker
main.js            # entry content script
scripts/           # per-surface cleaners (home, communities, sideBlocking, ...)
popup.html/js      # toolbar popup UI
pages/             # FAQ, update and downloaded info pages
style.css          # injected styles
```

## License

Released under the [MIT License](LICENSE) © 2026 Olivier Lüthy. You're free to use, modify and distribute this
software, including commercially, as long as the copyright notice and license are included.

## Author

Built by **Olivier Lüthy** — [GitHub](https://github.com/olivierluethy).
