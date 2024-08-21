// src/test/components/Navbar.spec.js
import { test, expect } from "@playwright/test";
import login from "./Authnetication";
test.describe('Navbar test' , ()=>{
  test.beforeEach(async ({ page }) => {
  await login(page)
  });

  test('it should display everything properly ' , async({page})=>{
   await page.waitForLoadState('load')
await expect(page.locator('role=link[name="The Basket"]')).toBeVisible();
await expect(page.locator('role=link[name="Home"]')).toBeVisible();
await expect(page.locator('role=button[name="Categories"]')).toBeVisible();
await expect(page.locator('role=link[name="Services"]')).toBeVisible();
await expect(page.locator('role=link[name="Contact"]')).toBeVisible();
await expect(page.locator('role=link[name="Pricing"]')).toBeVisible();
await expect(page.getByText("Welcome to your home page")).toBeVisible();

  });
  test('should navigate acoordingly' , async({page})=>{

    // navigatest to the cart
 page.getByRole("link", { name: "cart" }).click();
    await page.waitForURL("**/cart");
    await expect(page).toHaveURL("/cart");

    // logs out
    page.getByRole("button", { name: "Logout" }).click();
    await page.waitForURL('**/login')
   await  expect(page).toHaveURL("/login");

  })

  test('categories dropdown test' , async ({page})=>{
    // const categories = [
    //   "All",
    //   "electronics",
    //   "jewelery",
    //   "men's clothing",
    //   "men's clothing",
    // ];
await page.getByRole('button', { name: 'Categories' }).click();
const dropdown = page.getByLabel('category menu')
 await expect(dropdown).toBeVisible()
await expect(page.getByRole('button', { name: 'All' })).toBeVisible()

await expect(page.getByRole('button', { name: 'electronics' })).toBeVisible()

await expect(page.getByRole('button', { name: 'jewelery' })).toBeVisible()

await expect(page.getByRole('button', { name: 'men\'s clothing', exact: true })).toBeVisible()

await expect(page.getByRole('button', { name: 'women\'s clothing' })).toBeVisible()
  

  })
  test('' , ({page})=>{

  })
})
