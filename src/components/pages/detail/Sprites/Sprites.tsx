import React from "react";
import Card from "../Card";
import Image from "next/image";
import { useRouter } from "next/router";
import useFetchApi from "@/hooks/useFetchApi";
import { TPokemonListDetailResponse } from "@/types/pokemon";

type Props = {};

const Sprites = (props: Props) => {
  const BASE_URL = process.env.BASE_URL;
  const { query } = useRouter();
  const { data: pokemonDetail } = useFetchApi<TPokemonListDetailResponse>(
    `${BASE_URL}/pokemon/${query.id}`
  );

  if (!pokemonDetail) return <>Loading...</>;

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
          <Image
            src={pokemonDetail.sprites.back_default}
            width={96}
            height={96}
            alt={pokemonDetail.name}
            className="mx-auto"
          />
        </div>
      </div>
      <div className="">
        <h4 className="text-center text-gray-900 text-sm bg-gray-300 w-fit mx-auto py-1 px-4 rounded-full mt-4 underline">
          Shiny
        </h4>
        <div className="flex">
          <Image
            src={pokemonDetail.sprites.front_shiny}
            width={96}
            height={96}
            alt={pokemonDetail.name}
            className="mx-auto"
          />
          <Image
            src={pokemonDetail.sprites.back_shiny}
            width={96}
            height={96}
            alt={pokemonDetail.name}
            className="mx-auto"
          />
        </div>
      </div>
    </Card>
  );
};

export default Sprites;
