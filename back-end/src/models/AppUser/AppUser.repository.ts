import AppUserDb from "./AppUser.db";
import AppUser, { UserStatus } from "./AppUser.entity";

import { hashSync, compareSync } from "bcryptjs";
import SessionRepository from "./Session.repository";
import Session from "./Session.entity";
import { ERROR_NO_USER_SIGNED_IN } from "./error-messages";

export default class AppUserRepository extends AppUserDb {
  static async getUsers(): Promise<AppUser[]> {
    return this.repository.find();
  }
  static createUser(
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string
  ): Promise<AppUser> {
    const user = new AppUser(
      firstName,
      lastName,
      emailAddress,
      hashSync(password),
      UserStatus.USER
    );
    return this.saveUser(user);
  }

  static async signIn(
    emailAddress: string,
    password: string
  ): Promise<{ user: AppUser; session: Session }> {
    const user = await this.findByEmailAddress(emailAddress);

    if (!user || !compareSync(password, user.hashedPassword)) {
      throw new Error("Identifiants incorrects.");
    }
    const session = await SessionRepository.createSession(user);
    return { user, session };
  }

  static async findBySessionId(sessionId: string): Promise<AppUser | null> {
    const session = await SessionRepository.findById(sessionId);
    if (!session) {
      return null;
    }
    return session.user;
  }

  static async signOut(id: string): Promise<AppUser> {
    const currentUser = await this.repository.findOneBy({ id });
    if (!currentUser) {
      throw Error("User not found");
    }
    await SessionRepository.deleteSession(currentUser);
    return currentUser;
  }

  public static findUserById(userId: string): Promise<AppUser | null> {
    return this.repository.findOneBy({ id: userId });
  }

  static async assignAdmin(id: string): Promise<AppUser> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw Error("L'utilisateur introuvable");
    }
    user.userStatus = UserStatus.ADMIN;
    return this.repository.save(user);
  }

  static async deleteUser(id: string): Promise<AppUser> {
    const existingUser = await this.findUserById(id);
    if (!existingUser) {
      throw Error("L'utilisateur avec un identifiant demandé introuvable");
    }
    await this.repository.remove(existingUser);
    existingUser.id = id;
    return existingUser;
  }

  static async removeAdmin(id: string): Promise<AppUser> {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw Error("L'utilisateur introuvable");
    }
    user.userStatus = UserStatus.USER;
    return this.repository.save(user);
  }
}
