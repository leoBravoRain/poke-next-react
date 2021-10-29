import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import PokeCard from "../../components/general/Card";
import Progress from "../../components/general/Progress";

const Details = () => {
  // navigation
  const router = useRouter();

  //   //   query params
  //   const { name } = router.query;

  //   states
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  const getPokemon = async (pokemonName) => {
    setLoading(true);

    // console.log("call pokemon data");
    // console.log("current offset", offset);

    // console.log(pokemonName);

    const resp = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .catch((err) => console.log("Error:", err));

    // console.log(resp);

    const pok = resp.data;

    console.log(pok);

    // define pokemon data
    var pokemon = {
      name: pok.name[0].toUpperCase() + pok.name.slice(1),
      photo: pok.sprites.front_default,
      id: pok.id,
      types: pok.types,
      height: pok.height,
      weight: pok.weight,
      baseExperience: pok.base_experience,
    };
    // pokemon["name"] = pok.name[0].toUpperCase() + pok.name.slice(1);
    // pokemon["photo"] = pok.sprites.front_default((pokemon["id"] = pok.id));

    console.log(pokemon);

    // set pokemons
    setPokemon(pokemon);

    // loading
    setLoading(false);
  };

  useEffect(() => {
    // console.log("name page");

    if (router.isReady) {
      // console.log("router ready");
      const { name } = router.query;
      // get data
      // change first char to lowercase becasue it was upper case
      getPokemon(name[0].toLowerCase() + name.slice(1));
    }
  }, [router]);

  return (
    <>
      <div className="m-12 mt-24 flex justify-center">
        {!loading ? (
          <div className="">
          <PokeCard
            // key={idx}
            pokemon={pokemon}
            // selectPokemonHandler={selectPokemonHandler}
            fullInformation={true}
          />
          </div>
        ) : (
          <Progress />
        )}
      </div>
    </>
  );
};

export default Details;
