import { useDeleteUserMutation } from '@/domains/user/_common/api/users.queries';
import { Button } from '@/shared/ui/atoms/button/Button';
import { TEXTS } from '@/shared/config/texts';

interface DeleteUserButtonProps {
  userId: string | number;
}

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const { mutateAsync: deleteUser, isPending } = useDeleteUserMutation();

  const handleDelete = async () => {
    await deleteUser(String(userId));
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isPending}
      variant="danger"
      data-fsd-path="domains/features/user-list/DeleteUserButton"
    >
      {isPending ? TEXTS.buttons.deleteLoading : TEXTS.buttons.delete}
    </Button>
  );
}
