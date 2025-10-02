import React, { useEffect, useState } from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import CountryCard from '../components/CountryCard';
//const Regions = ["Europe", "Asia", "Africa", "Americas", "Oceania"]

const Countries = () => {

  const [region, setRegion] = useState("Europe");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true); //show loading
    setError(""); //clear old error

    const fetchCountries = async () => {
      try{
        const url = `https://restcountries.com/v3.1/region/${region.toLowerCase()}?fields=name,flags,cca3,region`;

        const res = await axios.get(url);
        setCountries(res.data);  //store the data in state
      } catch (err){
        setError("Could not load counties. Please try again.");
        setCountries([]);   // reset counties on error
      } finally {
        setLoading(false); //stop loading 
      }
    };

    fetchCountries();
      
  }, [region]); // runs whenever region changes
  

  
  return (
    <main className="min-h-screen 
    bg-gradient-to-br from-gray-100 to-gray-300 dark:bg-none
    dark:bg-gray-900 dark:text-gray-100 p-6">
      <h1 className='page-title font-inter'>Countries in {region}</h1>
      <label className='block mb-4'>
        <span className='mr-2'>Select region:</span>
        <select 
          className='bg-white dark:bg-gray-800 border rounded px-3 py-2 '
          value={region}
          onChange={(e) => setRegion(e.target.value)}>
        
        
          <option>Europe</option>
          <option>Asia</option>
          <option>Africa</option>
          <option>Americas</option>
          <option>Oceania</option>
          
        </select>
      </label>
      {loading ? <p>Loading…</p> : null}
      {!loading && error ? <p className='text-red-500'>{error}</p> : null}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {countries.map((c) => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>

      )}
    
    </main>

   



  )
}

export default Countries