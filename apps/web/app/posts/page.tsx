"use client";
import { useState } from "react";
import useSWR from "swr";
import CustomError from "@/components/customError";
import PostForm from "@/components/post/postForm";
import PostCard from "@/components/post/postCard";
import { fetcher } from "@/services/index";
import { createErrorMessageForServer } from "@/services/error";
import { envConfig } from "@/env";
import { PostAction } from "@/types/post";
import { BasePostDto } from "types";
import "../globals.css";

export default function AllPosts() {
  const { data, isLoading, mutate } = useSWR(
    envConfig.server.postsUrl,
    fetcher
  );

  const [showForm, setShowForm] = useState<boolean>(false);

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="p-4">
      <div className="my-4">
        {!showForm ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setShowForm(true)}
          >
            Add new post
          </button>
        ) : (
          <PostForm
            defaultTitle=""
            defaultText=""
            action={PostAction.CREATE}
            actionButtonText="Submit new post"
            closeForm={() => setShowForm(false)}
            reload={() => mutate()}
          />
        )}
      </div>

      {!data?.ok && (
        <CustomError
          buttonText="Retry"
          errorMessage={createErrorMessageForServer(data?.data)}
          action={() => mutate()}
        />
      )}
      {data?.data?.posts?.length ? (
        <div className="flex flex-col gap-4">
          {data?.data?.posts.map((post: BasePostDto) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div>No posts</div>
      )}
    </div>
  );
}
