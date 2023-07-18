import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import PinRepository from "../../models/Pin/Pin.repository";
import Pin from "../../models/Pin/Pin.entity";
import { CreatePinArgs, UpdatePinArgs } from "./Pin.input";
import { GlobalContext } from "../..";
import AppUser from "../../models/AppUser/AppUser.entity";
import Category from "../../models/Category/Category.entity";

@Resolver(Pin)
export default class PinResolver {
  @Query(() => [Pin])
  pins(): Promise<Pin[]> {
    return PinRepository.getPins();
  }

  @Authorized()
  @Mutation(() => Pin)
  createPin(
    @Args()
    {
      name,
      address,
      city,
      zipcode,
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
    }: CreatePinArgs,
    @Ctx() context: GlobalContext
  ): Promise<Pin> {
    return PinRepository.createPin(
      name,
      address,
      city,
      zipcode,
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
      (context.user as AppUser).emailAddress
    );
  }

  @Authorized()
  @Mutation(() => Pin)
  updatePin(
    @Args()
    {
      id,
      name,
      address,
      city,
      zipcode,
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
    }: UpdatePinArgs,
    @Ctx() context: GlobalContext
  ): Promise<Pin> {
    return PinRepository.updatePin(
      id,
      name,
      address,
      city,
      zipcode,
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
      (context.user as AppUser).emailAddress
    );
  }

  @Authorized()
  @Mutation(() => Pin)
  deletePin(@Arg("id") id: string): Promise<Pin> {
    return PinRepository.deletePin(id);
  }

  @Query(() => Pin)
  getPinById(@Arg("id") id: string): Promise<Pin | null> {
    return PinRepository.findPinById(id);
  }
 
  @Query(() => [Pin])
  getPinsByCategoryId(
    @Ctx() context: GlobalContext,
    @Arg("categoryId",{ nullable: true }) categoryId?: string,
    @Arg("fav",{ nullable: true }) fav?: boolean
  ): Promise<Pin[]> {
    if (fav) {
      return PinRepository.getPinsFromUserFavorites((context.user as AppUser).id);
    } else if (categoryId) {
      return PinRepository.getPinsByCategoryId(categoryId);
    } else {
      return PinRepository.getPins();
    }
  }

  @Authorized()
  @Mutation(() => Pin)
  addImageToPin(
    @Arg("pinId") pinId: string,
    @Arg("fileName") fileName: string
  ): Promise<Pin> {
    return PinRepository.addImageToPin(pinId, fileName);
  }

  @Authorized()
  @Mutation(() => Pin)
  addPinToUserFavorite(
    @Arg("pinId") pinId: string,
    @Ctx() context: GlobalContext
  ): Promise<Pin> {
    return PinRepository.addPinToUserFavorite(
      pinId,
      (context.user as AppUser).id
    );
  }

  @Authorized()
  @Query(() => [Pin])
  getPinsFromUserFavorites(@Ctx() context: GlobalContext): Promise<Pin[]> {
    return PinRepository.getPinsFromUserFavorites((context.user as AppUser).id);
  }

  @Authorized()
  @Mutation(() => Pin)
  removePinFromUserFavorite(
    @Arg("pinId") pinId: string,
    @Ctx() context: GlobalContext
  ): Promise<Pin> {
    return PinRepository.deletePinFromUserFavorites(
      pinId,
      (context.user as AppUser).id
    );
  }

  @Authorized()
  @Mutation(() => Pin)
  addCommentToPin(
    @Arg("pinId") pinId: string,
    @Arg("content") content: string,
    @Arg("rating") rating: number,
    @Arg("userEmail") userEmail: string
  ): Promise<Pin> {
    return PinRepository.addCommentToPin(pinId, content, rating, userEmail);
  }
}
