import { Repository } from "typeorm";
import { getRepository } from "../../database/utils";
import Session from "./Session.entity";

export default class SessionDb {
  static repository: Repository<Session>;

  static async initializeRepository() {
    this.repository = await getRepository(Session);
  }

  protected static saveSession(session: Session): Promise<Session> {
    return this.repository.save(session);
  }

  static async clearRepository(): Promise<void> {
    await this.repository.delete({});
  }

  protected static async removeSession(session: Session): Promise<Session> {
    return this.repository.remove(session);
  }
}
