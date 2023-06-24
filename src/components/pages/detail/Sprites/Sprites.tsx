import React from "react";
import Card from "../Card";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { pokemonDataState } from "@/store/pokemonDetailStore";

const Sprites = () => {
  const { query } = useRouter();
  const pokemonDetail = useRecoilValue(pokemonDataState(query.id as string));

  if (!pokemonDetail)
    return <p className="text-white">Cannot found pokemon sprites</p>;

  return (
    <Card title="Sprites">
      <div className="">
        <h4 className="text-center text-sm bg-gray-500 w-fit mx-auto py-1 px-4 rounded-full mt-4 underline">
          Regular
        </h4>
        <div className="flex items-center">
          <Image
            src={pokemonDetail.sprites.front_default}
            width={96}
            height={96}
            alt={pokemonDetail.name}
            className="mx-auto"
          />
          {pokemonDetail.sprites.back_default && (
            <Image
              src={pokemonDetail.sprites.back_default}
              width={96}
              height={96}
              alt={pokemonDetail.name}
              className="mx-auto"
            />
          )}
        </div>
      </div>
      <div className="">
        <h4 className="text-center text-gray-900 text-sm bg-gray-300 w-fit mx-auto py-1 px-4 rounded-full mt-4 underline">
          Shiny
        </h4>
        <div className="flex">
          {pokemonDetail.sprites.front_shiny && (
            <Image
              src={pokemonDetail.sprites.front_shiny}
              width={96}
              height={96}
              alt={pokemonDetail.name}
              className="mx-auto"
            />
          )}

          {pokemonDetail.sprites.back_shiny && (
            <Image
              src={pokemonDetail.sprites.back_shiny}
              width={96}
              height={96}
              alt={pokemonDetail.name}
              className="mx-auto"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default Sprites;
