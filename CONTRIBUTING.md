<!-- markdownlint-disable -->

# Contributing <!-- omit in toc -->

## Introduction

Read the following documentation.

---

## Table of Contents <!-- omit in toc -->

- [Introduction](#introduction)
- [Development](#development)
  - [Environments and Primary Branches](#environments-and-primary-branches)
    - [Next.js (Frontend)](#nextjs-frontend)
    - [WordPress (Backend)](#wordpress-backend)
  - [Git Workflow](#git-workflow)
  - [PR Preview Deployments](#pr-preview-deployments)
  - [Code Linting](#code-linting)
  - [Tips for a successful PR](#tips-for-a-successful-pr)
- [Storybook](#storybook)

---

## Development

### Environments and Primary Branches

There are several environments when working with Headless WordPress, both for the Frontend and the Backend.

#### Next.js (Frontend)

- [Prod](URL soon) - `main` branch - Auto deploy
- [Develop](URL soon) - `develop` branch - Auto deploy
- Preview - Auto generated with each branch and PR.

#### WordPress (Backend)

- [WP Engine Prod](URL soon) - `main` branch - Manual releases only
- [WP Engine Dev](URL soon) - `develop` branch - Auto deploy [via Buddy](URL soon)

### Git Workflow

1. Create a `feature` branch off `main`
2. Work locally adhering to coding standards
3. Merge your `feature` into `develop` to test on [WPE Dev environment](URL soon)
4. When your `feature` has been tested on WPE Dev, open a Pull Request (PR) and fill out the PR template
5. Your PR must pass assertions and the preview deployment must complete successfully
6. After peer review, the PR will be merged back into `main`
7. Repeat ♻️

### PR Preview Deployments

Deployment technologies will be connected to this Github repository and will automatically build and deploy a unique URL for each Pull Request.

### Code Linting

This project has several rulesets and uses ESLint, Prettier, and Stylelint to enforce standards.

In addition to real-time linting, you could run the following commands in your terminal.

> These commands are also used in a pre-commit hook.

Lint JavaScript:

```bash
npm run lint:js
```

Lint CSS:

```bash
npm run lint:css
```

Format your code:

```bash
npm run format
```

### Tips for a successful PR

1. Make sure your code editor supports real-time linting and has the following extensions installed:
   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
   [Editor Config for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
   [MDX](https://marketplace.visualstudio.com/items?itemName=silvenon.mdx)
2. [JSDocs](https://jsdoc.app/) are required for all JavaScript functions
3. Run `npm run build && npm run start` before submitting your PR, to ensure a successful build

---

## Storybook

To work with Storybook on your Local, run the following command:

```bash
npm run storybook
```

Stories are written in `.mdx` and should be placed next to the component.
