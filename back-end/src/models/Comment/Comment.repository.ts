import AppUser from "../AppUser/AppUser.entity";
import AppUserRepository from "../AppUser/AppUser.repository";
import PinRepository from "../Pin/Pin.repository";
import CommentDb from "./Comment.db";
import Comment from "./Comment.entity";

export default class CommentRepository extends CommentDb {
  static async addComment(
    content: string,
    rating: number,
    userEmail: string
  ): Promise<Comment> {
    const user = (await AppUserRepository.findByEmailAddress(
      userEmail
    )) as AppUser;
    const comment = this.repository.create({
      content,
      rating,
      user,
    });

    await this.repository.save(comment);
    return comment;
  }

  static async getComments(): Promise<Comment[]> {
    return this.repository.find();
  }

  static async deleteComment(id: string): Promise<Comment> {
    const existingComment = await this.repository.findOneBy({ id });
    if (!existingComment) {
      throw Error("Le commentaire avec un identifiant demandé introuvable");
    }

    await this.repository.remove(existingComment);
    existingComment.id = id;
    return existingComment;
  }

  static async updateComment(
    id: string,
    content: string,
    rating: number,
    userEmail: string
  ): Promise<
    { id: string; content: string; rating: number; userEmail: string } & Comment
  > {
    const existingComment = await this.repository.findOneBy({ id });
    if (!existingComment) {
      throw Error("Le commentaire avec un identifiant demandé introuvable");
    }
    return this.repository.save({ id, content, rating, userEmail });
  }
}
