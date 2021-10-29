// import Head from "next/head";
// import Image from "next/image";
// import Button from "@material-tailwind/react/Button";
import PokeCard from "../components/general/Card";
import { useEffect, useState } from "react";
import axios from "axios";

// import Icon from "@material-tailwind/react/Icon";
// import { useAppContext } from "../hooks/context-provider";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Pagination from "../components/general/Pagination";

import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
// import Progress from "@material-tailwind/react/Progress";

// const pokemons = [
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
//   {
//     number: 1,
//     name: "Pikachu",
//     photo: "/images/pikachu.png",
//   },
// ];

// api limits
const limit = 10;
// const offset = 0;

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

  // context
  // const pokemonCtx = useContext(PokemonContextProvider);
  // const pokemonCtx = useAppContext();

  // router
  const router = useRouter();

  // get pokemon data
  const getPokemons = async (offsetToUse, typeFilter) => {
    // console.log("call new pokemons");
    console.log("current offset", offset, "current type: ", typeFilter);

    setLoading(true);

    const resp = await axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsetToUse}`
      )
      .catch((err) => console.log("Error:", err));

    const pokemonsToDisplay = resp.data.results;

    // get pokemon data
    // getPokemonData(resp.data.results);

    // console.log("get detailed data from pokemons");
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
      // console.log("filter by type");
      pokemonsList = pokemonsList.filter((pokemon) =>
        pokemon.types.some((type) => typeFilter === type)
      );

      // this can be better if I add more pokemons until complete the limit
    }
    // else {
    //   console.log("all types");
    // }

    // sort by id
    pokemonsList = pokemonsList.sort((a, b) => a.id - b.id);

    // console.log("pokemons to display: ", pokemonsList);

    // set pokemons
    setPokemons(pokemonsList);

    setLoading(false);
  };

  // callback function of offset change state
  useEffect(() => {
    // get data
    getPokemons(offset, typeFilter);
  }, [offset, typeFilter]);

  // change page
  const changePageHandler = (arrow) => {
    // previous
    if (arrow === "left") {
      if (offset > 0) {
        // update offset
        setOffset((prev) => prev - limit);
      }
    }

    // next
    else {
      // here it should check the max page
      // update offset
      setOffset(offset + limit);
    }
  };

  // select pokemon
  const selectPokemonHandler = (pokemon) => {
    // console.log(pokemonCtx.pokemon);
    router.push("details/" + pokemon.name);
  };

  return (
    <div className="p-2">
      {/* filter */}
      <div className="justify-center flex">
        <Dropdown
          // color="deepOrange"
          // placement="center"
          buttonText={typeFilter}
          buttonType="filled"
          size="regular"
          rounded={true}
          block={false}
          ripple="light"
          // className=""
          className="main-button"
        >
          {types.map((type) => {
            return (
              <DropdownItem
                key={type}
                // className="main-button"
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
            <div className="grid grid-cols-2 gap-4">
              {pokemons.map((pokemon, idx) => {
                return (
                  <PokeCard
                    key={idx}
                    pokemon={pokemon}
                    selectPokemonHandler={selectPokemonHandler}
                  />
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
          {/* </div> */}

          {/* pagination */}
          {/* toggle first element */}
          {pokemons.length > 0 && (
            <Pagination offset={offset} changePageHandler={changePageHandler} />
          )}
        </>
      ) : (
        <div className="flex flex-row justify-center items-center my-10 animate-pulse">
          {/* <Progress color="deepOrange" value="50" percentage={false} /> */}
          {/* <p className="text-md font-semibold animate-spin ">Loading...</p> */}
          <div className="h-12 w-12 mr-5">
            <Image
              src="/images/pokeball.png"
              width="224"
              height="225"
              className=""
              layout="responsive"
            />
          </div>
          <p>Loading ...</p>
        </div>
      )}
    </div>
  );
}
