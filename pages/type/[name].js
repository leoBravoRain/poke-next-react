import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
// import PokeCard from "../../components/general/Card";
import Link from "next/link";
import Progress from "../../components/general/Progress";
import H4 from "@material-tailwind/react/Heading4";
import TypeLabel from "../../components/general/TypeLabel";
import Small from "@material-tailwind/react/Small";

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
    // // pokemon["name"] = pok.name[0].toUpperCase() + pok.name.slice(1);
    // // pokemon["photo"] = pok.sprites.front_default((pokemon["id"] = pok.id));

    console.log(type_);

    // set type
    setType(type_);

    // loading
    setLoading(false);
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
    <div>
      <div className="m-12 mt-24">
        {!loading ? (
          <>
            <H4 color="black">
              {type.name[0].toUpperCase() + type.name.slice(1)}
            </H4>

            {/* damage relations */}
            <div className="flex flex-col space-y-5">
              {Object.keys(type.damage_relations).map((relationName, idx) => {
                // console.log(relationName);

                return (
                  <div key={idx} className="">
                    <Small>{damage_relations_dict[relationName]}:</Small>

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
          </>
        ) : (
          <Progress />
        )}
      </div>
    </div>
  );
};

// Detail.getInitialProps = async ({ query }) => {
//   const { name } = query;
//   return { name };
// };

export default Detail;
