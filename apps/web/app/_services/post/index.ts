import { fetcher } from "@/services/index";
import { extractUserId } from "@/services/token";
import { envConfig } from "@/env";
import { Post } from "@/types/post";
import { CreatePostDto, UpdatePostDto } from "types";

export async function createPost(post: Post) {
  const userId = extractUserId();

  const payload: CreatePostDto = {
    name: post.title,
    description: post.text,
    authorId: userId,
  };

  return await fetcher(envConfig.server.postsUrl, payload, "POST");
}

export async function deletePost(id: string) {
  return await fetcher(`${envConfig.server.postsUrl}/${id}`, {}, "DELETE");
}

export async function editPost(id: string, postBody: Omit<Post, "_id">) {
  const payload: UpdatePostDto = {
    name: postBody.title,
    description: postBody.text,
  };

  return await fetcher(`${envConfig.server.postsUrl}/${id}`, payload, "PATCH");
}
