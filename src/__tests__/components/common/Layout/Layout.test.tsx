import React from "react";
import { render } from "@testing-library/react";
import Layout from "../../../../components/common/Layout/Layout";

jest.mock("../../pages/home/Header", () =>
  jest.fn().mockReturnValue(<div>Mocked Header</div>)
);

describe("Layout component", () => {
  it("renders the Header component", () => {
    const { getByText } = render(<Layout>Mocked Children</Layout>);
    const headerElement = getByText("Mocked Header");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the children content", () => {
    const { getByText } = render(<Layout>Mocked Children</Layout>);
    const childrenElement = getByText("Mocked Children");
    expect(childrenElement).toBeInTheDocument();
  });
});
