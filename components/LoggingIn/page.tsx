import React, { useState } from 'react';
import jwt from 'jsonwebtoken';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prepare the user data to be sent in the POST request
    const userData = {
      email,
      password,
    };

    try {
      // Make a POST request to the server with the user data
      const response = await fetch(`${apiUrl}/api-v1/users/login`, {
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
        // Redirect the user to the home page
        window.location.href = '/';
      } else {
        console.error('Error logging in user:', response.statusText);
        const data = await response.json();
        setMessage(data.msg);
      }
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {message ? <p className="text-red-600">{message}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              autoComplete="email"
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
              name="password"
              value={password}
              autoComplete="password"
              className="mt-1 p-2 border rounded w-full"
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
