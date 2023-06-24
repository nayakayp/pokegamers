import { reformatEvolutionChain } from "@/helpers/reformat";
import {
  TPokemonListDetailResponse,
  TPokemonListResponse,
  TPokemonMovesResponse,
  TPokemonSpeciesResponse,
} from "@/types/pokemon";
import { selectorFamily } from "recoil";

const BASE_URL = process.env.BASE_URL;

export const pokemonDataState = selectorFamily({
  key: "pokemonData",
  get:
    (name: string) => async (): Promise<TPokemonListDetailResponse | null> => {
      try {
        const response = await fetch(`${BASE_URL}/pokemon/${name}`).then(
          (resp) => resp.json()
        );
        if (!response.ok && response.status === 404)
          throw new Error("Not found");

        return response;
      } catch (error) {
        return null;
      }
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
          const response: Promise<TPokemonListDetailResponse> = await fetch(
            `${BASE_URL}/pokemon/${pokemon.name}`
          ).then((resp)=>resp.json());
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
    async ({ get }): Promise<TPokemonMovesResponse[] | null> => {
      const pokemonDetail = get(pokemonDataState(name));
      if (!pokemonDetail) return null;

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

export const pokemonListState = selectorFamily({
  key: "pokemonList",
  get: (page: number) => async (): Promise<TPokemonListResponse> => {
    const response = await fetch(
      `${BASE_URL}/pokemon/?offset=${(page - 1) * 8}&limit=8`
    );
    const data = await response.json();

    return data;
  },
});

export const pokemonListDetailState = selectorFamily({
  key: "pokemonListDetail",
  get:
    (page: number) =>
    async ({ get }) => {
      const pokemonList = get(pokemonListState(page));
      const response = Promise.all(
        pokemonList.results.map(async (pokemon) => {
          const data = await fetch(pokemon.url).then((resp) => resp.json());
          return data;
        })
      );

      const datas = await response;
      return datas;
    },
});
