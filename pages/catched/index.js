import PokeCard from "../../components/general/PokeCard";
import { useEffect, useState } from "react";
import { useAppContext } from "../../hooks/context-provider";
import { useRouter } from "next/dist/client/router";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Progress from "../../components/general/Progress";

// pokemon types
const types = [
  "all types",
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "unknown",
  "shadow",
];

export default function Home() {
  // statates
  const [pokemons, setPokemons] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all types");
  const [loading, setLoading] = useState(true);

  // context
  const pokemonCtx = useAppContext();

  // router
  const router = useRouter();

  // callback function of offset change state
  useEffect(() => {
    // get pokemon data
    const getPokemons = async (typeFilter) => {
      setLoading(true);

      // get pokemons from context
      const pokemonsList = pokemonCtx.pokemons;

      // filter
      if (typeFilter !== "all types") {
        pokemonsList = pokemonsList.filter((pokemon) =>
          pokemon.types.some((type) => typeFilter === type)
        );

        // this can be better if I add more pokemons until complete the maxObjectPerRequest
      }

      // sort by id
      pokemonsList = pokemonsList.sort((a, b) => a.id - b.id);

      // set pokemons
      setPokemons(pokemonsList);

      setLoading(false);
    };

    // get data
    getPokemons(typeFilter);
  }, [typeFilter]);

  // select pokemon
  const selectPokemonHandler = (pokemon) => {
    router.push("details/" + pokemon.name);
  };

  return (
    <>
      {/* filter */}
      <div className="justify-center flex">
        <Dropdown
          buttonText={typeFilter}
          buttonType="filled"
          size="regular"
          rounded={true}
          block={false}
          ripple="light"
          className="main-button"
        >
          {types.map((type) => {
            return (
              <DropdownItem
                key={type}
                color="deepOrange"
                onClick={(e) => {
                  e.preventDefault();
                  // set type
                  setTypeFilter(type);
                }}
              >
                {type}
              </DropdownItem>
            );
          })}
        </Dropdown>
      </div>

      {!loading ? (
        <>
          {/* pokemons card */}
          {pokemons.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-24 px-5 mt-4">
              {pokemons.map((pokemon, idx) => {
                return (
                  <PokeCard
                    key={idx}
                    pokemon={pokemon}
                    selectPokemonHandler={selectPokemonHandler}
                    tryToCatch={false}
                  />
                );
              })}
            </div>
          ) : (
            // or no pokemons message
            <div className="text-center mt-5">
              <p className="text-md font-semibold">
                No catched pokemons with this type in this batch
              </p>
            </div>
          )}
        </>
      ) : (
        <Progress />
      )}
    </>
  );
}
