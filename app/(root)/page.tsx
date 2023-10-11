'use client';
import React from 'react';
import Navigation from '../components/Navigation/page';
import Random from '../components/Random/page';
import NewGames from '../components/NewGames/page';
import HeroSection from '../components/HeroSection/page';
import RandomCreators from '../components/RandomCreators/page';

// Grab games from API and

export default function Landing() {
  const objectIDs = ['648ef4e763c484e397d5dfa3'];

  return (
    <div className="text-slate-300 bg-gray-800">
      <div>
        <section className="bg-gray-800 text-white py-10">
          <img src='/logo_large.png' alt='project 1 games logo' className='mx-auto m-0' />
          <div className="container mx-auto text-center">
            <p className="text-lg mb-8 mt-10">
              Explore a vast collection of games and help support independent software engineers/game developers.
            </p>
            <a
              href="/games"
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-full text-lg transition duration-300"
            >
              Browse Games
            </a>
          </div>
        </section>
        <section className="bg-gray-800 py-10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">How to Use Our Website</h2>
            <p className="text-lg mb-8">
              Getting started is easy. Follow these steps:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  1. Search for Games
                </h3>
                <p>
                  Use our powerful search feature to find games that interest
                  you.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  2. Explore Details
                </h3>
                <p>
                  Read game descriptions, check out screenshots, and get the details.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  3. Create an Account
                </h3>
                <p>
                  Sign up for an account to upload or provide support for the games and also give a like.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className='p-4'>
        <h1 className="text-4xl font-bold mb-4 text-center">
        Featured Game
        </h1>
        <HeroSection objectIDs={objectIDs} />
        </div>
        <div className='py-9'>
        <Random />
        </div>
        <div className='py-9'>
        <NewGames />
        </div>
        <div className='py-9'>
        <RandomCreators />
        </div>
      </div>
    </div>
  );
}
