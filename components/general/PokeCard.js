import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
// import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Small from "@material-tailwind/react/Small";
import { useRouter } from "next/dist/client/router";
// import Link from "next/link";
import TypeLabel from "./TypeLabel";
import Image from "next/image";
// import Label from "@material-tailwind/react/Label";

export default function PokeCard({
    pokemon,
    selectPokemonHandler,
    fullInformation = false,
    addPokemonHandler,
    animate = false,
    catched = false,
    tryToCatch = true,
}) {
    const router = useRouter();

    // console.log(pokemon);
    // console.log(pokemon.types)

    return (
        // <div className="w-full bg-white rounded-xl overflow-hdden shadow-md p-4 mt-5 ">
        <div className="w-full  rounded-xl shadow-md flex flex-col justify-center border border-gray-200 md:w-max">
            {/* card header */}
            <div class="flex justify-center rounded-t-xl h-28 w-full bg-gray-200">
                <Image
                    src={pokemon.photo}
                    alt="Card Image"
                    // className={`bg-white ${animate && catched && "animate-bounce"}
                    //  ${
                    //     animate && !catched && "animate-bounce"
                    // }`
                    // className={`bg-white ${animate && catched && "animate-pulse"}
                    // `}
                    className="w-full rounded-t-xl"
                    width="96"
                    height="96"
                    // layout="responsive"
                />
            </div>
            {/* card body */}
            <div className="p-2">
                {/* <div>
                        <Image src={pokemon.photo} width="32" height="32" />
                    </div> */}

                <Small>#{pokemon.id}</Small>
                <H6>{pokemon.name}</H6>
                {/* <Paragraph color="gray">
                    Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                </Paragraph> */}

                {/* full information */}
                {fullInformation && (
                    <div className="">
                        {/* general information */}
                        <Small>
                            Height: {pokemon.height} [dm]
                            <br />
                        </Small>
                        <Small>
                            Weigh: {pokemon.weight} [hg] <br />
                        </Small>
                        <Small>
                            Experience gained for defeating:{" "}
                            {pokemon.baseExperience}
                        </Small>
                        {/* types */}
                        <div className="">
                            <Small>Types:</Small>
                            <div className="flex flex-row space-x-2">
                                {pokemon.types.map((type_) => {
                                    // console.log(type.type.name);
                                    return (
                                        // <Link href={"/type/"+type.type.name}>
                                        // <Link
                                        //     href={{
                                        //         pathname: "/type/[name]",
                                        //         query: {
                                        //             name: type.type.name,
                                        //         },
                                        //     }}
                                        // >
                                        //     <div className="bg-orange px-2 py-1 rounded-2xl text-sm uppercase font-semibold text-white">
                                        //         {type.type.name}
                                        //     </div>
                                        // </Link>
                                        <TypeLabel key={type_} type={type_} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {/* card footer */}
                {!fullInformation && (
                    <div className="flex flex-col space-y-2">
                        <Button
                            onClick={() => {
                                // console.log(pokemon);
                                // router.push("details/" + pokemon.name);
                                selectPokemonHandler(pokemon);
                            }}
                            size="sm"
                            ripple="light"
                            className="main-button"
                        >
                            See
                        </Button>

                        {/* catch pokemon */}
                        {tryToCatch && (
                            <Button
                                onClick={() => {
                                    // console.log(pokemon);
                                    // router.push("details/" + pokemon.name);
                                    addPokemonHandler(pokemon);
                                }}
                                // size="md"
                                size="sm"
                                className="main-button"
                            >
                                Try to catch it!
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
