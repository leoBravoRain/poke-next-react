// import Head from "next/head";
// import Image from "next/image";
// import Button from "@material-tailwind/react/Button";
import PokeCard from "../components/general/Card";
import { useEffect, useState } from "react";
import axios from "axios";

import Icon from "@material-tailwind/react/Icon";
// import { useAppContext } from "../hooks/context-provider";
import { useRouter } from "next/dist/client/router";
import Pagination from "../components/general/Pagination";

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

export default function Home() {
  // statates
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  // context
  // const pokemonCtx = useContext(PokemonContextProvider);
  // const pokemonCtx = useAppContext();

  // router
  const router = useRouter();

  // get pokemon data
  const getPokemons = async (offsetToUse) => {
    // console.log("call new pokemons");
    // console.log("current offset", offset);

    const resp = await axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsetToUse}`
      )
      .catch((err) => console.log("Error:", err));

    const pokemonsToDisplay = resp.data.results;

    // console.log(pokemonsToDisplay);

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
      };

      // return pokemon;
    });

    // sort by id
    pokemonsList = pokemonsList.sort((a, b) => a.id - b.id);

    // console.log("pokemons to display: ", pokemonsList);

    // set pokemons
    setPokemons(pokemonsList);
  };

  // callback function of offset change state
  useEffect(() => {
    // get data
    getPokemons(offset);
  }, [offset]);

  // useEffect(() => {
  //   // get data
  //   // getPokemons(offset);
  //   console.log("change pokemon");
  //   console.log('pokemon: ', pokemonCtx.pokemon);
  //   // check if pokemon is not empty
  //   if(Object.keys(pokemonCtx.pokemon).length !== 0) {
  //     // console.log('navigate');
  //     router.push("/details/" + pokemonCtx.pokemon.name);
  //   }
  //   else {
  //     console.log('empty')
  //   }

  // }, [pokemonCtx.pokemon]);

  // change page
  const changePageHandler = (arrow) => {
    // console.log("change page: ", arrow);
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
    // console.log(pokemon);
    // console.log(pokemonCtx);

    // set pokemon state
    // pokemonCtx.selectNewPokemon(pokemon);

    // console.log(pokemonCtx.pokemon);
    router.push("details/" + pokemon.name);
  };

  return (
    <div className="p-2">
      {/* pagination */}
      <Pagination offset={offset} changePageHandler={changePageHandler} />

      {/* pokemons card */}
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

      {/* pagination */}
      {/* toggle first element */}
      <Pagination offset={offset} changePageHandler={changePageHandler} />

    </div>
  );
}
