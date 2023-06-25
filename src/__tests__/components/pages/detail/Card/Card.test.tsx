import React from "react";
import { render } from "@testing-library/react";
import Card from "../../../../../components/pages/detail/Card/Card";

describe("Card component", () => {
  it("renders the title correctly", () => {
    const title = "Test Title";
    const { getByText } = render(<Card title={title}>Test Content</Card>);
    const titleElement = getByText(title);
    expect(titleElement).toHaveTextContent(title);
  });

  it("renders the badge correctly when provided", () => {
    const badge = 5;
    const { getByText } = render(
      <Card title="Test Title" badge={badge}>
        Test Content
      </Card>
    );
    const badgeElement = getByText(badge.toString());
    expect(badgeElement).toHaveTextContent(badge.toString());
  });

  it("does not render the badge when not provided", () => {
    const { queryByText } = render(
      <Card title="Test Title">Test Content</Card>
    );
    const badgeElement = queryByText(/^[0-9]+$/);
    expect(badgeElement).toBeNull();
  });

  it("renders the child content correctly", () => {
    const childContent = "Test Content";
    const { getByText } = render(
      <Card title="Test Title">{childContent}</Card>
    );
    const contentElement = getByText(childContent);
    expect(contentElement).toHaveTextContent(childContent);
  });
});
