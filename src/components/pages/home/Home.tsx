import "./home.css";

interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  keywords: string[];
}
type PostListProps = {
  posts: PostMetadata[];
};

export default function Home({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }

  return (
    <div className="home-all-list">
      <div className="home-all-title">
        <h1>전체 보기</h1>
      </div>
      <div className="home-items">
        <ul className="home-items-view">
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/public/post/${post.slug}`}>
                <h2>{post.title}</h2>
              </a>
              <div>
                <div>
                  {post.keywords.map((keyword) => (
                    <span key={keyword}>{keyword.toUpperCase()}</span>
                  ))}
                </div>
                <p>
                  <b>Upload</b>: {post.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
