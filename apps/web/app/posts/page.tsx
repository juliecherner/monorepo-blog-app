"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import CustomError from "@/components/customError";
import PostCard from "@/components/post";
import { fetcher } from "@/services/index";
import { createPost } from "@/services/post";
import { createErrorMessageForServer } from "@/services/error";
import { envConfig } from "@/env";
import { BasePostDto } from "types";
import { Post } from "@/types/post";
import "../globals.css";

export default function AllPosts() {
  const { data, isLoading, mutate } = useSWR(
    envConfig.server.postsUrl,
    fetcher
  );

  const {
    register,
    trigger,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const [showForm, setShowForm] = useState<boolean>(false);

  if (isLoading) return <div>loading...</div>;

  const handleNewPostAction = async () => {
    if (!showForm) {
      setShowForm(true);
      return;
    }

    const validatedSuccessfully = await trigger();

    if (validatedSuccessfully) {
      const formData = getValues();

      try {
        await createPost(formData);
        mutate();
        cancelNewPost();
      } catch (error: any) {
        console.log("error");
      }
    }
  };

  const cancelNewPost = () => {
    setShowForm(false);
    reset();
  };

  return (
    <div className="p-4">
      <div className="my-4">
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleNewPostAction}
          >
            {!showForm ? "Add new post" : "Submit new post"}
          </button>
          {showForm && (
            <button
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              onClick={cancelNewPost}
            >
              Cancel
            </button>
          )}
        </div>
        {showForm && (
          <form className="flex flex-col my-4">
            <div className="h-24 w-full flex flex-col">
              <label htmlFor="title">Title</label>

              <input
                id="title"
                type="text"
                {...register("title", { required: true, minLength: 4 })}
                placeholder="Enter title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.title && (
                <p className="text-red-600 font-bold">
                  Minimum 4 symbols title required.
                </p>
              )}
            </div>

            <div className="h-24 w-full flex flex-col">
              <label htmlFor="text">Text</label>
              <input
                id="text"
                type="text"
                {...register("text", { required: true, minLength: 50 })}
                placeholder="Enter text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              {errors.text && (
                <p className="text-red-600 font-bold">
                  Minimum 50 symbols text required.
                </p>
              )}
            </div>
          </form>
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
