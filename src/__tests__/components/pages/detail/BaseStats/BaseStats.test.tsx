import React from "react";
import { render } from "@testing-library/react";
import BaseStats from "@/components/pages/detail/BaseStats/BaseStats";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { pokemonDataState } from "@/store/pokemonDetailStore";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("recoil", () => ({
  useRecoilValue: jest.fn(),
}));

jest.mock("@/store/pokemonDetailStore", () => ({
  pokemonDataState: jest.fn(),
}));

describe("BaseStats component", () => {
  const mockStats = [
    { stat: { name: "stat1" }, base_stat: 10 },
    { stat: { name: "stat2" }, base_stat: 20 },
  ];

  const mockPokemon = {
    stats: mockStats,
    height: 100,
    weight: 200,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ query: { id: "1" } });
    (useRecoilValue as jest.Mock).mockReturnValue(mockPokemon);
    (pokemonDataState as jest.Mock).mockReturnValue(mockPokemon);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the base stats correctly", () => {
    const { getByText } = render(<BaseStats />);

    const titleElement = getByText("Base Stats");
    expect(titleElement).toBeInTheDocument();

    const stat1Element = getByText("stat1");
    expect(stat1Element).toBeInTheDocument();

    const stat2Element = getByText("stat2");
    expect(stat2Element).toBeInTheDocument();

    const heightElement = getByText("10 Meter");
    expect(heightElement).toBeInTheDocument();

    const weightElement = getByText("20 Kg");
    expect(weightElement).toBeInTheDocument();
  });

  it("renders the 'Cannot found base stats' message when pokemonDetail is null", () => {
    (useRecoilValue as jest.Mock).mockReturnValueOnce(null);
    (pokemonDataState as jest.Mock).mockReturnValueOnce(null);

    const { getByText } = render(<BaseStats />);
    const messageElement = getByText("Cannot found base stats");
    expect(messageElement).toBeInTheDocument();
  });
});
