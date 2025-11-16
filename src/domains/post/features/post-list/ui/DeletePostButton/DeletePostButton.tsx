import { useDeletePostMutation } from '@/domains/post/_common/api/posts.queries';
import { Button } from '@/shared/ui/atoms/button/Button';
import { TEXTS } from '@/shared/config/texts';

interface DeletePostButtonProps {
  postId: string | number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const { mutateAsync: deletePost, isPending } = useDeletePostMutation();

  const handleDelete = async () => {
    await deletePost(String(postId));
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isPending}
      variant="danger"
      data-fsd-path="domains/features/post-list/DeletePostButton"
    >
      {isPending ? TEXTS.buttons.deleteLoading : TEXTS.buttons.delete}
    </Button>
  );
}
