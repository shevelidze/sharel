import React from 'react';
import Avatar from './Avatar.svg';
import styles from './User.module.css';
import useUserSWR from '../../lib/useUserSWR';
import Loader from '../Loader';

const User: React.FC = () => {
  const userResponse = useUserSWR(['GET', '/api/entities/users/me']);
  if (userResponse.error) throw new Error('Failed to load user data.');
  return (
    <div className={styles.root}>
      {userResponse.data ? (
        <div>
          {`${userResponse.data?.bodyObject.first_name} ${userResponse.data?.bodyObject.last_name}`}
        </div>
      ) : (
        <Loader />
      )}
      <Avatar style={{ maxWidth: '48px', minWidth: '48px' }} />
    </div>
  );
};

export default User;
