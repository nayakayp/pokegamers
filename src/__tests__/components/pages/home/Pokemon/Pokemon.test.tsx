import React from "react";
import { render } from "@testing-library/react";
import { RecoilRoot, useRecoilValue } from "recoil";
import Pokemon from "@/components/pages/home/Pokemon/Pokemon";

// Mock useRecoilValue hook
jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilValue: jest.fn(),
}));

describe("Pokemon component", () => {
  const useRecoilValueMock = useRecoilValue;

  beforeEach(() => {
    useRecoilValueMock.mockReset();
  });

  it("renders 'Cannot found the pokemon' message when pokemon is null", () => {
    useRecoilValueMock.mockReturnValue(null);

    const { getByText } = render(
      <RecoilRoot>
        <Pokemon name="bulbasaur" />
      </RecoilRoot>
    );

    const messageElement = getByText("Cannot found the pokemon");
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the PokemonCard component when pokemon is provided", () => {
    const mockPokemon = {
      id: 1,
      name: "bulbasaur",
      sprites: {
        front_default: "/bulbasaur.png",
      },
    };

    useRecoilValueMock.mockReturnValue(mockPokemon);

    const { getByText, getByAltText } = render(
      <RecoilRoot>
        <Pokemon name="bulbasaur" />
      </RecoilRoot>
    );

    const pokemonNameElement = getByText("bulbasaur");
    const pokemonImageElement = getByAltText("bulbasaur");

    expect(pokemonNameElement).toBeInTheDocument();
    expect(pokemonImageElement).toBeInTheDocument();
  });
});
