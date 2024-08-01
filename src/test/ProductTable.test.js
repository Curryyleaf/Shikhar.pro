import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MyComponent from "@/components/ProductTable.vue";
import defaultProps from "./defaultProps";
import { myMethods } from "./defaultProps";
import { incorrectProps } from "./defaultProps";

describe("MyComponent", () => {
  let wrapper;
  let methods;
  methods = {
    togglePrice: vi.fn(),
    closePriceToggle: vi.fn(),
    toggleDropDown: vi.fn(),
    toggleAllSelect: vi.fn(),
    selectItem: vi.fn(),
    sorting: vi.fn(),
    deleteProduct: vi.fn(),
    groupProductsByPriceBracket: vi.fn(),
    closeDropdown: vi.fn(),
  };
  beforeEach(() => {
    wrapper = mount(MyComponent, { props: defaultProps , ...methods });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("componenet behaviopur with missing props and data ", () => {
    it(" handle  tableHeadConfig gracefully", () => {
      wrapper.setProps({
        tableHeadConfig: [],
      });
      const ourTableHead = wrapper.findAll("th > td");
      ourTableHead.forEach((componenet) => {
        expect(componenet.exists()).toBe(true);
      });
    });

    it("checkking if the applications renders even without any props", () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.exists("th")).toBe(true);
      expect(wrapper.exists("td")).toBe(true);
      expect(wrapper.exists("tr")).toBe(true);
      
      // can i find all the methods at once in this mount and check if they are called when clicked or not and checK if all the html exist or not , check if default props value are used or not

      // maybe use findcomponenet and findallcomponenet.
    });

    it(" it shppuld render with default props when no props is given ", () => {
      // expect(wrapper.props()).toEqual(defaultProps);
      const table = wrapper.find("table");
      expect(table.exists()).toBe(true);
      expect(wrapper.exists("th")).toBe(true);
      expect(wrapper.exists("td")).toBe(true);
      expect(wrapper.exists("tr")).toBe(true);

      const rows = wrapper.findAll("tr");
      expect(rows.length).greaterThan(10);
    });

    describe("checing  if the global error is triggered  when the props are missing and incorrect", () => {
      it("checking  how the ui handles when the methods are missing and if error happens aND ERROR UI IS loaded or not ", async () => {
        const consoleErrorSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        
        const isolatedWrapper = mount(MyComponent ,{props :incorrectProps , ...methods});
        await isolatedWrapper.vm.$nextTick();
        // expect(consoleErrorSpy).toBeCalled(1)
        expect(isolatedWrapper.exists()).toBe(true);
        expect(isolatedWrapper.find("table").exists()).toBe(true);
        expect(isolatedWrapper.exists("tr")).toBe(true);

        // here

        // for(let[methodsName , method] of Object.entries(methods) ){

        // }
      });

      it("testing if ui breaks in the abscence of the methods", () => {
        myMethods.forEach((item) => {
          let ourProps = defaultProps;
          delete ourProps[item];

          const mywrapper = mount(MyComponent, {
            props: {
              ...ourProps,
            },
          });
          expect(mywrapper.exists()).toBe(true);
          const finds = mywrapper.findAll("th");

          expect(finds.length).toBeGreaterThan(3);
          expect(mywrapper.exists()).toBe(true);

          const table = wrapper.find("table");
          expect(table.exists()).toBe(true);

          const tableHead = table.find("thead");
          expect(tableHead.exists()).toBe(true);

          const tableRow = tableHead.find("tr");
          expect(tableRow.exists()).toBe(true);
        });
      });
    });
  });

  describe("componenet events", () => {
    it("when the props are missing and incorrect", async () => {
      
  
    //   const secondWrapper = mount(MyComponent , {incorrectProps , toggleDropDown:vi.fn()})

    const mockfunction= vi.fn()
    wrapper.setProps({
      toggleDropDown: mockfunction,
      visibleColumns: [true, true, true, true, true, true],
    });
           const toggleFunctions = wrapper.findAll(".toggleDropDown");
           toggleFunctions.forEach((wrap) => {
             expect(wrap.exists()).toBe(true);
             wrap.trigger("click");
           });

     const toggleDrop= wrapper.findAll('.toggleDropDown').at(2);
     expect(toggleDrop.exists()).toBe(true);
    await toggleDrop.trigger("click")
   expect(mockfunction).toHaveBeenCalled(0)
      // Restore the original error handler
     
    });
  });


  describe("Methods Testing", () => {
    it('all the functions are ready to be called ' , ()=>{

      const togglePrice=   wrapper.findAll('.togglePrice')
    })

    it("triggers toggleAllSelect when the select all checkbox is changed", async () => {
      wrapper.setProps({
        toggleAllSelect: vi.fn(),
        isAllSelected: false,
        product: [
          { id: 1, checked: false },
          { id: 2, checked: false },
          { id: 3, checked: false },
          { id: 4, checked: false },
          { id: 5, checked: false },
          { id: 6, checked: false },
        ],
      });
      const selectAllCheckbox = wrapper.find(".toggleAllSelect");

      await selectAllCheckbox.setChecked(true);
      await selectAllCheckbox.trigger("change");
      // here change is the name of event right ? and it nneds to be very exact ?
      expect(wrapper.vm.toggleAllSelect).toHaveBeenCalled();
      await wrapper.vm.$nextTick();

      const individualCheckBox = wrapper.findAll(".toggleAllSelect");
      individualCheckBox.forEach((checkbox) => {
        expect(checkbox.element.checked).toBe(true);
// use of element here .REMEMBER
        wrapper.setProps(defaultProps);
      });
    });
  });

  describe("Data Testing", () => {
    it("should handle props with empty values correctly", () => {
      wrapper.setProps({
        products: [],
        tableHeadConfig: [],
      });
      const table = wrapper.findAll("table-rows");
      table.forEach((item) => {
        return expect(item.text()).toBe("All");
      });
      console.log("check", table);
    });
  });

 
});
