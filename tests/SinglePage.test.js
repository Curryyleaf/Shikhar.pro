import { expect } from "@playwright/test";
import test from "@playwright/test";
import login from "./Authnetication";
import interceptApi from "./Utils/IntercpetApi";

test.describe('single page test ' , ()=>{
    test.beforeEach(async ({page})=>{
 await login(page);
 await page.goto("/product/1");
    })

    test('render important ui componenet ' , async ({page})=>{
      
       await page.waitForURL("/product/1");
       await expect(page.locator('input[type="number"]')).toBeVisible()
      await  expect(page.getByRole("button", { name: "Add to cart" })).toBeVisible;
       await expect(page.getByLabel('product price')).toBeVisible()
       await expect(page.getByLabel('product title')).toBeVisible()
       await expect(page.getByLabel('product information')).toBeVisible()
    })
     test('rendered componenet  works properly ' , async ({page})=>{
          const input =  page.locator('input[type="number"]');
          await input.click()
          await expect(input).toBeFocused()
          await input.fill('123')
          await page.getByRole('button', { name: 'Add to cart' }).click();

          await expect( page.getByText('Items Added!')).toBeVisible()
        
     })
     test('navigation from the single page' ,async ({page})=>{
        // home
        const homeBtn = await  page.getByRole('link', { name: 'Home' })
        await homeBtn.click()
        await expect(page).toHaveURL("/");
        await expect(page.getByText('Home Page Click Welcome to')).toBeVisible();

        // product page
        const productBtn =page.getByRole('button', { name: 'Categories' })
        await productBtn.click()
        await page.getByRole('button', { name: 'All' }).click();
        expect(page).toHaveURL("/categories");

        // cart
        await page.getByRole('link', { name: 'cart' }).click();
        expect(page).toHaveURL("/cart");

        // logout
        await page.getByRole('button', { name: 'Logout' }).click();
        expect(page).toHaveURL("/login");
     })
      test('page retains on reload' , async({page})=>{
        await page.reload()
       await  expect(page).toHaveURL("/product/1");
      })
    //   test('page shows message on network error' , async ({page})=>{
    //       await  page.route("http://localhost:5173/product/2", (route) => {
    //           route.abort()
      
    //         });
    //    await page.goto("http://localhost:5173/product/2");
    //   })

    test('random product test ' ,async ({page})=>{
     await  page.goto('/categories');
     await page.waitForURL('/categories')
// const  getRandomElement =()=>{
//   const array = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
//  const randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }

// going to random product 
const id =Math.floor(Math.random() * 18)
console.log('idididididididididid' , id)
 const product = await page.locator(`id=${id}`);
 await expect(product).toBeVisible()
await product.click()

// random products url is same
await expect(page).toHaveURL(`product/${id}`)

// ui check
     await expect(page.locator('input[type="number"]')).toBeVisible();
     await expect(page.getByRole("button", { name: "Add to cart" }))
       .toBeVisible;
     await expect(page.getByLabel("product price")).toBeVisible();
     await expect(page.getByLabel("product title")).toBeVisible();
     await expect(page.getByLabel("product information")).toBeVisible();
     
   //   functionality check

     const input = page.locator('input[type="number"]');
     await input.click();
     await expect(input).toBeFocused();
     await input.fill("123");
     await page.getByRole("button", { name: "Add to cart" }).click();

     await expect(page.getByText("Items Added!")).toBeVisible();
    })



})



