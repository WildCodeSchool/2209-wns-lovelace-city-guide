import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import CategoryDb from "./Category.db";
import Category from "./Category.entity";

export default class CategoryRepository extends CategoryDb {
  static async initializeCategories() {
    await this.clearRepository();
    await this.repository.save({
      categoryName: "Restaurant",
    });
    await this.repository.save({
      categoryName: "Musée",
    });
  }

  static async getCategories(): Promise<Category[]> {
    return this.repository.find();
  }

  static async createCategory(categoryName: string): Promise<Category> {
    const newCategory = this.repository.create({
      categoryName,
    });
    await this.repository.save(newCategory);
    return newCategory;
  }

  static async updateCategory(
    id: string,
    categoryName: string
  ): Promise<{ id: string; categoryName: string } & Category> {
    const existingCategory = await this.repository.findOneBy({ id });
    if (!existingCategory) {
      throw Error("No category match ID");
    }
    return this.repository.save({
      id,
      categoryName,
    });
  }

  static async deleteCategory(id: string): Promise<Category> {
    const existingCategory = await this.findCategoryById(id);
    if (!existingCategory) {
      throw Error("No category match ID");
    }
    await this.repository.remove(existingCategory);
    return existingCategory;
  }

  static async getCategoryByName(
    categoryName: string
  ): Promise<Category | null> {
    return this.repository.findOneBy({ categoryName });
  }
}
