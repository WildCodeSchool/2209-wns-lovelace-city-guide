import Category from "../Category/Category.entity";
import CategoryRepository from "../Category/Category.repository";
import PinDb from "./Pin.db";
import Pin from "./Pin.entity";

export default class PinRepository extends PinDb {
  static async intializePins(): Promise<void> {
    await this.clearRepository();

    const restaurantCat = (await CategoryRepository.getCategoryByName(
      "Restaurant"
    )) as Category;

    const firstResto = new Pin(
      "Pokebowl",
      "42 rue Michel Felizat",
      [restaurantCat],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum, erat eget tempus gravida, est nunc congue purus, et accumsan libero augue ut mi. Mauris egestas imperdiet mauris, eget interdum.",
      45.73615111648431,
      4.837501130044736
    );
    const secondResto = new Pin(
      "Noodle",
      "33 rue Michel Felizat",
      [restaurantCat],
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum, erat eget tempus gravida, est nunc congue purus, et accumsan libero augue ut mi. Mauris egestas imperdiet mauris, eget interdum.",
      45.73887680449488,
      4.839947304488192
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
    const getCategories = async () => {
      let result: (Category | null)[] = [];
      for (const categoryName of categoriesNames) {
        result.push(await CategoryRepository.getCategoryByName(categoryName));
      }
      return result;
    };
    const categories = (await getCategories()) as Category[];
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

  // static async updatePin(
  //   id: string,
  //   name: string,
  //   address: string,
  //   categoriesNames: string[],
  //   description: string,
  //   latitude: number,
  //   longitude: number
  // ): Promise<
  //   {
  //     id: string;
  //     name: string;
  //     address: string;
  //     category: string;
  //     description: string;
  //     latitude: number;
  //     longitude: number;
  //   } & Pin
  // > {
  //   const existingPin = await this.repository.findOneBy({ id });
  //   if (!existingPin) {
  //     throw Error("Le Pin avec un identifiant demandé introuvable");
  //   }
  //   return this.repository.save({
  //     id,
  //     name,
  //     address,
  //     category,
  //     description,
  //     latitude,
  //     longitude,
  //   });
  // }

  static async deletePin(id: string): Promise<Pin> {
    const existingPin = await this.findPinById(id);
    if (!existingPin) {
      throw Error("Le Pin avec un identifiant demandé introuvable");
    }
    await this.repository.remove(existingPin);
    existingPin.id = id;
    return existingPin;
  }
}
