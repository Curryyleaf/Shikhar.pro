import test from "@playwright/test";
import { expect } from "@playwright/test";
import login from "./Authnetication";
import  interceptApi from "./Utils/IntercpetApi";

// wastedd your over 2 hr time because you stupididly imported vitest expect here instead of playwright and kept on looking for ans why we had a type error in the global use of matchers object inside node modules/pnpm/vitest/expect/dist/index.js
// in your idiocy you kept on making global setup files for both test framework to resolve that



// const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });


test.describe( 'cart test', ()=> {
  test.beforeEach(async ({ page }) => {
  await   interceptApi("/auth/login" , page , 2000);
    await login(page);
   await  interceptApi("/cart" , page , 3000);
    await page.goto("/cart");
  });

  test("should render all major componenet ", async ({ page }) => {
 await    expect(page.getByRole("heading", { name: "Shopping Cart" })).toBeVisible();
  await   expect(page.getByRole("link", { name: "Continue Shopping" })).toBeVisible;
  await   expect(page.getByRole("link", { name: "cart" })).toBeVisible();
  });

  test("should appear on cart after adding ", async ({ page }) => {
    //  navigating to categories
    const categoriesBtn = await page.getByRole("button", {
      name: "Categories",
    });
    await categoriesBtn.click();
    await page.getByRole("button", { name: "All" }).click();
    await interceptApi('/categories' , page , 3000)

    await page.waitForURL("/categories");

    // adding a product
    const initialproduct = await page.locator(
      'div[id="1"][aria-label="product-item"]'
    );
 const initialId =  await initialproduct.getAttribute("id")

  await expect(initialproduct).toBeVisible();
  await initialproduct.hover();
  const inputField = initialproduct.locator('input[type="number"]');
  const addToCartButton = initialproduct.getByLabel('cart button')
  await expect(inputField).toBeVisible();
  await inputField.fill('12345'); 
  await expect(addToCartButton).toBeVisible();
 await addToCartButton.waitFor({state:"attached"})
  
  await addToCartButton.click();
  // this is flaky 

  // checking if product is added
    await page.goto("/cart");
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
    await page.waitForURL("/categories");

    // adding item to cart
    const ourItem = page.locator('div[id="1"][aria-label="product-item"]');
  await   expect(ourItem).toBeVisible()
    await ourItem.hover();
    
    await page.getByRole("spinbutton").click();
    await page.getByRole("spinbutton").fill("123");
    await page.getByRole("spinbutton").press("Enter");
    await page.getByLabel('cart button').click();

    // removing item that is just added
    await interceptApi("/cart" , page , 3000)
    await page.goto("/cart");

    const removeBtn= page.getByLabel("remove button")

   await  expect(removeBtn).toBeVisible()
    await removeBtn.click()
   await  expect(page.locator('div[id="1"][aria-label="cart item"]')).toBeHidden()

  });
});



// await page.waitForSelector('#element-id', { state: 'visible' });

// HANDLE ASYNC OPERATIONS
// await Promise.all([
//   page.click('#submit-button'),
//   page.waitForNavigation()
// ]);
