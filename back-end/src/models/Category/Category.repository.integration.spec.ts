/// <reference types="@types/jest" />;
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

  describe("createCategory", () => {
    describe("when using category name already existed", () => {
      it("throws an error with the message", async () => {
        const existingCategoryName = "Restaurant";
        const restoCategory = await CategoryRepository.createCategory(
          "Restaurant"
        );
        const parcCategory = await CategoryRepository.createCategory("Parc");
        const categories = await CategoryRepository.getCategories();
        const categoryNames = categories.map(
          (category) => category.categoryName
        );

        await expect(
          CategoryRepository.createCategory(existingCategoryName)
        ).rejects.toThrowError(
          `Categorie: ${existingCategoryName} déjà existe`
        );
      });
    });

    describe("when using new category name", () => {
      it("should create a category successfully", async () => {
        const restoCategory = await CategoryRepository.createCategory(
          "Restaurant"
        );
        const parcCategory = await CategoryRepository.createCategory("Parc");
        const categories = await CategoryRepository.getCategories();
        const categoryNames = categories.map(
          (category) => category.categoryName
        );
        const newCategoryName = "Magasin";
        const newCategory = await CategoryRepository.createCategory(
          newCategoryName
        );
        expect(categoryNames).not.toContain(newCategoryName);
        expect(newCategory.categoryName).toEqual(newCategoryName);
      });
    });
  });
});
