import { test, expect } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   const authToken = process.env.AUTH_TOKEN;

//   await page.goto('/login');
//   if (authToken) {
//     await page.setExtraHTTPHeaders({
//       'Authorization': `Bearer ${authToken}`
//     });
//   }
// });



test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto("http://localhost:5173/login"); // Adjust the URL to match your local setup
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    // Fill in the username and password fields
    await page.fill('input[placeholder="Username"]', "testuser");
    await page.fill('input[placeholder="Password"]', "testpassword");

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for navigation to the home page
    await page.waitForNavigation({ url: "**/home" });

    // Check if redirected to the home page
    await expect(page).toHaveURL("http://localhost:3000/home"); // Adjust the URL to match your local setup

    // Optionally, check for presence of a specific element on the home page
    await expect(page.locator("selector-for-home-page-element")).toBeVisible(); // Replace with actual selector
  });

  test("should show error message with invalid credentials", async ({
    page,
  }) => {
    // put username and passwor here 
    await page.fill('input[placeholder="Username"]', "wronguser");
    await page.fill('input[placeholder="Password"]', "wrongpassword");

 
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Login failed")).toBeVisible(); // Put eror message here
  });
});
