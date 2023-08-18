import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Pin from "./Pin.entity";
import AppUser from "../AppUser/AppUser.entity";

export default class PinDb {
  protected static repository: Repository<Pin>;
  static async initializeRepository() {
    this.repository = await getRepository(Pin);
  }

  public static findPinById(pinId: string) {
    return this.repository.findOneBy({ id: pinId });
  }

  public static findPinsByUserId(userId: string) {
    return this.repository.find({
      relations: {
        favoriteUsers: true,
      },
      where: {
        favoriteUsers: {
          id: userId
        }
    } });
  }

  public static findPinsByCategory(category: string) {
    return this.repository.find({
      relations: {
        categories: true,
      },
      where: {
        categories: {
          categoryName: category
        }
    } });
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }
}
