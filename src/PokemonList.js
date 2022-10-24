import React from 'react'

function PokemonList({pokemon}) {
  return (
    <div>
      {pokemon.map(p => (
        <div>{p}</div>
      ))}
    </div>
  )
}

export default PokemonList
