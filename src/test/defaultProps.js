import { vi } from "vitest";

const defaultProps = {
  props: {
    tableHeadConfig: [
      {
        title: "column 1",
        sortby: "title",
        sortable: true,
        show: false,
        id: 1,
        priceGrouping: false,
      },
      {
        title: "column 2",
        sortby: "category",
        sortable: true,
        show: false,
        id: 2,
        priceGrouping: false,
      },
      {
        title: "column 3",
        sortby: "price",
        sortable: false,
        show: false,
        id: 3,
        priceGrouping: false,
      },
      {
        title: "column 4",
        sortby: "id",
        sortable: false,
        show: false,
        id: 4,
        priceGrouping: false,
      },
      {
        title: "column 5",
        sortby: "action",
        sortable: false,
        show: false,
        id: 5,
        priceGrouping: false,
      },
    ],
    products: [],
    visibleColumns: [],
    PriceBracket: [],
    togglePrice: vi.fn(),
    closePriceToggle: vi.fn(),

    toggleDropDown: vi.fn(),
    isAllSelected: false,
    toggleAllSelect: vi.fn(),
    selectItem: vi.fn(),
    sorting: vi.fn(),
    deleteProduct: vi.fn(),
    groupProductsByPriceBracket: vi.fn(),
    closeDropdown: vi.fn(),
  },
};

export default defaultProps;
