import {
  IsBoolean,
  IsNumber,
  IsUUID,
  MinLength,
  isBoolean,
} from "class-validator";
import { ArgsType, Field, ID } from "type-graphql";
import AppUser from "../../models/AppUser/AppUser.entity";

@ArgsType()
class CreatePinArgs {
  @Field()
  @MinLength(2, {
    message: "Le nom doit faire au moinns 2 caractère de long.",
  })
  name: string;

  @Field()
  @MinLength(2, {
    message: "Change later: Check how to verify address",
  })
  address: string;

  @Field(() => [String])
  categories: string[];

  @Field()
  @MinLength(10, {
    message: "Le nom doit faire au moinns 10 caractère de long.",
  })
  description: string;

  @Field()
  @IsNumber()
  latitude: number;

  @Field()
  @IsNumber()
  longitude: number;

  @Field()
  @IsBoolean()
  isAccessible: boolean;

  @Field()
  @IsBoolean()
  isChildFriendly: boolean;

  @Field()
  @IsBoolean()
  isOutdoor: boolean;

  @Field()
  userEmail: string;
}

@ArgsType()
class UpdatePinArgs extends CreatePinArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreatePinArgs, UpdatePinArgs };
