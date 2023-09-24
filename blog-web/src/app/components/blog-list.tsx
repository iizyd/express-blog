import { PageData, fetchData } from "@/common/fetch";
import { Post } from "@/common/type";

const getBlogList = async (pageSize: number = 5) => {
  const res = await fetchData<PageData<Post[]>>("/api/article/published", {
    page: 1,
    page_size: pageSize,
  });
  return res.data;
};

export default async function BlogList({ pageSize }: { pageSize?: number }) {
  const blogs = await getBlogList(pageSize || undefined);

  return (
    <ul className="mt-4">
      {blogs.map((blog) => {
        return (
          <li
            key={blog.id}
            className="px-3 py-2 mt-1 rounded-md transition-colors hover:bg-gray-100"
          >
            <a
              className="flex items-center justify-between space-x-2"
              href={`/blog/${blog.id}`}
            >
              <span className="flex-grow text-gray-900 line-clamp-1">
                {blog.title}
              </span>
              <span className="flex-shrink-0 text-sm text-gray-400  font-mono">
                {blog.created_at.split(" ")[0]}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
