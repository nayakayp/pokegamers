import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { TPokemonListDetailResponse } from "@/types/pokemon";
import Image from "next/image";
import BaseStats from "@/components/pages/detail/BaseStats";
import Sprites from "@/components/pages/detail/Sprites";
import Move from "@/components/pages/detail/Move/Move";
import Evolutions from "@/components/pages/detail/Evolutions/Evolutions";
import PageSkeleton from "@/components/pages/detail/Skeleton/PageSkeleton";
import CardSkeleton from "@/components/pages/detail/Skeleton/CardSkeleton";

const PokemonDetailPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const BASE_URL = process.env.BASE_URL;
  const [pokemonDetail, setPokemonDetail] =
    useState<TPokemonListDetailResponse>();
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/pokemon/${query.id}`);
        if (!response.ok && response.status === 404) {
          throw new Error("Cannot found the pokemon");
        }
        const data = await response.json();
        setPokemonDetail(data);
      } catch (error) {
        const message = (error as Error).message;
        setErrorMessage(message);
      }
    };

    if (query.id) {
      fetchData();
    }
  }, [query.id]);

  if (errorMessage)
    return <h1 className="text-white text-2xl text-center">{errorMessage}</h1>;
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
      <div className="grid gap-10 grid-cols-1">
        <div className="grid mt-10 md:grid-cols-2 gap-10">
          <Suspense fallback={<CardSkeleton />}>
            <BaseStats />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <Sprites />
          </Suspense>
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <Evolutions />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Move />
        </Suspense>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
