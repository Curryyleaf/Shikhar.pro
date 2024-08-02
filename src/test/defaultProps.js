import { vi } from "vitest";


const defaultProps = {
  tableHeadConfig: [

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
};

export default defaultProps;

// let togglePrice;
// let toggleDropDown;
// let toggleAllSelect;
// let selectItem;
// let sorting;
// let deleteProduct;
// let groupProductsByPriceBracket;
// let closeDropdown;
// let closePriceToggle;

export const myMethods = [
  "togglePrice",
  "closePriceToggle",
  "toggleDropDown",
  "selectItem",
  "sorting",
  "deleteProduct",
  "groupProductsByPriceBracket",
  "closeDropdown",
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
   
  ],
  visibleColumns: {},
  sorting: [],
};