// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { useLocation } from 'react-router-dom'
import { CardPokemon } from '../components'


export const SearchPage = () => {
  const location = useLocation()
  
  const {globalPokemons} = useContext(PokemonContext)

  const filteredPokemons = globalPokemons.filter(pokemon => pokemon.name.includes(location.state.toLowerCase()))
  
  return (
    <div className="conteiner">
      <p className="p-search">
        Se econtraron <span>{filteredPokemons.length}</span> resultados:
      </p>
      <div className="card-list-pokemon container">
        {filteredPokemons.map(pokemon => <CardPokemon  pokemon={pokemon} key={pokemon.id}/>)}
      </div>
    </div>
  )
}
