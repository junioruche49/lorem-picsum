import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./home.component";

test("display list of images for the homepage", async () => {
  render(<Home />);

  const images = await screen.findAllByRole("img", { name: /img$/i });
  expect(images).toHaveLength(25);
});

test("adding photo to cart", async () => {
  render(<Home />);

  const img = await screen.findAllByRole("img", { name: /adding cart$/i });
  userEvent.click(img[0]);
  await waitFor(async () => {
    const cart = await screen.findByTestId("cart-num");
    expect(cart).toHaveTextContent(0);
  });
});
