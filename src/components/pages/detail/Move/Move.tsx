import React, { useEffect, useState } from "react";
import Card from "../Card";
import useFetchApi from "@/hooks/useFetchApi";
import { useRouter } from "next/router";
import {
  TPokemonListDetailResponse,
  TPokemonMovesResponse,
} from "@/types/pokemon";
import { reformatPokemonMoveName } from "@/helpers/reformat";

type Props = {};

const Move = (props: Props) => {
  const BASE_URL = process.env.BASE_URL;

  const [pokemonMoves, setPokemonMoves] = useState<TPokemonMovesResponse[]>();

  const { query } = useRouter();
  const { data: pokemonDetail } = useFetchApi<TPokemonListDetailResponse>(
    `${BASE_URL}/pokemon/${query.id}`
  );

  useEffect(() => {
    if (pokemonDetail) {
      const fetchDataMoves = async () => {
        const datas = Promise.all(
          pokemonDetail.moves.slice(0, 10).map(async (move) => {
            const data = await fetch(move.move.url).then((resp) => resp.json());
            return data;
          })
        );

        const moves = await datas;
        setPokemonMoves(moves);
      };

      fetchDataMoves();
    }
  }, [pokemonDetail]);

  if (!pokemonDetail || !pokemonMoves) return <>Loading...</>;

  return (
    <Card title="Move">
      <table className="table-auto w-full border-separate border-spacing-2 border border-slate-400">
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
              <td>{move.power ? move.power : "-"}</td>
              <td>{move.accuracy ? move.accuracy : "-"}</td>
              <td className="capitalize">{move.type.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Move;
