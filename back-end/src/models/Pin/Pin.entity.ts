import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import Category from "../Category/Category.entity";
import Image from "../Image/Image.entity";
import AppUser from "../AppUser/AppUser.entity";

@Entity()
@ObjectType()
export default class Pin {
  constructor(
    name: string,
    address: string,
    categories: Category[],
    description: string,
    latitude: number,
    longitude: number,
    isAccessible?: boolean,
    isChildFriendly?: boolean,
    isOutdoor?: boolean,
    currentUser?: AppUser
  ) {
    this.name = name;
    this.address = address;
    this.categories = categories;
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
    if (currentUser) {
      this.currentUser = currentUser;
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
  address: string;

  @ManyToMany(() => Category, { eager: true })
  @Field(() => [Category])
  @JoinTable()
  categories: Category[];

  @Column()
  @Field()
  description: string;

  @OneToMany(() => Image, (image) => image.pin, { eager: true })
  @Field(() => [Image], { nullable: true })
  images: Image[];

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
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @ManyToOne(() => AppUser, (currentUser) => currentUser.pins, { eager: true })
  @Field(() => AppUser)
  currentUser: AppUser;

  @ManyToMany(() => AppUser, (favoriteUser) => favoriteUser.favoritePins, {
    eager: true,
  })
  @Field(() => [AppUser])
  @JoinTable()
  favoriteUsers: AppUser[];
}
