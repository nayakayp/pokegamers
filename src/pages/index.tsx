import { Suspense, useEffect, useState } from "react";
import {
  getPokemonList,
  TPokemonListResponse,
  TPokemonListDetailResponse,
} from "@/services/pokemonService";
import PokemonCard from "@/components/pages/home/PokemonCard";
import PokemonCardSkeleton from "@/components/pages/home/PokemonCard/Skeleton";
import Search from "@/components/pages/home/Search";
import useInView from "@/hooks/useInView";
import SearchResult from "@/components/pages/home/SearchResult";

export default function Home() {
  const { ref, inView } = useInView({ threshold: 1 });
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [currPage, setcurrPage] = useState<number>(1);
  const [pokemonList, setPokemonList] = useState<TPokemonListResponse[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pokemonListDetail, setPokemonListDetail] =
    useState<TPokemonListDetailResponse[]>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const fetchPokemonList = async () => {
    const data = await getPokemonList(1);
    await setPokemonList(data);
  };

  const fetchPokemonListDetail = async () => {
    if (pokemonList) {
      const response = Promise.all(
        pokemonList.map(async (pokemon) => {
          const data = await fetch(pokemon.url).then((resp) => resp.json());
          return data;
        })
      );

      const datas = await response;
      await setPokemonListDetail(datas);
    }
  };

  const handleSearchPokemon = async (value: string) => {
    if (value.trim() !== "") {
      setSearchQuery(value);
      setIsSearching(true);
    } else if (value.trim() === "") {
      await setIsSearching(false);
    }
  };

  const handleNextPage = async () => {
    setIsFetchingNextPage(true);
    const newCurrPage = currPage + 1;
    const pokemonList = await getPokemonList(newCurrPage);
    const pokemonsDetail = Promise.all(
      pokemonList.map(async (pokemon) => {
        const data = await fetch(pokemon.url).then((resp) => resp.json());
        return data;
      })
    );

    const datas = await pokemonsDetail;
    await setPokemonListDetail([
      ...(pokemonListDetail as TPokemonListDetailResponse[]),
      ...datas,
    ]);
    await setcurrPage(newCurrPage);
    await setIsFetchingNextPage(false);
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    fetchPokemonListDetail();
  }, [pokemonList]);

  useEffect(() => {
    if (inView) {
      handleNextPage();
    }
  }, [inView]);

  if (!pokemonListDetail)
    return (
      <div className="grid grid-cols-2 gap-4 justify-center">
        {[...Array(8)].map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <main>
      <div className="mt-4">
        <Search onChange={(newValue) => handleSearchPokemon(newValue)} />
      </div>
      <div className="pt-10 pb-4 grid grid-cols-2 gap-4 justify-center">
        {!isSearching ? (
          <>
            {pokemonListDetail.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                imgUrl={pokemon.sprites.front_default}
              />
            ))}
          </>
        ) : (
          <Suspense fallback={<PokemonCardSkeleton />}>
            <SearchResult query={searchQuery} />
          </Suspense>
        )}
      </div>

      {!isFetchingNextPage ? (
        <div
          ref={ref}
          className="bg-transparent h-10 w-full"
          onClick={handleNextPage}
        ></div>
      ) : (
        <div className="grid grid-cols-2 gap-4 justify-center">
          {[...Array(8)].map((_, i) => (
            <PokemonCardSkeleton key={i} />
          ))}
        </div>
      )}
    </main>
  );
}
