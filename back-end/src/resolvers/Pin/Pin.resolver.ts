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
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
      userEmail,
    }: CreatePinArgs
  ): Promise<Pin> {
    return PinRepository.createPin(
      name,
      address,
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
      userEmail
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
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
      userEmail,
    }: UpdatePinArgs
  ): Promise<Pin> {
    return PinRepository.updatePin(
      id,
      name,
      address,
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
      userEmail
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
}
