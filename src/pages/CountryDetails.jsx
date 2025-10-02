import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const CountryDetails = () => {
  const {countryName} = useParams();
  //console.log("useParams result:", {countryName});
  const [country, setCountry] = useState(null); //store the fetched country data
  const [loading, setLoading] = useState(false); // track loading state
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const fetchCountry = async () => {
      try {
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
        countryName
      )}?fullText=true&fields=name,flags,population,currencies,maps,capital,region,subregion`
      }
    }
  
    return () => {
      second
    }
  }, [third])
  

  return (
    <main className='min-h-screen p-6'>
      <h1 className="text-3xl font-bold mb-4">
        Country: {decodeURIComponent(countryName)}
      </h1>

    </main>
  );
};

export default CountryDetails