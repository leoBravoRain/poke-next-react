// import Head from "next/head";
// import Image from "next/image";
// import Button from "@material-tailwind/react/Button";
import PokeCard from "../components/general/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const pokemons = [
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
  {
    number: 1,
    name: "Pikachu",
    photo: "/images/pikachu.png",
  },
];

// api limits
const limit = 10;
const offset = 0;

export default function Home() {
  // stats
  const [pokemons, setPokemons] = useState([]);

  // get data
  const getPokemons = async () => {
    const resp = await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .catch((err) => console.log("Error:", err));

    // console.log(resp);
    // var pokemons = resp.data.results;

    // // upper case first character
    // pokemons = pokemons.map((pok) => {
    //   pok["name"] = pok.name[0].toUpperCase() + pok.name.slice(1);
    // });

    // set pokemons
    // setPokemons(resp.data.results);

    // get pokemon data
    getPokemonData(resp.data.results);
  };

  const getPokemonData = async (pokemons) => {
    const pokemonsList = [];

    await Promise.all(
      pokemons.map((pokemon) => {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then((result) => {
            pokemonsList.push(result.data);
          });
      })
    );

    pokemonsList = pokemonsList.map((pok) => {
        var pokemon = {
          name: pok.name[0].toUpperCase() + pok.name.slice(1),
          photo: pok.sprites.front_default,
          id: pok.id,
        };

        return pokemon;
    });

    console.log(pokemonsList);

    // set pokemons
    setPokemons(pokemonsList);

  };

  useEffect(() => {
    // get data
    getPokemons();
  }, []);

  return (
    <div className="p-2">
      {/* pokemons card */}
      <div className="grid grid-cols-2 gap-4">
        {pokemons.map((pokemon, idx) => {
          return <PokeCard key={idx} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}
