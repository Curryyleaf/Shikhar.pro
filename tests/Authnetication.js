import { expect } from "@playwright/test";

async function login(page) {
  await page.goto("http://localhost:5173/login");
  await page.fill('input[placeholder="Username"]', "mor_2314");
  await page.fill('input[placeholder="Password"]', "83r5^_");
await page.locator('button[type="submit"][aria-label="Submit"]').click();
  await page.waitForURL("http://localhost:5173/");
  await expect(page).toHaveURL("http://localhost:5173/");
  await page.goto("http://localhost:5173/");
}
 export default login