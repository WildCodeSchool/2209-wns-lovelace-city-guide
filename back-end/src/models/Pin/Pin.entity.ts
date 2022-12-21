import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export default class Pin {
  constructor(
    name: string,
    category: string, //change relationship and type later :Category[]
    address: string,
    description: string,
    //photo: Photo[],
    latitude: number,
    longitude: number,
    isAccessible?: boolean,
    isChildFriendly?: boolean,
    isOutdoor?: boolean
    //pinner: Pinner,
  ) {
    this.name = name;
    this.category = category;
    this.address = address;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    if (isAccessible) {
      this.isAccessible = isAccessible;
    }
    if (isChildFriendly) {
      this.isChildFriendly = isChildFriendly;
    }
    if (isOutdoor) {
      this.isOutdoor = isOutdoor;
    }
  }

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  category: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  @Field()
  latitude: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  @Field()
  longitude: number;

  @Column({ nullable: true, default: false })
  @Field()
  isAccessible: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  isChildFriendly: boolean;

  @Column({ nullable: true, default: false })
  @Field()
  isOutdoor: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
