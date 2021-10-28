import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
// import PokeCard from "../../components/general/Card";
import Link from "next/link";

// key with name of damage relations
const damage_relations_dict = {
  no_damage_to: "This type has no effect on",
  half_damage_to: "This type is not very effect against",
  double_damage_to: "This type is very effect against",
  no_damage_from: "Types that have no effect on this type",
  half_damage_from: "Types that are not very effect against this type",
  double_damage_from: "Types that are very effect against this type",
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

    // else {
    //   // router.events.on("routeChangeComplete", () => {
    //   //   const { name } = router.query;
    //   //   getData(name);
    //   // });
    //   console.log("router not ready");
    // }

    // //   query params
    // const { name } = router.query;

    // // console.log('name from router: ', name);

    // // get data
    // // change first char to lowercase becasue it was upper case
    // getData(name);
  }, [router]);

  return (
    <div>
      <div className="m-12 mt-24">
        {!loading ? (
          <>
            <div>{type.name}</div>

            {/* damage relations */}
            <div>
              {Object.keys(type.damage_relations).map((relationName, idx) => {
                console.log(relationName);
                return (
                  <div key={idx}>
                    <p>{damage_relations_dict[relationName]}</p>

                    {/* display each type */}
                    {type.damage_relations[relationName].map((type_, idx) => {
                      return (
                        <div key={idx}>
                          <Link
                            href={{
                              pathname: "/type/[name]",
                              query: { name: type_.name },
                            }}
                          >
                            <p>{type_.name}</p>
                          </Link>{" "}
                          {/* <br /> */}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>loading...</div>
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
