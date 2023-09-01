# MERN Social Media Website

#### Website Link: https://sociallyy.netlify.app/

##### Note: Potential Backend Delay

- Please be aware that there may be delays in the response time of this application, especially during periods of high usage. The backend of this application is hosted on an unpaid server, which may result in longer response times.

## Overview

This is a Fullstack MERN application that allows users to create accounts, authenticate, like posts, and toggle between light and dark modes. It uses React for the frontend, Express and Node.js for the backend, MongoDB for the database, and Material-UI for the user interface.

## Authentication

- The app uses JWT for authentication. Users can sign up and log in securely.
- Authentication routes are available in the `/server/routes/auth.js` file.
- You can expand the authentication system and add features like password reset and email verification if needed.

## Create Post

- Users have the ability to create new posts, each consisting of an image and a caption.
- The post user create will be saved to the database and displayed in the feed of other users to see and interact with.

## Add and Remove Friends

- Users have the ability to build and manage their friend lists. You can add people to your friend list and, if needed, remove them.

## Likes Functionality

- Users can like and unlike posts.
- The likes are stored in the MongoDB database.

## Dark Mode

- The app includes a dark mode feature.
- Dark mode styles can be customized in the `/client/src/theme.js` file.

## Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database setup (you can use a local or cloud-based MongoDB instance).

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Kartik213/Socially
cd Socially
```

2. Install dependencies for both the server and client:

```bash
cd server
npm install
cd ../client
npm install
```

3. Configure Environment Variables:
   Create a `.env` file in the `server` directory with the following variables:

```bash
PORT=3001
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_secret_key
```

4. Start the server:

```bash
cd ../server
npm start
```

The server will run on port 3001 by default. 5. Start the client:

```bash
cd ../client
npm run dev
```

The React development server will start, and the app will be accessible at `http://localhost:3000`.

## Deployment

- To deploy the app, you can use platforms like Heroku for the server and Vercel or Netlify for the client.
- Don't forget to configure environment variables on your deployment platforms.

## Project Structure

- `/client`: Frontend React application.
- `/server`: Backend Node.js and Express application.
- `/server/controllers`: contains function for different operations.
- `/server/middleware`: contains middleware.
- `/server/models`: MongoDB models for User and Post.
- `/server/routes`: Express routes for authentication, posts and user.
- `/client/src/components`: React components for the frontend.
- `/client/src/pages`: Contains react component for different pages.
- `/client/src/state`: React-redux for state managment.
- `/client/src/utils`: Utility functions and API calls.

## Contributing

Feel free to contribute to this project by creating pull requests or opening issues. Contributions are welcome!

## Acknowledgments

- Thanks to the open-source community for providing tools and resources that made this project possible.
