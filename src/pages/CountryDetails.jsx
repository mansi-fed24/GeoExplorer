import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Link } from "react-router-dom";


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
  const alreadySaved = country && savedCountries.some(c => c.cca3 === country.cca3);


  return (
    <main className="country-details-page">
      <Link 
        to="/countries" 
        className=" text-blue-500 underline hover:text-blue-700">Back to Countries</Link>
       
      {loading ? (<p>Loading…</p>)
      : error ? (<p className="text-red-500">{error}</p>)
      : country ? (
        <div className='max-w-lg mx-auto'>
          <div className="country-card">
            <h1 className="cdp-title">{country.name.common}</h1>
            <img className="cdp-flag"
              src={country.flags?.svg}
              alt={`Flag of ${country.name.common}`}
              loading ="lazy" />
            <div className="cdp-info">

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
                className="cdp-link"
              >
                View on Google Maps
              </a>
              <div className="cdp-actions">
                <button 
                  className="cdp-button" 
                  onClick={handleSave}
                  disabled={alreadySaved}
                >
                  {alreadySaved ? "Saved" : "Save to Collection"}
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
                  
                    
              
              