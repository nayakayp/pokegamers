import React from "react";
import Card from "../Card";
import useFetchApi from "@/hooks/useFetchApi";
import { useRouter } from "next/router";
import { TPokemonListDetailResponse } from "@/types/pokemon";

type Props = {};

const BaseStats = (props: Props) => {
  const BASE_URL = process.env.BASE_URL;
  const { query } = useRouter();
  const { data: pokemonDetail } = useFetchApi<TPokemonListDetailResponse>(
    `${BASE_URL}/pokemon/${query.id}`
  );

  if (!pokemonDetail) return <>Loading...</>;

  const totalStats = pokemonDetail.stats.reduce(
    (prevValue, currValue) => prevValue + currValue.base_stat,
    0
  );

  return (
    <Card title="Base Stats" badge={totalStats}>
      <table className="">
        <tbody className="">
          {pokemonDetail.stats.map((stat) => (
            <tr key={stat.stat.name} className="px-6 py-4">
              <td className="uppercase font-medium pr-4">{stat.stat.name}</td>:{" "}
              <td className="text-left pl-2">{stat.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center underline mt-4">
        <p className="uppercase font-medium text-lg">Height:</p>
        <p className="text-left pl-4">{pokemonDetail.height / 10} Meter</p>
      </div>
      <div className="flex items-center underline">
        <p className="uppercase font-medium text-lg">Weight:</p>
        <p className="text-left pl-4">{pokemonDetail.weight * 0.1} Kg</p>
      </div>
    </Card>
  );
};

export default BaseStats;
