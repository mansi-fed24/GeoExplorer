import React from 'react'
import { useAppContext } from '../context/AppContext';
import CountryCard from '../components/CountryCard';
import { Link } from "react-router-dom";

const Collection = () => {
  //pull the saved list from your global AppContext
   const {savedCountries, setSavedCountries} = useAppContext();
   const remove = (cca3) => {
    setSavedCountries(savedCountries.filter((c) => c.cca3 !== cca3));
   };

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-700 dark:from-[#242424] dark:to-black dark:text-gray-100 p-8'>
      <h1 className="page-title mb-6">Saved Countries</h1>
      
      {savedCountries.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">
          You haven’t saved any countries yet.
          Go to <strong>Countries</strong> and press <em>Save to Collection</em> on a country.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {savedCountries.map((c) => {
            const flag = c.flags?.svg || c.flags?.png || "";
            const name = c.name?.common || c.name;

            return (
              <div
                key={c.cca3}
                className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition p-3 flex flex-col text-center"
              >
                <img
                  src={flag}
                  alt={name}
                  className="w-full h-28 object-cover rounded-lg mb-2 border border-gray-200 dark:border-gray-700"
                />
                <div className="font-semibold text-center mb-3">{name}</div>

                <div className="flex items-center justify-center gap-2">
                  <Link
                    to={`/countries/${encodeURIComponent(name)}`}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => remove(c.cca3)}
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
           
                  
      
    </main>
  );
};

export default Collection