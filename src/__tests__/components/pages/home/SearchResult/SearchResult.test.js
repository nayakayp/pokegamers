import React from "react";
import { render } from "@testing-library/react";
import SearchResult from "../../../../../components/pages/home/SearchResult/SearchResult";
import { useRecoilValue } from "recoil";
import { pokemonDataState } from "../../../../../store/pokemonDetailStore";

jest.mock("recoil", () => ({
  useRecoilValue: jest.fn(),
}));

jest.mock("../../../../store/pokemonDetailStore", () => ({
  pokemonDataState: jest.fn(),
}));

describe("SearchResult component", () => {
  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    sprites: {
      front_default: "/bulbasaur.png",
    },
  };

  beforeEach(() => {
    useRecoilValue.mockReturnValue(mockPokemon);
    pokemonDataState.mockReturnValue(mockPokemon);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the PokemonCard component with the correct props", () => {
    const { getByText, getByAltText } = render(
      <SearchResult query="bulbasaur" />
    );

    const nameElement = getByText("bulbasaur");
    expect(nameElement).toBeInTheDocument();

    const idElement = getByText("#1");
    expect(idElement).toBeInTheDocument();

    const imageElement = getByAltText("bulbasaur");
    expect(imageElement).toBeInTheDocument();
  });

  it("renders the 'Cannot found the pokemon' message when pokemon is null", () => {
    useRecoilValue.mockReturnValueOnce(null);
    pokemonDataState.mockReturnValueOnce(null);

    const { getByText } = render(<SearchResult query="unknown" />);
    const messageElement = getByText("Cannot found the pokemon");
    expect(messageElement).toBeInTheDocument();
  });
});
