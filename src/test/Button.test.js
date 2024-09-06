import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
 import Button from '@/components/Button.vue'
import { beforeEach } from "vitest";
import { afterEach } from "vitest";

describe("ButtonComponent", () => {
    let wrapper
        const buttonFunction = vi.fn();
    beforeEach(()=>{
             wrapper = mount(Button, {
               props: {
                 loading: false,
                 buttonBorderColor: "blue",
                 buttonBorderSize: "2px",
                 icon: "fa-check",
                 iconLibrary: "fa",
                 buttonSize: "large",
                 buttonColor: "red",
                 buttonShape: "rounded",
                 buttonText: "Click Me",
                 textColor: "white",
                 textSize: "big",
                 textBoldness: "bold",
                 textStyling: "capital",
                 buttonType: "submit",
                 variant: "primary",
                 buttonFunction,
               },
             });

    })
     afterEach(()=>{
        wrapper.unmount();
     })
  it("renders with correct props", () => {

const myBtnText= wrapper.find('span')
 expect(myBtnText.exists()).toBe(true)
//  contains text provided through props overirding the default 
 expect(myBtnText.text()).toContain('Click Me')
//  contains all the css provided through props overriding the base css from the choosen varient/default varient
 expect(myBtnText.classes()).toContain('text-white')
 expect(myBtnText.classes()).toContain('font-bold')
 expect(myBtnText.classes()).toContain('text-lg')
 expect(myBtnText.classes()).toContain('capitalize')

const mybtn = wrapper.find('button')
expect(mybtn.exists()).toBe(true);
     expect(mybtn.classes()).toContain("bg-red-500");
     expect(mybtn.classes()).toContain("px-6");
     expect(mybtn.classes()).toContain("py-3");
     expect(mybtn.classes()).toContain("rounded-lg");

  
// contains the provided icon through props 
    expect(wrapper.find("i").classes()).toContain("fa-check");
    expect(wrapper.vm.buttonFunction).toBe(buttonFunction);
    // reflects the type of button we sent 
    expect(mybtn.attributes("type")).toBe("submit");
  });

 it("renders with default props correctly", () => {

   const defaultWrapper = mount(Button);

   expect(defaultWrapper.find("button").classes()).toContain("bg-blue-500");
   expect(defaultWrapper.find("button").classes()).not.toContain("bg-red-500");
   const btnText = defaultWrapper.find("span");
   expect(btnText.exists()).toBe(true);
   expect(btnText.text()).toBe("Click");
   expect(defaultWrapper.find("button").attributes("type")).toBe("button");
   expect(defaultWrapper.vm.buttonFunction).toBeDefined();
 });
it("special case test for variant loading", () => {
  const specialWrapper = mount(Button, {
    props: {
      variant: "loading",
    },
  });

  const loadingDiv = specialWrapper.find("button > div");
  expect(loadingDiv.exists()).toBe(true);
 expect(specialWrapper.find('span').exists()).toBe(false)
 
});

  it("renders with incorrect prop values", () => {
 let LastWrapper = mount(Button , {
  
     buttonBorderColor: [],
     buttonBorderSize: "2px",
     icon: {},
     iconLibrary: "fa",
     buttonSize: 1,
     buttonColor: "red",
     buttonShape: "rounded",
     buttonText:800000,
     textColor: "asdf",
     textSize: "xcvbnm",
     textBoldness: "1234",
     textStyling: "capital",
     buttonType: "whatever",
     variant: "xxxx",


 })

    const myBtnText = LastWrapper.find("span");
    expect(myBtnText.text()).toBe("Click");  

    const myBtn = LastWrapper.find("button");
    expect(myBtn.classes()).toContain("bg-blue-500"); 

    expect(LastWrapper.find("button").attributes("type")).toBe("button"); 
    expect(LastWrapper.find("i").exists()).toBe(false); 
  });

//   it("calls buttonFunction when clicked", async () => {
//     const buttonFunction = vi.fn();


//     await wrapper.find("button").trigger("click");
//     expect(buttonFunction).toHaveBeenCalled();
//   });
});
