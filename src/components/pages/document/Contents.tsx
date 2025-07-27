import matter from "gray-matter";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import "./contents.css";

/*
md file header  
---
title: "제목"
date: "2025-07-21"
keywords: ["test", "markdown", "blog"]
--- 
*/

interface PostData {
  title: string;
  date: string;
  keywords: string[];
  content: string;
}

export default function Contents() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const postModule = await import(`/public/post/${slug}.md?raw`);
        const rawContent = postModule.default;
        const { data, content } = matter(rawContent);

        setPost({
          title: data.title,
          date: data.date,
          keywords: data.keywords,
          content: content,
        });
      } catch (e) {
        console.error("게시물을 불러오지 못했습니다.", e);
        setError("해당 게시물을 찾을 수 없습니다... ㅠㅠ");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div>내용을 불러오는 중...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!post) {
    return <div>이런 ㅠ 게시물이 없습니다!!</div>;
  }
  return (
    <div className="text-box">
      <h1 className="text-title">{post.title}</h1>
      <p className="text-date">
        <span>게시일:</span> {post.date}
      </p>
      <div className="text-keywords">
        {post.keywords.map((keyword) => (
          <span key={keyword}>{keyword}</span>
        ))}
      </div>
      <div className="text-markdown-box">
        <Markdown
          children={post.content}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  style={monokaiSublime}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children)
                    .replace(/\n$/, "")
                    .replace(/\n&nbsp;\n/g, "")
                    .replace(/\n&nbsp\n/g, "")}
                </SyntaxHighlighter>
              ) : (
                <SyntaxHighlighter style={{}} PreTag="span">
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            },
            blockquote({ children, ...props }) {
              return <blockquote {...props}>{children}</blockquote>;
            },
            img({ ...props }) {
              return (
                <div className="text-img">
                  <img
                    src={props.src?.replace("/public/post/imgs/", "/")}
                    alt="image"
                  />
                </div>
              );
            },
            em({ children, ...props }) {
              return (
                <span style={{ fontStyle: "italic" }} {...props}>
                  {children}
                </span>
              );
            },
          }}
        />
      </div>
    </div>
  );
}
