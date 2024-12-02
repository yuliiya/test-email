# Mail Client

A project built with [Vite](https://vitejs.dev/), featuring Google authentication, styled with [Tailwind CSS](https://tailwindcss.com/).

## Features

- **Auth**: Integration using `@react-oauth/google`.
- **UI**: Built with `@heroicons/react` and styled with Tailwind CSS.
- **Data Handling**: Powered by `react-query` for caching and server-state management.
- **Type-Safe**: TypeScript and `zod` for schema validation.
- **Routing**: Dynamic routing using `react-router`.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Linting & Formatting**: ESLint, Prettier (with Tailwind plugin)
- **Dependencies**:
    - Google OAuth: `@react-oauth/google`
    - State Management: `react-query`
    - Utility: `axios`, `date-fns`
    - Icon Set: `@heroicons/react`

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or later)
- npm (v7 or later) or Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:yuliiya/test-email.git
   cd mail-client

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev
   
4. Open your browser at
   ```bash
   http://localhost:3030.
