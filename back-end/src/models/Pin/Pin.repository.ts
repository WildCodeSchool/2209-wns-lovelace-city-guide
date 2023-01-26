import Category from "../Category/Category.entity";
import CategoryRepository from "../Category/Category.repository";
import ImageRepository from "../Image/Image.repository";
import PinDb from "./Pin.db";
import Pin from "./Pin.entity";

export default class PinRepository extends PinDb {
  static async intializePins(): Promise<void> {
    await this.clearRepository();

    const restaurantCategory = (await CategoryRepository.getCategoryByName(
      "Restaurant"
    )) as Category;

    const firstResto = new Pin(
      "Pokebowl",
      "42 rue Michel Felizat",
      [restaurantCategory],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum, erat eget tempus gravida, est nunc congue purus, et accumsan libero augue ut mi. Mauris egestas imperdiet mauris, eget interdum.",
      45.73615111648431,
      4.837501130044736
    );
    const secondResto = new Pin(
      "Noodle",
      "33 rue Michel Felizat",
      [restaurantCategory],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum, erat eget tempus gravida, est nunc congue purus, et accumsan libero augue ut mi. Mauris egestas imperdiet mauris, eget interdum.",
      45.72,
      4.84
    );

    await this.repository.save([firstResto, secondResto]);
  }

  static async getPins(): Promise<Pin[]> {
    return this.repository.find();
  }

  static async createPin(
    name: string,
    address: string,
    categoriesNames: string[],
    description: string,
    latitude: number,
    longitude: number
  ): Promise<Pin> {
    const categories = (await this.getCategories(
      categoriesNames
    )) as Category[];
    const newPin = this.repository.create({
      name,
      address,
      categories,
      description,
      latitude,
      longitude,
    });
    await this.repository.save(newPin);
    return newPin;
  }

  static async updatePin(
    id: string,
    name: string,
    address: string,
    categoriesNames: string[],
    description: string,
    latitude: number,
    longitude: number
  ): Promise<
    {
      id: string;
      name: string;
      address: string;
      categories: Category[];
      description: string;
      latitude: number;
      longitude: number;
    } & Pin
  > {
    const existingPin = await this.repository.findOneBy({ id });
    const categories = (await this.getCategories(
      categoriesNames
    )) as Category[];
    if (!existingPin) {
      throw Error("Le Pin avec un identifiant demandé introuvable");
    }
    return this.repository.save({
      id,
      name,
      address,
      categories,
      description,
      latitude,
      longitude,
    });
  }

  static async deletePin(id: string): Promise<Pin> {
    const existingPin = await this.findPinById(id);
    if (!existingPin) {
      throw Error("Le Pin avec un identifiant demandé introuvable");
    }
    await this.repository.remove(existingPin);
    existingPin.id = id;
    return existingPin;
  }

  static async getCategories(categoriesNames: string[]) {
    let result: (Category | null)[] = [];
    for (const categoryName of categoriesNames) {
      result.push(await CategoryRepository.getCategoryByName(categoryName));
    }
    return result;
  }

  static async addImageToPin(pinId: string, fileName: string): Promise<Pin> {
    const pin = await this.repository.findOneBy({ id: pinId });
    if (!pin) {
      throw Error("Pin doesn't exist");
    }
    const image = await ImageRepository.addImage(fileName);
    pin.images = [...pin.images, image];
    return this.repository.save(pin);
  }
}
