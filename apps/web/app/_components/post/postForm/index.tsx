import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomError from "@/components/customError";
import * as postService from "@/services/post";
import { createErrorMessageForServer } from "@/services/error";
import { PostAction, Post } from "@/types/post";

type Props = {
    defaultTitle: string;
    defaultText: string;
    action: PostAction;
    actionButtonText: string;
    closeForm: () => void;
    reload?: () => void;
    id?: string;
};

export default function PostForm({
    defaultTitle,
    defaultText,
    action,
    actionButtonText,
    closeForm,
    reload = () => { },
    id = "",
}: Props) {
    const {
        register,
        trigger,
        formState: { errors },
        reset,
        getValues,
    } = useForm({
        defaultValues: {
            title: defaultTitle,
            text: defaultText,
        },
    });

    const [errorText, setErrorText] = useState<string>("");

    const handlePostAction = async () => {
        const validatedSuccessfully = await trigger();

        if (validatedSuccessfully) {
            const formData = getValues();
            try {
                const res = await executeAction(formData, id);
                if (!res?.ok) {
                    setErrorText(createErrorMessageForServer(res?.data));
                    return;
                }
                reload();
                cancelNewPost();
            } catch (error: any) {
                setErrorText(error);
            }
        }
    };

    const cancelNewPost = () => {
        closeForm();
        reset();
        setErrorText("");
    };

    const executeAction = async (
        formData: Omit<Post, "_id">, id: string
    ) => {
        switch (action) {
            case PostAction.CREATE: {
                return await postService.createPost(formData);

            }
            case PostAction.EDIT: {
                return await postService.editPost(id, formData);

            }
            default:
                break;
        }
    };

    return (
        <div>
            <div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handlePostAction}
                >
                    {actionButtonText}
                </button>
                <button
                    className="ml-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={cancelNewPost}
                >
                    Cancel
                </button>
            </div>
            {errorText && (
                <CustomError
                    buttonText="Retry"
                    errorMessage={errorText}
                    action={() => handlePostAction()}
                />
            )}
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
        </div>
    );
}
