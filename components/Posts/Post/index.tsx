import React, { useRef } from 'react';
import styles from './Post.module.css';
import useUserSWR from '../../../lib/useUserSWR';
import Loader from '../../Loader';
import useVisible from '../../../lib/useVisible';
import useUser from '../../../lib/useUser';
import { useSWRConfig } from 'swr';
import LikeIndicator from './LikeIndicator';
import Link from 'next/link';

export interface PostProps {
  id: number;
}

const Post: React.FC<PostProps> = ({ id }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisible(rootRef);
  const [user] = useUser();
  const { mutate } = useSWRConfig();
  const post = useUserSWR(
    isVisible
      ? {
          method: 'GET',
          path: `/api/entities/post/${id}`,
        }
      : null
  )?.data?.bodyObject;

  function generateLiker(postId: number, newValue: boolean) {
    return async () => {
      if (user === null) return;
      const response = await user.sendJson(
        `/api/entities/post/${postId}`,
        { is_liked: newValue },
        { method: 'POST' }
      );
      if (response.ok)
        mutate(['GET', `/api/entities/post/${postId}`, undefined]);
      else throw new Error('Failed to like post');
    };
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.header}>
        <Link href={`/user/${post?.user.id}`}>
          <a className={styles.user}>{`${post?.user?.first_name || ''} ${
            post?.user?.last_name || ''
          }`}</a>
        </Link>
        <div className={styles.date}>
          {post ? new Date(post?.creation_timestamp).toLocaleString() : ''}
        </div>
        {post ? (
          <LikeIndicator
            likes={post.likes}
            isActivated={post.is_liked || false}
            onClick={generateLiker(post.id, !(post.is_liked || false))}
          />
        ) : null}
      </div>
      <div className={styles.body}>
        {post?.content || (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
