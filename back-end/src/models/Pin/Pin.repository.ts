import AppUser from "../AppUser/AppUser.entity";
import AppUserRepository from "../AppUser/AppUser.repository";
import Category from "../Category/Category.entity";
import CategoryRepository from "../Category/Category.repository";
import CommentRepository from "../Comment/Comment.repository";
import Image from "../Image/Image.entity";
import ImageRepository from "../Image/Image.repository";
import PinDb from "./Pin.db";
import Pin from "./Pin.entity";

export default class PinRepository extends PinDb {
  static async intializePins(): Promise<void> {
    await this.clearRepository();

    const restaurantCategory = (await CategoryRepository.getCategoryByName(
      "Restaurant"
    )) as Category;

    const parcCategory = (await CategoryRepository.getCategoryByName(
      "Parc"
    )) as Category;

    const bookstoreCategory = (await CategoryRepository.getCategoryByName(
      "Médiathèque/Librairie"
    )) as Category;

    const gameCategory = (await CategoryRepository.getCategoryByName(
      "Jeux"
    )) as Category;

    const artCategory = (await CategoryRepository.getCategoryByName(
      "Art urbain"
    )) as Category;

    const bellecour1 = (await ImageRepository.addImage(
      "bellecour1.jpg"
    )) as Image;

    const bellecour2 = (await ImageRepository.addImage(
      "bellecour2.jpg"
    )) as Image;

    const bellecour3 = (await ImageRepository.addImage(
      "bellecour3.jpg"
    )) as Image;

    const ardents1 = (await ImageRepository.addImage("ardents1.jpg")) as Image;

    const firstResto = new Pin(
      "Pokawa",
      "10 Cr Vitton",
      "Lyon",
      "69006",
      [restaurantCategory],
      "Employés très agréable malgré le monde. Petit oublie de sauce vite réglé en la demandant en caisse. Ambiance agréable et calme qui ferait presque oublié l'agitation de la gare.",
      45.76946594185109,
      4.851246371884311,
      undefined,
      true,
      false,
      true
    );
    const secondResto = new Pin(
      "Hakata Ramen",
      "8 Rue du Garet",
      "Lyon",
      "69001",
      [restaurantCategory],
      "Les plats sont extrêmement bien présentés… et le personnel est sympa et souriant, c’est agréable d’être assis sur la terrasse avec d’aussi jolis plat.",
      45.76712774186643,
      4.836753413418391,
      undefined,
      true,
      true,
      false
    );

    const firstLibrairie = new Pin(
      "Traits d'union",
      "61 Rue des Girondin",
      "Lyon",
      "69007",
      [bookstoreCategory, restaurantCategory],
      "Une librairie de quartier qui a tout d'une grande ! Accueil au top, choix important et pertinent, coin lecture, animations... quel bonheur de trouver tout cela à deux pas de chez soi.",
      45.738231574814684,
      4.835126610441614,
      undefined,
      true,
      false,
      false
    );

    const secondLibrairie = new Pin(
      "Le Bal des Ardents",
      "17 Rue Neuve",
      "Lyon",
      "69001",
      [bookstoreCategory],
      "Une arche de livres encadre la porte de ce libraire qui offre une sélection généraliste et des événements.",
      45.76541870299749,
      4.835453839344742,
      [ardents1],
      true,
      false,
      false
    );

    const firstPark = new Pin(
      "Parc Blandan",
      "37 Rue du Repos",
      "Lyon",
      "69007",
      [parcCategory],
      "Vaste parc urbain sur le site d'une ancienne caserne militaire, avec grande aire de jeux et skatepark.",
      45.74512579104118,
      4.854204039864596,
      undefined,
      true,
      true,
      true
    );

    const secondPark = new Pin(
      "Jardin Botanique de Lyon",
      "Boulevard des Belges",
      "Lyon",
      "69006",
      [parcCategory],
      "Ce jardin botanique de 1857 est doté de serres abritant 15 000 espèces de plantes.",
      45.77351653391576,
      4.854681187749071,
      undefined,
      true,
      true,
      true
    );

    const thirdPark = new Pin(
      "Place Bellecour",
      "Pl. Bellecour",
      "Lyon",
      "69002",
      [parcCategory, artCategory],
      "Lieu de rencontre et d'événements. Cette place est incontournable pour les touristes. Dimanche passé, j'y étais pour la semaine des consulats.",
      45.758133231660125,
      4.83229483309206,
      [bellecour1, bellecour2, bellecour3],
      true,
      true,
      true
    );

    const firstGame = new Pin(
      "DreamAway Lyon",
      "36 Rue du Plat",
      "Lyon",
      "69002",
      [gameCategory],
      "Salle agréable, très bon accueil. Expérience(s) qui vaut vraiment le coup même si on est encore clairement dans un jeu vidéo. Un peu cher mais très fun, pour presque tous âges et notamment les moins jeunes.",
      45.769895245436864,
      4.824441849476291,
      undefined,
      true,
      true,
      false
    );

    const secondGame = new Pin(
      "Escape Game",
      "7 Bd Yves Farge",
      "Lyon",
      "69007",
      [gameCategory],
      "Très belle salle d’escape, sur le thème de la Mafia nous avons beaucoup apprécié le décors très bien élaboré et l’ambiance totalement mafieuse.",
      45.74480793233951,
      4.8350338546579446,
      undefined,
      false,
      true,
      false
    );

    const firstArt = new Pin(
      "Fontaine Bartholdi",
      "Pl. des Terreaux",
      "Lyon",
      "69001",
      [artCategory],
      "Magnifique fontaine du célèbre sculpteur français Frédéric Auguste Bartholdi inaugurée en 1892.",
      45.76775910087315,
      4.833419782193786,
      undefined,
      true,
      true,
      true
    );

    await this.repository.save([
      firstArt,
      firstResto,
      secondResto,
      firstLibrairie,
      secondLibrairie,
      firstPark,
      secondPark,
      thirdPark,
      firstGame,
      secondGame,
    ]);
  }

  static async getPins(): Promise<Pin[]> {
    return this.repository.find();
  }

  static async createPin(
    name: string,
    address: string,
    city: string,
    zipcode: string,
    categoriesNames: string[],
    description: string,
    latitude: number,
    longitude: number,
    isAccessible: boolean,
    isChildFriendly: boolean,
    isOutdoor: boolean,
    userEmail: string
  ): Promise<Pin> {
    const categories = (await this.getCategories(
      categoriesNames
    )) as Category[];
    const currentUser = (await AppUserRepository.findByEmailAddress(
      userEmail
    )) as AppUser;
    const newPin = this.repository.create({
      name,
      address,
      city,
      zipcode,
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
      currentUser,
    });
    await this.repository.save(newPin);
    return newPin;
  }

  static async updatePin(
    id: string,
    name: string,
    address: string,
    city: string,
    zipcode: string,
    categoriesNames: string[],
    description: string,
    latitude: number,
    longitude: number,
    isAccessible: boolean,
    isChildFriendly: boolean,
    isOutdoor: boolean,
    userEmail: string
  ): Promise<
    {
      id: string;
      name: string;
      address: string;
      city: string;
      zipcode: string;
      categories: Category[];
      description: string;
      latitude: number;
      longitude: number;
      isAccessible: boolean;
      isChildFriendly: boolean;
      isOutdoor: boolean;
      userEmail: string;
    } & Pin
  > {
    const existingPin = await this.repository.findOneBy({ id });
    const categories = (await this.getCategories(
      categoriesNames
    )) as Category[];
    if (!existingPin) {
      throw Error("Le Pin avec un identifiant demandé introuvable");
    }
    return this.repository.save({
      id,
      name,
      address,
      city,
      zipcode,
      categories,
      description,
      latitude,
      longitude,
      isAccessible,
      isChildFriendly,
      isOutdoor,
      userEmail,
    });
  }

  static async deletePin(id: string): Promise<Pin> {
    const existingPin = await this.repository.findOneBy({ id });
    if (!existingPin) {
      throw Error("Le Pin avec un identifiant demandé introuvable");
    }
    await this.repository.remove(existingPin);
    existingPin.id = id;
    return existingPin;
  }

  static async getCategories(categoriesNames: string[]) {
    let result: (Category | null)[] = [];
    for (const categoryName of categoriesNames) {
      result.push(await CategoryRepository.getCategoryByName(categoryName));
    }
    return result;
  }

  static async getPinsByCategoryId(categoryId: string): Promise<Pin[]> {
    const existingCategory = await CategoryRepository.findCategoryById(
      categoryId
    );
    if (!existingCategory) {
      throw Error("La catégorie avec un identifiant demandé introuvable");
    }
    const pins = await this.repository.find({
      relations: ["categories"],
      where: { categories: { id: categoryId } },
    });
    return pins;
  }

  static async addImageToPin(pinId: string, fileName: string): Promise<Pin> {
    const pin = await this.repository.findOneBy({ id: pinId });
    if (!pin) {
      throw Error("Pin doesn't exist");
    }
    const image = await ImageRepository.addImage(fileName);
    pin.images = [...pin.images, image];
    return this.repository.save(pin);
  }

  static async addPinToUserFavorite(
    pinId: string,
    userId: string
  ): Promise<Pin> {
    const pin = await this.repository.findOneBy({ id: pinId });
    if (!pin) {
      throw Error("Pin doesn't exist");
    }
    const currentUser = (await AppUserRepository.findUserById(
      userId
    )) as AppUser;
    if (!currentUser) {
      throw Error("User doesn't exist");
    }
    pin.favoriteUsers = [...pin.favoriteUsers, currentUser];

    return this.repository.save(pin);
  }

  static async getPinsFromUserFavorites(userId: string): Promise<Pin[]> {
    const favoritePins = await this.findPinsByUserId(userId);
    return favoritePins;
  }

  static async deletePinFromUserFavorites(
    pinId: string,
    userId: string
  ): Promise<Pin> {
    const pin = await this.repository.findOneBy({ id: pinId });
    if (!pin) {
      throw Error("Pin doesn't exist");
    }
    const currentUser = (await AppUserRepository.findUserById(
      userId
    )) as AppUser;
    if (!currentUser) {
      throw Error("User doesn't exist");
    }
    pin.favoriteUsers = pin.favoriteUsers.filter((user) => user.id != userId);
    return await this.repository.save(pin);
  }

  static async addCommentToPin(
    pinId: string,
    content: string,
    rating: number,
    userEmail: string
  ): Promise<Pin> {
    const pin = await this.repository.findOneBy({ id: pinId });
    if (!pin) {
      throw Error("Pin doesn't exist");
    }

    const comment = await CommentRepository.addComment(
      content,
      rating,
      userEmail
    );

    pin.comments = [...pin.comments, comment];
    return this.repository.save(pin);
  }
}
