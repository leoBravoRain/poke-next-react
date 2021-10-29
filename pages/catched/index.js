// import Head from "next/head";
// import Image from "next/image";
// import Button from "@material-tailwind/react/Button";
import PokeCard from "../../components/general/Card";
import { useEffect, useState } from "react";
// import axios from "axios";

// import Icon from "@material-tailwind/react/Icon";
import { useAppContext } from "../../hooks/context-provider";
import { useRouter } from "next/dist/client/router";
// import Image from "next/image";
import Pagination from "../../components/general/Pagination";

import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Progress from "../../components/general/Progress";
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
  // const [offset, setOffset] = useState(0);
  const [typeFilter, setTypeFilter] = useState("all types");
  const [loading, setLoading] = useState(true);

  // context
  // const pokemonCtx = useContext(PokemonContextProvider);
  const pokemonCtx = useAppContext();

  // router
  const router = useRouter();

  // get pokemon data
  // const getPokemons = async (offsetToUse, typeFilter) => {
    const getPokemons = async (typeFilter) => {
    // console.log("call new pokemons");
    // console.log("current offset", offset, "current type: ", typeFilter);

    setLoading(true);

    // get pokemons from context
    const pokemonsList = pokemonCtx.pokemons;

    // filter
    if (typeFilter !== "all types") {
      // console.log("filter by type");
      pokemonsList = pokemonsList.filter((pokemon) =>
        pokemon.types.some((type) => typeFilter === type)
      );

      // this can be better if I add more pokemons until complete the limit
    }

    // sort by id
    pokemonsList = pokemonsList.sort((a, b) => a.id - b.id);

    // set pokemons
    setPokemons(pokemonsList);

    setLoading(false);
  };

  // callback function of offset change state
  useEffect(() => {
    // get data
    // getPokemons(offset, typeFilter);
    getPokemons(typeFilter);
  }, [typeFilter]);

  // change page
  // const changePageHandler = (arrow) => {
  //   // previous
  //   if (arrow === "left") {
  //     if (offset > 0) {
  //       // update offset
  //       setOffset((prev) => prev - limit);
  //     }
  //   }

  //   // next
  //   else {
  //     // here it should check the max page
  //     // update offset
  //     setOffset(offset + limit);
  //   }
  // };

  // select pokemon
  const selectPokemonHandler = (pokemon) => {
    // console.log(pokemonCtx.pokemon);
    router.push("details/" + pokemon.name);
  };

  return (
    <>
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
          {/* <Pagination offset={offset} changePageHandler={changePageHandler} /> */}

          {/* pokemons card */}
          {pokemons.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-24 px-5">
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
            <div className="text-center">
              <p className="text-md font-semibold">
                No catched pokemons with this type in this batch
              </p>
            </div>
          )}
          {/* </div> */}

          {/* pagination */}
          {/* toggle first element */}
          {/* {pokemons.length > 0 && (
            <Pagination offset={offset} changePageHandler={changePageHandler} />
          )} */}
        </>
      ) : (
        <Progress />
      )}
    </>
  );
}
