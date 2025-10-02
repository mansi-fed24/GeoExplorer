import React from 'react'
import { Link } from 'react-router-dom';


const CountryCard = ({country}) => {

    const flag = country.flags?.svg || country.flags?.png || "";
    const name = country.name?.common || "Unknown";

  return (
    <Link
        to={`/countries/${encodeURIComponent(name)}`}
        className="block bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-3 text-center"
        >
        <img
        src={flag}
        alt={`Flag of ${name}`}
        className="w-full h-28 object-cover rounded-lg mb-2 border border-gray-200 dark:border-gray-700"
        loading="lazy"
        />
        <p className="font-semibold">{name}</p>

    </Link>

  );
};

export default CountryCard