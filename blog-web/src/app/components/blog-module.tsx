import BlogList from "@/app/components/blog-list";

export default function BlogModule() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between px-3">
        <h2 className="font-medium text-xl text-gray-800">博客</h2>
        <a
          className="text-gray-400 transition-colors hover:text-gray-600"
          title="查看全部"
          href="/blog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-right"
          >
            <line x1="7" x2="17" y1="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>

      <BlogList />
    </div>
  );
}
