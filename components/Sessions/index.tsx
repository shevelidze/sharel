import React from 'react';
import useUserSWR from '../../lib/useUserSWR';
import Loader from '../Loader';
import Session from './Session';
import styles from './Sessions.module.css';

const Sessions: React.FC = () => {
  const sessionsResponse = useUserSWR('GET', '/api/entities/sessions');

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

  return (
    <div className={styles.root}>
      <div>Current session: </div>
      <Session
        key={currentSession.id}
        ipAddress={currentSession.ip_address}
        userAgent={currentSession.user_agent}
      />
      <div>Other sessions: </div>
      {sessions.map((element: any) => (
        <Session
          key={element.id}
          ipAddress={element.ip_address}
          userAgent={element.user_agent}
          lastUsedDate={new Date(
            element.last_used_timestamp * 1000
          ).toLocaleString()}
        />
      ))}
    </div>
  );
};

export default Sessions;
