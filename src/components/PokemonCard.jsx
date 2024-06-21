import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card ">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    </div>
  );
};

export default PokemonCard;
