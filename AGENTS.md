# EventHubApp

School project: event-discovery app UI, built 1:1 from a Figma kit. **Scope = interface only** — every screen renders static dummy data; no backend, no network calls, no persistence, no real auth (buttons just navigate).

- **Stack:** Expo SDK 57 · React Native 0.86 · React 19 · TypeScript ~6 · React Navigation v7 (native-stack + drawer + bottom-tabs) · react-native-reanimated 4 · @expo/vector-icons (Ionicons)
- **Entry:** `index.js` → `registerRootComponent` → **`App.tsx`** (the whole route tree lives here). `App.js` is a leftover Expo template — Metro resolves `./App` to `App.tsx`; treat `App.js` as dead.
- **Config:** `app.json` (Expo), `tsconfig.json` (extends `expo/tsconfig.base`). No env vars, no `.env`.
- **npm project** — `package-lock.json` present, use `npx` (never `bunx`).

Governance rules: ~/.config/opencode/AGENTS.md

## Architecture

- `App.tsx` — route tree:
  - `Auth` stack: Splash → Onboarding → SignIn → SignUp → Verification → ResetPassword
  - `Main` = Drawer (`CustomDrawer`, width 270) → `HomeTabs` bottom tabs with `CustomTabBar`: Explore · Events · center FAB → Filter (modal) · Map · Profile
  - root stack screens: EventDetails, SeeAllEvents, Filter, Notification, Search, OrganizerProfile, InviteFriend
- `src/navigation/` — `CustomTabBar.tsx` (5 slots, active accent `#5669FF`), `CustomDrawer.tsx`
- `src/screens/` — 16 `*Screen.tsx`, each self-contained: inline dummy data + `StyleSheet.create` + reanimated entering animations (`FadeInDown`/`FadeInUp`)
- `anhmau/` — 2,879 PNG slices exported from Figma, grouped into 25 screen folders by `anhmau/organize.py` (ID-range grouping; the numeric prefix is the Figma layer order). **Visual source of truth** — compare screens against these slices, never against memory.
- `anhcheck/` — reference screenshots for visual QA.
- `nhatky.md` — Vietnamese agent work log; append a dated entry after meaningful work.
- No state layer: navigation params + local `useState` only.

## Commands

```bash
npx expo start --web        # dev server; app renders inside a 480px phone frame (App.tsx)
npx tsc --noEmit            # typecheck — the only automated gate (no lint, no tests)
npx expo install <pkg>      # ALWAYS add deps this way (SDK-compatible versions)
npx expo export --platform web --output-dir <dir>   # build smoke test; catches broken requires
```

Verification gate: `npx tsc --noEmit` must exit 0 after every change.

## Testing

No test framework, no ESLint config (`npx expo lint` has nothing to run). Quality = typecheck + web export + visual diff: run `npx expo start --web`, screenshot the screen, compare against `anhmau/<screen_folder>/` slices and `anhcheck/` screenshots.

## Naming & layout

- Screen: `src/screens/<Feature>Screen.tsx`; register its route in `App.tsx`.
- Assets: `require('../../anhmau/<folder>/<id>_<name>.png')`. Reuse across screens is normal (SignUp borrows `sign_in/`, Search/InviteFriend borrow avatars from `notification/`, OrganizerProfile borrows `see_all_events/` + `home_/`).
- Dummy data: `const` arrays at top of each screen file.

## Quirks

- **`anhmau/` is a runtime dependency** — ~80 `require()` call sites point into it. Renaming/deleting anything inside breaks the bundle; confirm with `npx expo export`. It is 10.6 MB and may still be untracked in git — `git status` before assuming a clone is complete.
- **`nhatky.md` mixed encoding** — past entries were appended via PowerShell `Add-Content -Encoding Unicode`, so the file is UTF-8 (entry 1) + UTF-16LE (rest) and reads as binary. Append only as UTF-8; if it reads as binary, decode: bytes up to the first NUL are UTF-8, the remainder is UTF-16LE.
- `anhmau/nhatky.md` is an older mojibake copy — root `nhatky.md` is the live log.
- Route names `Search` and `Notification` are registered in BOTH RootStack and Drawer — navigate explicitly (`navigate('Main', { screen: ... })` vs root) to avoid ambiguity.
- Expo SDK 57 postdates most training data: verify Expo/RN APIs at https://docs.expo.dev/versions/v57.0.0/ or https://docs.expo.dev/llms.txt before using them from memory.
- `ios/`, `android/` intentionally absent (Continuous Native Generation) — native config belongs in `app.json` only.
