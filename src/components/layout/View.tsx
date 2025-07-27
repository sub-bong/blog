import { useEffect, useState } from "react";
import matter from "gray-matter";
import { Route, Routes } from "react-router";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contents from "../pages/document/Contents";

interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  keywords: string[];
  content: string;
}

export default function View() {
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postFiles = import.meta.glob("/public/post/*.md", {
          query: "?raw",
          import: "default",
        });

        const postData = await Promise.all(
          Object.entries(postFiles).map(async ([path, resolver]) => {
            const rawContent = await resolver();
            const { data } = matter(rawContent);

            const slug = path.split("/").pop()?.replace(".md", "") || "";

            return {
              slug,
              title: data.title,
              date: data.date,
              keywords: data.keywords,
            } as PostMetadata;
          })
        );

        postData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(postData);
      } catch (error) {
        console.error("post를 불러오는 중 에러가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div>목록을 불러오는 중...</div>;
  }

  return (
    <section className="view-container">
      <div className="view-contents">
        <Routes>
          <Route index element={<Home posts={posts} />} />
          <Route path="/public/post/:slug" element={<Contents />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </section>
  );
}
