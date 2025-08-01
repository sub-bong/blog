import "./categories.css";

interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  keywords: string[];
}
type PostListProps = {
  posts: PostMetadata[];
};

export default function Categories({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }

  return (
    <div className="category-all-list">
      <div className="category-all-title">
        <h1>{}</h1>
      </div>
      <div className="category-items">
        <ul className="category-items-view">
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/post/${post.slug}`}>
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
