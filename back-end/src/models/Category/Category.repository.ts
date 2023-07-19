import CategoryDb from "./Category.db";
import Category from "./Category.entity";

export default class CategoryRepository extends CategoryDb {
  static async initializeCategories() {
    await this.clearRepository();
    await this.repository.save({
      categoryName: "Restaurant",
    });
    await this.repository.save({
      categoryName: "Bar",
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
    await this.repository.save({
      categoryName: "Jeux",
    });
    await this.repository.save({
      categoryName: "Médiathèque/Librairie",
    });
    await this.repository.save({
      categoryName: "Art urbain",
    });
  }

  static async getCategories(): Promise<Category[]> {
    return this.repository.find();
  }

  static async createCategory(categoryName: string): Promise<Category> {
    const categories = await this.repository.find();
    const categoryList = categories.map((category) => category.categoryName);

    if (categoryList.includes(categoryName)) {
      throw new Error(`Categorie: ${categoryName} déjà existe`);
    }

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
      throw Error("La catégorie avec un identifiant demandé introuvable");
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
