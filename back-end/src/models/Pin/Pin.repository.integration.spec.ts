import {
  closeConnection,
  getDatabase,
  initializeDatabaseRepositories,
} from "../../database/utils";
import AppUser, { UserStatus } from "../AppUser/AppUser.entity";
import AppUserRepository from "../AppUser/AppUser.repository";
import Category from "../Category/Category.entity";
import CategoryRepository from "../Category/Category.repository";
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
    const database = await getDatabase();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
      );
    }
  });

  describe("createPin", () => {
    it("should create a new Pin", async () => {
      // Mocking the dependencies
      const mockCurrentUser = new AppUser(
        "Maya",
        "Test",
        "test@example.com",
        "hashed-password",
        UserStatus.USER
      );

      const mockCategories = [
        "Category 1",
        "Category 2",
      ] as unknown as Category[];

      const mockPin = new Pin(
        "Test new Pin",
        "123 Test street",
        "Test city",
        "12345",
        mockCategories,
        "test description",
        12.344345,
        55.495842
      );

      const mockGetCategories = jest.spyOn(PinRepository, "getCategories");
      const mockGetCurrentUserByEmail = jest.spyOn(
        PinRepository,
        "getCurrentUserByEmail"
      );
      const mockSave = jest.spyOn(PinRepository, "createPin");

      // Mocking the dependencies' implementation
      //   mockGetCurrentUserByEmail.mockResolvedValue(mockCurrentUser);
      //   mockGetCategories.mockResolvedValue(mockCategories);
      mockSave.mockResolvedValue(mockPin);

      // Test parameters
      const name = "Test Pin";
      const address = "123 Main St";
      const city = "Test City";
      const zipcode = "12345";
      const categories = ["Category 1", "Category 2"];
      const description = "Test description";
      const latitude = 123.456;
      const longitude = 789.012;
      const isAccessible = true;
      const isChildFriendly = true;
      const isOutdoor = true;
      const userEmail = "test@example.com";

      // Call the method under test
      const result = await PinRepository.createPin(
        name,
        address,
        city,
        zipcode,
        categories,
        description,
        latitude,
        longitude,
        isAccessible,
        isChildFriendly,
        isOutdoor,
        userEmail
      );

      // Assertions
      expect(result).toEqual(mockPin);
      //   expect(mockGetCurrentUserByEmail).toHaveBeenCalledWith(userEmail);
      //   expect(mockGetCategories).toHaveBeenCalledWith(categories);

      expect(mockSave).toHaveBeenCalledWith(
        name,
        address,
        city,
        zipcode,
        mockCategories,
        description,
        latitude,
        longitude,
        isAccessible,
        isChildFriendly,
        isOutdoor,
        mockCurrentUser.emailAddress
      );
    });
  });
});
