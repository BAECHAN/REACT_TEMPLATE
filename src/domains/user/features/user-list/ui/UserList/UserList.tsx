import { useUserListQuery } from '@/domains/user/_common/api/users.queries';
import { UserCard } from '@/domains/user/_common/ui/UserCard/UserCard';
import { DeleteUserButton } from '@/domains/user/features/user-list/ui/DeleteUserButton/DeleteUserButton';
import { Grid } from '@/shared/ui/elements/grid/Grid';

export function UserList() {
  const { data: userList } = useUserListQuery();

  return (
    <Grid data-fsd-path="domains/features/user-list">
      {userList?.map((user) => (
        <UserCard key={user.id} user={user}>
          {user.id && <DeleteUserButton userId={user.id} />}
        </UserCard>
      ))}
    </Grid>
  );
}
