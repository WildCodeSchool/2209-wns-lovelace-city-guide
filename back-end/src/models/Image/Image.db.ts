import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Image from "./Image.entity";

export default class ImageDb {
  protected static repository: Repository<Image>;
  static async initializeRepository() {
    this.repository = await getRepository(Image);
  }

  public static findImageById(imageId: string) {
    return this.repository.findOneBy({ id: imageId });
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }
}
