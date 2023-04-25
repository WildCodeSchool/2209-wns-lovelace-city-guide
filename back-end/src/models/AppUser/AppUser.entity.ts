import { IsEmail } from "class-validator";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Pin from "../Pin/Pin.entity";

export enum UserStatus {
  USER = "user",
  ADMIN = "admin",
  BANNED_USER = "bannedUser",
}

registerEnumType(UserStatus, {
  name: "UserStatus",
});

@Entity()
@ObjectType()
export default class AppUser {
  constructor(
    firstName: string,
    lastName: string,
    emailAddress: string,
    hashedPassword: string,
    userStatus: UserStatus
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.hashedPassword = hashedPassword;
    this.userStatus = userStatus;
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  @Index({ unique: true })
  @IsEmail()
  emailAddress: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  hashedPassword: string;

  @Column({ nullable: true })
  @Field((type) => UserStatus)
  userStatus: UserStatus;

  @OneToMany(() => Pin, (pin) => pin.currentUser)
  @Field(() => [Pin], { nullable: true })
  pins: Pin[];

  @ManyToMany(() => Pin, (favoritePin) => favoritePin.favoriteUsers, {
    onDelete: "CASCADE",
  })
  @Field(() => [Pin])
  favoritePins: Pin[];
}
