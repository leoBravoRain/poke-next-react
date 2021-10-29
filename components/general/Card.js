import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H6 from "@material-tailwind/react/Heading6";
// import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Small from "@material-tailwind/react/Small";
// import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";

export default function PokeCard({
    pokemon,
    selectPokemonHandler,
    fullInformation = false,
}) {
    // const router = useRouter();

    // console.log(pokemon);
    // console.log(pokemon.types)

    return (
        <Card className="mt-5">
            <CardImage
                src={pokemon.photo}
                alt="Card Image"
                className="bg-white"
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
                            {/* types */}
                            <div className="">
                                <p>Types:</p>
                                {pokemon.types.map((type, idx) => {
                                    // console.log(type.type.name);
                                    return (
                                        // <Link href={"/type/"+type.type.name}>
                                        <Link
                                            href={{
                                                pathname: "/type/[name]",
                                                query: { name: type.type.name },
                                            }}
                                        >
                                            <div>{type.type.name}</div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </CardBody>

            <CardFooter className="flex justify-center">
                {!fullInformation && (
                    <Button
                        onClick={() => {
                            // console.log(pokemon);
                            // router.push("details/" + pokemon.name);
                            selectPokemonHandler(pokemon);
                        }}
                        // size="md"
                        ripple="light"
                        className="main-button"
                    >
                        Ver
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
