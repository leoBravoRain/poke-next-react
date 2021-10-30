import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
// import PokeCard from "../../components/general/Card";
// import Link from "next/link";
import Progress from "../../components/general/Progress";
// import H4 from "@material-tailwind/react/Heading4";
import TypeLabel from "../../components/general/TypeLabel";
// import Small from "@material-tailwind/react/Small";
import PokeCard from "../../components/general/PokeCard";

// key with name of damage relations
const damage_relations_dict = {
  no_damage_to: "This type has no effect on",
  half_damage_to: "This type is not very effective against",
  double_damage_to: "This type is very effective against",
  no_damage_from: "Types that have no effect on this type",
  half_damage_from: "Types that are not very effective against this type",
  double_damage_from: "Types that are very effective against this type",
};

const Detail = () => {
  // const Detail = ({name}) => {
  // navigation
  const router = useRouter();

  //   //   query params
  //   const { name } = router.query;

  //   states
  const [type, setType] = useState({});
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  // get pokemon data
  const getPokemons = async (pokemonsToDisplay) => {
    // console.log("call new pokemons");
    // console.log("current offset", offset, "current type: ", typeFilter);

    setLoading(true);

    // console.log("get detailed data from pokemons");
    const pokemonsList = [];

    await Promise.all(
      pokemonsToDisplay.map((pokemon) => {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`)
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
        // types: pok.types.map((type) => type.type.name),
        // isCatched: pokemonCtx.pokemons.find((pokemon) => pokemon.name === pok.name),
      };
    });

    // sort by id
    pokemonsList = pokemonsList.sort((a, b) => a.id - b.id);

    console.log("pokemons to display: ", pokemonsList);

    // set pokemons
    setPokemons(pokemonsList);

    setLoading(false);
  };

  const getData = async (name) => {
    setLoading(true);

    // console.log("call pokemon data");
    // console.log("current offset", offset);

    // console.log(name);

    const resp = await axios
      .get(`https://pokeapi.co/api/v2/type/${name}`)
      .catch((err) => console.log("Error:", err));

    // console.log(resp);

    const type = resp.data;

    console.log(type);

    // define type data
    var type_ = {
      name: type.name,
      damage_relations: type.damage_relations,
    };

    // console.log(type_);

    // set type
    setType(type_);

    // // loading
    // setLoading(false);

    // get pokemons data
    // console.log(type.pokemon.slice(0,5))
    // getPokemons(type.pokemon.slice(0, 12));
    // get random pokemons
    getPokemons(
      type.pokemon.sort(() => Math.random() - Math.random()).slice(0, 12)
    );
  };

  useEffect(() => {
    // console.log("name page");

    if (router.isReady) {
      // console.log("router ready");
      const { name } = router.query;
      getData(name);
    }
  }, [router]);

  return (
    <>
      <div className="flex flex-col">
        {!loading ? (
          <>
            <p className="text-2xl font-semibold mb-2">
              {type.name[0].toUpperCase() + type.name.slice(1)}
            </p>

            {/* damage relations */}
            <div className="flex flex-col space-y-5">
              {Object.keys(type.damage_relations).map((relationName, idx) => {
                // console.log(relationName);

                return (
                  <div key={idx} className="">
                    <p className="xsmall-text">
                      {damage_relations_dict[relationName]}:
                    </p>

                    {/* display each type */}
                    {type.damage_relations[relationName].length > 0 ? (
                      // <div className="grid grid-cols-3 grid-flow-row gap-3 bg-green-200">
                      <div className="flex flex-row flex-wrap justify-start space-x-2">
                        {type.damage_relations[relationName].map((type_) => {
                          // const obj = {type: type_};
                          return (
                            <div className="my-1">
                              <TypeLabel key={type_} type={{ type: type_ }} />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-md font-semibold">No types</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* display some pokemons */}
            <div className="mt-5 flex flex-col justify-center">
              <p className="small-text">Some pokemons of this type:</p>
              <div className="grid grid-cols-2 gap-3 mt-5 md:grid-cols-4 md:gap-10">
                {pokemons.length > 0 &&
                  pokemons.map((pokemon) => {
                    return (
                      <div className="flex justify-center">
                        <PokeCard
                          pokemon={pokemon}
                          selectPokemonHandler={() => {
                            router.push(
                              {
                                pathname: "/details/[name]",
                                query: { name: pokemon.name },
                              }
                              // "/details/" +
                              //   // (pokemon.name[0].tuUpperCase() + pokemon.name.slice(1))
                              //   pokemon.name
                            );
                          }}
                          fullInformation={false}
                          tryToCatch={false}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <Progress />
        )}
      </div>
    </>
  );
};

// Detail.getInitialProps = async ({ query }) => {
//   const { name } = query;
//   return { name };
// };

export default Detail;
