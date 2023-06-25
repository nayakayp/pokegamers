import React from "react";
import { render } from "@testing-library/react";
import Move from "../../../../../components/pages/detail/Move/Move";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { pokemonMoveState } from "../../../../../store/pokemonDetailStore";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("recoil", () => ({
  useRecoilValue: jest.fn(),
}));

jest.mock("../../../../store/pokemonDetailStore", () => ({
  pokemonMoveState: jest.fn(),
}));

describe("Move component", () => {
  const mockMoves = [
    { id: 1, name: "Move1", power: 80, accuracy: 100, type: { name: "Fire" } },
    {
      id: 2,
      name: "Move2",
      power: 70,
      accuracy: null,
      type: { name: "Water" },
    },
    {
      id: 3,
      name: "Move3",
      power: null,
      accuracy: null,
      type: { name: "Electric" },
    },
  ];

  beforeEach(() => {
    useRouter.mockReturnValue({ query: { id: "1" } });
    useRecoilValue.mockReturnValue(mockMoves);
    pokemonMoveState.mockReturnValue(mockMoves);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the moves correctly", () => {
    const { getByText } = render(<Move />);

    const tableHeadingNumber = getByText("No");
    expect(tableHeadingNumber).toBeInTheDocument();

    const tableHeadingName = getByText("Name");
    expect(tableHeadingName).toBeInTheDocument();

    const tableHeadingPower = getByText("Power");
    expect(tableHeadingPower).toBeInTheDocument();

    const tableHeadingAccuracy = getByText("Accuracy");
    expect(tableHeadingAccuracy).toBeInTheDocument();

    const tableHeadingType = getByText("Type");
    expect(tableHeadingType).toBeInTheDocument();

    mockMoves.forEach((move, index) => {
      const numberElement = getByText(String(index + 1));
      expect(numberElement).toBeInTheDocument();

      const nameElement = getByText(move.name);
      expect(nameElement).toBeInTheDocument();

      const typeElement = getByText(move.type.name);
      expect(typeElement).toBeInTheDocument();
    });
  });

  it("displays fallback values when move properties are null", () => {
    const mockNullMoves = [
      {
        id: 1,
        name: "Move1",
        power: null,
        accuracy: null,
        type: { name: "Fire" },
      },
      {
        id: 2,
        name: "Move2",
        power: null,
        accuracy: null,
        type: { name: "Water" },
      },
      {
        id: 3,
        name: "Move3",
        power: null,
        accuracy: null,
        type: { name: "Electric" },
      },
    ];

    useRecoilValue.mockReturnValue(mockNullMoves);
    pokemonMoveState.mockReturnValue(mockNullMoves);

    const { queryAllByTestId } = render(<Move />);

    const powerElements = queryAllByTestId("power");
    expect(powerElements.length).toBe(3); // Assuming there are 3 null then set to "-" at power elements

    const accuracyElements = queryAllByTestId("accuracy");
    expect(accuracyElements.length).toBe(3); // Assuming there are 3 null then set to "-" at accuracy elements
  });

  it("displays 'Cannot found pokemon moves' when moves array is empty", () => {
    useRecoilValue.mockReturnValue(null);
    pokemonMoveState.mockReturnValue(null);

    const { getByText } = render(<Move />);

    const errorElement = getByText("Cannot found pokemon moves");
    expect(errorElement).toBeInTheDocument();
  });
});
