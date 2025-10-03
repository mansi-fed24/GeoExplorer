import React from 'react'
import { useAppContext } from '../context/AppContext';
import CountryCard from '../components/CountryCard';

const Collection = () => {
  //pull the saved list from your global AppContext
   const {savedCountries} = useAppContext();

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-[#242424] dark:to-black dark:text-gray-100 p-6'>
      <h1 className="page-title">Saved Countries</h1>
      {savedCountries.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">
          You haven’t saved any countries yet.
          Go to <strong>Countries</strong> and press <em>Save to Collection</em> on a country.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {savedCountries.map((c) => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Collection