import Link from "next/link";
import { BasePostDto } from "types";

type Props = {
  post: BasePostDto;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="p-4 flex flex-row items-center justify-between gap-4 rounded-xl overflow-hidden border-2 border-blue-500">
      <div>Name: {post.name}</div>
      <Link href={"/posts/" + post._id}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          See more
        </button>
      </Link>
    </div>
  );
}
