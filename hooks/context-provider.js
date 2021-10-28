import { createContext, useContext, useState } from "react";

// define context
const PokemonContext = createContext({
  pokemon: {},
  selectNewPokemon: (pokemon) => {},
});

// add context logic
export function PokemonContextProvider(props) {
  const [pokemon, setPokemon] = useState([]);

  function selectNewPokemon(pokemon) {
    setPokemon(pokemon);
  }

  const context = {
    pokemon: pokemon,
    selectNewPokemon: selectNewPokemon,
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