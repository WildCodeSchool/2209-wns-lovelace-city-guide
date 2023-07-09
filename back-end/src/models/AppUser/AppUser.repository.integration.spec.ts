import AppUserRepository from "./AppUser.repository";
import SessionRepository from "./Session.repository";
import CategoryRepository from "../Category/Category.repository";
import ImageRepository from "../Image/Image.repository";
import PinRepository from "../Pin/Pin.repository";
import {
  closeConnection,
  getDatabase,
  initializeDatabaseRepositories,
} from "../../database/utils";
import { INVALID_CREDENTIALS_ERROR_MESSAGE } from "./error-messages";
import AppUser from "./AppUser.entity";
describe("AppUserRepository integration", () => {
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

  describe("signIn", () => {
    describe("when email address does not belong to exising user", () => {
      it("throws invalid credentials error", async () => {
        const emailAddress = "unknow@user.com";
        expect(() =>
          AppUserRepository.signIn(emailAddress, "whatever")
        ).rejects.toThrowError(INVALID_CREDENTIALS_ERROR_MESSAGE);
      });

      describe("when email address belongs to exising user", () => {
        const emailAddress = "maya@test.com";

        describe("when password invalid", () => {
          it("throws invalid creddentials error", async () => {
            await AppUserRepository.createUser(
              "Maya",
              "Test",
              emailAddress,
              "correct-password"
            );
            expect(() =>
              AppUserRepository.signIn(emailAddress, "wrong-password")
            ).rejects.toThrowError(INVALID_CREDENTIALS_ERROR_MESSAGE);
          });
        });

        describe("when password valid", () => {
          it("creates session in database", async () => {
            await AppUserRepository.createUser(
              "Maya",
              "Test",
              emailAddress,
              "correct-password"
            );
            await AppUserRepository.signIn(emailAddress, "correct-password");
            const session = await SessionRepository.repository.find();
            expect(session).toHaveLength(1);
            expect(session[0].user.emailAddress).toEqual(emailAddress);
          });

          it("returnn user and session", async () => {
            await AppUserRepository.createUser(
              "Maya",
              "Test",
              emailAddress,
              "correct-password"
            );
            const result = await AppUserRepository.signIn(
              emailAddress,
              "correct-password"
            );
            expect(result).toHaveProperty("session");
            expect(result).toHaveProperty("user");
            expect(result.user.emailAddress).toEqual(emailAddress);
          });
        });
      });
    });
  });
});
