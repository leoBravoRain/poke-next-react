import React from "react";
import Button from "@material-tailwind/react/Button";
import { useRouter } from "next/dist/client/router";
import TypeLabel from "./TypeLabel";
import Image from "next/image";

export default function PokeCard({
    pokemon,
    selectPokemonHandler,
    fullInformation = false,
    addPokemonHandler,
    animate = false,
    catched = false,
    tryToCatch = true,
}) {

    return (
        <div className="w-full  rounded-xl rounded-t-2xl shadow-md flex flex-col justify-center border border-gray-200 md:w-max">
            {/* card header */}
            <div className="flex justify-center rounded-t-xl h-28 w-full bg-gray-200">
                <Image
                    src={pokemon.photo}
                    alt="Card Image"
                    className={`${
                        animate && catched && "animate-pulse"
                    }
                    w-full rounded-t-xl`}
                    width="96"
                    height="96"
                />
            </div>
            {/* card body */}
            <div className="p-2">
                <div className="mt-4 mb-8 mx-3 ">
                    <p className="small-text">#{pokemon.id}</p>
                    <p className="font-semibold text-base">{pokemon.name}</p>
                </div>

                {/* full information */}
                {fullInformation && (
                    <div className="px-2 mb-5">
                        {/* geeral information */}
                        <p className="xsmall-text pb-2">
                            Height: {pokemon.height} [dm]
                            <br />
                        </p>
                        <p className="xsmall-text pb-2">
                            Weigh: {pokemon.weight} [hg] <br />
                        </p>
                        <p className="xsmall-text pb-2">
                            Experience gained for defeating:{" "}
                            {pokemon.baseExperience}
                        </p>
                        {/* types */}
                        <div className="">
                            <p className="xsmall-text pb-2">Types:</p>
                            <div className="flex flex-row space-x-2">
                                {pokemon.types.map((type_) => {
                                    return (
                                        <TypeLabel key={type_} type={type_} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {/* card footer */}
                {!fullInformation && (
                    <div className="flex flex-col space-y-4 justify-center items-center mb-8">
                        <Button
                            onClick={() => {
                                selectPokemonHandler(pokemon);
                            }}
                            size="sm"
                            ripple="light"
                            className="main-button w-min"
                        >
                            See
                        </Button>

                        {/* catch pokemon */}
                        {tryToCatch && (
                            <Button
                                onClick={() => {
                                    addPokemonHandler(pokemon);
                                }}
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
