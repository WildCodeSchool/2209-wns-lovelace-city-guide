import ImageDb from "./Image.db";
import Image from "./Image.entity";

export default class ImageRepository extends ImageDb {

  static async getImages(): Promise<Image[]> {
    return this.repository.find();
  }

  static async addImage(fileName: string): Promise<Image> {
    const newImage = this.repository.create({
      fileName,
    });
    await this.repository.save(newImage);
    return newImage;
  }

  static async getImageByFileName(fileName: string): Promise<Image | null> {
    return this.repository.findOneBy({ fileName });
  }
}
