import Markdown from "@/app/blog/[postId]/markdown";
import { fetchData } from "@/common/fetch";
import { Post } from "@/common/type";

const getBlog = async (id: number): Promise<Post> => {
  const res = await fetchData<Post>(`/api/article/${id}`, {});
  return res;
};

export default async function Blog({ params }: { params: { postId: string } }) {
  const id = params.postId;
  const blog = await getBlog(+id);

  return (
    <>
      <div className="flex flex-col items-center px-2 pt-12 pb-8">
        <h1 className="font-medium text-2xl">{blog.title}</h1>
        <p className="mt-2 text-gray-500 text-sm font-mono">
          {blog.created_at.split(" ")[0]}
        </p>
      </div>

      <article className="px-2 prose max-w-none">
        <Markdown markdown={blog.content} />
      </article>
    </>
  );
}
