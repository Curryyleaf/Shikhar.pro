import { mount } from "@vue/test-utils";
import {
  describe,
  it,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import InputField from "@/components/InputField.vue";
import { expect } from "vitest";

describe("mount", () => {
  let originalWrapper;
  beforeEach(() => {
    originalWrapper = mount(InputField, {
      props: {
        labels: "",
        type: "",
        modelValue: "",
      },
    });

    afterEach(() => {
      originalWrapper.unmount();
    });
  });
  describe("testing with data", () => {
    const wrapper = mount(InputField, {
      props: {
        labels: "test-label",
        type: "test-type",
        modelValue: "test-value",
      },
    });
    it("testing with data ", () => {
      expect(wrapper.exists()).toBe(true);
      const divs = wrapper.find("div");
      expect(divs.exists()).toBe(true);
      const input = divs.find(".inputs");
      expect(input.exists()).toBe(true);

      //   testing data contains
      const labels = divs.find("label");
      expect(labels.exists()).toBe(true);
      expect(labels.text()).toContain("test-label");

      expect(input.attributes("type")).toBe("test-type");

      // funct8ion test

      expect(input.element.value).toBe("test-value");
      input.setValue("new-value");
    });

    it("testing with empty data ", () => {
      expect(originalWrapper.exists()).toBe(true);
      const divs = originalWrapper.find("div");
      expect(divs.exists()).toBe(true);
      const input = divs.find(".inputs");
      expect(input.exists()).toBe(true);

      //   testing data contains
      const labels = divs.find("label");
      expect(labels.exists()).toBe(true);
      expect(labels.text()).toContain("");

      expect(input.attributes("type")).toBe("");

      // funct8ion test

      expect(input.element.value).toBe("");
      input.setValue("new-value");
    });

    it("test with wrong data and props type", async () => {
         const consoleWarn = vi
           .spyOn(console, "warn")
           .mockImplementation(() => {});
           
      const wrapperr = mount(InputField, {
        props: {
          labels: 1,
          type: 2,
          modelValue: {},
        },
      });
         
// ui check with wrong props types
      expect(wrapperr.exists()).toBe(true);
      const divv = wrapperr.find("div");
      expect(divv.exists()).toBe(true);
      const inputs = divv.find(".inputs");
      expect(inputs.exists()).toBe(true);

      const labels = divv.find("label");
      expect(labels.exists()).toBe(true);
      expect(labels.text()).toContain("");



    //   warnings are called su8cessfuly 
     

      expect(consoleWarn).toHaveBeenCalled();
    });
  });
});
