import PokeCard from "../components/general/PokeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../hooks/context-provider";
import { useRouter } from "next/dist/client/router";
import Pagination from "../components/general/Pagination";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Progress from "../components/general/Progress";

// api maxObjectPerRequests
const maxObjectPerRequest = 10;

// types
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
  const [offset, setOffset] = useState(0);
  const [typeFilter, setTypeFilter] = useState("all types");
  const [loading, setLoading] = useState(true);
  const [alert_, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // context
  const pokemonCtx = useAppContext();

  // router
  const router = useRouter();

  // callback function of offset change state
  useEffect(() => {
    // get data
    const getPokemons = async (offsetToUse, typeFilter) => {
      setLoading(true);

      const resp = await axios
        .get(
          `https://pokeapi.co/api/v2/pokemon?maxObjectPerRequest=${maxObjectPerRequest}&offset=${offsetToUse}`
        )
        .catch((err) => console.log("Error:", err));

      const pokemonsToDisplay = resp.data.results;

      // get pokemon data
      const pokemonsList = [];

      await Promise.all(
        pokemonsToDisplay.map((pokemon) => {
          return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then((result) => {
              pokemonsList.push(result.data);
            });
        })
      );
      // try and catch

      pokemonsList = pokemonsList.map((pok) => {
        return {
          name: pok.name[0].toUpperCase() + pok.name.slice(1),
          photo: pok.sprites.front_default,
          id: pok.id,
          types: pok.types.map((type) => type.type.name),
        };
      });

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

    getPokemons(offset, typeFilter);

  }, [offset, typeFilter]);

  // callback function to hide alert
  useEffect(() => {
    // to hide alert
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

  // change page
  const changePageHandler = (arrow) => {
    // previous
    if (arrow === "left") {
      if (offset > 0) {
        // update offset
        setOffset((prev) => prev - maxObjectPerRequest);
      }
    }

    // next
    else {
      // here it should check the max page
      // update offset
      setOffset(offset + maxObjectPerRequest);
    }
  };

  // select pokemon
  const selectPokemonHandler = (pokemon) => {
    router.push("details/" + pokemon.name);
  };

  // add new pokemon to favorites
  const addPokemonHandler = (pokemon) => {
    // random number
    const val = Math.floor(Math.random() * 3);

    // naive condition to catch pokemon
    if (val == 1) {
      pokemonCtx.addNewPokemon(pokemon);
      setShowAlert(true);
      setAlert({ message: "Congrats, you catched it!", type: "success" });
    } else {
      setShowAlert(true);
      setAlert({
        message:
          "Wow! " +
          pokemon.name +
          " is fighting hard and it was not catched! Try it again! You can do it!",
        type: "fail",
      });
    }
  };

  return (
    <>
      {/* alert emssages */}
      {showAlert && (
        <div
          className={`z-50 fixed bottom-14 right-0 left-0 m-2 shadow-lg text-white text-xl font-semibold p-2 rounded-xl ${
            alert_.type === "success" ? "bg-orange" : "bg-gray"
          }`}
        >
          <p>{alert_.message}</p>
        </div>
      )}

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
          {/* pagination */}
          <Pagination offset={offset} changePageHandler={changePageHandler} />

          {/* pokemons card */}
          {pokemons.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-10 px-5">
              {pokemons.map((pokemon) => {
                return (
                  <div className="flex justify-center" key={pokemon.id}>
                    <PokeCard
                      pokemon={pokemon}
                      selectPokemonHandler={selectPokemonHandler}
                      addPokemonHandler={addPokemonHandler}
                      animate={showAlert}
                      catched={alert_.type === "success"}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            // or no pokemons message
            <div className="text-center">
              <p className="text-md font-semibold">
                No pokemons with this type in this batch
              </p>
            </div>
          )}

          {/* pagination */}
          {/* toggle first element */}
          {pokemons.length > 0 && (
            <Pagination offset={offset} changePageHandler={changePageHandler} />
          )}
        </>
      ) : (
        <Progress />
      )}
    </>
  );
}
