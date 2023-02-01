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
    await this.repository.save({
      categoryName: "Hôtel",
    });
    await this.repository.save({
      categoryName: "Parc",
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
      throw Error("NLa catégorie avec un identifiant demandé introuvable");
    }
    return this.repository.save({
      id,
      categoryName,
    });
  }

  static async deleteCategory(id: string): Promise<Category> {
    const existingCategory = await this.findCategoryById(id);
    if (!existingCategory) {
      throw Error("La catégorie avec un identifiant demandé introuvable");
    }
    await this.repository.remove(existingCategory);
    existingCategory.id = id;
    return existingCategory;
  }

  static async getCategoryByName(
    categoryName: string
  ): Promise<Category | null> {
    return this.repository.findOneBy({ categoryName });
  }
}
