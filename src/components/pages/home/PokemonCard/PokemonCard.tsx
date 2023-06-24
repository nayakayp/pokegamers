import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  imgUrl: string;
};

const PokemonCard = ({ id, name, imgUrl }: Props) => {
  return (
    <Link
      href={`/${name}`}
      className="hover:bg-black/50 transition-all shadow bg-black/10 p-4 rounded-md w-64 border  mx-auto flex flex-col items-center"
    >
      <Image src={imgUrl} width={96} height={96} alt={name}></Image>
      <p className="text-sm text-gray-400">#{id}</p>
      <p className="text-xl font-medium capitalize text-white">{name}</p>
    </Link>
  );
};

export default PokemonCard;
