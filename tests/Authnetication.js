import { expect } from "@playwright/test";

async function login(page) {
  const url = "http://localhost:5173";

  await page.goto(`${url}/login` , {state:"load"});
  await page.fill('input[placeholder="Username"]', "mor_2314");
  await page.fill('input[placeholder="Password"]', "83r5^_");
  await Promise.all([
    page.locator('button[type="submit"][aria-label="Submit"]').click(),
    page.waitForNavigation({ url: `${url}/` }),
  ]);
  await expect(page).toHaveURL(`${url}/`);
  await page.goto(`${url}/`);
}
 export default login