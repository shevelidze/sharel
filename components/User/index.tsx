import React from 'react';
import Avatar from './Avatar.svg';
import styles from './User.module.css';
import useUserSWR from '../../lib/useUserSWR';
import Loader from '../Loader';
import SubscribeButton from './SubscribeButton';
import useUser from '../../lib/useUser';
import { useSWRConfig } from 'swr';

export interface UserProps {
  userId?: number | string;
}

const User: React.FC<UserProps> = ({ userId = 'me' }) => {
  const userResponse = useUserSWR({
    method: 'GET',
    path: `/api/entities/user/${userId}`,
  });
  const [user] = useUser();
  const { mutate } = useSWRConfig();
  if (userResponse.error) throw new Error('Failed to load user data.');

  function generateSubscriber(newValue: boolean) {
    return async () => {
      if (user === null) return;
      const fetchResult = await user.sendJson(`/api/entities/user/${userId}`, {
        is_subscribed: newValue,
      });

      if (!fetchResult.ok) throw new Error('Failed to subscribe');
      mutate(['GET', `/api/entities/user/${userId}`, undefined]);
    };
  }

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
      {userId !== 'me' && (
        <SubscribeButton
          isSubscribed={userResponse.data?.bodyObject.is_subscribed}
          subscribers={userResponse.data?.bodyObject.subscribers}
          onClick={generateSubscriber(
            !userResponse.data?.bodyObject.is_subscribed
          )}
        />
      )}
    </div>
  );
};

export default User;
