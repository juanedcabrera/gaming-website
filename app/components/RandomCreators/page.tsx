import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';

interface User {
  _id: string;
  title: string;
  userName: string;
  category: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const RandomCreators: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPageDesktop = 3;
  const usersPerPageMobile = 2;

  const fetchRandomUsers = async () => {
    try {
      // Make an API request to fetch random users data
      const response = await fetch(`http://localhost:8000/api-v1/users/random`);
      if (!response.ok) {
        throw new Error('Failed to fetch random users');
      }

      // Parse the response data as JSON
      const data = await response.json();
      console.log(data)
      // Update the users state variable with the fetched data
      setUsers(data);
    } catch (error) {
      console.error('Error fetching random users:', error);
    }
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);


  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  const canGoPrevious = currentPage > 1;



  const handleSwipeLeft = () => {
    if (currentPage < lastPage) {
      nextPage();
    }
  };

  const handleSwipeRight = () => {
    if (currentPage > 1) {
      previousPage();
    }
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });
  const lastPage = Math.ceil(users.length / (usersPerPageDesktop));

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Random Creators</h2>
      <div className="flex overflow-x-auto" {...swipeHandlers}>
        {users.length > 0 ? (
          users.map((user, index) => {
            const isMobile = window.innerWidth <= 768;
            const usersPerPage = isMobile ? usersPerPageMobile : usersPerPageDesktop;
            if (
              index >= (currentPage - 1) * usersPerPage &&
              index < currentPage * usersPerPage
            ) {
              return (
                <div
                  key={user._id}
                  className={`flex-shrink-1 w-full ${
                    isMobile ? 'md:w-1/2' : 'md:w-1/3'
                  } bg-gray-900 rounded-lg shadow-lg p-1 mx-2`}
                >
                  <Link href={`/profile/${user._id}`} passHref>
                  
                      <img
                        src={user.image}
                        alt={user.title}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="text-xl lg:text-2xl font-bold mb-2">
                          {user.title}
                        </h3>
                        <p className="text-base lg:text-lg mb-2">
                          By: {user.userName}
                        </p>
                        <p className="text-base lg:text-lg mb-2">
                          Category: {user.category}
                        </p>
                        <p className="text-base lg:text-lg">
                          Description: {user.description}
                        </p>
                      </div>
                   
                  </Link>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No users found.</p>
        )}
      </div>
      <div className="flex justify-center mt-3">
        {canGoPrevious && (
          <button
            onClick={previousPage}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
          >
            Previous
          </button>
        )}
        {currentPage < lastPage && (
          <button
            onClick={nextPage}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default RandomCreators;
