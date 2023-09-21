import { articleList } from "./home/mock";

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-3/4 mx-auto">
        <ul>
          {articleList.map((item) => (
            <li
              key={item.id}
              className="mb-6 rounded-md px-7 py-6 cursor-pointer transition-all hover:scale-105 active:scale-100 shadow-md backdrop-blur-sm bg-white/90"
            >
              <div className="font-bold text-lg cursor-pointer line-clamp-1 max-w-md">
                <span className="hover:text-sky-900">{item.title}</span>
              </div>
              <div className="text-gray-600 mt-3 line-clamp-3 font-thin">
                {item.content}
              </div>
              <div className="text-sm mt-2 text-gray-400 font-thin">
                {item.date}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
