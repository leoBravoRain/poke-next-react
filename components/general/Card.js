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

export default function PokeCard({ pokemon, selectPokemonHandler }) {
    const router = useRouter();

    return (
        <Card className="mt-5">
            <CardImage
                src={pokemon.photo}
                alt="Card Image"
                className="bg-orange"
            />

            <CardBody>
                <div className="">
                    <Small>#{pokemon.id}</Small>
                    <H6>{pokemon.name}</H6>
                    {/* <Paragraph color="gray">
                    Don't be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                </Paragraph> */}
                </div>
            </CardBody>

            <CardFooter>
                <Button
                    onClick={() => {
                        // console.log(pokemon);
                        // router.push("details/" + pokemon.name);
                        selectPokemonHandler(pokemon);
                    }}
                    size="lg"
                    ripple="light"
                    className="main-button"
                >
                    Ver detalles
                </Button>
            </CardFooter>
        </Card>
    );
}
