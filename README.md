# Recruitment App

## Tech Stack

- **Next.js**
- **TypeScript**
- **TanStack Query**
- **Material UI**
- **React Hook Form + Yup**
- **Jest & React Testing Library**

## Getting Started

## Environment Variables

Before running the project, create a `.env.local` file with the following content:

```sh
NEXT_PUBLIC_API_URL=https://api.github.com
NEXT_PUBLIC_GITHUB_TOKEN=
```

### Notes on `NEXT_PUBLIC_GITHUB_TOKEN`

- This token is **not required** for the application to work.
- GitHub's Search API has request limits. To increase the limit, you can set `NEXT_PUBLIC_GITHUB_TOKEN` with a personal access token.
- **Do not use this token in production**, as it will be publicly accessible in the browser, posing a security risk.
- A proper solution would be to use a **proxy** with an API route in Next.js. The frontend would call this internal API, which would then securely handle the request to GitHub using the token. This is not implemented in the current version.
- **In production, `NEXT_PUBLIC_GITHUB_TOKEN` is not used**, but locally, you can set it up for testing purposes.

### Development

Run the development server:

```sh
yarn install
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build and start the application:

```sh
yarn install && yarn build && yarn start
```

## Key Files

The main files to look at are:

- `UserSearch.tsx` – Handles the search input and interaction
- `UserList.tsx` – Displays the list of GitHub users
- `useGithubSearch.ts` – Custom hook for fetching GitHub users
- `getUsers.ts` – Function for making API calls to GitHub

## Translations

- The application does **not** include i18n, but instead of hardcoding text in the code, translations have been extracted into a separate file for better maintainability.

## Suggested Improvement Implemented

- As part of the Handling GitHub API Rate Limits, I have implemented a mechanism to prevent excessive requests when the API rate limit is exceeded. If a 403 error occurs due to too many requests, the app pauses further requests and displays a message advising the user to wait for a minute. A retry button allows manual resumption of data fetching.

- This is my proposed enhancement to improve the app’s usability and prevent unnecessary API calls.

## Project Structure

- Constants, types, translations, and styles are **organized into separate files and directories** following best practices.

## Requirements

All project requirements have been met.

## Live version

- The app is live and can be accessed at: [https://github-search-mciechanowicz1s-projects.vercel.app/](https://github-search-mciechanowicz1s-projects.vercel.app/)
