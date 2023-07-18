import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Comment from "../../models/Comment/Comment.entity";
import CommentRepository from "../../models/Comment/Comment.repository";
import { GlobalContext } from "../..";
import AppUser from "../../models/AppUser/AppUser.entity";

@Resolver(Comment)
export default class CommentResolver {
  @Authorized()
  @Mutation(() => Comment)
  addComment(
    @Arg("content") content: string,
    @Arg("rating") rating: number,
    @Ctx() context: GlobalContext
  ): Promise<Comment> {
    return CommentRepository.addComment(
      content,
      rating,
      (context.user as AppUser).emailAddress
    );
  }

  @Query(() => [Comment])
  comments(): Promise<Comment[]> {
    return CommentRepository.getComments();
  }

  @Authorized()
  @Mutation(() => Comment)
  deleteComment(@Arg("id") id: string): Promise<Comment> {
    return CommentRepository.deleteComment(id);
  }

  @Authorized()
  @Mutation(() => Comment)
  updateComment(
    @Arg("id") id: string,
    @Arg("content") content: string,
    @Arg("rating") rating: number,
    @Ctx() context: GlobalContext
  ): Promise<Comment> {
    return CommentRepository.updateComment(
      id,
      content,
      rating,
      (context.user as AppUser).emailAddress
    );
  }
}
