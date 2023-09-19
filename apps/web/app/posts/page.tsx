"use client";
import useSWR from "swr";
import CustomError from "@/components/customError";
import PostCard from "@/components/post";
import { fetcher } from "@/services/index";
import { createErrorMessageForServer } from "@/services/error";
import { envConfig } from "@/env";
import { Post } from "@/types/post";

export default function AllPosts() {
  const { data, error, isLoading, mutate } = useSWR(
    envConfig.server.postsUrl,
    fetcher
  );

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      {!data?.ok && (
        <CustomError
          buttonText="Retry"
          errorMessage={createErrorMessageForServer(data?.data)}
          action={() => mutate()}
        />
      )}
      <div>
        {data?.data?.posts?.length ? (
          <div>
            {data?.data?.posts.map((post: Post) => 
            <PostCard key={post._id} post={post}/>
            )}
          </div>
        ) : (
          <div>No posts</div>
        )}
      </div>
    </div>
  );
}
