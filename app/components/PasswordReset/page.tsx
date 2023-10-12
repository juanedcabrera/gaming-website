'use client'
import React, { useState } from 'react';

interface PasswordResetProps {
  onSubmit: (newPassword: string) => void;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newPassword);
    setNewPassword('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="newPassword" className="block font-medium text-gray-700">
          New Password:
        </label>
        <input
          id="newPassword"
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border rounded py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}  

export default PasswordReset;
