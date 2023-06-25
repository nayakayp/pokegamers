import { Suspense, useEffect, useState } from "react";
import type { TPokemonListResponse } from "@/types/pokemon";
import PokemonCardSkeleton from "@/components/pages/home/Skeleton/PokemonCardSkeleton";
import PageSkeleton from "@/components/pages/home/Skeleton/PageSkeleton";
import Search from "@/components/pages/home/Search";
import useInView from "@/hooks/useInView";
import SearchResult from "@/components/pages/home/SearchResult";
import Pokemon from "@/components/pages/home/Pokemon";

type PokemonListResult = {
  name: string;
  url: string;
};

type Props = {
  pageData: TPokemonListResponse;
};

export default function Home({ pageData }: Props) {
  const { ref, inView } = useInView({ threshold: 1 });
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [currPage, setcurrPage] = useState<number>(1);
  const [pokemonList, setPokemonList] = useState<PokemonListResult[]>(
    pageData.results
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

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
    const nextPokemonList: TPokemonListResponse = await fetch(
      `${process.env.BASE_URL}/pokemon/?offset=${(newCurrPage - 1) * 8}&limit=8`
    ).then((resp) => resp.json());

    const { results } = nextPokemonList;

    setPokemonList([...(pokemonList as PokemonListResult[]), ...results]);

    await setcurrPage(newCurrPage);
    await setIsFetchingNextPage(false);
  };

  useEffect(() => {
    if (inView) {
      handleNextPage();
    }
  }, [inView]);

  if (!pokemonList) return <PageSkeleton />;

  return (
    <main>
      <div className="mt-4">
        <Search onChange={(newValue) => handleSearchPokemon(newValue)} />
      </div>
      <div className="pt-10 pb-4 grid grid-cols-2 gap-4 justify-center">
        {isSearching ? (
          <Suspense fallback={<PokemonCardSkeleton />}>
            <SearchResult query={searchQuery} />
          </Suspense>
        ) : (
          <>
            {pokemonList.map((pokemon) => (
              <Suspense key={pokemon.name} fallback={<PokemonCardSkeleton />}>
                <Pokemon name={pokemon.name} />
              </Suspense>
            ))}
          </>
        )}
      </div>

      {/* Infinite Scroll hook */}
      {!isFetchingNextPage ? (
        <div ref={ref} className="bg-transparent h-10 w-full"></div>
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

export async function getServerSideProps() {
  const pageData: TPokemonListResponse = await fetch(
    `${process.env.BASE_URL}/pokemon/?offset=0&limit=8`
  ).then((res) => res.json());

  return { props: { pageData } };
}
