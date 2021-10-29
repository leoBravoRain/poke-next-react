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
// import Image from "next/image";
// import Label from "@material-tailwind/react/Label";

export default function PokeCard({
    pokemon,
    selectPokemonHandler,
    fullInformation = false,
    addPokemonHandler,
    animate,
    catched,
}) {
    const router = useRouter();

    // console.log(pokemon);
    // console.log(pokemon.types)

    return (
        <Card className="mt-5">
            <CardImage
                src={pokemon.photo}
                alt="Card Image"
                className={`bg-white ${
                    animate && catched  && "animate-pulse"
                } ${animate && !catched  && "animate-bounce"}`}
            />

            <CardBody>
                <div className="">
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
                                            <TypeLabel
                                                key={type_}
                                                type={type_}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardBody>

            <CardFooter className="flex justify-center">
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
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
