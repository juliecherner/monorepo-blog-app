import { fetcher } from "@/services/index";
import { extractUserId } from "@/services/token";
import {envConfig} from "@/env";
import { Post } from "@/types/post";
import { CreatePostDto } from "types";

export async function createPost(post: Post) {
  const userId = extractUserId();

  const payload: CreatePostDto = {
    name: post.title,
    description: post.text,
    authorId: userId,
  };

  await fetcher(envConfig.server.postsUrl, payload, "POST")
}
