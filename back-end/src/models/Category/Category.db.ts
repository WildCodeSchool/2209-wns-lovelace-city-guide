import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Category from "./Category.entity";

export default class CategoryDb {
  protected static repository: Repository<Category>;
  static async initializeRepository() {
    this.repository = await getRepository(Category);
  }

  protected static findCategoryById(categoryId: string) {
    return this.repository.findOneBy({ id: categoryId });
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }
}
