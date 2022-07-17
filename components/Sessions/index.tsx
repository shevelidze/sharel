import React from 'react';
import { useSWRConfig } from 'swr';
import useUserSWR from '../../lib/useUserSWR';
import useUser from '../../lib/useUser';
import Loader from '../Loader';
import Session from './Session';
import styles from './Sessions.module.css';

const Sessions: React.FC = () => {
  const sessionsResponse = useUserSWR({
    method: 'GET',
    path: '/api/entities/session',
  });

  const { mutate } = useSWRConfig();
  const [user, signIn, signOut] = useUser();

  if (sessionsResponse.data == undefined) return <Loader />;

  const sessions = [...sessionsResponse.data.bodyObject];

  let currentSession: any;
  for (let index = 0; index < sessions.length; index++) {
    if (sessions[index].is_current) {
      currentSession = sessions[index];
      sessions.splice(index, 1);
      index--;
    }
  }

  if (currentSession == undefined) {
    signOut();
    return <Loader />;
  }

  const createSessionDeleter = (id: number) => {
    return async () => {
      if (user === null)
        throw new Error('Failed to delete session. User is not authorized.');

      const fetchResult = await user.fetch(`/api/entities/session/${id}`, {
        method: 'DELETE',
      });
      if (!fetchResult.ok)
        throw new Error('Failed to delete session. Unknown error');

      mutate(['GET', '/api/entities/session', undefined]);
      mutate(['GET', `/api/entities/session/${id}`, undefined]);
    };
  };

  return (
    <div className={styles.root}>
      <div>Current session: </div>
      <Session
        key={currentSession.id}
        ipAddress={currentSession.ip_address}
        userAgent={currentSession.user_agent}
        onRemoveButtonClick={() => signOut()}
      />
      <div>Other sessions: </div>
      {sessions.map((element: any) => (
        <Session
          key={element.id}
          ipAddress={element.ip_address}
          userAgent={element.user_agent}
          lastUsedDate={new Date(element.last_used_timestamp)}
          onRemoveButtonClick={createSessionDeleter(element.id)}
        />
      ))}
    </div>
  );
};

export default Sessions;
