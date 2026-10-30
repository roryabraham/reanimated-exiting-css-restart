# Reanimated web: `exiting` restarts descendant CSS animations

Minimal reproduction for a `react-native-reanimated` bug on web: when a view with an `exiting` layout animation unmounts, CSS animations running inside it restart from the beginning, including their `animationDelay`.

All of the code is in [`App.tsx`](./App.tsx). It's a blank Expo app with Reanimated added.

## Run it

```sh
npm install
npx expo start --web
```

## Steps

1. Wait for the green bar to start growing. It loops: it waits 500ms, then grows from 0% to 100% over 2s.
2. Press **Hide** while the bar is partly grown.

**Expected:** the bar keeps growing from its current width while the gray track fades out over 1s.

**Actual:** the bar snaps to 0% when the fade starts. It stays at 0% for 500ms (its `animationDelay`), then grows from zero while the track fades.

[Recording](./docs/exiting-css-restart.webm). The dark readout is test instrumentation injected by Playwright, not part of the app. It shows the bar's CSS animation clock resetting to about 0 when Hide is pressed.

## Versions

| Package | Version |
|---|---|
| react-native-reanimated | 4.7.1 (also reproduces on `4.8.0-nightly-20261029-c51fd79b3`) |
| react-native-worklets | 0.13.0 |
| react-native | 0.88.1 |
| react-native-web | 0.21.4 |
| expo | 58.0.21 |
| Browser | Chrome 156 on macOS |
