import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, beforeEach, afterAll } from "vitest";

import Button from "@/components/Button.vue";
import { expect } from "vitest";

describe("my button", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Button, {
      props: {
        buttonLabel: "",
        buttonText: "",
        buttonFunction: vi.fn(),
      },
    });
  });

  describe("testinig our button ", () => {
    it("empty props", async () => {
      expect(wrapper.exists()).toBe(true);
      const temp = wrapper.find("div > button");
      expect(temp.exists()).toBe(true);
      expect(temp.attributes("type")).toBe("button");
      expect(temp.text()).toBe("");
    //   our function check 
      await temp.trigger("click");
      expect(wrapper.props("buttonFunction")).toHaveBeenCalled();

      //   css checking
      expect(temp.html()).toContain('class="text-black rounded-md px-2 py-1"');

      //   expect(temp.classes()).toContain(['text-black','rounded-md','px-2','py-1' ])
      expect(temp.classes()).toContain("rounded-md");
      expect(temp.classes('rounded-md')).toBe(true);
      //    expect(temp.html('type')).toBe('button');

      //    const prop = wrapper.props('buttonText')
    });

    it('checking with wrong props' , async()=>{
         const consoleWarn = vi
           .spyOn(console, "warn")
           .mockImplementation(() => {});
      const secondWrap=  shallowMount(Button, {
          props: {
            buttonText: 1,
            buttonType: null,
            buttonFunction:vi.fn()
          },
        });
       
    //   warning is sucessfully called 
       expect(consoleWarn).toHaveBeenCalled()
       consoleWarn.mockReset()
       
    //    ui check
    const outerDiv= secondWrap.find('div');
    expect(outerDiv.exists()).toBe(true);
    const btn= outerDiv.find('button');
    expect(btn.exists()).toBe(true);

    // props check
    expect(btn.attributes('type')).toBe(undefined)
    expect(btn.attributes('click')).toBe(undefined)
    // function check
   await  btn.trigger('click');
   expect(secondWrap.props("buttonFunction")).toHaveBeenCalled();

       

    })
  });
});
