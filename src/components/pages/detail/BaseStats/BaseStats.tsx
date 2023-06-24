import React from "react";
import Card from "../Card";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { pokemonDataState } from "@/store/pokemonDetailStore";

const BaseStats = () => {
  const { query } = useRouter();
  const pokemonDetail = useRecoilValue(pokemonDataState(query.id as string));

  if (!pokemonDetail)
    return <p className="text-white">Cannot found base stats</p>;

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
              <td className="uppercase font-medium pr-4">{stat.stat.name}</td>
              <td>:</td>
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
