import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CountryDetails = () => {
  const {countryName} = useParams();
  const decodedName = decodeURIComponent(countryName);
  //console.log("useParams result:", {countryName});
  const [country, setCountry] = useState(null); //store the fetched country data
  const [loading, setLoading] = useState(false); // track loading state
  const [error, setError] = useState("");
  const {savedCountries, setSavedCountries} = useAppContext();

  useEffect(() => {
    setLoading(true);
    setError("");

    const fetchCountry = async () => {
      try {
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
        decodedName
      )}?fullText=true&fields=name,flags,population,currencies,maps,capital,region,subregion,cca3`;
      console.log("Fetching details for:", decodedName, "→", url);

      const res = await axios.get(url);
      setCountry(res.data[0]); // the first match
      console.log("Fetched country:", res.data[0]); // ← check it has cca3
      
      } catch (err) {
        setError("Could not fetch country details.");
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCountry();
  }, [decodedName]);
    const handleSave = () => {
    if (!country) return;

    // check if already saved using its unique code (cca3)
    const exists = savedCountries.some(c => c.cca3 === country.cca3);

    if (!exists) {
      setSavedCountries([...savedCountries, country]);
    }
  };


  return (
    <main className='min-h-screen p-6'>
      {loading ? (<p>Loading…</p>)
      : error ? (<p className="text-red-500">{error}</p>)
      : country ? (
        <div className='max-w-lg mx-auto'>
          <div className='bg-white dark:bg-gray-900 rounded-2xl shadow p-6'>
            <h1 className="text-3xl font-bold mb-4 text-center">{country.name.common}</h1>
            <img
              src={country.flags?.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-full max-w-sm h-48 object-cover border border-gray-200 dark:border-gray-700 rounded-xl mb-6 mx-auto"
              loading="lazy"
            />
            <div className="space-y-2 ml-10 text-lg">

              <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
              <p><strong>Region:</strong> {country.region} {country.subregion && `- ${country.subregion}`}</p>
              <p><strong>Population:</strong> {country.population?.toLocaleString() || "N/A"}</p>

              <p>
                <strong>Currency:</strong>{" "}
                {country.currencies
                  ? Object.values(country.currencies)[0]?.name
                  : "N/A"}
              </p>

              <a
                href={country.maps?.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline inline-block mt-2"
              >
                View on Google Maps
              </a>
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className=" px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save to Collection
                </button>
              </div>

            </div> 
          </div>
        </div>
      ) : null}


    </main>
  );
};

export default CountryDetails