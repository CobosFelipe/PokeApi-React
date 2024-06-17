/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { primerMayuscula } from "../helper/helper";

const formatPokeId = (id) => {
  let pokeId = id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }
  return pokeId;
};
export const CardPokemon = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="card-pokemon">
      <div className="pokemon">
        <p className="pokemon-id-back">{formatPokeId(pokemon.id)}</p>
        <div className="card-img">
          <img src={pokemon.sprites.other.home.front_default} alt={`Pokemon ${pokemon.name}`} />
        </div>
        <div className="card-info">
          <div className="nombre-contenedor">
            <p className="pokemon-id">{formatPokeId(pokemon.id)}</p>
            <h2 className="pokemon-nombre">{primerMayuscula(pokemon.name)}</h2>
          </div>
          <div className="pokemon-tipos">
            {pokemon.types.map((type) => (
              <p key={type.type.name} className={`${type.type.name} tipo`}>
                {type.type.name}
              </p>
            ))}
          </div>
          <div className="pokemon-stats">
            <p className="stats">${pokemon.height}M</p>
            <p className="stats">${pokemon.weight}Kg</p>
        </div>
        </div>
      </div>
    </Link>
  );
};
