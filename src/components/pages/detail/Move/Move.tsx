import React from "react";
import Card from "../Card";
import { useRouter } from "next/router";
import { pokemonMoveState } from "@/store/pokemonDetailStore";
import { reformatPokemonMoveName } from "@/helpers/reformat";
import { useRecoilValue } from "recoil";

const Move = () => {
  const { query } = useRouter();
  const pokemonMoves = useRecoilValue(pokemonMoveState(query.id as string));

  if (!pokemonMoves)
    return <p className="text-white">Cannot found pokemon moves</p>;

  return (
    <Card title="Move">
      <table className="table-auto w-full border-separate md:border-spacing-2 border border-slate-400">
        <thead>
          <tr>
            <th className="text-left">No</th>
            <th className="text-left">Name</th>
            <th className="text-left">Power</th>
            <th className="text-left">Accuracy</th>
            <th className="text-left">Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemonMoves.map((move, idx) => (
            <tr key={move.id} className="border">
              <td>{idx + 1}</td>
              <td>{reformatPokemonMoveName(move.name)}</td>
              <td data-testid="power">{move.power ? move.power : "-"}</td>
              <td data-testid="accuracy">
                {move.accuracy ? move.accuracy : "-"}
              </td>
              <td className="capitalize">{move.type.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Move;
