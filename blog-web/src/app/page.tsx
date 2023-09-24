import About from "@/app/components/about";
import BlogModule from "@/app/components/blog-module";

export default async function Home() {
  return (
    <>
      <About />
      <BlogModule />
    </>
  );
}
