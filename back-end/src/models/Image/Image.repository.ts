import Pin from "../Pin/Pin.entity";
import PinRepository from "../Pin/Pin.repository";
import ImageDb from "./Image.db";
import Image from "./Image.entity";

export default class ImageRepository extends ImageDb {
  static async initializeImages(): Promise<void> {
    await this.clearRepository();

    await this.repository.save({
      fileName: "test.png",
    });

    await this.repository.save({
      fileName: "user.jpg",
    });
  }

  static async getImages(): Promise<Image[]> {
    return this.repository.find();
  }

  static async getImageByFileName(fileName: string): Promise<Image | null> {
    return this.repository.findOneBy({ fileName });
  }
}
