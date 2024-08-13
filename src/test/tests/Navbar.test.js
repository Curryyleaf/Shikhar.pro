// src/test/components/Navbar.spec.js
import { test, expect } from "@playwright/test";

test("should display navbar and interact with it", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Check if the navbar is visible
  await expect(page.locator("nav")).toBeVisible();

  // Check if the "Home" link is present
  await expect(page.locator('a[href="/"]')).toHaveText("Home");

  // Click the "Categories" dropdown button and verify the dropdown appears
  await page.click('button[id="dropdownNavbarLink"]');
  await expect(page.locator("aside")).toBeVisible();

  // Click on a category and verify it sets the category and navigates
  await page.click('button[data-setCategory="setCategory"]');
  await expect(page.url()).toContain("/categories");

  // Check if the logout button is visible
  await expect(page.locator('button[onclick="logout"]')).toBeVisible();


  await page.click('button[onclick="logout"]');
  await expect(page.url()).toContain("/login");
});
