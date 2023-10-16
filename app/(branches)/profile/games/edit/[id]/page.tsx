'use client'
import React, { useEffect, useState, FormEvent } from 'react';

interface Game {
  title: string;
  category: string;
  description: string;
  image: string;
  techstack: string;
  github: string;
  link: string;
  userId: string;
}

interface GameData {
  title: string;
  category: string;
  description: string;
  image: string;
  techstack: string;
  github: string;
  link: string;
}

const EditGame: React.FC = () => {
  const [game, setGame] = useState<Game | null>(null);
  const apiUrl = process.env.REACT_APP_API_URL

  const fetchGame = async (gameId: string) => {
    try {
      const response = await fetch(`${apiUrl}/api-v1/game/${gameId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch game');
      }
      const data = await response.json();
      return data.game;
    } catch (error) {
      console.error('Error fetching game:', error);
    }
  };

  const gameId = window.location.pathname.split('/').pop();

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId).then((game) => {
        setGame(game);
      });
    }
  }, [gameId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const gameData: GameData = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      techstack: formData.get('techstack') as string,
      github: formData.get('github') as string,
      link: formData.get('link') as string,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}/api-v1/game/${gameId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
        body: JSON.stringify(gameData),
      });

      if (response.ok) {
        const data = await response.json();
        console.error('Game uploaded successfully:', data);
        window.location.href = '/profile/games';
      } else {
        console.error('Error uploading game:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading game:', error);
    }
  };

  return (
    <div className="grid md:grid-cols-5 bg-gray-800">
      <div></div>
      <div className="col-span-3">
        <div className="p-8 bg-gray-800 text-white">
          <h2 className="text-2xl font-bold mb-4">Edit Game</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-white">Title:</label>
              <input type="text" name="title" defaultValue={game?.title} required className="w-full p-2 border rounded bg-gray-100 text-black" />
      
              <label className="block font-semibold text-white">Category:</label>
              <select required className="w-full p-2 border rounded bg-gray-100 text-black">
                <option value="">Select a category</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Strategy">Strategy</option>
                <option value="RPG">RPG</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Simulation">Simulation</option>
                <option value="Sports">Sports</option>
                <option value="Racing">Racing</option>
                <option value="CardandBoard">Card & Board</option>
                <option value="Casual">Casual</option>
                <option value="MMO">MMO</option>
                <option value="Arcade">Arcade</option>
              </select>
      
              <label className="block font-semibold text-white">Description:</label>
              <input type="text" name="description" defaultValue={game?.description} required className="w-full p-2 border rounded bg-gray-100 text-black" />
      
              <label className="block font-semibold text-white">Image:</label>
              <input type="text" name="image" defaultValue={game?.image} required className="w-full p-2 border rounded bg-gray-100 text-black" />
      
              <label className="block font-semibold text-white">Techstack:</label>
              <input type="text" name="techstack" defaultValue={game?.techstack} required className="w-full p-2 border rounded bg-gray-100 text-black" />
      
              <label className="block font-semibold text-white">Github:</label>
              <input type="text" name="github" defaultValue={game?.github} required className="w-full p-2 border rounded bg-gray-100 text-black" />
      
              <label className="block font-semibold text-white">Deployment:</label>
              <input type="text" name="link" defaultValue={game?.link} required className="w-full p-2 border rounded bg-gray-100 text-black" />
      
              <input type="hidden" name="userId" defaultValue={game?.userId} />
      
              <input type="submit" value="Submit" className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700" />
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
  
};

export default EditGame;
