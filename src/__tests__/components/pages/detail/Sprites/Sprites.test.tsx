import React from "react";
import { render } from "@testing-library/react";
import Sprites from "@/components/pages/detail/Sprites/Sprites";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { pokemonDataState } from "@/store/pokemonDetailStore";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("recoil", () => ({
  useRecoilValue: jest.fn(),
}));

jest.mock("@/store/pokemonDetailStore.ts", () => ({
  pokemonDataState: jest.fn(),
}));

describe("Sprites component", () => {
  const mockPokemonDetail = {
    sprites: {
      front_default: "/front_default_url.png",
      back_default: "/back_default_url.png",
      front_shiny: "/front_shiny_url.png",
      back_shiny: "/back_shiny_url.png",
    },
    name: "Pikachu",
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ query: { id: "1" } });
    (useRecoilValue as jest.Mock).mockReturnValue(mockPokemonDetail);
    (pokemonDataState as jest.Mock).mockReturnValue(mockPokemonDetail);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sprites correctly", () => {
    const { getByText, getByAltText } = render(<Sprites />);

    const regularTitleElement = getByText("Regular");
    expect(regularTitleElement).toBeInTheDocument();

    const regularFrontImageElement = getByAltText(
      "Pikachu/front_default_url.png"
    );
    expect(regularFrontImageElement).toBeInTheDocument();

    const regularBackImageElement = getByAltText(
      "Pikachu/back_default_url.png"
    );
    expect(regularBackImageElement).toBeInTheDocument();

    const shinyTitleElement = getByText("Shiny");
    expect(shinyTitleElement).toBeInTheDocument();

    const shinyFrontImageElement = getByAltText("Pikachu/front_shiny_url.png");
    expect(shinyFrontImageElement).toBeInTheDocument();
  });

  it("displays error message when pokemonDetail is not available", () => {
    (useRecoilValue as jest.Mock).mockReturnValue(null);
    (pokemonDataState as jest.Mock).mockReturnValue(null);

    const { getByText } = render(<Sprites />);

    const errorElement = getByText("Cannot found pokemon sprites");
    expect(errorElement).toBeInTheDocument();
  });
});
