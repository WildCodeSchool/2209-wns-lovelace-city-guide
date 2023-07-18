import { Repository } from "typeorm";
import Comment from "./Comment.entity";
import { getRepository } from "../../database/utils";

export default class CommentDb {
  protected static repository: Repository<Comment>;
  static async initializeRepository() {
    this.repository = await getRepository(Comment);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }
}
