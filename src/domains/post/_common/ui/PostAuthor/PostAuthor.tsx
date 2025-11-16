// PostAuthor component
// 게시글 작성자 정보를 표시하는 컴포넌트

interface PostAuthorProps {
  userId: number;
}

export function PostAuthor({ userId }: PostAuthorProps) {
  return <div>Author: {userId}</div>;
}

