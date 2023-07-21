import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateCategory, { CREATE_CATEGORY } from "./CreateCategory";
import { CreateCategoryMutation } from "gql/graphql";
import { useToast } from "@chakra-ui/react";

const mockRefetch = jest.fn();
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

const mockCreateCategory: MockedResponse<CreateCategoryMutation> = {
  request: {
    query: CREATE_CATEGORY,
    variables: {
      categoryName: "Restaurant",
    },
  },
  result: {
    data: {
      createCategory: {
        id: "133655c7-8c61-4019-b19f-c9c18a9cf78d",
        categoryName: "Restaurant",
      },
    },
  },
};

const mockCreateCategoryWithError: MockedResponse<CreateCategoryMutation> = {
  request: {
    query: CREATE_CATEGORY,
    variables: {
      categoryName: "Restaurant",
    },
  },
  error: new Error("Categorie: Restaurant déjà existe"),
};

const renderCreateCategory = (
  mocks: MockedResponse<CreateCategoryMutation>[] = []
) => {
  render(
    <MockedProvider mocks={mocks}>
      <CreateCategory refetch={mockRefetch} />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
};

describe("CreateCategory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the button correctly", () => {
    renderCreateCategory();
    expect(screen.getByText("Category")).toBeInTheDocument();
  });

  it("opens the modal on button click", async () => {
    renderCreateCategory();
    fireEvent.click(screen.getByTestId("add-new-category"));
    await waitFor(() => {
      expect(screen.getByText("Ajouter une categorie")).toBeInTheDocument();
    });
  });

  it("closes the modal on cancel button click", async () => {
    renderCreateCategory();
    fireEvent.click(screen.getByTestId("add-new-category"));

    fireEvent.click(screen.getByTestId("cancel-add-category"));

    await waitFor(() => {
      expect(
        screen.queryByText("Ajouter une categorie")
      ).not.toBeInTheDocument();
    });
  });

  it("creates a category and shows success toast", async () => {
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockImplementation(() => toastMock);

    renderCreateCategory([mockCreateCategory]);
    fireEvent.click(screen.getByTestId("add-new-category"));

    fireEvent.change(screen.getByLabelText("Nom"), {
      target: { value: "Restaurant" },
    });

    fireEvent.click(screen.getByTestId("submit-new-category"));

    await waitFor(() => {
      expect(screen.queryByTestId("modal-category")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: "Categorie Restaurant a été créé avec succès.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  });
  it("shows error toast on category creation failure", async () => {
    const toastMock = jest.fn();
    (useToast as jest.Mock).mockImplementation(() => toastMock);

    renderCreateCategory([mockCreateCategoryWithError]);
    fireEvent.click(screen.getByTestId("add-new-category"));

    fireEvent.change(screen.getByLabelText("Nom"), {
      target: { value: "Restaurant" },
    });

    fireEvent.click(screen.getByTestId("submit-new-category"));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith({
        title: "Erreur",
        status: "error",
        description: "Categorie: Restaurant déjà existe",
        duration: 5000,
        isClosable: true,
      });
    });
  });
});
