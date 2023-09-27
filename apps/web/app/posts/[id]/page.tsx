"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import PostForm from "@/components/post/postForm";
import { fetcher } from "@/services/index";
import * as postService from "@/services/post";
import { extractUserId } from "@/services/token";
import { envConfig } from "@/env";
import { PostAction } from "@/types/post";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import "../../globals.css";

export default function PostPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { data, isLoading, mutate } = useSWR(
    `${envConfig.server.postsUrl}/${id}`,
    fetcher
  );

  if (isLoading) return <div>loading...</div>;

  const isUserPost = () => {
    const currentUserId = extractUserId();

    return data?.data?.authorId?._id === currentUserId;
  };

  const remove = async () => {
    await postService.deletePost(id);
    router.push("/posts");
  };

  return (
    <div className="m-4">
      {data?.ok ? (
        <div>
          {isUserPost() && (
            <div className="flex justify-between">
              <div>You posted</div>

              <div className="flex gap-2">
                <button
                  className="bg-amber-500 hover:bg-amber-700 text-black font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <BiEditAlt />
                </button>

                <button
                  className="bg-red-500 hover:bg-red-700 text-black font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={remove}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          )}

          {isEdit ? (
            <PostForm
              defaultTitle={data?.data?.name}
              defaultText={data?.data?.description}
              action={PostAction.EDIT}
              actionButtonText="Submit edited post"
              closeForm={() => setIsEdit(false)}
              reload={() => mutate()}
              id={id}
            />
          ) : (
            <div>
              <div>{data?.data?.name}</div>
              <div>{data?.data?.description}</div>
            </div>
          )}

          <div>
            {isUserPost() ? <p>Your post</p> : <p>Author</p>}
            <p>
              {postService.getNameFromEmail(data?.data?.authorId?.username)}
            </p>
          </div>
        </div>
      ) : (
        <div>Something went wrong, item {id} is not found.</div>
      )}
    </div>
  );
}
