import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Search from "./Search";

describe("Search component", () => {
  it("calls the onChange callback with the entered value", async () => {
    jest.useFakeTimers();

    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<Search onChange={mockOnChange} />);
    const inputElement = getByPlaceholderText("Ex: Charizard or 6");

    fireEvent.change(inputElement, { target: { value: "Pikachu" } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith("Pikachu");
    });
  });

  it("calls the onChange callback with the latest entered value", async () => {
    jest.useFakeTimers();

    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<Search onChange={mockOnChange} />);
    const inputElement = getByPlaceholderText("Ex: Charizard or 6");

    fireEvent.change(inputElement, { target: { value: "Charmander" } });
    fireEvent.change(inputElement, { target: { value: "Charmeleon" } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith("Charmeleon");
    });
  });
});
