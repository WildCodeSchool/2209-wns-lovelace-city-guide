import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Pin from "../Pin/Pin.entity";
import AppUser from "../AppUser/AppUser.entity";

@Entity()
@ObjectType()
export default class Comment {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  content: string;

  @Column({ type: "decimal", precision: 6, scale: 2 })
  @Field()
  rating: number;

  @CreateDateColumn()
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @ManyToOne(() => Pin, (pin) => pin.comments, { onDelete: "CASCADE" })
  @Field(() => Pin)
  pin: Pin;

  @ManyToOne(() => AppUser, (user) => user.comments, { onDelete: "CASCADE" })
  @Field(() => AppUser)
  user: AppUser;
}
