# 🧠 NeuroClaw Agent Registry

[![Live Site](https://img.shields.io/badge/Live%20Site-Protected-8b5cf6?style=flat-square&logo=cloudflare&logoColor=white)](https://agents.neurolearninglabs.com)
[![Agents](https://img.shields.io/badge/Agents-84-10b981?style=flat-square)](https://agents.neurolearninglabs.com)
[![License](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](LICENSE)

> The complete catalog of every AI specialist in the NeuroClaw ecosystem.

[🌐 **View Live Registry →**](https://agents.neurolearninglabs.com) *(requires Authelia SSO login — not publicly indexed)*

---

## Overview

The **NeuroClaw Agent Registry** is a fully static, single-page website that catalogs every AI agent in the NeuroClaw ecosystem. Browse agents by category, search by name or capability, and explore detailed profiles for each specialist.

### Features

- 🔍 **Live Search** — Real-time filtering by name, role, description, or model
- 🏷️ **Category Filters** — 13 categories with live agent counts
- 🎴 **Grid / List Views** — Toggle between card grid and compact list layouts
- 👤 **Detail Modals** — Click any agent for full profile with metadata
- 📊 **Animated Stats** — Hero section with live agent & category counts
- 🎨 **Dark Premium UI** — Cinematic dark theme with neural network hero banner
- ⌨️ **Keyboard Shortcuts** — `Ctrl + K` to search, `Esc` to close modal
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile
- 🚀 **Zero Dependencies** — Pure HTML, CSS, and vanilla JavaScript

---

## Architecture

```
neuroclaw-agents/
├── index.html           # Main page with hero, controls, and registry grid
├── css/
│   └── style.css        # Complete styling — dark theme, animations, responsive
├── js/
│   ├── agents.js        # Agent data (84 active agents, 13 categories)
│   └── app.js           # Search, filters, modal, view toggle logic
├── images/
│   └── hero-banner.jpg  # AI-generated neural network hero background
└── README.md            # This file
```

---

## Agent Categories

| Category | Count | Description |
|----------|-------|-------------|
| Development | 6 | Code, frontend, CLI, and architecture |
| Infrastructure | 9 | DevOps, containers, networking, cloud, home/local media operations |
| Security | 5 | Operational and identity security, fieldcraft & survival |
| Intelligence | 10 | Research, analysis, memory, knowledge, narrative reconstruction, behavioral intelligence |
| Creative | 18 | Visual art, writing, UI/UX, image generation, music, storytelling, video production, manga adaptation, mature narrative direction, 3D modeling, 3D animation, interior design, photo archiving |
| Wellness | 8 | Fitness, nutrition, mental health, family, self-care, styling, first aid & emergency medicine, patient care |
| Finance | 3 | Treasury, personal finance, investment markets & trading |
| Entertainment | 8 | Anime, gaming, media companions, creator operations, VTuber hosting, livestreaming, voice performance |
| Education | 2 | Academic support, meta-learning & cognitive science |
| Automation | 1 | Workflow automation |
| Business | 6 | Commerce & flipping, career & business strategy, executive leadership, negotiation, economics, growth marketing |
| Publishing | 3 | Static sites, knowledge delivery, writing & communications, editorial quality |
| System | 5 | Orchestration, monitoring, stewardship, demo |

---

## Tech Stack

- **HTML5** — Semantic markup, accessibility
- **CSS3** — CSS variables, Grid, Flexbox, backdrop-filter, animations
- **Vanilla JavaScript** — No frameworks, no build step
- **nginx + Traefik + Authelia** — Origin served from a private container, gated by SSO and a Cloudflare-only ingress allowlist at `agents.neurolearninglabs.com`; deploy is a git pull on the origin host after pushing to `main` (not GitHub Pages — Pages auto-redirects to the protected domain but is no longer the real host)

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/The-Code-Labz/neuroclaw-agents.git
cd neuroclaw-agents

# Serve locally (Python 3)
python -m http.server 8080

# Or with Node.js
npx serve .
```

Then open [http://localhost:8080](http://localhost:8080).

---

## Adding or Updating Agents

Agent data lives in `js/agents.js`. Each agent follows this structure:

```javascript
{
  id: "uuid-string",
  name: "Agent Name",
  role: "Short Role Description",
  description: "Full capability description",
  model: "AI model identifier",
  status: "active|inactive",
  temporary: false,
  category: "Category Name",
  accent: "#hexcolor"
}
```

To add a new agent:
1. Append to the `AGENTS` array in `js/agents.js`
2. Update the category count in `CATEGORIES` if it's a new category
3. Commit and push — GitHub Pages auto-deploys

---

## Roadmap

- [x] Initial registry with 39 agents
- [x] Search and category filtering
- [x] Grid / list view toggle
- [x] Agent detail modals
- [x] Hero banner with AI-generated background
- [x] Open Graph / Twitter Card meta tags
- [x] Agent profile images (pulled from dashboard avatars)
- [x] Roster expanded to 54 agents (2026-07-07)
- [x] Roster expanded to 59 agents (2026-07-14)
- [x] Roster expanded to 60 agents (2026-07-15)
- [x] Roster expanded to 62 agents (2026-07-22)
- [x] Roster expanded to 67 agents (2026-08-01)
- [x] Removed phantom "Furina" entry — never an actual active agent; name held for a future acting/voice-acting agent (roster now 66)
- [x] Furina added back as a real agent (Acting, Voice Performance & Speech Production Director)
- [x] Site moved behind Authelia SSO + Cloudflare-only Traefik ingress at `agents.neurolearninglabs.com` (no longer publicly indexed)
- [x] Added click-to-enlarge image lightbox for profile portraits
- [x] Roster expanded to 84 agents (2026-10-13) — added Erina Nakiri, Kamisato Ayaka, Kuki Shinobu, Ravel Phenex, Sakura Haruno, Shizuka Marikawa; refreshed every agent's profile image from the latest dashboard avatars; corrected ~48 `model` fields and 8 mismatched `id` fields to match the live agent database
- [ ] Dark / light mode toggle
- [ ] Sorting options (by name, model, status)
- [ ] Agent relationship graph
- [ ] Individual agent detail pages

---

## License

MIT — feel free to fork and adapt for your own agent ecosystem.

---

Built with 💜 by **Mio Naruse** for the NeuroClaw ecosystem.
