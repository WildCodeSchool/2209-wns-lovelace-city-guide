import { IsBoolean, IsNumber, IsUUID, MinLength } from "class-validator";
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
    message: "L'adresse doit faire au moinns 2 caractère de long.",
  })
  address: string;

  @Field()
  @MinLength(2, {
    message: "Le nom de la ville doit faire au moinns 2 caractère de long.",
  })
  city: string;

  @Field()
  @MinLength(2, {
    message: "Le code postal doit faire au moinns 5 caractère de long.",
  })
  zipcode: string;

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
}

@ArgsType()
class UpdatePinArgs extends CreatePinArgs {
  @Field(() => ID)
  @IsUUID()
  id: string;
}

export { CreatePinArgs, UpdatePinArgs };
