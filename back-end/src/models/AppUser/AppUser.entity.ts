import { IsEmail } from "class-validator";
import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

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
}
