import { test, expect } from "@playwright/test";
import { Console } from "console";

// test.beforeEach(async ({ page }) => {
//   const authToken = process.env.AUTH_TOKEN;

//   await page.goto('/login');
//   if (authToken) {
//     await page.setExtraHTTPHeaders({
//       'Authorization': `Bearer ${authToken}`
//     });
//   }
// });

// you can also reduce your code reduency by using a test.use cuz you are loggin in again and again on every code . or you can also use a helper functionn that  takes argument of username password and page
test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.route("/auth/login", (route) => {
      console.log("Intercepted login request");
      route.fulfill({
        status: 200,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify({
          data: {
            token: "mockedToekn",
          },
        }),
      });
    });
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    await page.fill('input[placeholder="Username"]', username);
    await page.fill('input[placeholder="Password"]', password);

    await page.getByLabel("Submit").click();

    await page.waitForURL("**/");
    await expect(page).toHaveURL("/");
    await page.context().storageState({ path: "test-results/state.json" });
    await expect(page.getByRole("link", { name: "The Basket" })).toBeVisible();
  });

  test("should show error message with incorrect password and username", async ({
    page,
  }) => {
    // put username and passwor here
    await page.fill('input[placeholder="Username"]', "wronguser");
    await page.fill('input[placeholder="Password"]', "wrongpassword");

    await page.click('button[type="submit"]');

    const errorMessage = await page.getByLabel("Error message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveClass("text-red-600 text-2xl");
    await expect(errorMessage).toHaveText("username or password is incorrect");
  });
  test("should show message when username and password is empty", async ({
    page,
  }) => {
    await page.fill('input[placeholder="Username"]', "");
    await page.fill('input[placeholder="Password"]', "");

    await page.click('button[type="submit"]');

    const errorMessage = await page.getByLabel("Error message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveClass("text-red-600 text-2xl");
    await expect(errorMessage).toHaveText("Username or Password is empty");
  });
  test("should show message server error occures  ", async ({ page }) => {
    await page.route("**/auth/login", (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
        headers: { "Content-Type": "application/json" },
      })
    );
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    await page.fill('input[placeholder="Username"]', username);
    await page.fill('input[placeholder="Password"]', password);

    await page.click('button[type="submit"]');

    const errorMessage = await page.getByLabel("Error message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveClass("text-red-600 text-2xl");
    await expect(errorMessage).toHaveText("Internal Server Error");
  });
  test("should show message when netwrok error", async ({ page }) => {
    await page.route("**/auth/login", (route) => {
      route.abort();
    });
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    await page.fill('input[placeholder="Username"]', username);
    await page.fill('input[placeholder="Password"]', password);

    await page.click('button[type="submit"]');

    const errorMessage = await page.getByLabel("Error message");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveClass("text-red-600 text-2xl");
    await expect(errorMessage).toHaveText("Network Error , Please try again ");
  });

  test("should save token in local storage and require login after removal", async ({
    page,
  }) => {
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    console.log(username);
    console.log(password);

    await page.fill('input[placeholder="Username"]', username);
    await page.fill('input[placeholder="Password"]', password);

    await page.click('button[type="submit"]');

    await page.waitForURL("**/");

    // Check if token is saved
    await page.waitForFunction(() => localStorage.getItem("token") !== null);
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).not.toBeNull();

    // Remove token and reload
    await page.evaluate(() => localStorage.removeItem("token"));
    await page.reload();

    // Verify login is required
    await expect(page).toHaveURL("/login");
  });

  test("it should not ask for login when page reloads", async ({ page }) => {
    const username = process.env.USER_NAME;
    const password = process.env.PASSWORD;
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);

    await page.getByLabel("Submit").click();
    await page.waitForURL("**/");

    await expect(page).toHaveURL("/");
    await expect(page.getByRole("link", { name: "The Basket" })).toBeVisible();
    await page.reload();
  });
});

// Here are additional test case scenarios for in-depth testing:

// - **Valid Input with Special Characters**: Test with valid credentials containing special characters.
// - **Boundary Testing**: Test with maximum and minimum length inputs for username and password fields.
// - **Case Sensitivity**: Test case sensitivity for username and password fields.
// - **Network Failure**: Simulate network failure during login and verify error handling.
// - **Slow Network**: Simulate slow network conditions and verify response handling.
// - **Persistent Login**: Verify if login persists after refreshing the page or reopening the browser.
// - **Error Handling**: Test various server-side error responses (e.g., 500 Internal Server Error).
// - **User Session Expiry**: Test behavior after the session expires or token invalidation.
// - **Field Focus and Blur**: Verify behavior when fields lose and regain focus.
// - **Form Reset**: Verify the form resets correctly after submission or error.
// - **Accessibility Checks**: Ensure that the login form meets accessibility standards (e.g., focus management, ARIA roles).

// These scenarios cover a range of functional and edge cases for a more thorough testing approach.
