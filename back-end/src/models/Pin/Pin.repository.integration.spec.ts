/// <reference types="@types/jest" />;
import {
  closeConnection,
  getDatabase,
  initializeDatabaseRepositories,
} from "../../database/utils";
import AppUserRepository from "../AppUser/AppUser.repository";
import CategoryRepository from "../Category/Category.repository";
import PinRepository from "./Pin.repository";

describe("PinRepository integration", () => {
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

  describe("getPinsFromUserFavorites", () => {
    it("should return only pins that belong to the user", async () => {
      const userOne = await AppUserRepository.createUser(
        "Tritcha",
        "Boisson",
        "tritcha@example.com",
        "hashed-password"
      );

      const restoCategory = await CategoryRepository.createCategory(
        "Restaurant"
      );
      const parcCategory = await CategoryRepository.createCategory("Parc");
      const categories = await CategoryRepository.getCategories();
      const categoryNames = categories.map((category) => category.categoryName);

      const pinA = await PinRepository.createPin(
        "Test Pin A",
        "123 Test street",
        "Test city",
        "12345",
        categoryNames,
        "test description",
        12.344345,
        55.495842,
        true,
        false,
        true,
        userOne.emailAddress
      );

      const pinB = await PinRepository.createPin(
        "Test Pin B",
        "123 Test street",
        "Test city",
        "12345",
        categoryNames,
        "test description",
        12.344345,
        55.495842,
        true,
        false,
        true,
        userOne.emailAddress
      );

      const favorite = await PinRepository.addPinToUserFavorite(
        pinA.id,
        userOne.id
      );

      const userOnePinList = await PinRepository.findPinsByUserId(userOne.id);

      const result = await PinRepository.getPinsFromUserFavorites(userOne.id);
      expect(result).toEqual(userOnePinList);
    });
  });

  describe("findPinsByCategory", () => {
    it("should return only pins from asking category", async () => {
      const askedCategory = "Restaurant";
      const userOne = await AppUserRepository.createUser(
        "Tritcha",
        "Boisson",
        "tritcha@example.com",
        "hashed-password"
      );

      const restoCategory = await CategoryRepository.createCategory(
        "Restaurant"
      );
      const categories = await CategoryRepository.getCategories();
      const categoryNames = categories.map((category) => category.categoryName);

      const pinA = await PinRepository.createPin(
        "Test Pin A",
        "123 Test street",
        "Test city",
        "12345",
        categoryNames,
        "test description",
        12.344345,
        55.495842,
        true,
        false,
        true,
        userOne.emailAddress
      );

      const pinB = await PinRepository.createPin(
        "Test Pin B",
        "123 Test street",
        "Test city",
        "12345",
        categoryNames,
        "test description",
        12.344345,
        55.495842,
        true,
        false,
        true,
        userOne.emailAddress
      );

      const result = await PinRepository.findPinsByCategory(askedCategory);
      expect(result[0].categories[0].categoryName).toEqual(askedCategory);
      expect(result[1].categories[0].categoryName).toEqual(askedCategory);
    });
  });
});
