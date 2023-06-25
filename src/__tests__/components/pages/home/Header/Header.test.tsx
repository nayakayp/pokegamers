import React from "react";
import { render } from "@testing-library/react";
import Header from "@/components/pages/home/Header";

describe("Header component", () => {
  it("renders the home link correctly", () => {
    const { getByText } = render(<Header />);
    const homeLink = getByText("Home");
    expect(homeLink).toBeInTheDocument();
  });
});
