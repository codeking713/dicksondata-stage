# Next.js WordPress Frontend

A Next.js website for DicksonData. Used as the "frontend" for our [WordPress Dickson Backend](https://github.com/digital-authority-partners/dickson-headless-wp-backend).

---

## Setup

The below will assist in setting up the frontend. If you haven't already please first setup the [WordPress Dickson Backend](https://github.com/digital-authority-partners/dickson-headless-wp-backend/blob/main/README.md)

### Dependencies

Before you get started, make sure you have the following dependencies installed on your computer:

- [Node 14](https://nodejs.org/en/)
- [NPM 7](https://nodejs.org/en/)

You can check with `node -v` and `npm -v` respectively. If you need to download Node I recommend using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) which will allow you to easily download several versions of Node (and the associated nvm) without needing to setup aliases and configurations.

### Installation

1. Clone the repo `git clone https://github.com/digital-authority-partners/dickson-headless-wp-frontend.git`

2. Change directories `cd dickson-headless-wp-frontend`

3. Install the dependencies `npm i`

### Setup Environment Variables

These variables are required in order for things like authentication with WordPress and other 3rd party services. The below env file is for the local development environment. As additional environments are introduced other env files will be needed with appropriate variables.

1. Copy the sample ENV file:

```
cp .env.sample .env
```

2. Open the .env file in your code editor

3. Follow the notes, add your credentials and save the file

### Start the Dev Server

Run the below command to start the dev server

```
npm run dev
```

### (Optional) Browse Components

You can look at documented components and alter their state using the configured [Storybook](https://github.com/storybookjs/storybook) module.

Run storybook with the below

```
npm run storybook
```

More documentation about how to setup your own storybook components is forthcoming.

---

## Frontend Features

- Algolia Search
- Apollo Client
- Atomic Design
- CSS/SCSS Modules
- ESLint
- Formik
- Incremental Static Regeneration
- JSDocs
- NextAuth
- Next/Image Support
- Prettier
- SEO
- Sitemaps
- Static Generation
- Storybook
- Stylelint

---

## Contributing

Learn how to best [contribute to this project](https://github.com/digital-authority-partners/dickson-headless-wp-frontend/blob/master/CONTRIBUTING.md).
