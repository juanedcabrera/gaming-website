'use client';

import React, { useState, useEffect } from 'react';

interface BlogPost {
  title: string;
  content: string;
  imageLink: string;
  videoLink: string;
}

const BlogPostDetails = () => {
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const apiUrl = process.env.REACT_APP_API_URL

  // Fetch the blog post data based on [blogId] from the URL
  const blogId = window.location.pathname.split('/').pop();

  const getBlogPost = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api-v1/post/${blogId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch blog post');
      }
      const data = await response.json();
      setBlogPost(data.post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    }
  };

  useEffect(() => {
    getBlogPost();
  }, [blogId]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  const pathSegments = window.location.pathname.split('/');
  const game = pathSegments[2];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-xl mt-8">
      <h1 className="text-3xl font-semibold mb-4">{blogPost.title}</h1>
      <p className="text-gray-700">{blogPost.content}</p>
      {blogPost.imageLink && (
        <img
          src={blogPost.imageLink}
          alt={blogPost.title}
          className="mt-4 rounded-md"
        />
      )}
      {/* {blogPost.videoLink && (
        <iframe
          src={blogPost.videoLink}
          title={blogPost.title}
          className="mt-4 rounded-md"
        />
      )} */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => {
            window.location.href = `/games/${game}/blog/`;
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Back to Posts
        </button>
        <button
          onClick={() => {
            window.location.href = `/games/${game}`;
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-gray-300"
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};

export default BlogPostDetails;