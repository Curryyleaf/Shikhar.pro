import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
};

describe("NavBar.vue", () => {
  let wrapper;

  beforeEach(async () => {
    vi.resetModules();

    vi.doMock("@/store/pinia", () => ({
      useStore: () => ({
        fetchProducts: vi.fn(() =>
          Promise.resolve([
            {
              id: 1,
              title: "test-title1",
              price: 109.95,
              description: "test-description1",
              category: "test-category1",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              rating: {
                rate: 3.9,
                count: 120,
              },
            },
            {
              id: 2,
              title: " test-title ",
              price: 22.3,
              description: " test-description.",
              category: " test-category",
              image:
                "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
              rating: {
                rate: 4.1,
                count: 259,
              },
            },
          ])
        ),
        fetchCategories: vi.fn(() =>
          Promise.resolve(["test-Category1", "test-category"])
        ),
        fetchCategoryProducts: vi.fn(),
        selectedCategory: [" test-Category1 ", " test-category"],
      }),
    }));

    const { default: Navbar } = await import("@/components/Navbar.vue");

    wrapper = mount(Navbar, {
      data() {
        return {
          dropDownn: true,
        };
      },
      global: {
        mocks: {
          $route: {
            path: "/",
          },
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("toggles dropdown on button click", async () => {
    expect(wrapper.vm.dropDownn).toBe(true);
    await wrapper.find("#dropdownNavbarLink").trigger("click");
    expect(wrapper.vm.dropDownn).toBe(false);
    await wrapper.find("#dropdownNavbarLink").trigger("click");
    expect(wrapper.vm.dropDownn).toBe(true);
  });

  it("sets category and navigates to categories page", async () => {
    const category = "Electronics";
    await wrapper.vm.setCategory(category);
    expect(localStorage.getItem("category")).toBe(category);
    expect(mockRouter.replace).toHaveBeenCalledWith("/categories");
  });

  it("calls logout and redirects to login", async () => {
    await wrapper.vm.logout();
    expect(localStorage.getItem("token")).toBe(null);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "Login" });
  });

  it("displays correct categories", async () => {
    await wrapper.vm.list;

    const categories = wrapper.findAll('[data-setCategory="setCategory"]');
    expect(categories.length).toEqual(3);
    expect(categories[0].text()).toBe("All");
    expect(categories[1].text()).toBe("test-Category1");
    expect(categories[2].text()).toBe("test-category");
  });
});

describe("NavBar.vue with empty API data", () => {
  let wrapper;

  beforeEach(async () => {
    vi.resetModules();

    vi.doMock("@/store/pinia", () => ({
      useStore: () => ({
        fetchProducts: vi.fn(() => Promise.resolve([])),
        fetchCategories: vi.fn(() => Promise.resolve([])),
        fetchCategoryProducts: vi.fn(),
        selectedCategory: [],
      }),
    }));

    const { default: Navbar } = await import("@/components/Navbar.vue");
// or you can use the  vi.hoisted as well 
    wrapper = mount(Navbar, {
      data() {
        return {
          dropDownn: true,
        };
      },
      global: {
        mocks: {
          $route: {
            path: "/",
          },
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the component with empty API data", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays no categories when API returns empty data", async () => {
    await wrapper.vm.list;

    const categories = wrapper.findAll('[data-setCategory="setCategory"]');
    expect(categories.length).toEqual(1);
    expect(categories[0].text()).toBe("All");
  });
});
