import React, { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import Search from './components/Search';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await res.json(); // Await the response

      const fetches = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );

      setPokemonData(fetches);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`Something went wrong: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const filteredData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className='bg-zinc-950 text-white w-full h-screen flex items-center justify-center text-5xl'>Loading...</div>;
  }
  if (error) {
    return <div className='bg-zinc-950 text-white w-full h-screen flex items-center justify-center text-5xl'>{error}</div>;
  }

  return (
    <div className='w-full bg-zinc-950 text-white h-screen overflow-scroll'>
      <h1 className='text-center text-2xl font-bold'>Pokémon List</h1>
      <Search setSearchTerm={setSearchTerm} />
      <div className="pokemon-container w-full px-40 place-content-center sm:grid-cols-2 md:grid-cols-5 justify-center  grid grid-cols-3 gap-4">
        {filteredData.map((pokemon) => (
          <PokemonCard key={pokemon.id} className='col-span-2 px-4 flex justify-center items-center' pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
