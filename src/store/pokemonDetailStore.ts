import { reformatEvolutionChain } from "@/helpers/reformat";
import { getPokemonDetail } from "@/services/pokemonService";
import {
  TPokemonListDetailResponse,
  TPokemonMovesResponse,
  TPokemonSpeciesResponse,
} from "@/types/pokemon";
import {  selectorFamily } from "recoil";

const BASE_URL = process.env.BASE_URL;

export const pokemonDataState = selectorFamily({
  key: "pokemonData",
  get: (name: string) => async (): Promise<TPokemonListDetailResponse> => {
    const response = await fetch(`${BASE_URL}/pokemon/${name}`).then((resp) =>
      resp.json()
    );
    return response;
  },
});

export const pokemonSpeciesState = selectorFamily({
  key: "pokemonSpecies",
  get: (name: string) => async (): Promise<TPokemonSpeciesResponse> => {
    const response = await fetch(`${BASE_URL}/pokemon-species/${name}`).then(
      (resp) => resp.json()
    );
    return response;
  },
});

export const pokemonEvolutionChainState = selectorFamily({
  key: "pokemonEvolution",
  get:
    (name: string) =>
    async ({ get }): Promise<TPokemonListDetailResponse[]> => {
      const pokemonSpecies = get(pokemonSpeciesState(name));
      const dataEvolution = await fetch(
        pokemonSpecies.evolution_chain.url
      ).then((resp) => resp.json());

      const reformatDataEvolution: { name: string; url: string }[] =
        await reformatEvolutionChain(dataEvolution.chain);

      const getPokemonsEvolveChain = Promise.all(
        reformatDataEvolution.map(async (pokemon) => {
          const response = await getPokemonDetail(pokemon.name);
          return response;
        })
      );

      const datas = await getPokemonsEvolveChain;

      return datas;
    },
});

export const pokemonMoveState = selectorFamily({
  key: "pokemonMove",
  get:
    (name: string) =>
    async ({ get }): Promise<TPokemonMovesResponse[]> => {
      const pokemonDetail = get(pokemonDataState(name));
      const datas = Promise.all(
        pokemonDetail.moves.slice(0, 10).map(async (move) => {
          const data = await fetch(move.move.url).then((resp) => resp.json());
          return data;
        })
      );

      const moves = await datas;

      return moves;
    },
});
