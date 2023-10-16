'use client';
import React, { useState, useEffect } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

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
  const gameID = window.location.pathname.split('/')[3];

  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [imageLink, setImageLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL

  // Get all blog posts for the game
  const getBlogPosts = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/api-v1/post/all/${gameID}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await response.json();
      setBlogPosts(data.posts);
      setGame(data.post);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, [gameID]);

  // Function to handle edit button click
  const handleEditPost = (postId: string) => {
    window.location.href = `/profile/blog/${gameID}/edit/${postId}`;
  };

  // Function to handle delete button click
  const handleDeletePost = async (postId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api-v1/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token as string,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete the blog post');
      }
      // Update the UI by removing the deleted blog post from the state
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const user = jwt.decode(localStorage.getItem('token') as string);

  return (
    <div className="grid md:grid-cols-5 bg-gray-800">
      {user ? (
        <div className="col-span-3">
          <h1>Blog Posts</h1>
          <h2>Game: {game?.title}</h2>
          <Button>
            <a href={`/profile/blog/${gameID}/post`}>Create New Post</a>
          </Button>
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
                  <CardDescription>{post.content}</CardDescription>
                  {/* {post.videoLink && (
                    <div className="video-container">
                      <iframe
                        id="ytplayer"
                        width="720"
                        height="405"
                        src={`https://www.youtube.com/embed/${post.videoLink.split('v=')[1]}`}
                        title={post.title}
                      />
                    </div>
                  )} */}
                </a>
              </CardContent>
              <div className="flex justify-between mt-2">
                <Button onClick={() => handleEditPost(post._id)}>Edit</Button>
                <Button onClick={() => handleDeletePost(post._id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        (() => {
          window.location.href = '/login';
          return null;
        })()
      )}
    </div>
  );
};

export default BlogPostDisplay;