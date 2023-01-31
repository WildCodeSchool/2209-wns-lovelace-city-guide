import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Image from "../../models/Image/Image.entity";
import ImageRepository from "../../models/Image/Image.repository";

@Resolver(Image)
export default class ImageResolver {
  @Query(() => [Image])
  images(): Promise<Image[]> {
    return ImageRepository.getImages();
  }

  @Mutation(() => Image)
  addImage(@Arg("fileName") fileName: string): Promise<Image> {
    return ImageRepository.addImage(fileName);
  }
}
