import Pager from "@/app/components/pager";
import { Post, Tag } from "@/common/type";
import TagList from "@/app/home/tag";
import { PageData, fetchData } from "@/common/fetch";

const getPosts = async () => {
  const postRes = await fetchData<PageData<Post[]>>("/api/article", {
    page: 1,
    page_size: 1,
  });
  return postRes.data;
};

const getTags = async () => {
  const tagRes = await fetchData<PageData<Tag[]>>("/api/tag", {
    page: 1,
    page_size: 9999,
  });
  const tags = tagRes.data;
  tags.unshift({ id: 0, name: "全部" });
  return tags;
};

export default async function Home() {
  const posts = await getPosts();
  const tags = await getTags();

  return (
    <>
      <TagList tagList={tags} />

      <div className="min-h-min w-4/5">
        <ul>
          {posts.map((item) => (
            <li
              key={item.id}
              className="mb-6 rounded-md px-7 py-6 cursor-pointer transition-all hover:scale-105 duration-400 active:scale-100 shadow-2xl backdrop-blur-sm bg-white/95"
            >
              <div className="font-bold text-lg cursor-pointer line-clamp-1 max-w-md">
                <span className="hover:text-sky-900">{item.title}</span>
              </div>
              <div className="text-gray-600 mt-3 line-clamp-3">
                {item.description}
              </div>
              <div className="text-sm mt-2 text-gray-400">
                {item.created_at}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Pager />
    </>
  );
}
