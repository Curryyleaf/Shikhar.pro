import { expect } from "@playwright/test";
import interceptApi from "./Utils/IntercpetApi";

async function login(page) {
  await interceptApi("/auth/login", page, 2000);
  const url = "http://localhost:5173";

       const username = process.env.USER_NAME;
       const password = process.env.PASSWORD;
  await page.goto(`${url}/login` , {waitUntil:'load'});
  await page.fill('input[placeholder="Username"]', username);
  await page.fill('input[placeholder="Password"]', password);
  await Promise.all([
    page.locator('button[type="submit"][aria-label="Submit"]').click(),
    page.waitForNavigation({ url: `${url}/` }),
  ]);
  await expect(page).toHaveURL(`${url}/`);
  await page.goto(`${url}/`);
}
 export default login