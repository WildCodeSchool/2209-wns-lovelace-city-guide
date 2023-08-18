import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import AppUser from "../../models/AppUser/AppUser.entity";
import AppUserRepository from "../../models/AppUser/AppUser.repository";
import { SignInArgs, SignUpArgs, UpdateUserArgs } from "./AppUser.input";
import { setSessionIdInCookie } from "../../http-utils";
import { GlobalContext } from "../..";

@Resolver(AppUser)
export default class AppUserResolver {
  @Query(() => [AppUser])
  getUsers(): Promise<AppUser[]> {
    return AppUserRepository.getUsers();
  }

  @Mutation(() => AppUser)
  signUp(
    @Args() { firstName, lastName, emailAddress, password }: SignUpArgs
  ): Promise<AppUser> {
    return AppUserRepository.createUser(
      firstName,
      lastName,
      emailAddress,
      password
    );
  }

  @Mutation(() => AppUser)
  async signIn(
    @Args() { emailAddress, password }: SignInArgs,
    @Ctx() context: GlobalContext
  ): Promise<AppUser> {
    const { user, session } = await AppUserRepository.signIn(
      emailAddress,
      password
    );
    setSessionIdInCookie(context, session.id);
    return user;
  }

  @Mutation(() => AppUser)
  updateUser(
    @Args() { id, firstName, lastName, emailAddress 
    }: UpdateUserArgs,
    @Ctx() context: GlobalContext
    ): Promise<AppUser> {
      return AppUserRepository.updateUser(
        id,
        firstName,
        lastName,
        emailAddress,
      )
    }


  @Authorized()
  @Query(() => AppUser)
  async myProfile(@Ctx() context: GlobalContext): Promise<AppUser> {
    return context.user as AppUser;
  }

  @Mutation(() => AppUser)
  async signOut(@Arg("id") id: string): Promise<AppUser> {
    return AppUserRepository.signOut(id);
  }

  @Mutation(() => AppUser)
  async assignAdmin(@Arg("id") id: string): Promise<AppUser> {
    return AppUserRepository.assignAdmin(id);
  }

  @Mutation(() => AppUser)
  async deleteUser(@Arg("id") id: string): Promise<AppUser> {
    return AppUserRepository.deleteUser(id);
  }

  @Mutation(() => AppUser)
  async removeAdmin(@Arg("id") id: string): Promise<AppUser> {
    return AppUserRepository.removeAdmin(id);
  }
}
