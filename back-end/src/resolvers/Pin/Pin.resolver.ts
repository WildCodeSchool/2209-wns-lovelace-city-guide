import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import PinRepository from "../../models/Pin/Pin.repository";
import Pin from "../../models/Pin/Pin.entity";
import { CreatePinArgs, UpdatePinArgs } from "./Pin.input";

@Resolver(Pin)
export default class PinResolver {
  @Query(() => [Pin])
  pins(): Promise<Pin[]> {
    return PinRepository.getPins();
  }

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

  @Mutation(() => Pin)
  deletePin(@Arg("id") id: string): Promise<Pin> {
    return PinRepository.deletePin(id);
  }

  @Query(() => Pin)
  getPinById(@Arg("id") id: string): Promise<Pin | null> {
    return PinRepository.findPinById(id);
  }

  @Mutation(() => Pin)
  addImageToPin(
    @Arg("pinId") pinId: string,
    @Arg("fileName") fileName: string
  ): Promise<Pin> {
    return PinRepository.addImageToPin(pinId, fileName);
  }
}
