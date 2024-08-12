import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MyComponent from "@/components/ProductTable.vue";
import defaultProps, { myMethods } from "@/test/DefaultProps"
// import { incorrectProps } from "./defaultProps";

describe("MyComponent", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MyComponent, { props: defaultProps });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("testing with default or empty  props ", () => {
    it(" checkking if the applications renders even without any props", () => {
      // table head
      const ourTableHead = wrapper.findAll("thead > tr > th");
      ourTableHead.forEach((componenet) => {
        expect(componenet.exists()).toBe(true);
        
      });
      expect(ourTableHead.length).toBe(2);

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
    ];
    const tableHeadConfig = [
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
    ];
    beforeEach(async () => {
      await wrapper.setProps({
        products: products,
        tableHeadConfig: tableHeadConfig,
        visibleColumns: [true, true, true, true, true, true],
        PriceBracket: ["0-100", "100-500", "500+"],
      });
    });

    it(" table head testing with data  ", async () => {
      const tableHeads = wrapper.findAll("thead > tr > th");
      tableHeads.forEach((componenet) => {
        expect(componenet.exists()).toBe(true);
      });
      expect(tableHeads.length).toBe(4);

      // our table head suceesfully reflects the number of loop
    });
    it("table body testing with data", () => {
      const ourTablebody = wrapper.findAll("tbody > tr");
      ourTablebody.forEach((componenet) => {
        expect(componenet.exists()).toBe(true);
      });
      expect(ourTablebody.length).toBe(1);
      // our table body suceesfully reflects the number of loop
    });

    // TESTING thead's inner text and  other ui componenet
    describe("Testing t heads inner text ad other ui componenet  ", () => {
      // const title = wrapper.findAll(".toggleDropDown");
      // WE CANT DO THIS ? WHY , IS IT BECUASE IT IS OUTSIDE THE IT
      // if you try to find outside the it , you will initialize the  wrapper instance .
      it("inner text test in thead", () => {
        const title = wrapper.findAll(".toggleDropDown");
        expect(title[0].text()).toEqual(tableHeadConfig[0].title);
        expect(title[1].text()).toEqual(tableHeadConfig[1].title);
      });
      // expect(title.text()).toEqual(tableHeadConfig[0].title)

      it("inner text in tbody", () => {
        const tableRowText = wrapper.findAll(".table-rows");

        //  const ourText =products[tableHeadConfig[index].sortby];
        tableRowText.forEach((mySpan, index) => {
          const sortKey = tableHeadConfig[index].sortby;
          // expect(mySpan.html()).toEqual(
          //   <span class="table-rows w-full"></span>
          // );
        });
      });

      describe("methods testing with data", () => {
        it("testing methods in thead", () => {
          const thead = wrapper.find("thead");
          expect(thead.exists()).toBe(true);

          // TESTING toggleAllselected
          const toggleAllSelected = thead.findAll("#select-all-checkbox");
          toggleAllSelected.forEach((method) => {
            expect(method.exists()).toBe(true);
            method.trigger("change");
            expect(wrapper.vm.toggleAllSelect).toHaveBeenCalled();
          });

          // TESTING togglePrice
          const togglePrice = wrapper.findAll(".togglePrice");
          togglePrice.forEach((method) => {
            expect(method.exists()).toBe(true);
            method.trigger("click");
          });
          expect(wrapper.vm.togglePrice).toHaveBeenCalledTimes(2);
          tableHeadConfig.forEach((item) => {
            expect(wrapper.vm.togglePrice).toHaveBeenCalledWith(item.id);
          });

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
        });

        // TESTING METHODS IN tbody
        it("testing methods in tnody", () => {});

        it("extensive testing of the toggleAllselected methods as it influences both tbody and thead", async () => {
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
    });
  });

  describe(" testing with incorrect data and props and wrong props types ", () => {
    beforeEach(async () => {
      await wrapper.setProps({
        products: [],
        tableHeadConfig: [
          {
            title: 1,
            sortby: 2,
            sortable: true,
            show: false,
            id: 1,
            priceGrouping: false,
          },
          {
            title: "test",
            sortby: "test",
            sortable: true,
            show: false,
            id: "hello",
            priceGrouping: false,
          },
        ],
        visibleColumns: {},
        PriceBracket: ["0-100", "100-500", "500+"],
      });
    });

    describe("when the props are missing and incorrect", async () => {
      //   const secondWrapper = mount(MyComponent , {incorrectProps , toggleDropDown:vi.fn()})

      it("testing Ui  in thead", () => {
        const thead = wrapper.find("thead");
        expect(thead.exists()).toBe(true);
        expect(thead.exists("thead > tr")).toBe(true);
        expect(thead.exists("thead > tr >th")).toBe(true);
        expect(thead.exists("thead > tr >div")).toBe(true);
      });
      it("testing Ui  in tbody", () => {
        const tbody = wrapper.find("tbody");
        expect(tbody.exists()).toBe(true);
        expect(tbody.exists("tbody > tr")).toBe(true);
        expect(tbody.exists("tbody > tr >td")).toBe(true);
        expect(tbody.exists("tbody > tr >div")).toBe(true);
      });

      // myMethods.forEach((test)=>{
      //    const testy = wrapper.props(`.${test}`);
      //    testy.trigger("click");
      // })
      it("testing methods in thead", () => {
        const thead = wrapper.find("thead");
        expect(thead.exists()).toBe(true);

        // TESTING toggleAllselected
        const toggleAllSelected = thead.find("#select-all-checkbox");
        toggleAllSelected.trigger("change");
        expect(wrapper.vm.toggleAllSelect).toHaveBeenCalled();

        // TESTING togglePrice
        const togglePrice = wrapper.find(".togglePrice");
        togglePrice.trigger("click");
        expect(wrapper.vm.togglePrice).toHaveBeenCalled();

        // TESTING toggleDropDown
        const toggleDropDown = wrapper.find(".toggleDropDown");
        expect(toggleDropDown.exists()).toBe(false);
        // toggleDropDown.trigger("click");
        // expect(wrapper.vm.toggleDropDown).toHaveBeenCalled();

        // TESTING sorting
        // const sorting = wrapper.find(".sorting");
        // sorting.trigger("click");
        // expect(wrapper.vm.sorting).toHaveBeenCalled();
      });
    });




    describe(" when propps is of wrong type ", () => {
      const tableHeadConfig = [
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
      ];
      beforeEach(async () => {
        await wrapper.setProps({
          products: "products",
          tableHeadConfig: tableHeadConfig,
          visibleColumns: "i am column",
          PriceBracket: ["0-100", "100-500", "500+"],
        });
      });

      it("", () => {
        expect(wrapper.exists()).toBe(true);
        const table = wrapper.findAll("tbody");
        expect(table).not.toContain("tr");
        // expect(wrapper.props.products).toEqual([])

        // TESTING METHODS AS WELL
        // const selectitem = wrapper.find('.selectItem')
        // selectitem.trigger('click');
        // expect(wrapper.vm.selectitem).not.toBeCalled()
        // expect(wrapper.props.products).toBe(null)
        wrapper.vm.togglePrice();
        wrapper.vm.selectItem();
        expect(wrapper.vm.togglePrice).toBeCalled();
    
        
       
      });
    });
  });
});
