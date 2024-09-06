import { mount } from "@vue/test-utils";
import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import InputField from "@/components/InputField.vue";

describe("InputField.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(InputField, {
      props: {
        labels: "",
        type: "",
        modelValue: "",
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks();
    vi.resetModules()
  });

  it("renders with provided props", async () => {
    
const secondWrapper = mount(InputField ,{
  props:{
        labels: "test-label",
      type: "test-type",
      modelValue: "test-value",
  }
})

    expect(secondWrapper.exists()).toBe(true);
    const divs = secondWrapper.find("div");
    expect(divs.exists()).toBe(true);
    const input = divs.find(".inputs");
    expect(input.exists()).toBe(true);

    // Test label
    const label = divs.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain("test-label");

    // Test input type
    expect(input.attributes("type")).toBe("test-type");

    // Test input value
    expect(input.element.value).toBe("test-value");
    await input.setValue("new-value");
    expect(input.element.value).toBe("new-value");
  });

  it("renders with empty props", async () => {
    await wrapper.setProps({
      labels: "",
      type: "",
      modelValue: "",
    });

    expect(wrapper.exists()).toBe(true);
    const divs = wrapper.find("div");
    expect(divs.exists()).toBe(true);
    const input = divs.find(".inputs");
    expect(input.exists()).toBe(true);

    // Test label
    const label = divs.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain("");

    // Test input type
    expect(input.attributes("type")).toBe("");

    // Test input value
    expect(input.element.value).toBe("");
    await input.setValue("new-value");
    expect(input.element.value).toBe("new-value");
  });

  it("handles incorrect prop types", async () => {
    const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {});

    await wrapper.setProps({
      labels: 1,
      type: 2,
      modelValue: {},
    });

    // Check UI with incorrect props types
    const divs = wrapper.find("div");
    expect(divs.exists()).toBe(true);
    const input = divs.find(".inputs");
    expect(input.exists()).toBe(true);

    const label = divs.find("label");
    expect(label.exists()).toBe(true);
    expect(label.text()).toContain("");


    expect(consoleWarn).toHaveBeenCalled();

    
    consoleWarn.mockRestore();
  });
});
