import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MyComponent from "@/components/ProductTable.vue";
import defaultProps from "./defaultProps";
import { myMethods } from "./defaultProps";
import { incorrectProps } from "./defaultProps";

describe("MyComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MyComponent, { props: defaultProps });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("testing with default props ", () => {
    it(" checkking if the applications renders even without any props", () => {
      // table head
      const ourTableHead = wrapper.findAll("thead > tr > th");
      ourTableHead.forEach((componenet) => {
        expect(componenet.exists()).toBe(true);
        expect(componenet.text()).toBe("All");
      });
      expect(ourTableHead.length).toBe(1);

      // tableBody
      const ourTablebody = wrapper.findAll("tbody > tr > td");
      expect(ourTablebody.length).toBe(0);

      // methods
      // since in the vue methodws are defined even before they are mounted so checking if they are defined
      myMethods.forEach((method) => {
        let methodCheck = vi.spyOn(wrapper.vm, method);
        expect(methodCheck).toBeDefined();
      });
    });
  });

  describe("testing with data and their intgration", () => {
    const products = [
          {
            id: 1,
            title: "Test-Title",
            price: 109.95,
            description: "test-desc",
            category: "test-category",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
              rate: 1,
              count: 2,
            },
          },
        ]
        const tableHeadConfig=[
          {
            title: "test-title",
            sortby: "test-title",
            sortable: true,
            show: true,
            id: 1,
            priceGrouping: false,
          },
          {
            title: "test-title2",
            sortby: "test-title-2",
            sortable: true,
            show: true,
            id: 2,
            priceGrouping: false,
          },
        ]
    beforeEach(async () => {
      await wrapper.setProps({
          products:products,
          tableHeadConfig:tableHeadConfig ,
        visibleColumns: [true, true, true, true, true, true],
        PriceBracket: ["0-100", "100-500", "500+"],
      });
    });

    it(" table head testing with data  ", async () => {
      const tableHeads = wrapper.findAll("thead > tr > th");
      tableHeads.forEach((componenet) => {
        expect(componenet.exists()).toBe(true);
      });
      expect(tableHeads.length).toBe(3);
    
      // our table head suceesfully reflects the number of loop
    });
    it('table body testing with data' , ()=>{
      const ourTablebody = wrapper.findAll("tbody > tr");
      ourTablebody.forEach((componenet) => {
        expect(componenet.exists()).toBe(true);
      });
      expect(ourTablebody.length).toBe(1);
      // our table body suceesfully reflects the number of loop
    })
      
    // TESTING thead's inner text and  other ui componenet 
    describe('Testing t heads inner text ad other ui componenet  ' ,()=>{
      })

    describe('methods testing with data' ,()=>{
    
      it('testing methods in thead' ,()=>{
        const thead= wrapper.find('thead')
        expect(thead.exists()).toBe(true);

        // TESTING toggleAllselected
        const toggleAllSelected = thead.findAll("#select-all-checkbox");
        toggleAllSelected.forEach((method)=>{
         expect(method.exists()).toBe(true);
         method.trigger('change')
         expect(wrapper.vm.toggleAllSelect).toHaveBeenCalled();
        })

        // TESTING togglePrice
        const togglePrice = wrapper.findAll('.togglePrice');
        togglePrice.forEach((method)=>{
            expect(method.exists()).toBe(true);
            method.trigger("click");
            
        })
        expect(wrapper.vm.togglePrice).toHaveBeenCalledTimes(2);
        tableHeadConfig.forEach((item)=>{
         expect(wrapper.vm.togglePrice).toHaveBeenCalledWith(item.id);
        })

// TESTING toggleDropDown
        const toggleDropDown = wrapper.findAll(".toggleDropDown");
        toggleDropDown.forEach((method) => {
          expect(method.exists()).toBe(true);
          method.trigger("click");
        });
        expect(wrapper.vm.toggleDropDown).toHaveBeenCalledTimes(2);
        tableHeadConfig.forEach((item) => {
          expect(wrapper.vm.toggleDropDown).toHaveBeenCalledWith(item.id);
        });

        // TESTING sorting
                const sorting = wrapper.findAll(".sorting");
                sorting.forEach((method) => {
                  expect(method.exists()).toBe(true);
                  method.trigger("click");
                });
                expect(wrapper.vm.sorting).toHaveBeenCalledTimes(4);
                tableHeadConfig.forEach((item) => {
                  expect(wrapper.vm.sorting).toHaveBeenCalledWith(item.sortby);
                });
      })


      // TESTING METHODS IN tbody
      it('testing methods in tnody' ,()=>{

      })
    })
    

      // it("testing if ui breaks in the abscence of the methods", () => {
      //   myMethods.forEach((item) => {
      //     let ourProps = defaultProps;
      //     delete ourProps[item];

      //     const mywrapper = mount(MyComponent, {
      //       props: {
      //         ...ourProps,
      //       },
      //     });
      //     expect(mywrapper.exists()).toBe(true);
      //     const finds = mywrapper.findAll("th");

      //     expect(finds.length).toBeGreaterThan(3);
      //     expect(mywrapper.exists()).toBe(true);

      //     const table = wrapper.find("table");
      //     expect(table.exists()).toBe(true);

      //     const tableHead = table.find("thead");
      //     expect(tableHead.exists()).toBe(true);

      //     const tableRow = tableHead.find("tr");
      //     expect(tableRow.exists()).toBe(true);
      //   });
      // });

  });

  describe("componenet events", () => {
    it("when the props are missing and incorrect", async () => {
      //   const secondWrapper = mount(MyComponent , {incorrectProps , toggleDropDown:vi.fn()})

      const mockfunction = vi.fn();
      wrapper.setProps({
        toggleDropDown: mockfunction,
        visibleColumns: [true, true, true, true, true, true],
      });
      const toggleFunctions = wrapper.findAll(".toggleDropDown");
      toggleFunctions.forEach((wrap) => {
        expect(wrap.exists()).toBe(true);
        wrap.trigger("click");
        //  response modal match function reasult
      });

      const toggleDrop = wrapper.findAll(".toggleDropDown").at(2);
      expect(toggleDrop.exists()).toBe(true);
      await toggleDrop.trigger("click");
      expect(mockfunction).toHaveBeenCalled(0);
      // Restore the original error handler
    });
  });

  describe("Methods Testing", () => {
    it("all the functions are ready to be called ", () => {
      const togglePrice = wrapper.findAll(".togglePrice");
    });

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

      // try checkbox toggal single single
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
