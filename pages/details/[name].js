import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const Details = () => {
  // navigation
  const router = useRouter();

  //   //   query params
  //   const { name } = router.query;

  //   states
  const [pokemon, setPokemon] = useState({});


  const getPokemon = async (pokemonName) => {
    // console.log("call pokemon data");
    // console.log("current offset", offset);

    // console.log(pokemonName);

    const resp = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .catch((err) => console.log("Error:", err));

    // console.log(resp);

    const pok = resp.data;

    // console.log(pok);

    // define pokemon data
    var pokemon = {
      name: pok.name[0].toUpperCase() + pok.name.slice(1),
      photo: pok.sprites.front_default,
      id: pok.id
    };
    // pokemon["name"] = pok.name[0].toUpperCase() + pok.name.slice(1);
    // pokemon["photo"] = pok.sprites.front_default((pokemon["id"] = pok.id));

      // set pokemons
      setPokemon(pokemon);
  };

  useEffect(() => {
    //   query params
    const { name } = router.query;

    // console.log('name from router: ', name);

    // get data
    // change first char to lowercase becasue it was upper case
    getPokemon(name[0].toLowerCase() + name.slice(1));
  }, []);

  return <div>hello I am {pokemon.name}</div>;
};

export default Details;
