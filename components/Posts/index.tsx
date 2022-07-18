import React from 'react';
import useUserSWR from '../../lib/useUserSWR';
import Loader from '../Loader';
import Post from './Post';
import styles from './Posts.module.css';

export interface PostsProps {
  userId?: string | number;
}

const Posts: React.FC<PostsProps> = ({ userId }) => {
  const data = useUserSWR({
    method: 'GET',
    path: `/api/entities/${userId !== undefined ? `user/${userId}` : 'post'}`,
  }).data;
  const posts =
    userId !== undefined ? data?.bodyObject.posts : data?.bodyObject;
  return (
    <div className={styles.root}>
      <div className={styles.postsWrapper}>
        {posts?.map((el: { id: number }) => (
          <Post id={el.id} key={el.id} />
        )) || <Loader />}
      </div>
    </div>
  );
};

export default Posts;
