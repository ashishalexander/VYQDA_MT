A modern React-based user dashboard that displays information about users fetched from a public API. This project was built with React 19 and Vite.

Features

📋 Display user information in a clean, card-based layout
🔍 Real-time search functionality that filters users by name, email, or phone
📱 Fully responsive design that works on all screen sizes
📄 Pagination support for easier navigation through large user lists
🎨 Modern UI with smooth animations and hover effects
🔄 Loading state and error handling for a better user experience

Tech Stack

React (v19.0.0) - Frontend library
Vite (v6.3.1) - Build tool and development server
Bootstrap (v5.3.5) - CSS framework for styling
React Bootstrap (v2.10.9) - React components for Bootstrap
Axios (v1.9.0) - HTTP client for API requests

Getting Started
Prerequisites

Node.js (v18.0.0 or higher recommended)
npm or yarn package manager

Installation

Clone the repository:
bashgit clone https://github.com/your-username/user-dashboard.git
cd user-dashboard

Install dependencies:
bashnpm install
# or
yarn install

Start the development server:
bashnpm run dev
# or
yarn dev

Open your browser and navigate to http://localhost:5173 (or the port shown in your terminal)

Project Structure
user-dashboard/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components
│   │   ├── Dashboard.jsx     # Main dashboard component
│   │   ├── Pagination.jsx    # Pagination component
│   │   ├── SearchBar.jsx     # Search functionality
│   │   └── UserCard.jsx      # User information card
│   ├── App.jsx         # Root component
│   ├── App.css         # Global styles
│   └── main.jsx        # Entry point
├── .eslintrc.json      # ESLint configuration
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
Usage
The application fetches user data from the JSONPlaceholder API (https://jsonplaceholder.typicode.com/users) and displays it in a card format.

