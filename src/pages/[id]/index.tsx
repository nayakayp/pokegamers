import React from "react";
import { useRouter } from "next/router";
import type { TPokemonListDetailResponse } from "@/types/pokemon";
import Image from "next/image";
import BaseStats from "@/components/pages/detail/BaseStats";
import Sprites from "@/components/pages/detail/Sprites";
import Move from "@/components/pages/detail/Move/Move";
import Evolutions from "@/components/pages/detail/Evolutions/Evolutions";
import useFetchApi from "@/hooks/useFetchApi";
import PageSkeleton from "@/components/pages/detail/Skeleton/PageSkeleton";

const PokemonDetailPage = () => {
  const BASE_URL = process.env.BASE_URL;
  const { query } = useRouter();

  const { data: pokemonDetail } = useFetchApi<TPokemonListDetailResponse>(
    `${BASE_URL}/pokemon/${query.id}`
  );

  if (!pokemonDetail) return <PageSkeleton />;

  return (
    <div className="text-white">
      <div className="flex flex-col items-center">
        <Image
          src={pokemonDetail.sprites.front_default}
          width={96}
          height={96}
          alt={pokemonDetail.name}
          className="w-64 h-64"
        />
        <p className="text-white capitalize text-4xl font-semibold">
          {pokemonDetail.name}
        </p>
        <div className="flex items-center gap-4 mt-4">
          {pokemonDetail.types.map((type) => (
            <p
              key={type.type.name}
              className="capitalize bg-slate-500 py-1 px-4 rounded-full"
            >
              {type.type.name}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-10">
        <div className="grid mt-10 grid-cols-2 gap-10">
          <BaseStats />
          <Sprites />
        </div>
        <Evolutions />
        <Move />
      </div>
    </div>
  );
};

export default PokemonDetailPage;
