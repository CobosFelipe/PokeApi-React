/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

export const CardPokemon = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="card-pokemon">
      <div>
      <p className="pokemon-id-back">{pokemon.Id}</p>
        <div className="card-img">
          <img src={pokemon.sprites.other.home.front_default} alt={`Pokemon ${pokemon.name}`} />
        </div>
        <div className="card-info">
          <div className="nombre-contenedor">
            <p className="pokemon-id">{pokemon.id}</p>
            <h2 className="pokemon-nombre">{pokemon.name}</h2>
          </div>
          <span className="pokemon-id">N° {pokemon.id}</span>
          <h3>{pokemon.name}</h3>
          <div className="card-types">
            {pokemon.types.map((type) => (
              <span key={type.type.name} className={type.type.name}>
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
    </Link>
  );
};
