import test from "@playwright/test";
import { expect } from "@playwright/test";
import login from "./Authnetication";
import interceptApi from "./Utils/IntercpetApi";
test.describe("", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    page.goto("/");
  });

  test("comprehensive dropdown test", async ({ page }) => {
    const categoriesBtn = page.getByRole("button", { name: "Categories" });
    const dropDown = page.getByLabel("category menu");
    await expect(dropDown).not.toBeVisible();

    // triggering click on categories button
    await categoriesBtn.click();
    expect();
    expect(dropDown).toBeVisible();

    // triggering All button inside drop down
    const allBtn = page.getByRole("button", { name: "All" });
    await allBtn.click();
    await page.waitForURL("/categories");
    // sucessfully changes Url
    expect(page).toHaveURL("/categories");

    // products are displayed accrodingly and can be interacted
    const productCard = await page.getByText("White Gold Plated Princess9.");
    expect(productCard).toBeVisible();

    // add to cart is only visible on hover
    await productCard.hover();
    await page.getByRole("spinbutton").focus();
    await page.getByRole("spinbutton").fill("123456");
    await page.getByLabel("cart button").click();
    // notification upon itemm added
    const notifiy = await page.getByText("Items Added! ×");
    await expect(notifiy).toBeVisible();
  });

  test("category change test ", async ({ page }) => {
    await page.getByRole("button", { name: "Categories" }).click();
    const electornic = await page.getByRole("button", { name: "electronics" });

    await electornic.click();

    await page.waitForURL("/categories");

    const initialProducts = await page
      .getByLabel("product item")
      .evaluateAll((nodes) => nodes.map((node) => node.id));

    await page.getByRole("button", { name: "Categories" }).click();
    await page.getByRole("button", { name: "jewelery" }).click();

    const updatedProducts = await page
      .getByLabel("product-item")
      .evaluateAll((nodes) => nodes.map((node) => node.id));

    expect(initialProducts).not.toEqual(updatedProducts);
  });
  test("navigation test from categories", async ({ page }) => {
    // Navigation to the cart check
    const cartLinkBtn = page.getByRole("link", { name: "cart" });
    await cartLinkBtn.click();

    await page.waitForURL("**/cart");
    await expect(page).toHaveURL("/cart");

    // logout check
    const logoutBtn = await page.getByRole("button", { name: "Logout" });
    await logoutBtn.click();
    await page.waitForURL("**/login");
    await expect(page).toHaveURL("/login");
  });
});
