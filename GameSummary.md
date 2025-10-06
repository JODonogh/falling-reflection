# Falling Reflection — Game Summary

## Overview
Falling Reflection is a small arcade-style game with a fixed play area where the player navigates falling objects, jumps between platforms, and accumulates score. The project is split into a React frontend (frontend/) and a Spring Boot backend (backend/) with a Dockerized PostgreSQL database (database/).

## Gameplay
Players control an avatar that moves left/right and jumps to avoid hazards and land on platforms. The primary objective is to survive as long as possible and score points through distance, successful landings, or collectibles. Scores are submitted to a backend leaderboard that stores top results.

## Controls
- Move left / right: keyboard (e.g., Arrow keys or A/D).
- Jump: Space or Up arrow.
- UI actions: pause, restart, submit score via on-screen buttons or keyboard shortcuts.

## Rules & Scoring
- Colliding with hazards ends the run.
- Remaining within the visible game-world yields incremental score or distance.
- Bonus points for collecting items or performing specific actions.
- Top scores are persisted and visible in a leaderboard endpoint.

## Game Area & Graphics
- Play area is a fixed-size container (800×600 px) with `position: relative;` so absolutely positioned child elements use it as the coordinate origin.
- Elements are rendered as HTML divs with classes like `shape` and `platform`. Example resulting class: `class="shape platform"`, so both `.shape` and `.platform` rules apply.
- Inline style props set per-shape geometry (width, height, left, bottom) while shared visuals live in CSS.
- `overflow: hidden;` ensures off-screen elements are clipped; alternatives include `visible`, `auto`, or `scroll`.

## Audio & Effects
- Optional sound effects for jump, land, hit, and score.
- Use native HTML5 Audio or a library like Howler.js for cross-browser playback.

## Frontend Architecture
- Built with Create React App.
- Components: GameWorld, Shape, Player, HUD, Leaderboard, and API client.
- Game loop: use `requestAnimationFrame` with delta-time updates for physics and animations.
- Local state manages physics, entities, and input. Consider separating rendering and logic for maintainability.

## Backend Architecture
- Spring Boot app exposes REST endpoints for score submission and leaderboard retrieval.
- Typical endpoints:
  - POST /api/scores — submit a score
  - GET /api/scores — retrieve top scores
- Data model: `players(id, username, password_hash)` and `scores(id, player_id, score, created_at)`.

## Database & Docker
- Docker Compose runs Postgres with environment vars: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.
- `init.sql` initializes tables on first container start. Note: env vars apply only on first initialization — remove the volume (`docker-compose down -v`) to reinitialize credentials.
- On Windows, use `host.docker.internal` or mapped `localhost:5432` (ensure no local Postgres conflicts).

## Testing & CI
- Backend unit and integration tests may require DB availability or testcontainers.
- On Windows, ensure Dockerized DB is reachable and not blocked by local services or firewall.
- Frontend tests run via CRA test runner; use mocked APIs for unit tests.

## Build & Run
- Database:
  - docker-compose down -v
  - docker-compose up -d
- Backend:
  - ./gradlew bootRun (or gradlew bootRun on Windows)
- Frontend (dev):
  - npm install
  - npm start
- Frontend (prod build):
  - npm run build

## Troubleshooting (common issues)
- Password authentication failed → stale DB volume; run `docker-compose down -v` then `docker-compose up -d`.
- Port 5432 conflict → stop local PostgreSQL service or change Docker port mapping.
- Line endings in `init.sql` → convert to LF if SQL parsing problems occur.
- VS Code Java language server hangs → ensure `JAVA_HOME` is correct, restart VS Code, and run `gradlew clean`.

## Contribution & Repository Notes
- Keep node_modules and build artifacts out of version control. Add `node_modules/` and Java build dirs to `.gitignore`.
- Use branches and pull requests for feature changes; include a short description of gameplay and API changes.
- Include a README section with setup steps and environment variable expectations.

---

This document is a concise reference for the game's purpose, major systems, and developer workflow. Update it as features and architecture evolve.
```// filepath: e:\Coding\Falling Reflection\GameSummary.md
# Falling Reflection — Game Summary

## Overview
Falling Reflection is a small arcade-style game with a fixed play area where the player navigates falling objects, jumps between platforms, and accumulates score. The project is split into a React frontend (frontend/) and a Spring Boot backend (backend/) with a Dockerized PostgreSQL database (database/).

## Gameplay
Players control an avatar that moves left/right and jumps to avoid hazards and land on platforms. The primary objective is to survive as long as possible and score points through distance, successful landings, or collectibles. Scores are submitted to a backend leaderboard that stores top results.

## Controls
- Move left / right: keyboard (e.g., Arrow keys or A/D).
- Jump: Space or Up arrow.
- UI actions: pause, restart, submit score via on-screen buttons or keyboard shortcuts.

## Rules & Scoring
- Colliding with hazards ends the run.
- Remaining within the visible game-world yields incremental score or distance.
- Bonus points for collecting items or performing specific actions.
- Top scores are persisted and visible in a leaderboard endpoint.

## Game Area & Graphics
- Play area is a fixed-size container (800×600 px) with `position: relative;` so absolutely positioned child elements use it as the coordinate origin.
- Elements are rendered as HTML divs with classes like `shape` and `platform`. Example resulting class: `class="shape platform"`, so both `.shape` and `.platform` rules apply.
- Inline style props set per-shape geometry (width, height, left, bottom) while shared visuals live in CSS.
- `overflow: hidden;` ensures off-screen elements are clipped; alternatives include `visible`, `auto`, or `scroll`.

## Audio & Effects
- Optional sound effects for jump, land, hit, and score.
- Use native HTML5 Audio or a library like Howler.js for cross-browser playback.

## Frontend Architecture
- Built with Create React App.
- Components: GameWorld, Shape, Player, HUD, Leaderboard, and API client.
- Game loop: use `requestAnimationFrame` with delta-time updates for physics and animations.
- Local state manages physics, entities, and input. Consider separating rendering and logic for maintainability.

## Backend Architecture
- Spring Boot app exposes REST endpoints for score submission and leaderboard retrieval.
- Typical endpoints:
  - POST /api/scores — submit a score
  - GET /api/scores — retrieve top scores
- Data model: `players(id, username, password_hash)` and `scores(id, player_id, score, created_at)`.

## Database & Docker
- Docker Compose runs Postgres with vars: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.
- `init.sql` initializes tables on first container start. Note: env vars apply only on first initialization — remove the volume (`docker-compose down -v`) to reinitialize credentials.
- On Windows, use `host.docker.internal` or mapped `localhost:5432` (ensure no local Postgres conflicts).

## Testing & CI
- Backend unit and integration tests may require DB availability or testcontainers.
- On Windows, ensure Dockerized DB is reachable and not blocked by local services or firewall.
- Frontend tests run via CRA test runner; use mocked APIs for unit tests.

## Build & Run
- Database:
  - docker-compose down -v
  - docker-compose up -d
- Backend:
  - ./gradlew bootRun (or gradlew bootRun on Windows)
- Frontend (dev):
  - npm install
  - npm start
- Frontend (prod build):
  - npm run build

## Troubleshooting (common issues)
- Password authentication failed → stale DB volume; run `docker-compose down -v` then `docker-compose up -d`.
- Port 5432 conflict → stop local PostgreSQL service or change Docker port mapping.
- Line endings in `init.sql` → convert to LF if SQL parsing problems occur.
- VS Code Java language server hangs → ensure `JAVA_HOME` is correct, restart VS Code, and run `gradlew clean`.

## Contribution & Repository Notes
- Keep node_modules and build artifacts out of version control. Add `node_modules/` and Java build dirs to `.gitignore`.
- Use branches and pull requests for feature changes; include a short description of gameplay and API changes.
- Include a README section with setup steps and environment variable expectations.

---

This document is a concise reference for the game's purpose, major systems, and developer workflow. Update it as features and architecture evolve.