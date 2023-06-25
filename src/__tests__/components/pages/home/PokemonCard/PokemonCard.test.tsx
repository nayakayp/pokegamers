import React from "react";
import { render } from "@testing-library/react";
import PokemonCard from "@/components/pages/home/PokemonCard/PokemonCard";

describe("PokemonCard component", () => {
  const mockProps = {
    id: 1,
    name: "bulbasaur",
    imgUrl: "/bulbasaur.png",
  };

  it("renders the image correctly", () => {
    const { getByAltText } = render(<PokemonCard {...mockProps} />);
    const imageElement = getByAltText("bulbasaur");
    expect(imageElement).toBeInTheDocument();
  });

  it("renders the ID correctly", () => {
    const { getByText } = render(<PokemonCard {...mockProps} />);
    const idElement = getByText("#1");
    expect(idElement).toBeInTheDocument();
  });

  it("renders the name correctly", () => {
    const { getByText } = render(<PokemonCard {...mockProps} />);
    const nameElement = getByText("bulbasaur");
    expect(nameElement).toBeInTheDocument();
  });

  it("renders the Link correctly", () => {
    const { getByText } = render(<PokemonCard {...mockProps} />);
    const linkElement = getByText("bulbasaur").closest("a");
    expect(linkElement).toHaveAttribute("href", "/bulbasaur");
  });
});
