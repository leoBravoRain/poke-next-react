import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import PokeCard from "../../components/general/PokeCard";
import Progress from "../../components/general/Progress";

const Details = () => {
  // navigation
  const router = useRouter();

  //   states
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getPokemon = async (pokemonName) => {
      setLoading(true);

      const resp = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .catch((err) => console.log("Error:", err));

      const pok = resp.data;

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

      // set pokemons
      setPokemon(pokemon);

      // loading
      setLoading(false);
    };
    
    if (router.isReady) {
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
              pokemon={pokemon}
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
