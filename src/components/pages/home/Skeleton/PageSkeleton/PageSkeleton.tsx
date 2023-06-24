import React from "react";
import PokemonCardSkeleton from "@/components/pages/home/Skeleton/PokemonCardSkeleton";

type Props = {};

const PageSkeleton = (props: Props) => {
  return (
    <>
      <div className="mt-4"></div>
      <div className="pt-10 pb-4 grid grid-cols-2 gap-4 justify-center">
        {[...Array(8)].map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export default PageSkeleton;
