# Claude Code Guide

Interactive learning module for getting the most out of Claude Code — for non-developers who build with AI.

## Architecture

React/Vite app at `frontend/`. Same pattern as ASX Stock Tracker and Praxis.
- Curriculum defined in `frontend/src/learn/curriculum.ts`
- Each module is a separate component in `frontend/src/learn/`
- Dark theme, mobile-first, deployed to GitHub Pages

## Key commands

```bash
cd frontend
npm run dev          # dev server on port 5175
npx tsc -b           # type-check
npm run build        # production build
```

## Rules

- `npx tsc -b` before pushing
- Module 1 is fully built; remaining modules should follow the same pattern
- Reference Travis's actual projects as examples throughout
- Use the same CSS classes as the ASX Stock Tracker learning module (shared pattern)
