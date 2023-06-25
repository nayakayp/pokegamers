import React from "react";
import Card from "../Card";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { pokemonEvolutionChainState } from "@/store/pokemonDetailStore";
import { useRecoilValue } from "recoil";

const Evolutions = () => {
  const { query } = useRouter();

  const pokemonEvolutionChain = useRecoilValue(
    pokemonEvolutionChainState(query.id as string)
  );

  return (
    <Card title="Evolutions">
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center p-2">
        {pokemonEvolutionChain.map((pokemon, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            {index > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 rotate-90 md:rotate-0"
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
