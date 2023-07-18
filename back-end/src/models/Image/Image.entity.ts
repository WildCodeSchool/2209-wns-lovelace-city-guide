import { Field, ObjectType, ID } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Pin from "../Pin/Pin.entity";

@Entity()
@ObjectType()
export default class Image {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  fileName: string;

  @ManyToOne(() => Pin, (pin) => pin.images)
  @Field(() => Pin)
  pin: Pin;
}
