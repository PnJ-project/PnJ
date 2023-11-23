# PnJ Frontend

<br>

## Table of Contents

- [Introduction](#introduction)
- [Technology Stack and Libraries](#technology-stack-and-libraries)
- [Setting Up Development Environment](#setting-up-development-environment)
- [Router Structure](#router-structure)

<br>

## Introduction

Welcome to the frontend repository of PnJ, a smart calendar for automated scheduling and recommendations.

- **Common Features:**

  - Efficient state management using react-query and react-redux.

- **Calendar Features:**

  - Integration with react-big-calendar and Google Calendar data types.
  - Dynamic calendar implementation, including speech-to-text (STT) and drag-and-drop.

- **Recommendation Page Features:**
  - Carousel slider list view.
  - Responsive Masonry Grid Gallery view.

[Frontend Documentation](https://glitter-snow-ee2.notion.site/1b99d2e1a22b4e768013c73f86c3f351)

<br>

## Technology Stack and Libraries

| Tech               | Version | Description                |
| ------------------ | ------- | -------------------------- |
| Node.js            | 18.17.1 | JavaScript Runtime         |
| TypeScript         | 5.0.2   | JavaScript Superset        |
| React              | 18.2.0  | JavaScript Library         |
| ESLint             | 8.45.0  | JavaScript Linter          |
| Vite               | 4.4.5   | Frontend Build Tool        |
| react-query        | 3.39.3  | Data Fetching Library      |
| react-redux        | 8.1.3   | State Management Library   |
| react-big-calendar | 4.4.0   | Calendar Component Library |

<br>

## Setting Up Development Environment

#### 1. Clone the Project

```bash
git clone https://github.com/PnJ-project/PnJ.git
cd frontend
```

#### 2. Install Dependencies

Note: Node.js LTS version must be installed!
It is recommended to use pnpm as the package manager.

```bash
npm install
npm i -g pnpm
pnpm i
```

#### 3. Run the Project

Using npm

```bash
npm run dev
```

Using pnpm

```bash
pnpm run dev
```

#### 4. Build the Project

Using npm

```bash
npm run build
```

Using pnpm

```bash
pnpm build
```

<br>

## Router Structure

`/` : Main calendar and recommendation services.

`/demo` : Homepage, demo calendar, and tutorial.

`/pm` : (For developers) Page manager.

`/tm` : (For developers) Test pages.

<br>

---

<br>

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
