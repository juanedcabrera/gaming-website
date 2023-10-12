'use client'
import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prepare the user data to be sent in the POST request
    const userData = {
      name,
      email,
      password,
      userName,
      // Add other user data fields as needed (e.g., userName, avatar, bio)
    };

    try {
      // Make a POST request to the server with the user data
      const response = await fetch(`${apiUrl}/api-v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Handle the response if needed
      if (response.ok) {
        const data = await response.json();
        // Save the JWT to localStorage
        localStorage.setItem('token', data.token);
        // Decode the JWT and save the user data
        const user = jwt.decode(data.token);
        // Redirect the user to the login page
        window.location.href = '/login';
      } else {
        console.error('Error registering user:', response.statusText);
      }
    } catch (error) {
      // Handle errors if the POST request fails
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              className="mt-1 p-2 border rounded w-full"
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              autoComplete="username"
              value={userName}
              className="mt-1 p-2 border rounded w-full"
              onChange={handleUserNameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="mt-1 p-2 border rounded w-full"
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              className="mt-1 p-2 border rounded w-full"
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
