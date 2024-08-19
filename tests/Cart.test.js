import test from "@playwright/test";
import { expect } from "@playwright/test";
import login from "./Authnetication";

// wastedd your over 2 hr time because you stupididly imported vitest expect here instead of playwright and kept on looking for ans why we had a type error in the global use of matchers object inside node modules/pnpm/vitest/expect/dist/index.js
// in your idiocy you kept on making global setup files for both test framework to resolve that

test.describe( 'cart test', ()=> {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("http://localhost:5173/cart");
  });

  test("should render all major componenet ", async ({ page }) => {
    expect(page.getByRole("heading", { name: "Shopping Cart" })).toBeVisible();
    expect(page.getByRole("link", { name: "Continue Shopping" })).toBeVisible;
    expect(page.getByRole("link", { name: "cart" })).toBeVisible();
  });

  test("should appear on cart after adding ", async ({ page }) => {
    //  navigating to categories
    const categoriesBtn = await page.getByRole("button", {
      name: "Categories",
    });
    await categoriesBtn.click();
    await page.getByRole("button", { name: "All" }).click();
    await page.waitForURL("http://localhost:5173/categories");

    // adding a product
    const initialproduct = await page.locator(
      'div[id="1"][aria-label="product-item"]'
    );
    const initialId = await initialproduct.getAttribute("id");
    await initialproduct.hover();

    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill("123456");
    await page.getByRole("spinbutton").press("Enter");
    await page.getByRole("button", { name: "Add to cart" }).click();

    // checking if product is added
    await page.goto("http://localhost:5173/cart");
    const foundProduct = await page.locator('[aria-label="cart item"]');
    await expect(foundProduct).toBeVisible();
    const foundId = await foundProduct.getAttribute("id");
    expect(initialId).toBe(foundId);
  });

  test("should remove items", async ({ page }) => {
    const categoriesBtn = await page.getByRole("button", {
      name: "Categories",
    });
    await categoriesBtn.click();
    await page.getByRole("button", { name: "All" }).click();
    await page.waitForURL("http://localhost:5173/categories");

    // adding item to cart
    const ourItem = page.locator('div[id="1"][aria-label="product-item"]');
  await   expect(ourItem).toBeVisible()
    await ourItem.hover();
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill("123");
    await page.getByRole("spinbutton").press("Enter");
    await page.getByRole("button", { name: "Add to cart" }).click();

    // removing item that is just added
    await page.goto("http://localhost:5173/cart");

    const removeBtn= page.getByLabel("remove button")
   await  expect(removeBtn).toBeVisible()
    await removeBtn.click()
    expect(locator('#1')).not.toBeVisible

  });
});
