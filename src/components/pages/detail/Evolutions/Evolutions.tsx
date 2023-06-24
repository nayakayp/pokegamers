import React, { useEffect, useState } from "react";
import Card from "../Card";
import useFetchApi from "@/hooks/useFetchApi";
import { useRouter } from "next/router";
import {
  TPokemonListDetailResponse,
  TPokemonSpeciesResponse,
} from "@/types/pokemon";
import { reformatEvolutionChain } from "@/helpers/reformat";
import { getPokemonDetail } from "@/services/pokemonService";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Evolutions = (props: Props) => {
  const BASE_URL = process.env.BASE_URL;
  const { query } = useRouter();

  const [pokemonEvolutionChain, setPokemonEvolutionChain] =
    useState<TPokemonListDetailResponse[]>();

  const { data: pokemonDetail } = useFetchApi<TPokemonListDetailResponse>(
    `${BASE_URL}/pokemon/${query.id}`
  );
  const { data: dataSpecies } = useFetchApi<TPokemonSpeciesResponse>(
    `${BASE_URL}/pokemon-species/${query.id}`
  );

  useEffect(() => {
    if (pokemonDetail && dataSpecies) {
      const fetchData = async () => {
        const dataEvolution = await fetch(dataSpecies.evolution_chain.url).then(
          (resp) => resp.json()
        );

        const reformatDataEvolution: { name: string; url: string }[] =
          await reformatEvolutionChain(dataEvolution.chain);

        const getPokemonsEvolveChain = Promise.all(
          reformatDataEvolution.map(async (pokemon) => {
            const response = await getPokemonDetail(pokemon.name);
            return response;
          })
        );

        const datas: TPokemonListDetailResponse[] =
          await getPokemonsEvolveChain;

        setPokemonEvolutionChain(datas);
      };

      fetchData();
    }
  }, [pokemonDetail, dataSpecies]);

  if (!pokemonDetail || !pokemonEvolutionChain) return <>Loading...</>;

  return (
    <Card title="Evolutions">
      <div className="flex items-center gap-4 justify-center p-2">
        {pokemonEvolutionChain.map((pokemon, index) => (
          <div key={index} className="flex items-center gap-4">
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            )}
            <Link href={`/${pokemon.name}`} key={pokemon.id}>
              <div>
                <Image
                  src={pokemon.sprites.front_default}
                  width={96}
                  height={96}
                  alt={pokemon.name}
                />
                <p className="capitalize text-center">{pokemon.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Evolutions;
