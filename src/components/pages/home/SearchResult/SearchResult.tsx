import React from "react";
import PokemonCard from "@/components/pages/home/PokemonCard";
import { pokemonDataState } from "@/store/pokemonDetailStore";
import { useRecoilValue } from "recoil";

type Props = {
  query: string;
};

const SearchResult = ({ query }: Props) => {
  const pokemon = useRecoilValue(pokemonDataState(query));

  if (pokemon === null)
    return <h1 className="text-white">Cannot found the pokemon</h1>;

  return (
    <PokemonCard
      id={pokemon.id}
      imgUrl={pokemon.sprites.front_default}
      name={pokemon.name}
    />
  );
};

export default SearchResult;
