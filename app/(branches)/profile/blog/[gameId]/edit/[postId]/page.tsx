'use client';
import React, { useState, useEffect } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Interfaces
interface Post {
  title: string;
  content: string;
  gameId: number;
  imageLink: string;
  videoLink: string;
}

interface Game {
  _id: string;
  title: string;
  userName: string;
  userId: number;
  category: string;
  image: string;
  description: string;
}


const BlogPostForm: React.FC = () => {
  // State Hooks
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [game, setGame] = useState<Game | null>(null);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Effect Hook for Initialization
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Token validation
    if (!token) {
      console.error('Token not found.');
      return;
    }

    const decodedToken = jwt.decode(token);

    if (!decodedToken || typeof decodedToken !== 'object') {
      console.error('Decoded token not found or invalid.');
      return;
    }

    const postId = window.location.pathname.split('/')[5];

    // Get post information
    const getPostInformation = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api-v1/post/${postId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch post information');
        }
        const data = await response.json();
        // Set the game ID and other data based on the fetched post
        setTitle(data.post.title);
        setContent(data.post.content);
        setImageLink(data.post.imageLink);
        setVideoLink(data.post.videoLink);
      } catch (error) {
        console.error('Error fetching post information:', error);
      }
    };

    const gameID = window.location.pathname.split('/')[3];

    const getGameInformation = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api-v1/game/${gameID}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch game information');
        }
        const data = await response.json();
        setGame(data.game);
      } catch (error) {
        console.error('Error fetching game information:', error);
      }
    };

    getGameInformation();

    // Fetch the post information when the component mounts
    getPostInformation();
  }, []); // Empty dependency array, so it runs only once when the component mounts

  // Handle form when the Update Post button is clicked
  const handleUpdatePostClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found.');
        return;
      }
      const decodedToken = jwt.decode(token);
      if (!decodedToken || typeof decodedToken !== 'object') {
        console.error('Decoded token not found or invalid.');
        return;
      }

      const postId = window.location.pathname.split('/')[5];
      const gameId = window.location.pathname.split('/')[3];
      const response = await fetch(
        `${apiUrl}/api-v1/post/${postId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            title,
            content,
            postId,
            gameId,
            imageLink,
            videoLink,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      const data = await response.json();
      window.location.href = `/profile/blog/${gameId}`;
    } catch {
      console.error('Error creating post');
    }
  };

  return (
    <div className="form-container p-8 bg-gray-800 text-white">
      <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
      <form className="space-y-4">
        <label className="block font-semibold text-white">
          Title
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </label>
        <label className="block font-semibold text-white">
          Game
          <input
            readOnly
            value={game ? game.title : ''}
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </label>
        <label className="block font-semibold text-white">
          Content
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </label>
        <label className="block font-semibold text-white">
          Image URL
          <input
            type="url"
            placeholder="Image URL"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </label>
        {/* <label className="block font-semibold text-white">
          Video Link URL
          <input
            type="url"
            placeholder="Video Link URL"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 text-black"
          />
        </label> */}
        <div className="form-actions mt-4">
          <button
            type="button"
            onClick={handleUpdatePostClick}
            className="px-4 py-2 bg-black text-white font-bold rounded"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="ml-4 px-4 py-2 bg-black text-white font-bold rounded"
          >
            Preview Post
          </button>
        </div>
      </form>
      <div className="preview-section mt-8">
        {showPreview && (
          <div className="preview-content border p-4 rounded">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-4">{content}</p>
            {imageLink && (
              <img
                src={imageLink}
                alt={`Image for ${title}`}
                className="mt-4 rounded"
              />
            )}
            {videoLink && (
              <iframe
                src={videoLink}
                title={`Video for ${title}`}
                className="mt-4 w-full h-56 rounded"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostForm;
