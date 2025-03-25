# GitHub Analytics Dashboard

A modern, responsive web application built with Next.js (App Router) and TypeScript that fetches and displays GitHub user data using the public GitHub REST API. This project showcases frontend development skills, including state management, theming, and modular architecture.

## Live Demo

[Deployed on Vercel](https://github-analytics-blue.vercel.app/)

## Features

1. **Mock Authentication**

   - Simple login screen with static credentials (`admin` / `admin123`).
   - Redirects to the dashboard upon successful login.
   - Client-side route protection for `/dashboard` routes.

2. **Dashboard Layout**

   - Responsive design with a sidebar for navigation and a topbar displaying the username and logout option.
   - Light/Dark mode toggle with persistent state using `localStorage`.

3. **Overview Tab**

   - Displays GitHub user data for a predefined user (e.g., `tinsaye-simeneh`).
   - Includes avatar, name, bio, public repository count, followers, and following count.
   - Fetches data from `https://api.github.com/users/{username}`.

4. **Repositories Tab**

   - Lists all public repositories for the user with name, description, language, star count, and last updated date.
   - Supports pagination with a "Load More" button.
   - Fetches data from `https://api.github.com/users/{username}/repos`.

5. **Activity Tab**

   - Shows the user’s last 10 public GitHub events with event type and date.
   - Fetches data from `https://api.github.com/users/{username}/events/public`.

6. **Settings Tab**
   - Theme toggle between light and dark modes.
   - Option to clear cached data and reset the user state.

### Additional Features

- User search functionality for any GitHub username.
- Skeleton loaders for improved UX during data fetching (with libraries like `react-loading-skeleton`).
- chart display for programming languages using chart.js

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS and Mantine UI components
- **API**: GitHub REST API (public endpoints)
- **Deployment**: Vercel

## Prerequisites

- Node.js
- npm
- Git

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/tinsaye-simeneh/github-analytics-dashboard.git
   cd github-analytics
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

## API Usage

The app consumes the following GitHub REST API endpoints:

- **User Data**: `https://api.github.com/users/{username}`
- **Repositories**: `https://api.github.com/users/{username}/repos`
- **Events**: `https://api.github.com/users/{username}/events/public`

## Deployment

### Deploy to Vercel

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run `vercel` in the project root and follow the prompts.
   - Once deployed, share the URL.

## Development Notes

- **Authentication**: Mocked with static credentials (`admin` / `admin123`) and client-side validation.
- **State Management**: Zustand with persistence via `localStorage` for auth and theme states.
- **Styling**: Tailwind CSS ensures rapid, responsive design with minimal custom CSS, mantine components for UI elements.
- **Notifications**: Basic toasts for login success/error and theme change using `react-toastify`.
- **Error Handling**: Basic loading states and error messages are implemented for API calls.
- **Scalability**: Modular structure allows easy addition of new features.

## License

This project is unlicensed for evaluation purposes.

## Contact

For questions or feedback, reach out to [tinsayesimeneh608@gmail.com](mailto:tinsayesimeneh608@gmail.com) or open an issue on this repository.
