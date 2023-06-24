import React, { useState } from "react";
import { pokemonDataState } from "@/store/pokemonDetailStore";
import { useRecoilValue } from "recoil";
import PokemonCard from "@/components/pages/home/PokemonCard";

type Props = {
  name: string;
};

const Pokemon = ({ name }: Props) => {
  const pokemon = useRecoilValue(pokemonDataState(name));

  if (!pokemon) return <p className="text-white">Cannot found the pokemon</p>;

  return (
    <PokemonCard
      key={pokemon.id}
      id={pokemon.id}
      name={pokemon.name}
      imgUrl={pokemon.sprites.front_default}
    />
  );
};

export default Pokemon;
