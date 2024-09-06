import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import InputComponent from "@/views/InputComponent.vue";
import { afterEach } from "vitest";
import { beforeEach } from "vitest";


describe("InputField.vue", () => {
let wrapper
    beforeEach(()=>{
         wrapper = mount(InputComponent, {
           props: {
             modelValue: "",
             type: "",
             labels: "",
             required: null,
             hasError: null,
             errorMessage: "",
             maxlength: null,
             minlength: null,
             customClass: "",
             name: "",
             id: "",
           },
         });
    })
    afterEach(()=>{
        vi.resetAllMocks();
        wrapper.unmount();
        
    })
  it("renders with default props", () => {
    const wrapper = mount(InputComponent);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("input").attributes("type")).toBe("text");
    expect(wrapper.find("input").attributes("aria-required")).toBe("false");
    expect(wrapper.find("input").attributes("aria-invalid")).toBe("false");
  });

  it("renders with custom props", async () => {
    await wrapper.setProps({
      modelValue: 'test value',
      type: 'password',
      labels: 'Password',
      required: true,
      hasError: true,
      errorMessage: 'Invalid password',
      maxlength: 20,
      minlength: 6,
      customClass: 'my-custom-class',
      name: 'password-field',
      id: 'password-input',
    });
    const input = wrapper.find("input");
    expect(input.attributes("type")).toBe("password");
    expect(input.attributes("placeholder")).toBe("Password");
    expect(input.attributes("aria-required")).toBe("true");
    expect(input.attributes("aria-invalid")).toBe("true");
    expect(input.classes()).toContain("my-custom-class");
    expect(input.attributes("maxlength")).toBe("20");
    expect(input.attributes("minlength")).toBe("6");
    expect(wrapper.find("p").text()).toBe("Invalid password");
  });

  it("handles no props scenario", () => {
     const isoWrapper = mount(InputComponent)
     expect(isoWrapper.find("input").attributes("type")).toBe("text");
     expect(isoWrapper.find("input").attributes("placeholder")).toBe("");
    expect(isoWrapper.find("p").exists()).toBe(false);
  });

  it("handles incorrect props types", () => {
   wrapper.setProps(InputComponent, {
      props: {
        modelValue: 12345, 
        maxlength: "abc", 
        minlength: "def", 
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes("maxlength")).toBe(undefined); 
    expect(input.attributes("minlength")).toBe(undefined); 
  });

  it("emits events correctly", async () => {
  
    const input = wrapper.find("input");

    await input.setValue("new value");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["new value"]);

    await input.trigger("focus");
    expect(wrapper.emitted().focus).toBeTruthy();

    await input.trigger("blur");
    expect(wrapper.emitted().blur).toBeTruthy();

    await input.trigger("change");
    expect(wrapper.emitted().change).toBeTruthy();
  });
});
