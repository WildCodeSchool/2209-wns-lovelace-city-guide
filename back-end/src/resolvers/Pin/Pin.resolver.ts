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
    }: CreatePinArgs
  ): Promise<Pin> {
    return PinRepository.createPin(
      name,
      address,
      categories,
      description,
      latitude,
      longitude
    );
  }

  // @Mutation(() => Pin)
  // updatePin(
  //   @Args()
  //   {
  //     id,
  //     name,
  //     address,
  //     categories,
  //     description,
  //     latitude,
  //     longitude,
  //   }: UpdatePinArgs
  // ): Promise<Pin> {
  //   return PinRepository.updatePin(
  //     id,
  //     name,
  //     address,
  //     categories,
  //     description,
  //     latitude,
  //     longitude
  //   );
  // }

  @Mutation(() => Pin)
  deletePin(@Arg("id") id: string): Promise<Pin> {
    return PinRepository.deletePin(id);
  }
}
