import React, { useRef } from 'react';
import styles from './Post.module.css';
import useUserSWR from '../../../lib/useUserSWR';
import Loader from '../../Loader';
import useVisible from '../../../lib/useVisible';

export interface PostProps {
  id: number;
  isMy?: boolean;
}

const Post: React.FC<PostProps> = ({ id, isMy = false }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const isVisible = useVisible(rootRef);
  const post = useUserSWR(
    isVisible
      ? {
          method: 'GET',
          path: `/api/entities/${isMy ? 'my_post' : 'post'}/${id}`,
        }
      : null
  );

  return (
    <div className={styles.root} ref={rootRef}>
      {post?.data?.bodyObject.content || <Loader />}
    </div>
  );
};

export default Post;
