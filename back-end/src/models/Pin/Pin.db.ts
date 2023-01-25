import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Pin from "./Pin.entity";

export default class PinDb {
  protected static repository: Repository<Pin>;
  static async initializeRepository() {
    this.repository = await getRepository(Pin);
  }

  protected static findPinById(pinId: string) {
    return this.repository.findOneBy({ id: pinId });
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }
}
