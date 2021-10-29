import { createContext, useContext, useState } from "react";

// define context
const PokemonContext = createContext({
  pokemons: [],
  addNewPokemon: (pokemon) => {},
});

// add context logic
export function PokemonContextProvider(props) {
  const [pokemons, setPokemons] = useState([]);

  function addNewPokemon(pokemon) {
    // console.log("addNewPokemon", pokemon);
    // check if pokemon already exists
    if (!pokemons.find((p) => p.name === pokemon.name)) {
      setPokemons([...pokemons, pokemon]);
    }
    else {
      alert("Pokemon already catched!");
    }
  }

  const context = {
    pokemons: pokemons,
    addNewPokemon: addNewPokemon,
  };

  return (
    <PokemonContext.Provider value={context}>
      {props.children}
    </PokemonContext.Provider>
  );
}

// export default PokemonContext;
export function useAppContext() {
  return useContext(PokemonContext);
}
