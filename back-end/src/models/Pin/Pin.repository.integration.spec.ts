/// <reference types="@types/jest" />;
import { Repository } from "typeorm";
import {
  closeConnection,
  getDatabase,
  getRepository,
  initializeDatabaseRepositories,
} from "../../database/utils";
import AppUser, { UserStatus } from "../AppUser/AppUser.entity";
import AppUserRepository from "../AppUser/AppUser.repository";
import Category from "../Category/Category.entity";
import CategoryRepository from "../Category/Category.repository";
import PinDb from "./Pin.db";
import Pin from "./Pin.entity";
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
});
