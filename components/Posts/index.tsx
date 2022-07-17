import React from 'react';
import useUserSWR from '../../lib/useUserSWR';
import Loader from '../Loader';
import Post from './Post';
import styles from './Posts.module.css';

export interface PostsProps {
  isMy: boolean;
}

const Posts: React.FC<PostsProps> = ({ isMy }) => {
  const users = useUserSWR({
    method: 'GET',
    path: `/api/entities/${isMy ? 'my_post' : 'post'}`,
  });
  return (
    <div className={styles.root}>
      <div className={styles.postsWrapper}>
        {users.data?.bodyObject.map((el: { id: number }) => (
          <Post id={el.id} key={el.id} isMy={isMy} />
        )) || <Loader />}
      </div>
    </div>
  );
};

export default Posts;
