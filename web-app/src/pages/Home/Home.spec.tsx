import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import Home, { GET_CATEGORIES } from "./Home";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GetCategoriesQuery } from "gql/graphql";

const renderHome = (mocks: MockedResponse<GetCategoriesQuery>[] = []) => {
  render(
    <MockedProvider mocks={mocks}>
      <Home />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
};
describe("Home", () => {
  describe("before categories have been fetched", () => {
    it("renders a loading option indicator", () => {
      renderHome();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
  describe("after categories have been fetched", () => {
    describe("when categories list is empty", () => {
      const mockGetCategoriesEmpty: MockedResponse<GetCategoriesQuery> = {
        request: {
          query: GET_CATEGORIES,
        },
        result: {
          data: {
            categories: [],
          },
        },
      };

      it("renders a specific message", async () => {
        renderHome([mockGetCategoriesEmpty]);
        await waitFor(() => {
          expect(screen.getByText("Aucune catégorie")).toBeInTheDocument();
        });
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      });
    });
    describe("when categories list is not empty", () => {
      const mockGetCategoriesNotEmpty: MockedResponse<GetCategoriesQuery> = {
        request: {
          query: GET_CATEGORIES,
        },
        result: {
          data: {
            categories: [
              {
                id: "373065fb-b5ac-4e68-b21e-c6019d5018bd",
                categoryName: "Restaurant",
              },
              {
                id: "a00b82ec-8a79-4282-b8c8-f1cad9ccbef8",
                categoryName: "Magasin",
              },
            ],
          },
        },
      };

      it("renders categories list in select option", async () => {
        renderHome([mockGetCategoriesNotEmpty]);
        await waitFor(() => {
          expect(screen.queryByRole("status")).not.toBeInTheDocument();
        });
        expect(screen.getAllByTestId("option-category")).toHaveLength(2);
      });
    });
  });
});
