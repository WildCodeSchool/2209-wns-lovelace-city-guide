import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Pin from "../Pin/Pin.entity";

@Entity()
@ObjectType()
export default class Category {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  categoryName: string;

  @ManyToMany(() => Pin)
  @Field(() => [Pin])
  pins: Pin[];
}
