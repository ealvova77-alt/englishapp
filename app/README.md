# English Trainer

Frontend application for English practice built with React, Vite, and Tailwind CSS.

## Current Modules

- `Irregular verbs`: dictionary, quiz modes, mistakes training, progress tracking, import/export, speech synthesis
- `Exam prep`: topic-based quiz flow with saved local progress
- `Idioms`: placeholder screen for a future module

## Scripts

- `npm run dev`: start the local development server
- `npm run build`: create a production build in `dist/`
- `npm run lint`: run ESLint
- `npm run test`: run the small Node-based utility test suite
- `npm run preview`: preview the production build locally

## Project Structure

- `src/App.jsx`: module selector and top-level navigation
- `src/shared/`: shared UI, hooks, context, and utilities
- `src/units/irregular-verbs/`: main learning module
- `src/units/exam-prep/`: exam preparation flows and data
- `src/units/idioms/`: placeholder for the next module

## Persistence

The app stores user progress in `localStorage`.

- `irregular-verbs-progress`
- `app-meta`
- `app-settings`
- `exam-prep-progress`

## Notes

- The current toolchain is aligned on `vite 7` because `@tailwindcss/vite@4.2.1` does not yet support `vite 8`.
- There is no backend in this repository. All progress is local to the browser unless exported manually.
