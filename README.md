# Recipe Explorer App

A modern, responsive web application built with React that helps users discover, search, and save their favorite recipes. The application integrates with the Edamam API to provide users with access to a vast collection of recipes.

## Features

### 1. User Authentication
- Secure login and signup functionality
- Protected routes ensuring only authenticated users can access the application
- Persistent login state using localStorage

### 2. Recipe Search & Discovery
- Search through thousands of recipes from the Edamam API
- Filter recipes based on dietary preferences
- Beautiful card-based interface showing recipe details including:
  - Recipe image
  - Serving size
  - Cuisine type
  - Health labels
  - Direct link to recipe video tutorials on YouTube

### 3. Favorites System
- Save favorite recipes with a single click
- Dedicated favorites page to view all saved recipes
- Persistent storage of favorites using localStorage
- Easy toggle to add/remove recipes from favorites

### 4. User Interface
- Modern and responsive design
- Sidebar navigation for easy access to different sections
- Grid layout that adapts to different screen sizes
- Loading states with skeleton placeholders
- Clean and intuitive user experience

### 5. Recipe Card Features
- High-quality recipe images
- Serving size information
- Cuisine type indicator
- Health labels display
- Quick access to YouTube tutorials
- Heart icon for favoriting recipes

## Technical Stack

- **Frontend**: React.js
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Edamam Recipe API
- **State Management**: React Hooks
- **Storage**: Local Storage for favorites and auth state

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your Edamam API credentials
4. Start the development server: `npm run dev`

## Future Enhancements

- Backend integration with MongoDB for user data persistence
- JWT authentication for improved security
- Advanced recipe filtering options
- Social sharing features
- Personal recipe notes and modifications
- Meal planning functionality

# Run Locally

### Setup .env file

```js
VITE_APP_ID = your_edamam_app_id;
VITE_APP_KEY = your_edamam_app_key;
```

### Install dependencies

```shell
npm install
```

### Start the app

```shell
npm run dev
```

### Like and Subscribe:)
#   C h e f - s - P a l e t t e  
 