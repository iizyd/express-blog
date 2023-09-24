import BlogList from "@/app/components/blog-list";

export default function BlogPage() {
  return (
    <>
      <div className="pt-10 pb-2 px-3">
        <h1 className="flex flex-col text-3xl text-black leading-normal tracking-wider font-mono font-bold">
          博客 / Blog
        </h1>
      </div>

      <BlogList pageSize={100} />
    </>
  );
}
