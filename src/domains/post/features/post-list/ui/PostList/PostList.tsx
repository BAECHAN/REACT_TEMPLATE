import { usePostListQuery } from '@/domains/post/_common/api/posts.queries';
import { PostCard } from '@/domains/post/_common/ui/PostCard/PostCard';
import { DeletePostButton } from '@/domains/post/features/post-list/ui/DeletePostButton/DeletePostButton';
import { Grid } from '@/shared/ui/elements/grid/Grid';

export function PostList() {
  const { data: postList } = usePostListQuery();

  return (
    <Grid data-fsd-path="domains/features/post-list">
      {postList?.map((post) => (
        <PostCard key={post.id} post={post}>
          {post.id && <DeletePostButton postId={post.id} />}
        </PostCard>
      ))}
    </Grid>
  );
}
