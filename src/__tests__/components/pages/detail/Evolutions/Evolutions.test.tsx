import React from "react";
import { render } from "@testing-library/react";
import Evolutions from "@/components/pages/detail/Evolutions/Evolutions";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { pokemonEvolutionChainState } from "@/store/pokemonDetailStore";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("recoil", () => ({
  useRecoilValue: jest.fn(),
}));

jest.mock("@/store/pokemonDetailStore.ts", () => ({
  pokemonEvolutionChainState: jest.fn(),
}));

describe("Evolutions component", () => {
  const mockEvolutionChain = [
    { id: 1, name: "bulbasaur", sprites: { front_default: "/bulbasaur.jpg" } },
    { id: 2, name: "ivysaur", sprites: { front_default: "/ivysaur.jpg" } },
    { id: 3, name: "venesaur", sprites: { front_default: "/venesaur.jpg" } },
  ];

  beforeEach(() => {
    useRouter.mockReturnValue({ query: { id: "1" } });
    useRecoilValue.mockReturnValue(mockEvolutionChain);
    pokemonEvolutionChainState.mockReturnValue(mockEvolutionChain);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the evolutions correctly", () => {
    const { getByText, getAllByRole } = render(<Evolutions />);

    const titleElement = getByText("Evolutions");
    expect(titleElement).toBeInTheDocument();

    const pokemonElements = getAllByRole("link");
    expect(pokemonElements.length).toBe(mockEvolutionChain.length);

    mockEvolutionChain.forEach((pokemon, index) => {
      const nameElement = getByText(pokemon.name);
      expect(nameElement).toBeInTheDocument();

      const imageElement = pokemonElements[index].querySelector("img");
      expect(imageElement).toHaveAttribute("alt", pokemon.name);
    });
  });
});
