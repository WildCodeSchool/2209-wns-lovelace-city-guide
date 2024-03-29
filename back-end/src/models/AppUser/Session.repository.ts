import AppUser from "./AppUser.entity";
import SessionDb from "./Session.db";
import Session from "./Session.entity";

export default class SessionRepository extends SessionDb {
  static createSession(user: AppUser): Promise<Session> {
    const session = new Session(user);
    return this.saveSession(session);
  }

  static findById(id: string): Promise<Session | null> {
    return this.repository.findOneBy({ id });
  }

  static async deleteSession(user: AppUser): Promise<Session> {
    const currentSession = (await this.repository.findOne({
      where: { user: user },
    })) as Session;
    return this.removeSession(currentSession);
  }
}
