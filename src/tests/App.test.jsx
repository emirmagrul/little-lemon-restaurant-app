import { render, screen, within } from "@testing-library/react";
import App from "../App";

test("renders the App component", () => {
  render(<App />);

  const mainNav = screen.getByRole("navigation", { name: /Main navigation/i });
  const reservationsLink = within(mainNav).getByRole("link", {
    name: /Reservations/i,
  });

  expect(reservationsLink).toBeInTheDocument();
});