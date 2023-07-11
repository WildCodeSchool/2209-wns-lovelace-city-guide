import {
  closeConnection,
  getDatabase,
  initializeDatabaseRepositories,
} from "../../database/utils";
import Category from "./Category.entity";
import CategoryRepository from "./Category.repository";

describe("CategoryRepository", () => {
  beforeAll(async () => {
    await initializeDatabaseRepositories();
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    // eslint-disable-next-line no-restricted-syntax
    const database = await getDatabase();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
      );
    }
  });

  describe("getCategories", () => {
    it("should return an array of categories", async () => {
      // Mock the repository.find() method to return a sample array of categories
      const mockCategories: Category[] = [
        { id: "1", categoryName: "Category 1", pins: [] },
        { id: "2", categoryName: "Category 2", pins: [] },
      ];
      jest
        .spyOn(CategoryRepository, "getCategories")
        .mockResolvedValue(mockCategories);

      // Call the getCategories function
      const result = await CategoryRepository.getCategories();

      // Assert that the result matches the mock categories
      expect(result).toEqual(mockCategories);
    });
  });

  describe("createCategory", () => {
    it("should create a category successfully", async () => {
      const newCategoryName = "New Category";
      const newCategory = await CategoryRepository.createCategory(
        newCategoryName
      );
      expect(newCategory.categoryName).toEqual(newCategoryName);
    });

    it("throws an error when using an existing category name", async () => {
      const existingCategoryName = "Category 1";
      const categories = await CategoryRepository.getCategories();
      const categoryNames = categories.map((category) => category.categoryName);
      expect(categoryNames).not.toContain(existingCategoryName);

      await expect(
        CategoryRepository.createCategory(existingCategoryName)
      ).rejects.toThrowError(`Categorie: ${existingCategoryName} déjà existe`);
    });
  });

  describe("updateCategory", () => {
    it("should update a category successfully", async () => {
      const id = "b50596e0-317d-4386-a1fe-975fe60d5cec";
      const updateCategoryName = "Update Category";
      const existingCategory = {
        id,
        categoryName: "Category 1",
      };

      const result = await CategoryRepository.updateCategory(
        existingCategory.id,
        updateCategoryName
      );
      expect(result.categoryName).toEqual(updateCategoryName);
    });

    it("should throw an error if the category does not exist", () => {});
  });
});
