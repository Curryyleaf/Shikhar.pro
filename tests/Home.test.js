// src/test/components/Navbar.spec.js
import { test, expect } from "@playwright/test";

test.describe('Navbar test' , ()=>{
  test.beforeEach(async ({ page }) => {
    page.goto("http://localhost:5173/login");
   await page.fill('input[placeholder="Username"]', "mor_2314");
   await page.fill('input[placeholder="Password"]', "83r5^_");

   await page.getByLabel("Submit").click();

   await page.waitForURL("**/");
   await expect(page).toHaveURL("http://localhost:5173/");
    await page.goto("http://localhost:5173/");
  });

  test('it should display everything properly ' , async({page})=>{
    expect(page.getByRole("link", { name: "The Basket" })).toBeVisible();
    expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    expect(page.getByRole("button", { name: "Categories" })).toBeVisible();
    expect(page.getByRole("link", { name: "Services" })).toBeVisible();
    expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
    expect(page.getByRole("link", { name: "Pricing" })).toBeVisible();
    expect(page.getByText("Home Page Click Welcome to")).toBeVisible();
  });
  test('should navigate acoordingly' , async({page})=>{

    // navigatest to the cart
 page.getByRole("link", { name: "cart" }).click();
    await page.waitForURL("**/cart");
    await expect(page).toHaveURL("http://localhost:5173/cart");

    // logs out
    page.getByRole("button", { name: "Logout" }).click();
    await page.waitForURL('**/login')
   await  expect(page).toHaveURL("http://localhost:5173/login");

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
