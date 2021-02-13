import React from "react";
import { render } from "@testing-library/react";
import { Default } from "./Calendar.stories";

describe("Calendar", () => {
  const { queryByText } = render(<Default />);

  it("Should have a Su column", () => {
    const sundayHtmlElement = queryByText("Su");

    expect(sundayHtmlElement).not.toBeNull();
  });
});
