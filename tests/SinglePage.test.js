import { expect } from "@playwright/test";
import test from "@playwright/test";
import login from "./Authnetication";
import interceptApi from "./Utils/IntercpetApi";

test.describe('single page test ' , ()=>{
    test.beforeEach(async ({page})=>{
 await interceptApi('http://localhost:5173/product/');
    })
})