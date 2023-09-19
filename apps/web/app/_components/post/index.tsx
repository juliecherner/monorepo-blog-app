import Link from "next/link";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <div>
      <div>Name: {post.name}</div>
      <Link href={"/posts/" + post._id}>
        <button>See more</button>
      </Link>
    </div>
  );
}
