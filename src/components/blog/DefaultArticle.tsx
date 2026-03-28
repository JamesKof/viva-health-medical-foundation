import { BlogPost } from "@/data/blogPosts";

interface DefaultArticleProps {
  post: BlogPost;
}

export const DefaultArticle = ({ post }: DefaultArticleProps) => (
  <>
    <figure className="my-8">
      <img src={post.image} alt={post.title} className="rounded-xl w-full" />
    </figure>
    <p>{post.excerpt}</p>
    <p className="text-muted-foreground italic">Full article coming soon. Stay tuned for updates.</p>
  </>
);
