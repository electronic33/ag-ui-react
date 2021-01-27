import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

test('displays a "Hello World" message', () => {
  render(<Button />);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});

test("should return true", () => {
  expect(true).toBe(true);
});
