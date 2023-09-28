'use client';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

// Interfaces
interface Post {
  title: string;
  content: string;
  gameId: number;
  imageLink: string;
  videoLink: string;
  _id: string;
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

const BlogPostDisplay = () => {
  const gameID = window.location.pathname.split('/')[2];

  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [game, setGame] = useState<Game | null>(null);

  // Get all blog posts for the game
  const getBlogPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api-v1/post/all/${gameID}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setBlogPosts(data.posts);
      setGame(data.post);
      console.log('The game title', data.post.title);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, [gameID]);

  return (
    <div>
      <h1>Blog Posts</h1>
      <h2>Game: {game?.title}</h2>
      {blogPosts.map((post, index) => (
        <Card key={index} className="mb-4">
          <CardContent>
            <a href={`/games/${gameID}/blog/${post._id}/`}>
              <CardTitle>{post.title}</CardTitle>

              {post.imageLink && (
                <img
                  src={post.imageLink}
                  alt={post.title}
                  className="mt-2"
                  style={{ width: '300px', height: '200px' }}
                />
              )}
              {/* {post.videoLink && (
                <iframe
                  src={post.videoLink}
                  title={post.title}
                  className="mt-2"
                />
              )} */}
              <CardDescription>{post.content}</CardDescription>
            </a>
          </CardContent>
        </Card>
      ))}
      <button
        onClick={() => {
          window.location.href = `/games/${gameID}/`;
        }}
      >
        Back to GameInfo
      </button>
    </div>
  );
};

export default BlogPostDisplay;
