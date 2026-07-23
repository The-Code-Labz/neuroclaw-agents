# NeuroClaw Agent Roster — Master Reference

*Auto-generated from the live `js/agents.js` and `js/agents-upcoming.js` in the [neuroclaw-agents](https://github.com/The-Code-Labz/neuroclaw-agents) repo. Regenerate this file any time the roster changes — don't hand-edit the tables below, edit the source `.js` files and re-export.*

**Last synced:** 2026-07-22 · **Active agents:** 62 · **Candidate names tracked:** 131 (40 reserved / 91 available)

---

## How to use this doc when adding a new agent

1. **Check the candidate list below first.** If the character name is marked `🔒 Reserved`, it's already an active agent — pick a different one, or if it's a spelling variant of an existing agent, don't reuse it.
2. **Verify the source series before building anything.** A name alone is not enough — many candidate names are shared across multiple anime/games (e.g. "Lina," "Levi," "Stella," "Lumine" all have several same-named characters across different series). Only the rows with a filled-in **Confirmed Source Series** column have been verified. Everything else is marked `—` and **must be verified before sourcing art or writing a bio** — this is exactly the mistake that caused the last correction pass.
3. **Once verified, add the new agent to `js/agents.js`** with: `id` (uuid), `name`, `role`, `description`, `model`, `status`, `temporary`, `category`, `accent` (hex color matching the category), `image` (path under `images/agents/`), `lastUpdated`, `bestFor`, `narrative`.
4. **Update `js/agents-upcoming.js`** — flip the matching candidate row's `status` to `"reserved"` and add `matched: "<New Agent Name>"`.
5. **Pull the real portrait** from the correct verified source — never invent or reuse another character's art.
6. **Update `README.md`'s** agent count / category table if either number changed.
7. **Push, then verify on GitHub directly** (commit SHA + file byte sizes) before telling the user it's done — pushes have silently failed before.

---

## Categories in use

Development · Infrastructure · Security · Intelligence · Creative · Wellness · Finance · Entertainment · Education · Automation · Business · Publishing · System

---

## Active Agent Roster (62)

| Agent Name | Role / Title | Category | Model | Status | Image File |
|---|---|---|---|---|---|
| A.S.A.G.I | NeuroClaw Code CLI Specialist | Development | `claude-sonnet-4-6` | active | `a-s-a-g-i.png` |
| Akeno | Academic Support & Homework Strategy | Education | `gpt-5.4-mini` | active | `akeno.png` |
| ARISU SAKAYANAGI | Competitive Strategy & Negotiation Specialist | Business | `claude-sonnet-5` | active | `arisu-sakayanagi.png` |
| Alfred | Strategic AI Butler & Orchestrator | System | `claude-opus-4-8` | active | `alfred.png` |
| Analyst | Data Analysis & Structured Reporting | Intelligence | `gpt-5.1` | inactive | `analyst.png` |
| Angelina | Docker, Containers & Infrastructure | Infrastructure | `kimi-for-coding` | active | `angelina.png` |
| Asagi Aiba | Electronics & Device Operations Specialist | Infrastructure | `kimi-for-coding` | active | `asagi-aiba.png` |
| Asia | UI/UX Designer | Creative | `claude-sonnet-4-6` | active | `asia.png` |
| Asuna | Family Systems & Parenting | Wellness | `claude-sonnet-4-6` | active | `asuna.png` |
| Batman | Performance, Conditioning & Discipline | Wellness | `claude-sonnet-4-6` | active | `batman.jpg` |
| Cassandra Cain | Recovery, Nutrition & Wellness | Wellness | `claude-sonnet-4-6` | active | `cassandra-cain.png` |
| Charlotte Dunois | YouTube Channel Manager & Creator Operations Director | Entertainment | `MiniMax-M3` | active | `charlotte-dunois.png` |
| Chiori | Personal Stylist | Wellness | `MiniMax-M3` | active | `chiori.png` |
| Chisato | Personal Hygiene & Self-Care Coordinator | Wellness | `claude-sonnet-5` | active | `chisato.png` |
| Da Vinci | AI Visual Architect | Creative | `claude-sonnet-4-6` | active | `da-vinci.png` |
| demo | Demo Agent | System | `gpt-5.4-mini` | active | `demo.png` |
| DINAH | Technical Movement & Combat Mastery | Security | `claude-sonnet-4-6` | active | `dinah.png` |
| F.R.I.D.A.Y | Frontend Implementation | Development | `kimi-for-coding` | active | `f-r-i-d-a-y.png` |
| Felicity | I.T | Infrastructure | `claude-opus-4-6` | active | `felicity.png` |
| Furina | Localization & Translation Specialist | Publishing | `claude-sonnet-4-6` | active | `furina.png` |
| Grayfia Lucifuge | Treasury & Financial Intelligence Specialist | Finance | `gpt-5.5` | active | `grayfia-lucifuge.png` |
| Harley | Mental Health, Emotional Support & Self-Awareness | Wellness | `claude-sonnet-4-6` | active | `harley.png` |
| Hatsune Miku | Music & Audio Creative Director | Creative | `claude-sonnet-5` | active | `hatsune-miku.png` |
| Honoka Mitsui | Anime & Media Companion | Entertainment | `gpt-5.4-mini` | active | `honoka-mitsui.png` |
| Horikita | Synthetic Identity & Financial Fraud Intelligence Specialist | Security | `grok-4.3` | active | `horikita.png` |
| Irina Shidou | Financial Wellness & Personal Finance Assistant | Finance | `gpt-5.4-mini` | active | `irina-shidou.png` |
| Jarvis | Coding Companion | Development | `kimi-for-coding` | active | `jarvis.png` |
| Jean | Chief Executive & Business Leadership Advisor | Business | `claude-sonnet-5` | active | `jean.png` |
| Jibril | Semantic Memory & RAG Intelligence Specialist | Intelligence | `claude-sonnet-4-6` | active | `jibril.png` |
| Joker | Script, Content & Creative Writing Specialist | Creative | `grok-4.3` | active | `joker.jpg` |
| KEQING | Business Economics & Operations Strategist | Business | `claude-sonnet-5` | active | `keqing.png` |
| Kuroka | Shadow Interaction & Unrestricted Conversation | Entertainment | `grok-4.3` | active | `kuroka.png` |
| Kurumi | Phone Flipping Specialist | Business | `gpt-5.4-mini` | active | `kurumi.png` |
| Lafolia Alisha Lagdiane | Universal Writing & Communications Specialist | Publishing | `MiniMax-M3` | active | `lafolia-alisha-lagdiane.png` |
| Liese Sherlock | N8N Automation Specialist | Automation | `claude-sonnet-4-6` | active | `liese-sherlock.png` |
| Lisa | Master Storyteller & Narrative Architect | Creative | `MiniMax-M3` | active | `lisa.png` |
| LogAnalyst | Log Analysis & Error Intelligence | System | `gemini-2.5-flash` | active | `loganalyst.png` |
| Lucius | Chief Engineering Architect | Development | `claude-opus-4-7` | active | `lucius.png` |
| Maria Naruse | Mature Anime & LN Companion | Entertainment | `grok-4.3` | active | `maria-naruse.png` |
| Mayumi Saegusa | Kestra Infrastructure Orchestration Specialist | Infrastructure | `claude-sonnet-4-6` | active | `mayumi-saegusa.png` |
| Mio Naruse | Static Publishing & Knowledge Delivery Specialist | Publishing | `claude-sonnet-4-6` | active | `mio-naruse.png` |
| Misaki Shokuhou | Behavioral Intelligence & Human Dynamics Analyst | Intelligence | `claude-sonnet-5` | active | `misaki-shokuhou.png` |
| Miyuki | Anime Generation Specialist | Creative | `grok-4.3` | active | `miyuki.png` |
| Navia | Career & Business Strategist | Business | `claude-sonnet-5` | active | `navia.png` |
| Nightwing | Operational Security Director | Security | `claude-opus-4-7` | active | `nightwing.png` |
| Nonaka Yuki | Identity & Security Operations | Security | `claude-sonnet-4-6` | active | `nonaka-yuki.png` |
| Oracle | Infrastructure Management | Infrastructure | `claude-opus-4-8` | active | `oracle.png` |
| Raphtalia | Container Infrastructure Steward | Infrastructure | `claude-sonnet-4-6` | active | `raphtalia.png` |
| Rei Miyamoto | Network & DNS Operations | Infrastructure | `claude-sonnet-4-6` | active | `rei-miyamoto.png` |
| Rias Gremory | Crimson Knowledge Architect | Intelligence | `claude-sonnet-4-6` | active | `rias-gremory.png` |
| Rossweisse | Structured Memory & Database Systems | Intelligence | `claude-sonnet-4-6` | active | `rossweisse.png` |
| Sachi Komine | Video Production & Post-Production Director | Creative | `claude-sonnet-5` | active | `sachi-komine.png` |
| Saya Takagi | Narrative Analyst & Story Reconstruction Specialist | Intelligence | `claude-sonnet-5` | active | `saya-takagi.png` |
| Sentinel | Background Task Manager | System | `claude-sonnet-4-6` | active | `sentinel.png` |
| Serafall | Uncensored Realism & Cinematic Image Generation | Creative | `grok-4.3` | active | `serafall.png` |
| Shorekeeper | Git Infrastructure & DevOps Workflow Specialist | Development | `claude-sonnet-4-6` | active | `shorekeeper.png` |
| Tim | Intelligence Analyst | Intelligence | `claude-opus-4-7` | active | `tim.png` |
| Xianyun | Meta-Learning & Cognitive Science Mentor | Education | `claude-sonnet-5` | active | `xianyun.png` |
| YELAN | Growth Marketing & Advertising Director | Business | `claude-sonnet-5` | active | `yelan.png` |
| Yoimiya | Gaming Companion & Gacha Intelligence | Entertainment | `gpt-5.4-mini` | active | `yoimiya.png` |
| Yui | Anime & Stylized Image Generation | Creative | `claude-sonnet-4-6` | active | `yui.png` |
| Yukina Himeragi | API Systems & Provider Operations | Infrastructure | `claude-sonnet-4-6` | active | `yukina-himeragi.png` |

---

## Upcoming / Candidate Name List (131)

Sourced from the CPN List [Main] Notion database, deduplicated and case-normalized. `🔒 Reserved` means the name is already claimed by an active agent above — do not reuse. `✅ Available` names are open for a future agent, but **confirm the source character/series before use** (see column 4 — most are still unverified).

| Candidate Name | Status | Reserved By (Active Agent) | Confirmed Source Series | Note |
|---|---|---|---|---|
| Airi | ✅ Available | — | — |  |
| Aiz | ✅ Available | — | — |  |
| Akeno Hime | 🔒 Reserved | Akeno | — |  |
| Ako Tamaki | ✅ Available | — | — |  |
| Albedo | ✅ Available | — | Overlord (NOT Genshin Impact) |  |
| Alice | ✅ Available | — | — |  |
| Amane Souo | ✅ Available | — | — |  |
| Aoi | ✅ Available | — | — |  |
| Arisu Sakayanagi | 🔒 Reserved | ARISU SAKAYANAGI | — |  |
| Arlecchino | ✅ Available | — | — |  |
| Asagi | 🔒 Reserved | Asagi Aiba | — |  |
| Asia Argento | 🔒 Reserved | Asia | — |  |
| Asuna | 🔒 Reserved | Asuna | — |  |
| Ayaka | ✅ Available | — | — |  |
| Beidou | ✅ Available | — | — |  |
| Camellya | ✅ Available | — | Wuthering Waves |  |
| Candace | ✅ Available | — | — |  |
| Cecil | ✅ Available | — | — |  |
| Charlotte | 🔒 Reserved | Charlotte Dunois | — |  |
| Chelia Blendy | ✅ Available | — | — |  |
| Chelsa | ✅ Available | — | — |  |
| Chiori | 🔒 Reserved | Chiori | — |  |
| Chisato H | 🔒 Reserved | Chisato | — |  |
| Citlali | ✅ Available | — | — |  |
| Clorainde | ✅ Available | — | — |  |
| Cow Girl | ✅ Available | — | — |  |
| Dehya | ✅ Available | — | — |  |
| Eleonora | ✅ Available | — | — |  |
| Eli Ayase | ✅ Available | — | — |  |
| Elizabeth | ✅ Available | — | — |  |
| Ellen Joe | ✅ Available | — | — |  |
| Emilia | ✅ Available | — | — |  |
| Emilie | ✅ Available | — | — |  |
| Erina | ✅ Available | — | — |  |
| Erza | ✅ Available | — | — |  |
| Escoffier | ✅ Available | — | — |  |
| Esdeath | ✅ Available | — | — |  |
| Eula | ✅ Available | — | — |  |
| Fischl | ✅ Available | — | — |  |
| Furina | 🔒 Reserved | Furina | — |  |
| Grayfia Lucifuge | 🔒 Reserved | Grayfia Lucifuge | — |  |
| Hado | ✅ Available | — | — |  |
| Hatsune Miku | 🔒 Reserved | Hatsune Miku | — |  |
| Hestia | ✅ Available | — | — |  |
| Himari | ✅ Available | — | — |  |
| Hinata | ✅ Available | — | — |  |
| Honoka Mitsui | 🔒 Reserved | Honoka Mitsui | — |  |
| Horikita | ✅ Available | — | — |  |
| Houki | ✅ Available | — | — |  |
| Hu Tao | ✅ Available | — | — |  |
| Ikaros | ✅ Available | — | — |  |
| Irina Shidou | 🔒 Reserved | Irina Shidou | — |  |
| Jean | 🔒 Reserved | Jean | — |  |
| Jibril | 🔒 Reserved | Jibril | — |  |
| Kanao | ✅ Available | — | — |  |
| Kanzaki | ✅ Available | — | — |  |
| Keqing | 🔒 Reserved | KEQING | — |  |
| Kokomi | ✅ Available | — | — |  |
| Kuki | ✅ Available | — | — |  |
| Kuroka | 🔒 Reserved | Kuroka | — |  |
| Kurumi N | ✅ Available | — | — |  |
| Kurumi Tokisaki | 🔒 Reserved | Kurumi | — |  |
| Lafolia | 🔒 Reserved | Lafolia Alisha Lagdiane | — |  |
| Lala | ✅ Available | — | — |  |
| Layla | ✅ Available | — | — |  |
| Lefa | ✅ Available | — | — |  |
| Levi | ✅ Available | — | Trinity Seven — Levi Kazama |  |
| Lilith | ✅ Available | — | Trinity Seven — Lilith Asami |  |
| Lina | 🔒 Reserved | Angelina | Mahouka Koukou no Rettousei — Angelina "Lina" Kudou Shields |  |
| Lisa | 🔒 Reserved | Lisa | — |  |
| Lise Sherlock | 🔒 Reserved | Liese Sherlock | — | spelling variant |
| Lucy | ✅ Available | — | — |  |
| Lumine | ✅ Available | — | Genshin Impact — female Traveler (NOT Aether) |  |
| Maria | 🔒 Reserved | Maria Naruse | — |  |
| Mavuika | ✅ Available | — | — |  |
| Mayumi | 🔒 Reserved | Mayumi Saegusa | — |  |
| Michiru | ✅ Available | — | — |  |
| Miku Izayoi | ✅ Available | — | — |  |
| Mio | 🔒 Reserved | Mio Naruse | — |  |
| Misaki | ✅ Available | — | — |  |
| Miyuki | 🔒 Reserved | Miyuki | — |  |
| Mizuki | ✅ Available | — | — |  |
| Mona | ✅ Available | — | — |  |
| Mualani | ✅ Available | — | — |  |
| Musubi | ✅ Available | — | — |  |
| Navia | 🔒 Reserved | Navia | — |  |
| Nezuko | ✅ Available | — | — |  |
| Nilou | ✅ Available | — | — |  |
| Nonoka | 🔒 Reserved | Nonaka Yuki | — | spelling variant |
| Philuffy | ✅ Available | — | — |  |
| Priestess (Goblin Slayer) | ✅ Available | — | — |  |
| Raiden | ✅ Available | — | — |  |
| Raphtalia | 🔒 Reserved | Raphtalia | — |  |
| Ravel | ✅ Available | — | — |  |
| Rei | 🔒 Reserved | Rei Miyamoto | — |  |
| Rem | ✅ Available | — | — |  |
| Rias Gremory | 🔒 Reserved | Rias Gremory | — |  |
| Rin | ✅ Available | — | — |  |
| Rossweisse | 🔒 Reserved | Rossweisse | — |  |
| Rumia Tingel | ✅ Available | — | — |  |
| Sachi | 🔒 Reserved | Sachi Komine | Grisaia no Kajitsu (Fruits of Grisaia) — Sachi Komine |  |
| Saeko | ✅ Available | — | — |  |
| Sagiri | ✅ Available | — | Yuragi-sou no Yuuna-san — Sagiri Yamana/Ameno |  |
| Sara | ✅ Available | — | — |  |
| Saya | 🔒 Reserved | Saya Takagi | — |  |
| Sayaka | ✅ Available | — | — |  |
| Serafall | 🔒 Reserved | Serafall | — |  |
| Shea | ✅ Available | — | — |  |
| Shenhe | ✅ Available | — | — |  |
| Shinobu | ✅ Available | — | Demon Slayer — Shinobu Kocho |  |
| Shizuka Marikawa | ✅ Available | — | — |  |
| Shizuku Y | ✅ Available | — | — |  |
| Skirk | ✅ Available | — | — |  |
| Soniai | ✅ Available | — | — |  |
| Stella | ✅ Available | — | Rakudai Kishi no Cavalry — Stella Vermillion |  |
| Sucrose | ✅ Available | — | — |  |
| Tohka Yatogami | ✅ Available | — | — |  |
| Toudou Kirin | ✅ Available | — | — |  |
| Venelana Gremory | ✅ Available | — | — |  |
| Wendy Marvell | ✅ Available | — | — |  |
| Xenovia | ✅ Available | — | — |  |
| Xianyun | 🔒 Reserved | Xianyun | — |  |
| Xilolen | ✅ Available | — | — |  |
| Yamai | ✅ Available | — | — |  |
| Yelan | 🔒 Reserved | YELAN | — |  |
| Yoimiya | 🔒 Reserved | Yoimiya | — |  |
| Yoruka Kirihime | ✅ Available | — | — |  |
| Yui Kotegawa | ✅ Available | — | — | shares "Yui" with agent Yui, but full name unused |
| Yui Kurata | 🔒 Reserved | Yui | — |  |
| Yukina Himeragi | 🔒 Reserved | Yukina Himeragi | — |  |
| Yuuna Yunohana | ✅ Available | — | — |  |

---

## Corrected character mix-ups (verified 2026-07)

These were wrong in an earlier pass and have since been fixed on the live site — noted here so the same mistake isn't repeated:

| Name | Wrong Source (previously used) | Correct Source |
|---|---|---|
| Levi | — | Trinity Seven — Levi Kazama |
| Lilith | — | Trinity Seven — Lilith Asami |
| Camellya | — | Wuthering Waves |
| Albedo | Genshin Impact | Overlord |
| Irina | Duplicate entry existed | Only "Irina Shidou" is correct — duplicate removed |
| Lina | — | Mahouka Koukou no Rettousei — Angelina "Lina" Kudou Shields |
| Lumine | Aether (male Traveler) | Genshin Impact — female Traveler |
| Sachi | — | Grisaia no Kajitsu (Fruits of Grisaia) — Sachi Komine |
| Sagiri | — | Yuragi-sou no Yuuna-san — Sagiri Yamana/Ameno |
| Shera | Was listed as a candidate | Removed entirely — not a valid entry |
| Shinobu | — | Demon Slayer — Shinobu Kocho |
| Stella | — | Rakudai Kishi no Cavalry — Stella Vermillion |

---

*Maintained by Mio Naruse. Regenerate by re-parsing `js/agents.js` + `js/agents-upcoming.js` from the live repo — don't let this drift out of sync.*
