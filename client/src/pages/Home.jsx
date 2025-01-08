import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto max-w-[800px]">
      <h1 className="text-3xl font-bold mb-4">Welcome to My MERN Auth App!</h1>
      <div className="flex flex-col gap-4">
        <p>
          This is a full-stack wb application built with the MERN (MongoDB,
          Express, React, Node.js) stack. It includes authentication features
          that allow users to sign up, log in, and log out, and provides access
          to protected routes only for authenticated users.
        </p>
        <p>
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is
          implemented using JSON Web Tokens (JWT).
        </p>
        <p>
          This application is intended as a starting point for building
          full-stack web applications with authentication using the MERN stack.
          Feel free to use it as a template for your own projects!
        </p>
      </div>
    </div>
  );
};

export default Home;
