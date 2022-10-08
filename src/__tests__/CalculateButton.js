import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

class ResizeObserver {
  observe() {}
  unobserve() {}
}
test("renders Calculate Button", () => {
  window.ResizeObserver = ResizeObserver;
  window.prompt = () => {};
  render(<App />);
  const CalculateButton = screen.getByText("CALCULATE SHORTEST PATH");
  fireEvent.click(CalculateButton);
});
