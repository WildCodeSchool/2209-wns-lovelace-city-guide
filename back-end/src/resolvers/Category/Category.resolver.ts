import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Category from "../../models/Category/Category.entity";
import CategoryRepository from "../../models/Category/Category.repository";

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return CategoryRepository.getCategories();
  }

  @Mutation(() => Category)
  createCategory(@Arg("categoryName") categoryName: string): Promise<Category> {
    return CategoryRepository.createCategory(categoryName);
  }

  @Mutation(() => Category)
  updateCategory(
    @Arg("id") id: string,
    @Arg("categoryName") categoryName: string
  ): Promise<Category> {
    return CategoryRepository.updateCategory(id, categoryName);
  }

  @Mutation(() => Category)
  deleteCategory(@Arg("id") id: string): Promise<Category> {
    return CategoryRepository.deleteCategory(id);
  }
}
