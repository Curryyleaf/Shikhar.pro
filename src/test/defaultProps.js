import { vi } from "vitest";

const defaultProps = {
  tableHeadConfig: [
    {
      title: "column 1",
      sortby: "title",
      sortable: true,
      show: true,
      id: 1,
      priceGrouping: false,
    },
    {
      title: "column 2",
      sortby: "category",
      sortable: true,
      show: true,
      id: 2,
      priceGrouping: false,
    },
    {
      title: "column 3",
      sortby: "price",
      sortable: false,
      show: true,
      id: 3,
      priceGrouping: false,
    },
    {
      title: "column 4",
      sortby: "id",
      sortable: false,
      show: true,
      id: 4,
      priceGrouping: false,
    },
    {
      title: "column 5",
      sortby: "action",
      sortable: false,
      show: true,
      id: 5,
      priceGrouping: false,
    },
  ],

  products: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  visibleColumns: [true, true, true, true, true, true],
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
};

export default defaultProps;

let togglePrice;
let toggleDropDown;
let toggleAllSelect;
let selectItem;
let sorting;
let deleteProduct;
let groupProductsByPriceBracket;
let closeDropdown;
let closePriceToggle;

export const myMethods = [
  togglePrice,
  closePriceToggle,
  toggleDropDown,
  toggleAllSelect,
  selectItem,
  sorting,
  deleteProduct,
  groupProductsByPriceBracket,
  closeDropdown,
];

export const incorrectProps = {
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
  product: {},
  tableHeadConfig: [
    {
      title: "",
      sortby: "title",
      sortable: true,
      show: false,
      id: 1,
      priceGrouping: false,
    },
    {
      title: "Category",
      sortby: "category",
      sortable: null,
      show: false,
      id: 2,
      priceGrouping: false,
    },
    {
      title: "Price",
      sortby: "price",
      sortable: false,
      show: false,
      id: "",
      priceGrouping: false,
    },
    {
      title: "ID",
      sortby: "id",
      sortable: false,
      show: false,
      id: 4,
      priceGrouping: false,
    },
    {
      title: 1,
      sortby: "action",
      sortable: false,
      show: false,
      id: 5,
      priceGrouping: "",
    },
  ],
  visibleColumns: {},
  sorting: [],
};