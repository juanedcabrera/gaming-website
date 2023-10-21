'use client';
import CategoryGames from '../../../components/CategoryGames/page';
import { SetStateAction, useState } from 'react';

interface Params {
  params: {
    category: string;
  };
}

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const availableCategories = [
    'Action',
    'Adventure',
    'Strategy',
    'RPG',
    'Puzzle',
    'Simulation',
    'Sports',
    'Racing',
    'CardandBoard',
    'Casual',
    'MMO',
    'Arcade',
  ];

  const handleCategoryChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className='min-h-screen'>
      <form>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">Select a Category</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>
      {/* Conditionally render CategoryGames components */}
      {selectedCategory ? (
        <CategoryGames key={selectedCategory} category={selectedCategory} />
      ) : (
        <div>
          {' '}
          {availableCategories.map((category) => (
            <CategoryGames category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Games;
